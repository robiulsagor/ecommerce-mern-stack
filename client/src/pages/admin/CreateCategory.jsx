import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/AdminMenu'

const CreateCategory = () => {
    return (
        <Layout title={"Create Category - eCommerce App"}>
            <div className="container-fluid">
                <div className="row  px-2 py-5">
                    <div className="col-3">
                        <AdminMenu />
                    </div>
                    <div className="col-9">
                        <div className="card p-3">
                            <h2 className='mb-3'>Create Category</h2>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory