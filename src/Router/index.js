import React from "react";
import Home from "../pages/Home";
import Profile from "../pages/Profile/Index";
import Products from "../pages/Products";
import Sign from "../pages/Sign/Sign";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payment from "../pages/Payment/Payment";

function index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Sign pageSign={"login"} />} />
        <Route path="/regis" element={<Sign pageSign={"regis"} />} />
        <Route path="/chart" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default index;
