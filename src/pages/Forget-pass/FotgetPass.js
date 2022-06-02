import React, { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";

// img
import bgsign from "../../asset/img/signPage//robert-bye-95vx5QVl9x4-unsplash 2.png";
import logo from "../../asset/img/signPage/coffee icon.png";
import facebook from "../../asset/img/signPage/vfb.svg";
import twiter from "../../asset/img/signPage/vtw.svg";
import instagram from "../../asset/img/signPage/vig.svg";

// img

function ForgetPass() {
  // login
  const [Email, setEmail] = useState("");

  return (
    <div>
      <main>
        <aside className="aside-img">
          <img className="imgside" src={bgsign} alt="bg" />
        </aside>
        <section className="main-section-fw">
          <div className="header-logo-fw ">
            <img className="logo-img-sign-fw" src={logo} alt="iconcoffe" />
            <p className="logo-text-sign">Coffee Shop</p>
          </div>
          <div className="form-body">
            <div className="container">
              <form className="form-main">
                <h5 className="title-form-forget">Forgot your password?</h5>
                <p className="text-form-forget">
                  Don’t worry, we got your back!
                </p>
                <div className="mb-3 fp-input-form">
                  <input
                    type="text"
                    id="email"
                    value={Email}
                    className="form-control form-input-sign-fp "
                    placeholder="Enter your email adress to get link"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <button className="form-control form-btn-sign d-flex justify-content-center align-items-center">
                    Send
                  </button>
                </div>
                <section className="notif-forgot-pass">
                  <p>Click here if you didn’t receive any link in 2 minutes</p>
                  <p className="fw-bold">01:52</p>
                </section>
                <div className="mb-3">
                  <Link
                    to="/regis"
                    className="form-control form-btn-login d-flex justify-content-center align-items-center"
                  >
                    Resend Link
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="side-info">
            <section className="info-left-sign">
              <section className="info-left-sign-head">
                <img className="logo-img-sign" src={logo} alt="iconcoffe" />
                <p className="logo-text-sign">Coffee Shop</p>
              </section>
              <section className="info-left-sign-body">
                <p className="info-left-sign-text">
                  Coffee Shop is a store that sells some good meals, and
                  especially coffee. We provide high quality beans
                </p>
              </section>
              <section className="info-left-sign-icon">
                <div className="imgvektor-sign">
                  <img className="vimg-sign" src={facebook} alt="fb" />
                </div>
                <div className="imgvektor-sign">
                  <img className="vimg-sign" src={twiter} alt="tw" />
                </div>
                <div className="imgvektor-sign">
                  <img className="vimg-sign" src={instagram} alt="ig" />
                </div>
              </section>
              <section className="info-left-sign-foot">
                <p className="foot-text">©2020CoffeeStore</p>
              </section>
            </section>
            <section className="info-right-sign">
              <div className="info-right-sign-body">
                <p className="info-right-sign-text-head">Product</p>
                <p className="info-right-sign-text">Download</p>
                <p className="info-right-sign-text">Pricing</p>
                <p className="info-right-sign-text">Locations</p>
                <p className="info-right-sign-text">Countries</p>
                <p className="info-right-sign-text-last">Blog</p>
              </div>
              <div className="info-right-sign-body">
                <p className="info-right-sign-text-head">Engage</p>
                <p className="info-right-sign-text">Coffe Shop ? </p>
                <p className="info-right-sign-text">About Us</p>
                <p className="info-right-sign-text">FAQ</p>
                <p className="info-right-sign-text">Privacy Policy</p>
                <p className="info-right-sign-text-last">Terms of Service</p>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ForgetPass;
