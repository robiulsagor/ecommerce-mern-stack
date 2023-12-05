import React from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'

const Home = () => {
    const t = async () => {
        const res = await axios.get("api/test")
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