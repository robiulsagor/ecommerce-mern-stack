import React from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useSelector } from "react-redux"

const Home = () => {
    const auth = useSelector(state => state.auth)
    const t = async () => {
        const res = await axios.get("api/auth/admin-auth", {
            headers: {
                'Authorization': auth?.token
            }
        })
        console.log(res.data);
    }


    return (
        <Layout title="Home - eCommerce App">
            <div className="container">
                <div className="py-5">
                    <button className='btn btn-outline-primary' onClick={t}>Test</button>

                </div>
            </div>
        </Layout>
    )
}

export default Home