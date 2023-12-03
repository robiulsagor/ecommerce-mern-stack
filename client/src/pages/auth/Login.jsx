import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Link } from 'react-router-dom'

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const setUserValues = e => {
        setUser(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const registerUser = e => {
        e.preventDefault()
        console.log(user);
        setIsLoading(true)
    }

    return (
        <Layout title="Register - eCommerce App">
            <div className="row auth-bg">
                <div className="col-md-4 col-11 col-sm-10 mx-auto">
                    <div className="auth-form">
                        <h1 className='text-center mb-5'>Login</h1>
                        <form onSubmit={registerUser}>
                            <div>
                                <input type="email" name='email' value={user.email} onChange={e => setUserValues(e)} className="form-control mb-3" placeholder="Your email" disabled={isLoading} />
                                <input type="password" name='password' value={user.password} onChange={e => setUserValues(e)} className="form-control mb-3" placeholder="Type a password" disabled={isLoading} />

                                <div className="d-grid col-6 mx-auto">
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
        </Layout>
    )
}

export default Login