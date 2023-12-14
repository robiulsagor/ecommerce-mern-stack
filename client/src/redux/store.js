import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import cartReducer from "./cartSlice";

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export const persistor = persistStore(store)