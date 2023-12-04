import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux"
import axios from "axios"
import Spinner from './Spinner'
import toast from 'react-hot-toast'

const ProtectedRoute = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const auth = useSelector(state => state.auth)
    const [ok, setOk] = useState(false)
    const [wait, setWait] = useState(10)

    // to check if the token is valid
    // if valid, permit to go to desired page
    // if not, redirect to the login page
    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API}/api/v1/auth/user-auth`, {
                    headers: {
                        'Authorization': auth?.token
                    }
                })
                if (res.data.ok) {
                    setOk(true)
                } else {
                    setOk(false)
                    navigate("/login", {
                        state: location.pathname
                    })

                    console.log("not logged");
                }
            } catch (error) {
                setOk(false)
            }
        }
        auth?.token && authCheck()
        if (!auth.token) {
            navigate("/login", {
                state: location.pathname
            })
            toast.error("Please login first!")
        }
    }, [])

    // if not, redirect to the login page
    // by this useEffect.
    useEffect(() => {
        const timer = setInterval(() => {
            setWait(prev => prev - 1)
        }, 1000)

        wait == 0 && !ok && navigate("/login", { state: location.pathname })
        return () => clearInterval(timer)
    }, [wait, navigate])

    return ok ? <Outlet /> : <Spinner />
}

export default ProtectedRoute