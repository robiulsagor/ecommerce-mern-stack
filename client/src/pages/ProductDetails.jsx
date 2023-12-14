import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetails = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState({})
    const [similar, setSimilar] = useState([])

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/product/get-product/${params.slug}`)
            setProduct(data?.product)
            console.log(data?.product)
            console.log("agaim");
            getSimilarProducts(data?.product.category._id, data?.product._id)
        } catch (error) {
            console.log(error);
            toast.error(error || "Error loading product!")
        }
    }

    useEffect(() => {
        if (params) getProduct()
    }, [])


    const getSimilarProducts = async (cid, pid) => {
        try {
            const { data } = await axios.get(`/api/product/similar-products/${cid}/${pid}`)
            if (data.length > 0) {
                setSimilar(data)
            }
        } catch (error) {
            console.log(error);
            toast.error("Error loading similar product!")
        }
    }

    return (
        <Layout title="Product detais- Ecomm app">
            <div className="container my-5">
                <div className="row">
                    <div className="col-5 ">
                        <img src={product.photoUrl} alt="Product Image"
                            className='mx-auto img-fluid mb-3' />
                    </div>
                    <div className="col-7 ">
                        <h2 className="text-center mb-4 me-5">Product Details</h2>

                        <h6>Name: {product.name} </h6>
                        <h6>Price: ${product.price} </h6>
                        <h6>Description: {product.description} </h6>

                        <button className="btn btn-outline-success mt-4">Add to Cart</button>
                    </div>
                </div>

                <hr />
                <h6>Similar Products</h6>
                <div className="col">

                    {similar?.length < 1 && <h4 className='text-center text-danger'>No products found</h4>}

                    <div className='product-grid'>
                        {!similar && <h3>No products found</h3>}
                        {similar?.map((product, i) => (
                            <div key={i} className='card  p-3 product-card m-2'>
                                <img src={product.photoUrl} alt="Product Image"
                                    className='mx-auto img-fluid mb-3' style={{ width: "200px" }} />

                                <h5>{product.name} </h5>
                                <p>{product.description.substring(0, 30)}... </p>
                                <p><b> ${product.price} </b></p>
                                <div className="row">
                                    <div className="col">
                                        <button className='btn btn-secondary' onClick={() => window.location.assign(`/product/${product.slug}`)}>More Details</button>
                                    </div>
                                    <div className="col">
                                        <button className='btn btn-primary'>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails