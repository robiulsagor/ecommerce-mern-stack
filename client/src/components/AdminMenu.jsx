import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <div className="list-group">
                <span className='text-center list-group-item '>
                    <h4>Admin Panel</h4>
                </span>
                <NavLink to="/admin/dashboard" className="list-group-item list-group-item-action " aria-current="true">
                    Dashboard
                </NavLink>
                <NavLink to="/admin/create-category" className="list-group-item list-group-item-action">Create Category</NavLink>
                <NavLink to="/admin/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>
                <NavLink to="/admin/products" className="list-group-item list-group-item-action">Products</NavLink>
                <NavLink to="/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
                <NavLink to="/admin/secret" className="list-group-item list-group-item-action">Secret Questions</NavLink>
            </div>
        </>
    )
}

export default AdminMenu