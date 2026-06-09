import React from "react";
import Hero from "../Hero/hero";
import Review from "../page/review";
import Abouts from "../page/Abouts";
import ReturnPolicy from "../page/ReturnPolicy";
import Contact from "../page/contact";
import { Routes, Route } from "react-router-dom";
import Menu from "../page/Menu";
import OnlineOrdering from "../page/onlineOrdering.jsx"
import Layout from "../components/Layout/layout"
import Login from "../page/Login.jsx"
import Register from "../page/Register.jsx";
import CateringService from "../page/onlineOrdering.jsx";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/layout" elemet={<Layout />} />
      <Route path="/reviewUs" element={<Review />} />
      <Route path="/returnPolicy" element={<ReturnPolicy />} />
      <Route path="/contactUs" element={<Contact />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/OnlineOrdering" element={<OnlineOrdering/>} />
      <Route path="/CateringService" element={<CateringService />} />
      <Route path="/aboutUs" element={<Abouts />} />
    </Routes>
  );
};

export default Router;
