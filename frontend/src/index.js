import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
    
import './index.css';
import "react-toastify/dist/ReactToastify.css";

import Navbar from './landing_page/Navbar';
import HomePage from './landing_page/home/HomePage';
import AboutPage from './landing_page/about/AboutPage';
import ProductPage from './landing_page/products/ProductPage';
import PricingPage from './landing_page/pricing/PricingPage';
import SupportPage from './landing_page/support/SupportPage';
import Footer from './landing_page/Footer';
import NotFound from './landing_page/NotFound';
import SignupPage from './landing_page/signup/SignupPage';
import Login from './landing_page/signup/Login';
import Home from './landing_page/signup/Home';
import SignUp from './landing_page/signup/SignUp';
 import PapertradePage from './landing_page/PaperTrading/PapertradePage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <CookiesProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/*<Route path="/signup" element={<SignupPage />} />*/}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/papertrade" element={<PapertradePage />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/dashboard" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </CookiesProvider>

 

 
 
);
 