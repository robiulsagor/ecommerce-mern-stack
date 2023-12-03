import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';

const Register = () => {
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

    const registerUser = e => {
        e.preventDefault()
        console.log(user);
        setIsLoading(true)
        toast.success('Here is your toast.');
    }

    return (
        <Layout title="Register - eCommerce App">
            <div className="row auth-bg">
                <div className="col-md-4 col-11 col-sm-10 mx-auto">
                    <div className="auth-form">
                        <h1 className='text-center mb-5'>Register</h1>
                        <form onSubmit={registerUser}>
                            <div>
                                <input type="text" name='name' value={user.name} onChange={e => setUserValues(e)} className="form-control mb-3" placeholder="Your name" disabled={isLoading} />
                                <input type="email" name='email' value={user.email} onChange={e => setUserValues(e)} className="form-control mb-3" placeholder="Your email" disabled={isLoading} />
                                <input type="password" name='password' value={user.password} onChange={e => setUserValues(e)} className="form-control mb-3" placeholder="Type a password" disabled={isLoading} />
                                <input type="text" name='phone' value={user.phone} onChange={e => setUserValues(e)} className="form-control mb-3" placeholder="Your Phone Number" disabled={isLoading} />
                                <input type="text" name='address' value={user.address} onChange={e => setUserValues(e)} className="form-control mb-3" placeholder="Your address" disabled={isLoading} />

                                <div className="d-grid col-6 mx-auto">
                                    {isLoading ? <div className="d-flex justify-content-center m-3 text-primary">
                                        <div className="spinner-border" role="status">
                                        </div>
                                    </div> :
                                        <button type="submit" className="btn btn-outline-primary ">Register</button>
                                    }
                                </div>

                                <p className='mt-3'>Already registered? <Link to="/login">Login </Link> </p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Register