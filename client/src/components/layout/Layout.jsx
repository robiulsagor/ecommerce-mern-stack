import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { useLocation } from 'react-router-dom'
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
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content="Robiul Islam Sagar" />
            </Helmet>
            <main
            >
                {children}
            </main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: "eCommerce App",
    description: "MERN stack eCommerce project",
    author: "Robiul Islam Sagar",
    keywords: "mern, mern-stack"
}

export default Layout