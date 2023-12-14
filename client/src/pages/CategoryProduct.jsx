import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const CategoryProduct = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])

    const getProductsByCat = async () => {
        try {
            const { data } = await axios.get(`/api/product/products-by-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error);
            toast.error("Error loading products!")
        }
    }

    useEffect(() => {
        getProductsByCat()
    }, [params])

    return (
        <Layout title={"Products - Ecommerce App"}>
            <div className="container-fluid my-5">

                <h4 className='mt-5 mb-3 text-center text-capitalize'>Category - {category.name} </h4>
                <h6 className='text-center mb-5'> {products?.length > 0 ? products?.length : "No"} result{products?.length > 1 && "s"} found </h6>
                <div className="product-grid">
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

                {products.length < 1 && <h4 className='text-danger text-center mt-5 pb-3'> No data found on this category!</h4>}

            </div>
        </Layout>
    )
}

export default CategoryProduct