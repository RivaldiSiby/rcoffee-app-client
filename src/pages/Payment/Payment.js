import React, { useState } from "react";

import NavbarSignIn from "../../components/NavbarSignIn/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Payment.css";

// img
import loadingImg from "../../asset/img/loading.gif";
// img

function Payment() {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      {loading === true ? (
        <div className="w-100 ">
          <img className="img-loading mx-auto" src={loadingImg} alt="loading" />
        </div>
      ) : (
        <>
          <NavbarSignIn navActive={"chart"} />
          <main className="payment-body">
            <div className="container">
              <div className="row payment-box d-flex justify-content-between">
                <div className="col-md-5 payment-order ">
                  <section className="order-head">
                    <h5>Checkout your item now!</h5>
                  </section>
                  <section class="order-body">
                    <section class="order-body-head"></section>
                    <section class="order-body-list"></section>
                    <section class="order-body-cost"></section>
                    <section class="order-body-foot"></section>
                  </section>
                </div>
                <div className="col-md-5 payment-option ">
                  <section class="option-address">
                    <section class="option-address-head d-flex justify-content-between">
                      <h5>Address details</h5>
                      <p>edit</p>
                    </section>
                    <section class="option-address-body"></section>
                  </section>
                  <section class="option-method">
                    <section class="option-method-head">
                      <h5>Payment method</h5>
                    </section>
                    <section class="option-method-body"></section>
                  </section>
                  <section class="option-foot"></section>
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

export default Payment;
