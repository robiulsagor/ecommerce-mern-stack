import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <>
            <div className="list-group">
                <span className='text-center list-group-item '>
                    <h4>User Panel</h4>
                </span>
                <NavLink to="/user/dashboard" className="list-group-item list-group-item-action">
                    Dashboard
                </NavLink>
                <NavLink to="/user/orders" className="list-group-item list-group-item-action">Orders</NavLink>

            </div>
        </>
    )
}

export default UserMenu