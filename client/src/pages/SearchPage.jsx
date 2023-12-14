import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Checkbox, Radio } from 'antd';
import { priceFilter } from '../utils/priceFilters';
import Spinner from '../components/Spinner';
import SmallSpinner from '../components/SmallSpinner';
import { useSearch } from '../context/searchContext';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
    const [values] = useSearch()
    const navigate = useNavigate()

    const [products, setProducts] = useState([])

    const [errText, setErrText] = useState("")

    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [productsLoading, setProductsLoading] = useState(false)

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

                    <div className='product-grid'>
                        {values?.result?.map((product, i) => {
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

                </div>
            </div>
        </Layout>
    )
}

export default SearchPage