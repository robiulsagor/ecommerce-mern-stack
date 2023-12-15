import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { useDispatch, useSelector } from "react-redux"
import UserMenu from '../../components/UserMenu'
import { login, updateUser, useAuth } from '../../redux/authSlice'
import axios from 'axios'
import toast from 'react-hot-toast'

const Dashboard = () => {
    const { user } = useAuth()
    console.log(user);
    const dispatch = useDispatch()

    const [auth, setUserAuth] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    })
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)

    useEffect(() => {
        const { name, email, phone, address } = user
        console.log(name);
        setName(name)
        setEmail(email)
        setPhone(phone)
        setAddress(address)
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const { data } = await axios.put('/api/auth/update-profile',
                { name, email, phone, address, password }, {
                signal: AbortSignal.timeout(6000) //Aborts request after 6 seconds
            })

            if (data && data.success) {
                toast.success(data.message, { id: "notification" })
                dispatch(updateUser(data?.updated))
            } else {
                // something went wrong
                toast.error(res.data.message)
                setIsError("Error")
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
            setIsError("Error")
            if (error && error.message) {
                toast.error(`Error: ${error.message}`, { id: "notification" })
            } else {
                toast.error("Something went wrong!", { id: "notification" })
            }
        }
    }

    return (
        <Layout title={"Dashboard - eCommerce App"}>
            <div className="container-fluid">
                <div className="row  px-2 py-5 mx-auto">
                    <div className="col-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-5">
                        <div className="card p-3">
                            <h2 className=''>Profile</h2>

                            <form onSubmit={handleSubmit}>
                                <div>
                                    {/* if error happens, show the error */}
                                    {isError && <h4 className='text-danger text-center'>{isError} <br /> Please try again later <br /> Please refresh first</h4>}

                                    <input type="text" name='name' value={name} onChange={e => setName(e.target.value)} className="form-control mb-4" placeholder="Your name" disabled={isLoading} required />
                                    <input type="email" name='email' value={email} onChange={e => setUserValues(e)} className="form-control mb-4" placeholder="Your email" disabled />
                                    <input type="password" name='password' value={password} onChange={e => setPassword(e.target.value)} className="form-control mb-4" placeholder="Type a password" disabled={isLoading} />
                                    <input type="text" name='phone' value={phone} onChange={e => setPhone(e.target.value)} className="form-control mb-4" placeholder="Your Phone Number" disabled={isLoading} required />
                                    <input type="text" name='address' value={address} onChange={e => setAddress(e.target.value)} className="form-control mb-4" placeholder="Your address" disabled={isLoading} required />

                                    {isLoading ? <div className="d-flex justify-content-center m-3 text-primary">
                                        <div className="spinner-border" role="status">
                                        </div>
                                    </div> :
                                        <button type="submit" className="btn btn-outline-primary d-block mx-auto" disabled={isLoading} >UPDATE PROFILE</button>
                                    }

                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard