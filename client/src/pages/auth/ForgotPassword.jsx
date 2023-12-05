import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';


const ForgotPassword = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        secret: "",
        newPassword: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const setUserValues = e => {
        setUser(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const recoverPassword = async e => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/forgot-password`, user, {
                signal: AbortSignal.timeout(10000) //Aborts request after 10 seconds
            })
            if (res && res.data.success) {
                navigate("/login")
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
        <Layout title="Reset Password - eCommerce App">
            <div className="auth-bg p-5">
                <div className="container">
                    <div className=" row">
                        <div className="col-lg-5 col-md-8 col-11 col-sm-10 mx-auto ">
                            <div className="auth-form">
                                <h1 className='text-center mb-5 auth-headerText'>Recover Password</h1>
                                <form onSubmit={recoverPassword}>
                                    <div>
                                        <input type="email" name='email' value={user.email} onChange={e => setUserValues(e)} className="form-control mb-4" placeholder="Your email" disabled={isLoading} required />
                                        <input type="text" name='secret' value={user.secret} onChange={e => setUserValues(e)} className="form-control mb-4"
                                            placeholder="Who is your favourite teacher?" disabled={isLoading} required />
                                        <input type="password" name='newPassword' value={user.newPassword} onChange={e => setUserValues(e)} className="form-control mb-4" placeholder="Type a new password" disabled={isLoading} required />

                                        <div>
                                            {isLoading ? <div className="d-flex justify-content-center m-3 text-primary">
                                                <div className="spinner-border" role="status">
                                                </div>
                                            </div> :
                                                <button type="submit" className="btn btn-outline-primary ">Recover Password</button>
                                            }
                                        </div>

                                        <p className='mt-3'>Don't have an account? <Link to="/register">Register </Link> </p>
                                        <p><Link to="/login">Login</Link>   </p>
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

export default ForgotPassword