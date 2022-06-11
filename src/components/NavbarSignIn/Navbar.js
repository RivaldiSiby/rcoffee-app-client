import React, { useState } from "react";
import "./Navbarsign.css";
import { Link } from "react-router-dom";
import logo from "../../asset/img/homePage/coffee icon.png";
import search from "../../asset/img/profilePage/search.svg";
import chat from "../../asset/img/profilePage/chat.svg";
import { useDispatch, useSelector } from "react-redux";
import { addSearch } from "../../redux/actionCreator/search";

function Navbar(props) {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const img = "http://localhost:8080" + login.auth["datauser"];
  const [profile] = useState(img);
  const activeHome =
    props.navActive === "home" ? "nav-text-nav text-active" : "nav-text-nav";
  const activeProducts =
    props.navActive === "products"
      ? "nav-text-nav text-active"
      : "nav-text-nav";
  const activeChart =
    props.navActive === "chart" ? "nav-text-nav text-active" : "nav-text-nav";
  const activeHistory =
    props.navActive === "history" ? "nav-text-nav text-active" : "nav-text-nav";
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white navbar-menu shadow-sm">
        <div className="container">
          <section className="navbar-brand d-flex align-items-center">
            <img className="logo-img-nav" src={logo} alt="iconcoffe" />
            <p className="logo-text-nav">Coffee Shop</p>
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
          <div className="collapse navbar-collapse nav-sign-in" id="navbarNav">
            <ul className="navbar-nav profile-menu-sign d-flex">
              <li className="nav-item icon-menu">
                {props.navActive === "products" ? (
                  <>
                    <Link
                      onClick={() => dispatch(addSearch())}
                      to={`/products?search=""`}
                      className="nav-link"
                    >
                      <img
                        src={search}
                        alt="search"
                        className="icon-nav icon-find"
                      />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to={`/products?search=""`} className="nav-link">
                      <img
                        src={search}
                        alt="search"
                        className="icon-nav icon-find"
                      />
                    </Link>
                  </>
                )}
              </li>
              <li className="nav-item icon-menu">
                <Link to="/" className="nav-link icon-chat">
                  <p className="icon-chat-text">1</p>
                  <img src={chat} alt="chat" className="icon-nav icon-chat" />
                </Link>
              </li>
              <li className="nav-item icon-menu">
                <Link to="/profile" className="nav-link">
                  <img
                    src={profile}
                    alt="profile"
                    className="icon-nav nav-photos"
                  />
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
