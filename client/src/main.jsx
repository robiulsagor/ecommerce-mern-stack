import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import bootstrap from 'bootstrap'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
// import Popper from '@popperjs/core';
import { createPopper } from '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import Register from './pages/auth/Register.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx'
import Privacy from './pages/Privacy.jsx'
import Login from './pages/auth/Login.jsx';
import Dashboard from './pages/user/Dashboard.jsx';
import { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux"
import { store, persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import SecretQuestions from './pages/admin/secretQuestions.jsx';
import AdminProtected from './components/AdminProtected.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import Orders from './pages/user/Orders.jsx';
import CreateCategory from './pages/admin/CreateCategory.jsx';
import CreateProduct from './pages/admin/CreateProduct.jsx';
import Users from './pages/admin/Users.jsx';
import Products from './pages/admin/Products.jsx';
import UpdateProduct from './pages/admin/UpdateProduct.jsx';
import { SearchContext, SearchProvider } from './context/searchContext.jsx';
import SearchPage from './pages/SearchPage.jsx';
import ProductDetails from './pages/ProductDetails.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <SearchProvider >
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Toaster position='top-right' />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:slug' element={<ProductDetails />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/privacy' element={<Privacy />} />

            {/* for logged users only */}
            <Route path='/user' element={<ProtectedRoute />} >
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='orders' element={<Orders />} />
            </Route>

            {/* for admins only */}
            <Route path='/admin' element={<AdminProtected />} >
              <Route path='dashboard' element={<AdminDashboard />} />
              <Route path='create-category' element={<CreateCategory />} />
              <Route path='create-product' element={<CreateProduct />} />
              <Route path='products' element={<Products />} />
              <Route path='product/:id' element={<UpdateProduct />} />
              <Route path='users' element={<Users />} />
              <Route path='secret' element={<SecretQuestions />} />
            </Route>

            {/* for no match */}
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </PersistGate >
    </SearchProvider >
  </Provider>
)
