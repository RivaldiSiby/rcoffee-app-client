import React from "react";
import Home from "../pages/Home";
import Profile from "../pages/Profile/Profile";
import Products from "../pages/Products";
import Sign from "../pages/Sign/Sign";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payment from "../pages/Payment/Payment";
import History from "../pages/History/History";
import ForgetPass from "../pages/Forget-pass/FotgetPass";
import ProductDetails from "../pages/ProductDetails/ProductDetails";

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
        <Route path="/history" element={<History />} />
        <Route path="/forgetPassword" element={<ForgetPass />} />
        <Route path="/products/:id/:size" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default index;
