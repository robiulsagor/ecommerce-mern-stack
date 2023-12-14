import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Checkbox, Radio } from 'antd';
import { priceFilter } from '../utils/priceFilters';
import Spinner from '../components/Spinner';
import SmallSpinner from '../components/SmallSpinner';
import { useSearch } from '../context/searchContext';

const SearchPage = () => {
    const [values] = useSearch()
    console.log(values.result);

    const [products, setProducts] = useState([])

    const [errText, setErrText] = useState("")

    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [productsLoading, setProductsLoading] = useState(false)

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

    // useEffect(() => {
    //     getAllProducts()
    //     getProductCount()
    // }, [])

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


    return (
        <Layout title="Home - eCommerce App">
            <div className="container-fluid py-5">
                <div className="row">

                    {/* <div className="col"> */}
                    <h3 className='text-center'>Searched Products</h3>
                    {productsLoading && <Spinner />}
                    {
                        values?.result.length == 0 && <div className='w-full d-flex flex-column align-items-center justify-content-center' style={{ height: "30vh" }}>
                            <h2 className='text-center text-danger fw-bold'> NO PRODUCTS FOUND </h2>
                        </div>
                    }
                    <div className='d-flex flex-wrap justify-content-center mt-4' style={{ justifySelf: "flex-start" }}>

                        {values?.result?.map((product, i) => {
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
        </Layout>
    )
}

export default SearchPage