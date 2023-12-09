import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/AdminMenu'

const CreateProduct = () => {
    return (
        <Layout title={"Create Product - eCommerce App"}>
            <div className="container">
                <div className="row  px-2 py-5">
                    <div className="col-3">
                        <AdminMenu />
                    </div>
                    <div className="col-7">
                        <div className="card p-3">
                            <h2 className='mb-3'>Create Product</h2>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct