import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [similar, setSimilar] = useState([])

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/product/get-product/${params.slug}`)
            setProduct(data?.product)
        } catch (error) {
            console.log(error);
            toast.error(error || "Error loading product!")
        }
    }

    useEffect(() => {
        if (params) getProduct()
    }, [])

    console.log(product);

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

                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails