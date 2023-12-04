import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { useLocation } from 'react-router-dom'
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux"
import { login } from '../../redux/authSlice';
import axios from 'axios';

const Layout = ({ children, title, description, keywords }) => {
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    console.log(auth);

    // useEffect(() => {
    //     console.log("test");
    //     const data = localStorage.getItem("auth")
    //     if (data) {
    //         console.log(data);
    //         const parsedData = JSON.parse(data)
    //         if (!auth.user) {
    //             console.log("no auth");
    //             dispatch(login({ user: parsedData.details, token: parsedData.token }))
    //         }
    //     }
    // }, [])

    // auto scroll to top
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    console.log(auth);
    axios.defaults.headers.common['Authorization'] = auth?.token

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