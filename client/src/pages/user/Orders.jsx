import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/UserMenu'

const Orders = () => {
    return (
        <Layout title={"Create Product - eCommerce App"}>
            <div className="container-fluid">
                <div className="row  px-2 py-5">
                    <div className="col-3">
                        <UserMenu />
                    </div>
                    <div className="col-9">
                        <div className="card p-3">
                            <h2 className=''>Your Orders</h2>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders