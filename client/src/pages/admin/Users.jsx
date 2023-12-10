import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/AdminMenu'

const Users = () => {
    return (
        <Layout title={"Create Category - eCommerce App"}>
            <div className="container-fluid">
                <div className="row  px-2 py-5">
                    <div className="col-sm-4 col-md-3 col-xxl-2 ">
                        <AdminMenu />
                    </div>
                    <div className="col-12  col-sm-8 col-md-9 my-2 my-sm-0">
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