import React, { useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// img
import bgsign from "../../asset/img/signPage//robert-bye-95vx5QVl9x4-unsplash 2.png";
import logo from "../../asset/img/signPage/coffee icon.png";
import google from "../../asset/img/signPage/google.png";
import facebook from "../../asset/img/signPage/vfb.svg";
import twiter from "../../asset/img/signPage/vtw.svg";
import instagram from "../../asset/img/signPage/vig.svg";

// img

function Sign(props) {
  // login
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const loginHandler = async (e) => {
    const input_email = document.getElementById("email");
    const input_pass = document.getElementById("pass");
    try {
      e.preventDefault();
      const result = await axios.post("http://localhost:8080/auth", {
        email: Email,
        password: Pass,
      });
      localStorage.setItem("tokenkey", JSON.stringify(result.data.data.token));
      localStorage.setItem(
        "refreshkey",
        JSON.stringify(result.data.data.refreshToken)
      );
      navigate("/");
    } catch (error) {
      input_email.classList.add("border-danger");
      input_pass.classList.add("border-danger");
      setMsg("Failed Login. " + error.response.data.message);
    }
  };
  // login

  const title = props.pageSign === "login" ? "Login" : "Sign Up";
  const formBody =
    props.pageSign === "login" ? (
      <div className="form-body">
        <div className="container">
          <form className="form-main">
            <div className="mb-3">
              <label className="form-label form-text">Email Address :</label>
              <input
                type="text"
                id="email"
                className="form-control form-input-sign"
                placeholder="Enter your email adress"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label form-text">Password :</label>
              <input
                type="password"
                id="pass"
                className="form-control form-input-sign "
                placeholder="Enter your password"
                onChange={(e) => setPass(e.target.value)}
              />
              <p className="forgetpass-text">Forgot password?</p>
            </div>
            <p className="fw-bold text-danger text-center">{msg}</p>
            <div className="mb-3">
              <button
                onClick={loginHandler}
                className="form-control form-btn-sign d-flex justify-content-center align-items-center"
              >
                Login
              </button>
            </div>
            <div className="mb-3">
              <button className="form-control form-btn-google">
                <img className="img-google" src={google} alt="google" />
                Login with Google
              </button>
            </div>
            <section className="has-account">
              <div className="underline"></div>
              <p className="has-account-text">Don’t have an account?</p>
              <div className="underline"></div>
            </section>
            <div className="mb-3">
              <Link
                to="/regis"
                className="form-control form-btn-login d-flex justify-content-center align-items-center"
              >
                Sign up here
              </Link>
            </div>
          </form>
        </div>
      </div>
    ) : (
      <div className="form-body">
        <div className="container">
          <form className="form-main">
            <div className="mb-3">
              <label className="form-label form-text">Email Address :</label>
              <input
                type="text"
                className="form-control form-input-sign"
                placeholder="Enter your email adress"
              />
            </div>
            <div className="mb-3">
              <label className="form-label form-text">Password :</label>
              <input
                type="password"
                className="form-control form-input-sign"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-3">
              <label className="form-label form-text">Phone Number :</label>
              <input
                type="text"
                className="form-control form-input-sign"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="mb-3">
              <button type="button" className="form-control form-btn-sign">
                Sign Up
              </button>
            </div>
            <div className="mb-3">
              <button type="button" className="form-control form-btn-google">
                <img className="img-google" src={google} alt="google" />
                Sign up with Google
              </button>
            </div>
            <section className="has-account">
              <div className="underline"></div>
              <p className="has-account-text">Already have an account?</p>
              <div className="underline"></div>
            </section>
            <div className="mb-3">
              <Link
                to="/login"
                className="form-control form-btn-login d-flex justify-content-center align-items-center"
              >
                Login Here
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  return (
    <div>
      <main>
        <aside className="aside-img">
          <img className="imgside" src={bgsign} alt="bg" />
        </aside>
        <section className="main-section">
          <div className="header-logo">
            <img className="logo-img-sign" src={logo} alt="iconcoffe" />
            <p className="logo-text-sign">Coffee Shop</p>
          </div>
          <div className="header-title">
            <p className="title-text">{title}</p>
          </div>
          {formBody}
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

export default Sign;
