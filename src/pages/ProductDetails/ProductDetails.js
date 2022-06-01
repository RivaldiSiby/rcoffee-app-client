import React, { useState, useEffect } from "react";
import "./ProductDetails.css";
import axios from "axios";

import Navbar from "../../components/Navbar/Navbar";
import NavbarSignIn from "../../components/NavbarSignIn/Navbar";
import Footer from "../../components/Footer/Footer";

// img
import loadingImg from "../../asset/img/loading.gif";
import iconMsg from "../../asset/img/productsDetailPage/iconMsg.png";
import iconCek from "../../asset/img/productsDetailPage/iconCek.svg";
// img

function ProductDetails() {
  const [isLogin, setisLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        setLoading(true);
        const haveToken =
          localStorage.getItem("tokenkey") !== undefined
            ? JSON.parse(localStorage.getItem("tokenkey"))
            : null;
        if (haveToken !== null) {
          const refreshToken = JSON.parse(localStorage.getItem("refreshkey"));
          // cek token

          const result = await axios.get(
            `http://localhost:8080/auth/${refreshToken}`,
            {
              headers: {
                Authorization: `Bearer ${haveToken}`,
              },
            }
          );
          if (result.data !== undefined) {
            setisLogin(true);
          }

          if (result.data.message === "token generate" && isLogin === true) {
            await localStorage.setItem(
              "tokenkey",
              JSON.stringify(result.data.data.accessToken)
            );
          }
          return;
        }

        setLoading(false);
      } catch (error) {
        console.log(error);

        setLoading(false);
      }
    };
    checkLogin();
  }, []);
  return (
    <div>
      {loading === true ? (
        <>
          <div className="w-100 ">
            <img
              className="img-loading mx-auto"
              src={loadingImg}
              alt="loading"
            />
          </div>
        </>
      ) : (
        <>
          {isLogin === true ? (
            <NavbarSignIn navActive={"products"} />
          ) : (
            <Navbar navActive={"products"} />
          )}
          <main className="product-details-body">
            <div className="container">
              <div className="row product-details-box ">
                <div className="col-md product-detail-left">
                  <section className="product-detail-left-head">
                    <p>
                      Favorite & Promo <span>{"> Cold Brew"}</span>
                    </p>
                  </section>
                  <section className="product-detail-left-body d-flex justify-content-end">
                    <section className="d-flex justify-content-center align-items-center">
                      <img src={iconMsg} alt="iconMsg" />
                    </section>
                  </section>
                  <section className="product-detail-left-foot">
                    <p>
                      Delivery only on <b>Monday to friday</b> at{" "}
                      <b>1 - 7 pm</b>
                    </p>
                  </section>
                </div>
                <div className="col-md product-detail-right">
                  <section className="product-detail-right-head">
                    <section className="step-order-product d-flex align-items-center row">
                      <section className="step-icon col-1">
                        <img src={iconCek} alt="iconCek" />
                      </section>
                      <section className="step-line col-3"></section>
                      <section className="step-icon col-1">
                        <img src={iconCek} alt="iconCek" />
                      </section>
                      <section className="step-line col-3"></section>
                      <section className="step-icon col-1"></section>
                    </section>
                    <section className="step-order-product-text d-flex row">
                      <p className="col-2">Order</p>
                      <p className="col-2">Checkout</p>
                      <p className="col-2 fw-bold">Payment</p>
                    </section>
                  </section>
                  <section className="product-detail-right-body">
                    <h4>COLD BREW</h4>
                    <h5>IDR 30.000</h5>
                    <p>
                      Cold brewing is a method of brewing that combines ground
                      coffee and cool water and uses time instead of heat to
                      extract the flavor. It is brewed in small batches and
                      steeped for as long as 48 hours.
                    </p>
                  </section>
                  <section className="product-detail-right-foot">
                    <form>
                      <select
                        className="form-select input-form-detail"
                        aria-label="Default select example"
                      >
                        <option selected>Select Size</option>
                        <option value="small">Small</option>
                        <option value="large">Large</option>
                      </select>
                      <select
                        className="form-select input-form-detail"
                        aria-label="Default select example"
                      >
                        <option selected>Select Delivery Methods</option>
                        <option value="dine in">Dine in</option>
                        <option value="Door Delivery">Door Delivery</option>
                        <option value="Pick up">Pick up</option>
                      </select>
                      <div className="row ">
                        <div className="col-md-4">
                          <section className="input-number-quantity d-flex justify-content-between align-items-center">
                            <h5 className="btn-plus-quantity"> + </h5>
                            <h5 className="quantity-value fw-bold text-dark">
                              2
                            </h5>
                            <h5 className="btn-min-quantity"> - </h5>
                          </section>
                        </div>
                        <div className="col-md-8">
                          <button className="btn-product-detail-cart">
                            Add to Cart
                          </button>
                        </div>
                        <div className="col-md-12">
                          <button className="btn-product-detail-checkout">
                            Checkout
                          </button>
                        </div>
                      </div>
                    </form>
                  </section>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default ProductDetails;
