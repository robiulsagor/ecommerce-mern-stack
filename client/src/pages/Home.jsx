import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Checkbox, Radio } from 'antd';
import { priceFilter } from '../utils/priceFilters';
import Spinner from '../components/Spinner';
import SmallSpinner from '../components/SmallSpinner';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])
    const [errText, setErrText] = useState("")

    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [productsLoading, setProductsLoading] = useState(false)


    const getAllCategories = async () => {
        try {
            const categories = await axios.get("/api/category/get-all-categories")
            const { data } = categories
            if (data?.success) {
                setCategories(data.categories)
            } else {
                toast.error(data.message || "Error fetching categories!")
            }
        } catch (error) {
            console.log(error);
            toast.error("Error fetching category list!")
        }
    }

    useEffect(() => {
        getAllCategories()
    }, [])

    const getAllProducts = async () => {
        setProductsLoading(true)
        try {

            const data = await axios.get(`/api/product/paginate/${page}`, {
                signal: AbortSignal.timeout(4000)
            })
            if (data?.data?.products) {
                setProducts(data?.data?.products)
            } else {
                toast.error("No products found!")
                setErrText("No products found!")
            }
            setProductsLoading(false)

            console.log(data);
        } catch (error) {
            console.log(error);
            toast.error("Loading Error")
            setErrText("Loading Error")
            setProductsLoading(false)
        }
    }
    console.log(errText);

    useEffect(() => {
        if (page === 1) return
        loadMore()
    }, [page])

    const loadMore = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`/api/product/paginate/${page}`)
            if (data?.products) {
                setProducts(data?.data?.products)
                setProducts([...products, ...data?.products])
            } else {
                toast.error("No products found!")
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
            toast.error(error.response.message || "Loading Error")
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllProducts()
        getProductCount()
    }, [])

    // for pagination, get the total product length
    const getProductCount = async () => {
        try {
            const { data } = await axios.get("/api/product/product-count")
            console.log(data);
            setTotal(data?.total)
        } catch (error) {
            console.log(error);
        }
    }

    // filter options
    const handleCheckFilter = (val, id) => {
        let all = [...checked]
        if (val) {
            all.push(id)
        } else {
            all = all.filter(c => c !== id)
        }
        setChecked(all)
    }

    // call the function when user filters product
    useEffect(() => {
        const handleFilter = async () => {
            try {
                const { data } = await axios.post("/api/product/filter-product", { checked, radio })
                if (data?.products.length > 0) {
                    setProducts(data?.products)
                    setErrText("")
                } else {
                    toast.error("No products found!")
                    setErrText("No products found!")
                    setProducts(data?.products)
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (checked.length > 0 || radio.length) handleFilter()

    }, [checked, radio])

    return (
        <Layout title="Home - eCommerce App">
            <div className="container-fluid py-5">
                <div className="row">
                    <div className="col-3  px-4">
                        <div>
                            <h4>Filter by Category</h4>
                            <div className='mt-3 '>
                                {categories?.map((cat, i) => (
                                    <div className='d-block' key={cat._id}>
                                        <Checkbox onClick={e => handleCheckFilter(e.target.checked, cat._id)}>
                                            {cat.name}
                                        </Checkbox>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='mt-5'>
                            <h4>Filter by Price</h4>

                            <div className='mt-3 d-flex flex-col'>
                                <Radio.Group onChange={e => setRadio(e.target.value)} className='d-block'>
                                    {priceFilter?.map(p => (
                                        <Radio key={p._id} value={p.value} className='d-block'>{p.name} </Radio>
                                    ))}
                                </Radio.Group>
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <button className='btn btn-danger mt-4 py-2 fw-bold' onClick={() => window.location.reload()}>RESET FILTERS</button>
                        </div>
                    </div>
                    <div className="col">
                        <h3 className='text-center'>All Products</h3>
                        {productsLoading && <Spinner />}
                        {
                            products.length == 0 && errText && <div className='w-full d-flex flex-column align-items-center justify-content-center' style={{ height: "30vh" }}>
                                <h2 className='text-center text-danger'>{errText} </h2>
                            </div>
                        }

                        <div className='product-grid'>
                            {products?.map((product, i) => {
                                return <div key={i} className='card  p-3 product-card m-2'>
                                    <img src={product.photoUrl} alt="Product Image"
                                        className='mx-auto img-fluid mb-3' style={{ width: "200px" }} />

                                    <h5>{product.name} </h5>
                                    <p>{product.description.substring(0, 30)}... </p>
                                    <p><b> ${product.price} </b></p>
                                    <div className="row">
                                        <div className="col">
                                            <button className='btn btn-secondary' onClick={() => navigate(`/product/${product.slug}`)}>More Details</button>
                                        </div>
                                        <div className="col">
                                            <button className='btn btn-primary'>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>

                        {products && products.length < total && (
                            <button className='btn btn-warning mt-4' onClick={() => setPage(page + 1)}>
                                {loading ? <SmallSpinner /> : "Load More"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home