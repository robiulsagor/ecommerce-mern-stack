import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Checkbox, Radio } from 'antd';
import { priceFilter } from '../utils/priceFilters';

const Home = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])

    console.log(checked);

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
        try {
            const data = await axios.get("/api/product/get-product")
            if (data?.data?.products) {
                setProducts(data?.data?.products)
            } else {
                toast.error("No products found!")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.message || "Loading Error")
        }
    }
    useEffect(() => {
        getAllProducts()
    }, [])

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
                } else {
                    toast.error("No products found!")
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
                    <div className="col-3 border ps-4">
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
                    </div>
                    <div className="col">
                        <h3>All Products</h3>
                        <div className='d-flex flex-wrap mt-4'>
                            {products?.map((product, i) => {
                                return <div key={i} className='card  p-3 product-card m-2'>

                                    <img src={product.photoUrl} alt="Product Image"
                                        className='mx-auto img-fluid' style={{ width: "200px" }} />

                                    <h5>{product.name} </h5>
                                    <p>{product.description.substring(0, 30)}... </p>

                                    <p><b> ${product.price} </b></p>

                                    <div className="row">
                                        <div className="col">
                                            <button className='btn btn-secondary'>More Details</button>
                                        </div>
                                        <div className="col">
                                            <button className='btn btn-primary'>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home