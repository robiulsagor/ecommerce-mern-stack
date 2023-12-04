import React, { useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import { useSelector } from "react-redux"

const Dashboard = () => {
    const auth = useSelector(state => state.auth)
    console.log(auth);

    return (
        <Layout title="Dashboard - eCommerce App">
            <h1>Dashboard</h1>
            <h2>This is dashboard</h2>
            <h1>{auth.user && auth.user.name} </h1>
        </Layout>
    )
}

export default Dashboard