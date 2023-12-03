import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from "axios"

const Register = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const setUserValues = e => {
        setUser(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const registerUser = async e => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/register`, user, {
                signal: AbortSignal.timeout(10000) //Aborts request after 10 seconds
            })
            console.log(res);
            navigate("/login")
            if (res && res.data.success) {
                toast.success(res.data.message, { id: "notification" })
            }
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
                                <h1 className='text-center mb-5'>Register</h1>
                                <form onSubmit={registerUser}>
                                    <div>
                                        <input type="text" name='name' value={user.name} onChange={e => setUserValues(e)} className="form-control mb-4" placeholder="Your name" disabled={isLoading} required />
                                        <input type="email" name='email' value={user.email} onChange={e => setUserValues(e)} className="form-control mb-4" placeholder="Your email" disabled={isLoading} required />
                                        <input type="password" name='password' value={user.password} onChange={e => setUserValues(e)} className="form-control mb-4" placeholder="Type a password" disabled={isLoading} required />
                                        <input type="text" name='phone' value={user.phone} onChange={e => setUserValues(e)} className="form-control mb-4" placeholder="Your Phone Number" disabled={isLoading} required />
                                        <input type="text" name='address' value={user.address} onChange={e => setUserValues(e)} className="form-control mb-4" placeholder="Your address" disabled={isLoading} required />

                                        {isLoading ? <div className="d-flex justify-content-center m-3 text-primary">
                                            <div className="spinner-border" role="status">
                                            </div>
                                        </div> :
                                            <button type="submit" className="btn btn-outline-primary ">Register</button>
                                        }

                                        <p className='mt-3'>Already registered? <Link to="/login">Login </Link> </p>
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

export default Register