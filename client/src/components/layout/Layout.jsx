import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from "react-helmet";

const Layout = ({ children, title, description, keywords }) => {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return (
        <div>
            <Header />
            <Helmet>
                <meta charSet="utf-8" />
                <title>eCommerce</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content="Robiul Islam Sagar" />
            </Helmet>
            <main
                className='container' style={{ padding: '5rem 0' }}>
                {children}
                {/* <Outlet /> */}
            </main>
            <Footer />
        </div>
    )
}

Layout.defaultProps

export default Layout