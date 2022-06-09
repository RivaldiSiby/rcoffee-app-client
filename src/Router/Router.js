import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [isLogin, setisLogin] = useState();
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const refreshToken = JSON.parse(localStorage.getItem("refreshkey"));
        // cek token

        const result = await axios.get(
          `http://localhost:8080/auth/${refreshToken}`
        );
        if (result.data.data.token !== undefined) {
          if (
            await localStorage.setItem(
              "tokenkey",
              JSON.stringify(result.data.data.token)
            )
          ) {
          }
          setisLogin(true);
          return;
        }
      } catch (error) {
        setisLogin(false);
      }
    };

    checkLogin();
  });
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
            <PrivateElement
              publicPage={"private"}
              isLogin={isLogin}
              redirectedTo="/login"
            >
              <Profile />
            </PrivateElement>
          }
        />
        <Route
          path="/chart"
          element={
            <PrivateElement
              publicPage={"private"}
              isLogin={isLogin}
              redirectedTo="/login"
            >
              <Payment />
            </PrivateElement>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateElement
              publicPage={"private"}
              isLogin={isLogin}
              redirectedTo="/login"
            >
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
        <Route
          path="/login"
          element={
            <PrivateElement isLogin={isLogin} publicPage={"sign"}>
              <Sign pageSign={"login"} />
            </PrivateElement>
          }
        />
        <Route
          path="/regis"
          element={
            <PrivateElement isLogin={isLogin} publicPage={"sign"}>
              <Sign pageSign={"regis"} />
            </PrivateElement>
          }
        />

        <Route path="/forgetPassword" element={<ForgetPass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
