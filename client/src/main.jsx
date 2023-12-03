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


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/privacy' element={<Privacy />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
)
