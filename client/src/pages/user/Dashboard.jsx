import React, { useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import { useSelector } from "react-redux"
import UserMenu from '../../components/UserMenu'

const Dashboard = () => {
    const user = useSelector(state => state.auth.user)

    return (
        <Layout title={"Dashboard - eCommerce App"}>
            <div className="container-fluid">
                <div className="row  px-2 py-5">
                    <div className="col-3">
                        <UserMenu />
                    </div>
                    <div className="col-9">
                        <div className="card p-3">
                            <h2 className=''>Dashboard</h2>
                            <h4>Name: {user.name}</h4>
                            <h4>Email: {user.email}</h4>
                            <h4>Phone: {user.phone}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard