import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router-dom'

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            {/* {children} */}
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout