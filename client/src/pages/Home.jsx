import React from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/authContext'

const Home = () => {
    const [auth, setAuth] = useAuth()
    return (
        <Layout title="Home - eCommerce App">Home</Layout>
    )
}

export default Home