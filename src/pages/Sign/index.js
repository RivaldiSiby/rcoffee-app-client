import React from "react";
import "./index.css";
// img
import bgsign from "../../asset/img/signPage//robert-bye-95vx5QVl9x4-unsplash 2.png";
import logo from "../../asset/img/signPage/coffee icon.png";
import google from "../../asset/img/signPage/google.png";
import facebook from "../../asset/img/signPage/vfb.svg";
import twiter from "../../asset/img/signPage/vtw.svg";
import instagram from "../../asset/img/signPage/vig.svg";
// img

function index(props) {
  console.log(props.pageSign);
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
                className="form-control form-input"
                placeholder="Enter your email adress"
              />
            </div>
            <div className="mb-3">
              <label className="form-label form-text">Password :</label>
              <input
                type="password"
                className="form-control form-input"
                placeholder="Enter your password"
              />
              <p className="forgetpass-text">Forgot password?</p>
            </div>
            <div className="mb-3">
              <section className="form-control form-btn-sign d-flex justify-content-center align-items-center">
                Login
              </section>
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
              <section className="form-control form-btn-login d-flex justify-content-center align-items-center">
                Sign up here
              </section>
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
                className="form-control form-input"
                placeholder="Enter your email adress"
              />
            </div>
            <div className="mb-3">
              <label className="form-label form-text">Password :</label>
              <input
                type="password"
                className="form-control form-input"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-3">
              <label className="form-label form-text">Phone Number :</label>
              <input
                type="text"
                className="form-control form-input"
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
              <section className="form-control form-btn-login d-flex justify-content-center align-items-center">
                Login Here
              </section>
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
            <img className="logo-img" src={logo} alt="iconcoffe" />
            <p className="logo-text">Coffee Shop</p>
          </div>
          <div className="header-title">
            <p className="title-text">{title}</p>
          </div>
          {formBody}
          <div className="side-info">
            <section className="info-left">
              <section className="info-left-head">
                <img className="logo-img" src={logo} alt="iconcoffe" />
                <p className="logo-text">Coffee Shop</p>
              </section>
              <section className="info-left-body">
                <p className="info-left-text">
                  Coffee Shop is a store that sells some good meals, and
                  especially coffee. We provide high quality beans
                </p>
              </section>
              <section className="info-left-icon">
                <div className="imgvektor">
                  <img className="vimg" src={facebook} alt="fb" />
                </div>
                <div className="imgvektor">
                  <img className="vimg" src={twiter} alt="tw" />
                </div>
                <div className="imgvektor">
                  <img className="vimg" src={instagram} alt="ig" />
                </div>
              </section>
              <section className="info-left-foot">
                <p className="foot-text">©2020CoffeeStore</p>
              </section>
            </section>
            <section className="info-right">
              <div className="info-right-body">
                <p className="info-right-text-head">Product</p>
                <p className="info-right-text">Download</p>
                <p className="info-right-text">Pricing</p>
                <p className="info-right-text">Locations</p>
                <p className="info-right-text">Countries</p>
                <p className="info-right-text-last">Blog</p>
              </div>
              <div className="info-right-body">
                <p className="info-right-text-head">Engage</p>
                <p className="info-right-text">Coffe Shop ?</p>
                <p className="info-right-text">About Us</p>
                <p className="info-right-text">FAQ</p>
                <p className="info-right-text">Privacy Policy</p>
                <p className="info-right-text-last">Terms of Service</p>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

export default index;
