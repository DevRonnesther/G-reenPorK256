import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GreenSplash from "../page/greensplash.jsx";
import Hero from "../Hero/hero";
import Review from "../page/review";
import Abouts from "../page/Abouts";
import ReturnPolicy from "../page/ReturnPolicy";
import Contact from "../page/contact";
import Layout from "../components/Layout/layout";
import Login from "../page/Login.jsx";
import Register from "../page/Register.jsx";
import Products from "../page/Products.jsx";
import CartItems from "../components/cart/CartItems.jsx";

const FullScreenAuth = ({ children }) => (
  <div className="fixed inset-0 z-50 flex h-[100dvh] w-full items-center justify-center overflow-y-auto border-0 bg-[#FFFFFF] text-[#111111] selection:bg-[#D9FF00] selection:text-[#111111]">
    {children}
  </div>
);

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<GreenSplash />} />
      <Route
        path="/login"
        element={
          <FullScreenAuth>
            <Login />
          </FullScreenAuth>
        }
      />
      <Route
        path="/register"
        element={
          <FullScreenAuth>
            <Register />
          </FullScreenAuth>
        }
      />

      <Route path="/home" element={<Hero />} />
      <Route path="/layout" element={<Layout />} />
      <Route path="/reviewUs" element={<Review />} />
      <Route path="/cart" element={<CartItems />} />
      <Route path="/returnPolicy" element={<ReturnPolicy />} />
      <Route path="/contactUs" element={<Contact />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/aboutUs" element={<Abouts />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Router;