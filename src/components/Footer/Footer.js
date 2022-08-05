import React from "react";
import "./Footer.css";
import logo from "../../asset/img/homePage/coffee icon.png";
import facebook from "../../asset/img/signPage/vfb.svg";
import twiter from "../../asset/img/signPage/vtw.svg";
import instagram from "../../asset/img/signPage/vig.svg";

function Footer(props) {
  return (
    <div>
      <footer
        className={
          props.foot === "home" ? "section-footer-home" : "section-footer"
        }
      >
        <section className="info-left">
          <section className="info-left-head">
            <img className="logo-img" src={logo} alt="iconcoffe" />
            <p className="logo-text">Rcoffee Shop</p>
          </section>
          <section className="info-left-body">
            <p className="info-left-text">
              Rcoffee Shop is a store that sells some good meals, and especially
              coffee. We provide high quality beans
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
      </footer>
      ;
    </div>
  );
}

export default Footer;
