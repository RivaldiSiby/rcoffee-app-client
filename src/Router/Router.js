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
import PrivateElement from "../components/PrivateElement/PrivateElement";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateElement publicPage={"public"}>
              <Home />
            </PrivateElement>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateElement publicPage={"private"} redirectedTo="/login">
              <Profile />
            </PrivateElement>
          }
        />
        <Route
          path="/chart"
          element={
            <PrivateElement publicPage={"private"} redirectedTo="/login">
              <Payment />
            </PrivateElement>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateElement publicPage={"private"} redirectedTo="/login">
              <History />
            </PrivateElement>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateElement publicPage={"public"}>
              <Products />
            </PrivateElement>
          }
        />
        <Route
          path="/products/:id/:size"
          element={
            <PrivateElement publicPage={"public"}>
              <ProductDetails />
            </PrivateElement>
          }
        />
        <Route path="/login" element={<Sign pageSign={"login"} />} />
        <Route path="/regis" element={<Sign pageSign={"regis"} />} />
        <Route path="/forgetPassword" element={<ForgetPass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
