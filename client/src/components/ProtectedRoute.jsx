import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = () => {
    const navigate = useNavigate()
    const [auth, setAuth] = useState({
        user: null,
        token: null
    })

    useEffect(() => {
        if (!auth.user) {
            navigate("/login")
        }
    }, [])
    return null
}

export default ProtectedRoute