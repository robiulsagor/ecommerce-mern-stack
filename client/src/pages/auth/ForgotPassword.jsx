import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';


const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [secretQuestion, setSecretQuestion] = useState("")
    const [secret, setSecret] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [part, setPart] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    // part one- check user with email and fetch secret question and set it.
    const checkUser = async e => {
        setIsLoading(true)
        try {
            const user = await axios.get(`/api/auth/find-user?email=${email}`)
            if (user?.data?.success) {
                toast.success("User found")
                setSecretQuestion(user.data.question.name)
                setPart(2)
            } else {
                toast.success("No User found!")
            }
            setIsLoading(false)
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong!")
            setIsLoading(false)
        }
    }

    // part two- check secret answer and go to part three if correct
    const checkSecret = async e => {
        setIsLoading(true)
        try {
            const user = await axios.get(`/api/auth/check-secret?email=${email}&secret=${secret}`)
            if (user?.data?.success) {
                toast.success("Answer matched!")
                setPart(3)
            }
            setIsLoading(false)
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong!")
            setIsLoading(false)
        }
    }

    // last part (3) - change password
    const changePassword = async e => {
        setIsLoading(true)
        try {
            const user = await axios.put(`/api/auth/change-password`, { email, newPassword })
            if (user?.data?.success) {
                toast.success("Password Changed!")
                navigate("/login")
            }
            setIsLoading(false)
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong!")
            setIsLoading(false)
        }
    }

    // if user press enter button instead of clicking button
    const handleSubmit = e => {
        e.preventDefault();
        part == 1 ? checkUser() : part == 2 ? checkSecret() : part == 3 && changePassword()
    }
    const emailRef = useRef(null)
    const secretRef = useRef(null)
    const passwordRef = useRef(null)

    useEffect(() => {
        part == 1 && emailRef.current.focus()
        part == 2 && secretRef.current.focus()
        part == 3 && passwordRef.current.focus()
    }, [isLoading, part])

    return (
        <Layout title="Reset Password - eCommerce App">
            <div className="auth-bg p-5">
                <div className="container">
                    <div className=" row">
                        <div className="col-lg-5 col-md-8 col-11 col-sm-10 mx-auto ">
                            <div className="auth-form">
                                <h1 className='text-center mb-5 auth-headerText'>Recover Password</h1>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        {/* common label  */}
                                        <label htmlFor={part == 1 ? 'email' : part == 2 ? 'secret' : 'password'} className="form-label mb-2">
                                            {part == 1 ? "Enter your email:" : part == 2 ? `${secretQuestion}?` : part == 3 && "Enter New password:"}
                                        </label>

                                        {/* email check */}
                                        {part === 1 && <>
                                            <input type="email" id='email' name='email' value={email} ref={emailRef}
                                                onChange={e => setEmail(e.target.value)} className="form-control mb-4" placeholder="Your email here" disabled={isLoading} required />
                                        </>
                                        }

                                        {/* secret answer check */}
                                        {part === 2 && <>
                                            <input type="text" id='secret' name='secret' value={secret} ref={secretRef}
                                                onChange={e => setSecret(e.target.value)} className="form-control mb-4"
                                                placeholder="Enter Secret answer here" disabled={isLoading} required />
                                        </>
                                        }

                                        {/* change password part */}
                                        {part === 3 &&
                                            <input type="password" id='password' name='newPassword' ref={passwordRef}
                                                value={newPassword} onChange={e => setNewPassword(e.target.value)} className="form-control mb-4" placeholder="Type a new password" disabled={isLoading} required />
                                        }

                                        {/* common button for submitting data */}
                                        <button type="button" className="btn btn-outline-primary"
                                            onClick={part == 1 ? checkUser : part == 2 ? checkSecret : part == 3 && changePassword}
                                            disabled={isLoading} >
                                            {isLoading ?
                                                <div className="spinner-border" role="status">
                                                </div> :
                                                part == 3 ? "Change Password" : "Next →"
                                            }
                                        </button>

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