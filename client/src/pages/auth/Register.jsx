import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from "axios"

const Register = () => {
    const navigate = useNavigate()
    const [allSecrets, setAllSecrets] = useState([])
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        question: "",
        secret: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [isError, setIsError] = useState(null)

    const setUserValues = e => {
        setUser(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    // load all secret questions    
    useEffect(() => {
        const loadSecrets = async () => {
            setFetching(true)
            try {
                const res = await axios.get("/api/admin/view-secrets", {
                    signal: AbortSignal.timeout(1000) //Aborts request after 10 seconds
                })
                if (res && res.data.secrets.length > 0) {
                    console.log("test");
                    setAllSecrets(res.data.secrets)
                    setIsError(null)
                } else if (res && res.data.secrets == 0) {
                    // setIsError("No secret questions found!")
                    toast.error("No secret questions found!")
                } else {
                    toast.error("Network Error!")
                }

                setFetching(false)
            } catch (error) {
                console.log(error);
                setIsError("Network error")
                toast.error("Network Error!")
                setFetching(false)
            }
        }

        loadSecrets()
    }, [])

    const registerUser = async e => {
        e.preventDefault()

        console.log(user);

        if (!user.question) {
            toast.error("All fields required, Including secret question!")
            return
        }
        try {
            setIsLoading(true)
            const res = await axios.post('api/auth/register', user, {
                signal: AbortSignal.timeout(6000) //Aborts request after 6 seconds
            })

            if (res && res.data.success) {
                // successfully registered
                navigate("/login")
                toast.success(res.data.message, { id: "notification" })
            } else {
                // something went wrong
                setIsLoading(false)
                toast.error(res.data.message)
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
                                <h1 className='text-center mb-5 auth-headerText'>Register</h1>
                                {fetching ? <>
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div></> : <>


                                    <form onSubmit={registerUser}>
                                        <div>
                                            {/* if error happens, show the error */}
                                            {isError && <h4 className='text-danger text-center'>{isError} <br /> Please try again later <br /> Please refresh first</h4>}

                                            <input type="text" name='name' value={user.name} onChange={e => setUserValues(e)} className="form-control mb-4" placeholder="Your name" disabled={isLoading || isError} required />
                                            <input type="email" name='email' value={user.email} onChange={e => setUserValues(e)} className="form-control mb-4" placeholder="Your email" disabled={isLoading || isError} required />
                                            <input type="password" name='password' value={user.password} onChange={e => setUserValues(e)} className="form-control mb-4" placeholder="Type a password" disabled={isLoading || isError} required />
                                            <input type="text" name='phone' value={user.phone} onChange={e => setUserValues(e)} className="form-control mb-4" placeholder="Your Phone Number" disabled={isLoading || isError} required />
                                            <input type="text" name='address' value={user.address} onChange={e => setUserValues(e)} className="form-control mb-4" placeholder="Your address" disabled={isLoading || isError} required />


                                            <select name="question" className='mb-4' defaultValue="none" onChange={e => setUserValues(e)}>
                                                <option value="none" disabled >Select a secret question</option>
                                                {allSecrets.map(sec => {
                                                    return <option key={sec._id} value={sec._id}>{sec.name}</option>
                                                })}
                                            </select>

                                            <input type="text" name='secret' value={user.secret} onChange={e => setUserValues(e)} className="form-control mb-4" placeholder="Answer of the question" disabled={isLoading || isError} title='Security Question' />

                                            {isLoading ? <div className="d-flex justify-content-center m-3 text-primary">
                                                <div className="spinner-border" role="status">
                                                </div>
                                            </div> :
                                                <button type="submit" className="btn btn-outline-primary" disabled={isLoading || isError} >Register</button>
                                            }

                                            <p className='mt-3'>Already registered? <Link to="/login">Login </Link> </p>
                                        </div>

                                    </form>
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Register