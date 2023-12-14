import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

const initialState = {
    cart: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            // const findItem = state.cart.filter(p => p._id === action.payload._id)

            // if (findItem.length > 0) {
            //     state.cart.push({ ...action.payload, quantity: 1 });
            // } else {
            state.cart.push({ ...action.payload, quantity: 1 });
            // }

        },
        removeItem: (state, action) => {
            let allItems = state.cart
            let removed = action.payload

            state.cart = [...state.cart]
        }
    }
})

export const useCart = () => useSelector(state => state.cart)

export const { addItem, removeItem } = cartSlice.actions

export default cartSlice.reducer