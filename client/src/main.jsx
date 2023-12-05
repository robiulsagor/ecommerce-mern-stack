import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import bootstrap from 'bootstrap'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
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


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Toaster position='top-right' />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/privacy' element={<Privacy />} />

          {/* for logged users only */}
          <Route path='/dashboard' element={<ProtectedRoute />} >
            <Route path='' element={<Dashboard />} />
          </Route>

          {/* for admins only */}
          <Route path='/admin' element={<AdminProtected />} >
            {/* <Route path='' element={<Dashboard />} /> */}
            <Route path='secret' element={<SecretQuestions />} />
          </Route>

          {/* for no match */}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </PersistGate >
  </Provider>
)
