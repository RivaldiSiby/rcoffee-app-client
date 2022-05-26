import React, { Component } from "react";
import "./Navbar.css";
import logo from "../../asset/img/homePage/coffee icon.png";

export class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white navbar-menu">
          <div className="container">
            <section className="navbar-brand d-flex align-items-center">
              <img className="logo-img" src={logo} alt="iconcoffe" />
              <p className="logo-text">Coffee Shops</p>
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
                  <section className="nav-link">
                    <span className="nav-text text-active">Home</span>
                  </section>
                </li>
                <li className="nav-item">
                  <section className="nav-link" href="./products.html">
                    <span className="nav-text">Product </span>
                  </section>
                </li>
                <li className="nav-item">
                  <section className="nav-link">
                    <span className="nav-text">Your Chart</span>
                  </section>
                </li>
                <li className="nav-item">
                  <section className="nav-link">
                    <span className="nav-text">History</span>
                  </section>
                </li>
              </ul>
            </div>
            <div className="collapse navbar-collapse nav-sign" id="navbarNav">
              <ul className="navbar-nav d-flex">
                <li className="nav-item">
                  <section className="nav-link" href="./Login.html">
                    <span className="nav-login">Login</span>
                  </section>
                </li>
                <li className="nav-item">
                  <section className="nav-link" href="./signUp.html">
                    <span className="nav-signup">Sign Up</span>
                  </section>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
