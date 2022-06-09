import React, { useState, useEffect } from "react";
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
import GenerateToken from "../helper/GenerateToken";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../redux/store";

// img
// import loadingImg from "../asset/img/loading.gif";
// img

function Router() {
  const [isLogin, setisLogin] = useState(false);
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        await GenerateToken();
        setisLogin(true);
      } catch (error) {
        console.log(error);
        setisLogin(false);
        return;
      }
    };

    checkLogin();
  }, []);
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateElement isLogin={isLogin} publicPage={"public"}>
                <Home />
              </PrivateElement>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateElement
                isLogin={isLogin}
                publicPage={"private"}
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
              <PrivateElement publicPage={"public"} isLogin={isLogin}>
                <Products />
              </PrivateElement>
            }
          />
          <Route
            path="/products/:id/:size"
            element={
              <PrivateElement publicPage={"public"} isLogin={isLogin}>
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
    </ReduxProvider>
  );
}

export default Router;
