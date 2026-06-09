import React from "react";
import Hero from "../Hero/hero";
import Review from "../page/review";
import Abouts from "../page/Abouts";
import ReturnPolicy from "../page/ReturnPolicy";
import Contact from "../page/contact";
import { Routes, Route } from "react-router-dom";
import Menu from "../page/Menu";
import OnlineOrdering from "../page/onlineOrdering.jsx";
import Layout from "../components/Layout/layout";
import Login from "../page/Login.jsx" // CHECK THIS PATH
import Register from "../page/Register.jsx";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/layout" element={<Layout />} />
      <Route path="/reviewUs" element={<Review />} />
      <Route path="/returnPolicy" element={<ReturnPolicy />} />
      <Route path="/contactUs" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/online-ordering" element={<OnlineOrdering />} />
      <Route path="/aboutUs" element={<Abouts />} />
    </Routes>
  );
};

export default Router;
# Rename to a temporary name first to bypass case -insensitivity limitations
git mv src / page / login.jsx src / page / login - temp.jsx
# Rename to the final capitalized name
git mv src / page / login - temp.jsx src / page / Login.jsx
# Commit and push the changes
git commit - m "Fix case-sensitivity for Login component"
git push