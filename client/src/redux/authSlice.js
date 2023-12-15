import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";

const initialState = {
    user: null,
    token: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token
        },
        logout: state => {
            state.user = null
            state.token = null
        },
        updateUser: (state, action) => {
            state.user = action.payload;
        },
    }
})

export const useAuth = () => useSelector(state => state.auth)

export const { login, logout, updateUser } = authSlice.actions

export default authSlice.reducer