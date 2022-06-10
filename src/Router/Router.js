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
import { Provider as ReduxProvider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

// img
// img

function Router() {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
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
            <Route
              path="/login"
              element={
                <PrivateElement publicPage={"sign"}>
                  <Sign pageSign={"login"} />
                </PrivateElement>
              }
            />
            <Route
              path="/regis"
              element={
                <PrivateElement publicPage={"sign"}>
                  <Sign pageSign={"regis"} />
                </PrivateElement>
              }
            />

            <Route path="/forgetPassword" element={<ForgetPass />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </ReduxProvider>
  );
}

export default Router;
