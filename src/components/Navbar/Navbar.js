import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../asset/img/homePage/coffee icon.png";

function Navbar(props) {
  const activeHome =
    props.navActive === "home" ? "nav-text text-active-nav" : "nav-text";
  const activeProducts =
    props.navActive === "products" ? "nav-text text-active-nav" : "nav-text";
  const activeChart =
    props.navActive === "chart" ? "nav-text text-active-nav" : "nav-text";
  const activeHistory =
    props.navActive === "history" ? "nav-text text-active-nav" : "nav-text";
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white navbar-menu shadow-sm">
        <div className="container">
          <section className="navbar-brand d-flex align-items-center">
            <img className="logo-img-nav" src={logo} alt="iconcoffe" />
            <p className="logo-text-nav">Rcoffee Shop</p>
          </section>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse menu-bar" id="navbarNav">
            <ul className="navbar-nav nav-ul">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <span className={activeHome}>Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  <span className={activeProducts}>Product </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/chart" className="nav-link">
                  <span className={activeChart}>Your Chart</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/history" className="nav-link">
                  <span className={activeHistory}>History</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse nav-sign" id="navbarNav">
            <ul className="navbar-nav d-flex">
              <li className="nav-item">
                <Link to="/login" className="nav-link" href="./Login.html">
                  <span className="nav-login">Login</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/regis" className="nav-link" href="./signUp.html">
                  <span className="nav-signup">Sign Up</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
