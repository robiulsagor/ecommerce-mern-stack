import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../redux/authSlice'
import { clearCart, decreaseQuantity, increaseQuantity, removeItem, useCart } from '../redux/cartSlice'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


const Cart = () => {
    const auth = useAuth()
    const { cart } = useCart()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getTotal = cart?.reduce((total, item) => {
        total += item.quantity * item.price
        return total
    }, 0)?.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })

    return (
        <Layout title={"Cart- Ecommerce App"}>
            <div className="container-fluid my-5 px-4">
                <div className="row">
                    <h4 className='text-center mb-2'> Hello {auth && auth?.user?.name} </h4>
                    <h6 className='text-center mb-4'>
                        {
                            cart?.length >= 1 ? `You have ${cart?.length} items in your cart. ${auth?.token ? "" : "Please login to checkout."}` : "Your cart is empty"
                        }
                    </h6>

                    {cart?.length >= 1 && (
                        <>
                            <div className="col-md-7 mb-5   ">
                                {cart?.map((c, i) => (
                                    <div className="row border flex-row mb-2 py-4" key={i}>
                                        <div className="col-sm-4 col-md-4">
                                            <img src={`${c.photoUrl}`} alt="product img" style={{ width: '180px' }} />
                                        </div>
                                        <div className="col-sm-8 col-md-6 " >
                                            <p> {c.name} </p>
                                            <p> {c.description} </p>
                                            <p> ${c.price} </p>
                                            <div className='mb-2'>
                                                <span className="border  me-2 btn btn-secondary-outline"
                                                    onClick={() => { dispatch(increaseQuantity(c)) }}>+</span>
                                                {c.quantity}
                                                <span className="border  ms-2 btn btn-secondary-outline"
                                                    onClick={() => { dispatch(decreaseQuantity(c)) }}>-</span>

                                                <span className='ms-4'>Total: ${c.price * c.quantity} </span>
                                            </div>

                                            <button className="btn btn-danger" onClick={() => { dispatch(removeItem(c)); toast.success("Product removed from cart!") }}>Remove</button>
                                        </div>

                                    </div>
                                ))}
                                {cart?.length >= 1 && <div className=' text-center'>
                                    <button className='btn btn-danger mt-3 w-50'
                                        onClick={() => { dispatch(clearCart()); toast.success("Cart has been cleared!") }}>CLEAR CART</button>
                                </div>
                                }

                            </div>
                            <div className="col-md-4 text-center">
                                <h2>Cart Summary</h2>
                                <hr />
                                <h4>Total: {getTotal} </h4>
                                {auth?.token ? (<>

                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address} </h5>
                                    <button className="btn btn-warning mt-2" onClick={() => navigate("/user/dashboard")}>Update Address</button>
                                </>) : (<>
                                    <button className="btn btn-warning mt-2" onClick={() => { navigate("/login", { state: "/cart" }) }}>Login to Checkout</button>
                                </>)

                                }
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default Cart