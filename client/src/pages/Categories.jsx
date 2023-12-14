import React from 'react'
import Layout from '../components/layout/Layout'
import { useCategory } from '../hooks/useCategory'
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories = useCategory()

    return (
        <Layout title={"Categories- Ecommerce App"}>
            <div className='container my-5'>
                <div className="row">
                    <div className="col-10 col-md-8 col-6 border mx-auto">
                        <h2 className='text-center'>Categories</h2>
                        <hr />

                        <div className='my-4'>
                            <div className="row  align-items-center justify-content-center gap-3">
                                {categories?.map((cat, i) => (
                                    <div key={i} className='col-12 col-sm-12  col-md-5 text-center d-grid align-items-center justify-content-center'>
                                        <Link key={i} to={`/category/${cat.slug}`} className="btn btn-primary">{cat.name} </Link>
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

export default Categories