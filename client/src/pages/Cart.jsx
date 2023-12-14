import React from 'react'
import Layout from '../components/layout/Layout'


const Cart = () => {
    return (
        <Layout title={"Cart- Ecommerce App"}>
            <div className="container-fluid my-5 px-4">
                <div className="row">
                    <div className="col-6">
                        <div className="row">
                            <div className="col">image</div>
                            <div className="col">details</div>
                        </div>
                    </div>
                    <div className="col-4">Cart</div>
                </div>
            </div>
        </Layout>
    )
}

export default Cart