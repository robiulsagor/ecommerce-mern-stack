import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import cartReducer from "./cartSlice";

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
    // reducer: {
    //     auth: authReducer
    // }
    reducer: {
        auth: persistedReducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export const persistor = persistStore(store)