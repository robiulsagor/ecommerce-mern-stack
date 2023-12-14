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
            const newItem = action.payload;

            const existingItem = state.cart.find((item) => item._id === newItem._id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ ...newItem, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            const removedItemId = action.payload._id;
            const newItems = state.cart.filter((item) => item._id !== removedItemId);
            state.cart = newItems;
        },
        increaseQuantity: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cart.find((item) => item._id === newItem._id);
            if (existingItem && existingItem.quantity < 9) {
                existingItem.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cart.find((item) => item._id === newItem._id);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            }
        },
        clearCart: state => {
            state.cart = []
        }
    }
})

export const useCart = () => useSelector(state => state.cart)

export const { addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer