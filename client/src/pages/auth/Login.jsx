import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux"
import { login } from '../../redux/authSlice';


const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        email: "sagor@gmail.com",
        password: "123456"
    })
    const [isLoading, setIsLoading] = useState(false)

    const setUserValues = e => {
        setUser(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const loginUser = async e => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/login`, user, {
                signal: AbortSignal.timeout(10000) //Aborts request after 10 seconds
            })
            if (res && res.data.success) {
                console.log("hello");
                navigate("/dashboard")
                dispatch(login({ user: res.data.details, token: res.data.token }))
                toast.success(res.data.message, { id: "notification" })
            }
            if (res && !res.data.success) {
                toast.error(res.data.message, { id: "notification" })
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
            if (error && error.message) {
                toast.error(`Error: ${error.message}`, { id: "notification" })
            } else {
                toast.error("Something went wrong!", { id: "notification" })
            }
        }
    }

    return (
        <Layout title="Register - eCommerce App">
            <div className="auth-bg p-5">
                <div className="container">
                    <div className=" row">
                        <div className="col-lg-5 col-md-8 col-11 col-sm-10 mx-auto ">
                            <div className="auth-form">
                                <h1 className='text-center mb-5'>Login</h1>
                                <form onSubmit={loginUser}>
                                    <div>
                                        <input type="email" name='email' value={user.email} onChange={e => setUserValues(e)} className="form-control mb-4" placeholder="Your email" disabled={isLoading} />
                                        <input type="password" name='password' value={user.password} onChange={e => setUserValues(e)} className="form-control mb-4" placeholder="Type a password" disabled={isLoading} />

                                        <div>
                                            {isLoading ? <div className="d-flex justify-content-center m-3 text-primary">
                                                <div className="spinner-border" role="status">
                                                </div>
                                            </div> :
                                                <button type="submit" className="btn btn-outline-primary ">Login</button>
                                            }
                                        </div>

                                        <p className='mt-3'>Don't have an account? <Link to="/register">Register </Link> </p>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Login