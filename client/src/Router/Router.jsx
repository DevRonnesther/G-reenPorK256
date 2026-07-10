import React from "react";
import Hero from "../Hero/hero";
import Review from "../page/review";
import Abouts from "../page/Abouts";
import ReturnPolicy from "../page/ReturnPolicy";
import Contact from "../page/contact";
import { Routes, Route } from "react-router-dom";
import Menu from "../page/Products.jsx";
import OnlineOrdering from "../page/onlineOrdering.jsx";
import Layout from "../components/Layout/layout";
// import Login from "../page/Login.jsx" // CHECK THIS PATH
import Register from "../page/Register.jsx";
import Products from "../page/Products.jsx";
import CartItems from "../components/cart/CartItems.jsx"; // CHECK THIS PATH

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/layout" element={<Layout />} />
      <Route path="/reviewUs" element={<Review />} />
      <Route path="/cartitems" element={<CartItems />} />
      <Route path="/returnPolicy" element={<ReturnPolicy />} />
      <Route path="/contactUs" element={<Contact />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/online-ordering" element={<OnlineOrdering />} />
      <Route path="/aboutUs" element={<Abouts />} />
    </Routes>
  );
};

export default Router;