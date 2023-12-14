import React from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../redux/authSlice'
import { clearCart, decreaseQuantity, increaseQuantity, removeItem, useCart } from '../redux/cartSlice'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'


const Cart = () => {
    const auth = useAuth()
    const { cart } = useCart()
    console.log(cart);
    const dispatch = useDispatch()

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

                    <div className="col-7">
                        {cart?.length >= 1 && cart?.map((c, i) => (
                            <div className="row border flex-row mb-2 py-4" key={i}>
                                <div className="col-4">
                                    <img src={`${c.photoUrl}`} alt="img" style={{ width: '180px' }} />
                                </div>
                                <div className="col-6 " >
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
                    <div className="col-4">Cart</div>
                </div>
            </div>
        </Layout>
    )
}

export default Cart