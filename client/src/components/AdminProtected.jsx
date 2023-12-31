import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import Spinner from './Spinner'
import toast from 'react-hot-toast'

const AdminProtected = () => {
    const navigate = useNavigate()
    const auth = useSelector(state => state.auth)
    const [ok, setOk] = useState(false)
    const [wait, setWait] = useState(10)

    // to check if the token is valid
    // if valid, permit to go to desired page
    // if not, redirect to the login page

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get('/api/auth/admin-auth', {
                    headers: {
                        'Authorization': auth?.token
                    }
                })

                if (res.data.ok) {
                    setOk(true)
                } else {
                    setOk(false)
                    // navigate("/")
                    console.log("not ok");
                    toast.error(res.data.message || "Network Error")
                }
            } catch (error) {
                setOk(false)
                console.log(error);
                navigate("/user/dashboard")
                toast.error(error.response.data.message)
                console.log("loggging22");
            }
        }

        auth?.token && authCheck()

        if (!auth.token) {
            navigate("/login")
            toast.error("Please login first!")
        }
    }, [])

    // if not, redirect to the login page
    // by this useEffect.
    useEffect(() => {
        const timer = setInterval(() => {
            setWait(prev => prev - 1)
        }, 1000)

        wait == 0 && !ok && navigate("/login")
        return () => clearInterval(timer)
    }, [wait, navigate])

    // ===================================



    return ok ? <Outlet /> : <Spinner />
}

export default AdminProtected