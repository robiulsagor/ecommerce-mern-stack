import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import Loading from '../../components/Loading'
import { Link } from 'react-router-dom'

const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

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
                setError("No products found!")
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

                            {error && <h3 className='text-center text-danger'>{error}</h3>}
                            <div className='mt-3 product-grid-admin'>
                                {loading ? <Loading /> : products.map(product => (
                                    <Link to={`/admin/product/${product._id}`} key={product._id} className='product-link-admin'>
                                        <div className='card  p-3 product-card-admin'>
                                            {!loading && <img src={`/api/product/get-product-photo/${product._id}`} alt="Product Image"
                                                className='mx-auto img-fluid' />
                                            }
                                            <h4>{product.name} </h4>
                                            <div className="row">
                                                <div className="col"> ${product.price} </div>
                                                <div className="col">{product.price} </div>
                                            </div>
                                        </div>
                                    </Link>

                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >

    )
}

export default Products