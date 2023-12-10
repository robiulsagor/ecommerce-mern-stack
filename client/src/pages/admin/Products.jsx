import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import Loading from '../../components/Loading'

const Products = () => {
    const [products, setProducts] = useState([
        {
            id: 24724981415,
            name: "Nice watch",
            description: "Description of nice watch.",
            price: 30,
            quantity: 20,
            photo: "",
            delivery: 0
        },
        {
            id: 24724981415,
            name: "Nice watch",
            description: "Description of nice watch.",
            price: 30,
            quantity: 20,
            photo: "",
            delivery: 0
        },
        {
            id: 24724981415,
            name: "Nice watch",
            description: "Description of nice watch.",
            price: 30,
            quantity: 20,
            photo: "",
            delivery: 0
        },
        {
            id: 24724981415,
            name: "Nice watch",
            description: "Description of nice watch.",
            price: 30,
            quantity: 20,
            photo: "",
            delivery: 0
        },
        {
            id: 24724981415,
            name: "Nice watch",
            description: "Description of nice watch.",
            price: 30,
            quantity: 20,
            photo: "",
            delivery: 0
        },
        {
            id: 24724981415,
            name: "Nice watch",
            description: "Description of nice watch.",
            price: 30,
            quantity: 20,
            photo: "",
            delivery: 0
        },
        {
            id: 24724981415,
            name: "Nice watch",
            description: "Description of nice watch.",
            price: 30,
            quantity: 20,
            photo: "",
            delivery: 0
        },
        {
            id: 24724981415,
            name: "Nice watch",
            description: "Description of nice watch.",
            price: 30,
            quantity: 20,
            photo: "",
            delivery: 0
        },
        {
            id: 24724981415,
            name: "Nice watch",
            description: "Description of nice watch.",
            price: 30,
            quantity: 20,
            photo: "",
            delivery: 0
        },
        {
            id: 24724981415,
            name: "Nice watch",
            description: "Description of nice watch.",
            price: 30,
            quantity: 20,
            photo: "",
            delivery: 0
        },
    ])
    const [loading, setLoading] = useState(false)

    const getAllProducts = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get("/api/product/get-product", {
                signal: AbortSignal.timeout(10000) // abort after 10 seconds
            })
            if (data?.productCoutnt > 0) {
                setProducts(data.products)
            } else {
                toast.error("No products found!")
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
            toast.error("Error: Maybe internet not available")
            setLoading(false)

        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])
    return (
        <Layout title={"Create Product - eCommerce App"}>
            <div className="container-fluid">
                <div className="row  px-2 py-5">
                    <div className="col-sm-4 col-md-3 col-xxl-2 ">
                        <AdminMenu />
                    </div>
                    <div className="col-12  col-sm-8 col-md-9 my-2 my-sm-0">
                        <div className="card p-3">
                            <h2 className='mb-3'>All Products</h2>

                            <div className='mt-3 product-grid-admin'>
                                {loading ? <Loading /> : products.map(product => (
                                    <div key={product._id} className='card  p-3 '>

                                        <img src={`/api/product/get-product-photo/${product._id}`} alt="Product Image"
                                            className='mx-auto img-fluid' />
                                        <h4>{product.name} </h4>
                                        <p>{product.description} </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default Products