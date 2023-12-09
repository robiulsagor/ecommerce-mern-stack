import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/AdminMenu'

const Users = () => {
    return (
        <Layout title={"Create Category - eCommerce App"}>
            <div className="container">
                <div className="row  px-2 py-5">
                    <div className="col-3">
                        <AdminMenu />
                    </div>
                    <div className="col-7">
                        <div className="card p-3">
                            <h2 className='mb-3'>Users List</h2>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users