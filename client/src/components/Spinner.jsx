import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Spinner = () => {
    const navigate = useNavigate()


    return (
        <div className="d-flex flex-column  justify-content-center align-items-center" style={{ height: '50vh' }}>
            <h2>Loading...</h2>
            <div className="spinner-border " role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>

    )
}

export default Spinner