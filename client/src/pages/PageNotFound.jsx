import React from 'react'
import Layout from '../components/layout/Layout'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <Layout title="404 - eCommerce App">
            <div className="pnf-container">
                <div className='pnf'>
                    <h1 className="pnf-title">404</h1>
                    <h1 className="pnf-heading">
                        Oops! Page Not Found
                    </h1>
                    <Link to="/">Go Back</Link>
                </div>
            </div>
        </Layout>
    )
}

export default PageNotFound