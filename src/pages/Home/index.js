import React, { Component } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import NavbarSignIn from "../../components/NavbarSignIn/Navbar";
import axios from "axios";
import "./index.css";

// img
import staf from "../../asset/img/homePage/userv.svg";
import store from "../../asset/img/homePage/locv.svg";
import costumer from "../../asset/img/homePage/lovv.svg";
import teamwork from "../../asset/img/homePage/teamwork.png";
import list from "../../asset/img/homePage/listv.svg";
import plist from "../../asset/img/homePage/plist.svg";
import maps from "../../asset/img/homePage/maps.png";
import partner1 from "../../asset/img/homePage/partner1.png";
import partner2 from "../../asset/img/homePage/partner2.png";
import partner3 from "../../asset/img/homePage/partner3.png";
import partner4 from "../../asset/img/homePage/partner4.png";
import partner5 from "../../asset/img/homePage/partner5.png";
import costumer1 from "../../asset/img/homePage/costumer1.png";
import costumer2 from "../../asset/img/homePage/costumer2.png";
import costumer3 from "../../asset/img/homePage/costumer3.png";
import star from "../../asset/img/homePage/starv.svg";
import arrowleft from "../../asset/img/homePage/arrowleft.svg";
import arrowright from "../../asset/img/homePage/arrowright.svg";
import border from "../../asset/img/homePage/border.png";
import { Link } from "react-router-dom";
// img

// cek token

export class index extends Component {
  constructor() {
    super();

    this.state = {
      isLogin: false,
      products: [],
    };
  }
  async componentDidMount() {
    try {
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
          await this.setState({ isLogin: true });
        }

        if (result.data.message === "") {
          localStorage.setItem(
            "tokenkey",
            JSON.stringify(result.data.data.accessToken)
          );

          return;
        }
      }
      const products = await axios.get(
        `http://localhost:8080/product/favorite?limit=3`
      );
      this.setState({ products: products.data.data });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div>
        {this.state.isLogin === true ? (
          <NavbarSignIn navActive={"home"} />
        ) : (
          <Navbar navActive={"home"} />
        )}
        <section className="section-header">
          <div className="container w-100">
            <div className="row">
              <div className="col-lg-6">
                <div className="row pt-5 mt-5">
                  <div className="col-lg-12">
                    <h1 className="section-header-text">
                      Start Your Day with Coffee and Good Meals
                    </h1>
                  </div>
                  <div className="col-lg-12 mt-3">
                    <p className="section-text">
                      We provide high quality beans, good taste, and healthy
                      meals made by love just for you. Start your day with us
                      for a bigger smile!
                    </p>
                  </div>
                  <div className="col-lg-12 mt-5">
                    <Link to="/" className="btn-section">
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row p-1">
              <div className="col-12 bg-white section-header-foot ">
                <div className="container">
                  <div className="row d-flex justify-content-around">
                    <div className="col-sm-3 box-section border-box">
                      <section className="vektor-section d-flex align-items-center justify-content-center">
                        <img src={staf} alt="staf" className="vektor-img" />
                      </section>
                      <section className="box-text">
                        <p className="box-text1">90+</p>
                        <p className="box-text2">Staff</p>
                      </section>
                    </div>
                    <div className="col-sm-3 box-section border-box">
                      <section className="vektor-section d-flex align-items-center justify-content-center">
                        <img src={store} alt="store" className="vektor-img" />
                      </section>
                      <section className="box-text">
                        <p className="box-text1">30+</p>
                        <p className="box-text2">Stores</p>
                      </section>
                    </div>
                    <div className="col-sm-3 box-section">
                      <section className="vektor-section d-flex align-items-center justify-content-center">
                        <img
                          src={costumer}
                          alt="costumer"
                          className="vektor-img"
                        />
                      </section>
                      <section className="box-text">
                        <p className="box-text1">800+</p>
                        <p className="box-text2">Customers</p>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-body">
          <div className="container">
            <div className="row body-items d-flex justify-content-between">
              <div className="col-lg-5 items-img">
                <img src={teamwork} alt="" />
              </div>
              <div className="col-lg-5">
                <div className="row items-info">
                  <div className="col-12">
                    <p className="items-title">
                      We Provide Good Coffee and Healthy Meals
                    </p>
                  </div>
                  <div className="col-12">
                    <p className="items-text">
                      You can explore the menu that we provide with fun and have
                      their own taste and make your day better.
                    </p>
                  </div>

                  <div className="col-12">
                    <div className="items-list">
                      <section>
                        <img src={list} alt="list" />
                        <span className="list-items">High quality beans</span>
                      </section>
                      <section>
                        <img src={list} alt="list" />
                        <span className="list-items">
                          Healthy meals, you can request the ingredients
                        </span>
                      </section>
                      <section>
                        <img src={list} alt="list" />
                        <span className="list-items">
                          Chat with our staff to get better experience for
                          ordering
                        </span>
                      </section>
                      <section>
                        <img src={list} alt="list" />
                        <span className="list-items">
                          Free member card with a minimum purchase of IDR
                          200.000.
                        </span>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="favorite-title text-center">
          <p className="title-favorite">Here is People’s Favorite</p>
          <p className="favorite-info">
            Let’s choose and have a bit taste of poeple’s favorite. It might be
            yours too!
          </p>
        </section>
        <section className="section-product">
          <div className="container">
            <div className="row products d-flex justify-content-around">
              {this.state.products.map((product) => (
                <div className="col-lg-3 products-list d-flex flex-column justify-content-center align-items-center">
                  <div className="products-head text-center ">
                    <img
                      src={"http://localhost:8080" + product.img}
                      alt="product"
                    />
                    <p>{product.name}</p>
                  </div>
                  <div className="info-list">
                    <section>
                      <img src={plist} alt="list" />
                      <span className="list-items">Size : {product.size}</span>
                    </section>
                    <section>
                      <img src={plist} alt="list" />
                      <span className="list-items">
                        Category : {product.category}
                      </span>
                    </section>
                    <section>
                      <img src={plist} alt="list" />
                      <span className="list-items">
                        Quantity : {product.quantity}
                      </span>
                    </section>
                    <section>
                      <img src={plist} alt="list" />
                      <span className="list-items">{product.description}</span>
                    </section>
                  </div>
                  <div className="products-foot">
                    <p className="price-text">IDR {product.price}</p>
                    <section href="#" className="btn-product">
                      Select
                    </section>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="location-title text-center">
          <p className="title-location">
            Visit Our Store in the Spot on the Map Below
          </p>
          <p className="location-info">
            See our store in every city on the spot and spen your good day
            there. See you soon!
          </p>
        </section>
        <section className="maps-section">
          <div className="container text-center">
            <img src={maps} alt="maps" />
          </div>
        </section>
        <section className="parner-section text-center">
          <div className="container">
            <p className="title-partner">Our Partner</p>
            <div className="row list-partner d-flex justify-content-between align-items-center">
              <div className="col-sm-2 items-partner">
                <img src={partner1} alt="Partner" />
              </div>
              <div className="col-sm-2 items-partner">
                <img src={partner2} alt="Partner" />
              </div>
              <div className="col-sm-2 items-partner">
                <img src={partner3} alt="Partner" />
              </div>
              <div className="col-sm-2 items-partner">
                <img src={partner4} alt="Partner" />
              </div>
              <div className="col-sm-2 items-partner">
                <img src={partner5} alt="Partner" />
              </div>
            </div>
          </div>
        </section>
        <section className="costumer-title text-center">
          <p className="title-location">Loved by Thousands of Happy Customer</p>
          <p className="location-info">
            These are the stories of our customers who have visited us with
            great pleasure.
          </p>
        </section>
        <section className="testimoni-costumer">
          <div className="testimoni-list d-flex justify-content-between">
            <section className="list-box">
              <div className="container">
                <div className="row">
                  <div className="col-12 ">
                    <div className="row box-header">
                      <div className="col-9">
                        <div className="row d-flex">
                          <div className="col-4 profile-img">
                            <img src={costumer1} alt="profile-img" />
                          </div>
                          <div className="col">
                            <p className="profile-name">Viezh Robert</p>
                            <p className="profile-address">Warsaw, Poland</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-3 d-flex justify-content-end">
                        <p className="rank-text">4.5</p>
                        <img className="rank-icon" src={star} alt="star" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <p className="testimoni-text">
                      “Wow... I am very happy to spend my whole day here. the
                      Wi-fi is good, and the coffee and meals tho. I like it
                      here!! Very recommended!
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="list-box">
              <div className="container">
                <div className="row">
                  <div className="col-12 ">
                    <div className="row box-header">
                      <div className="col-9">
                        <div className="row d-flex">
                          <div className="col-4 profile-img">
                            <img src={costumer2} alt="profile-img" />
                          </div>
                          <div className="col">
                            <p className="profile-name">Yessica Christy</p>
                            <p className="profile-address">Shanxi, China</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-3 d-flex justify-content-end">
                        <p className="rank-text">4.5</p>
                        <img className="rank-icon" src={star} alt="star" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <p className="testimoni-text">
                      “I like it because I like to travel far and still can make
                      my day better just by drinking their Hazelnut Latte
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="list-box">
              <div className="container">
                <div className="row">
                  <div className="col-12 ">
                    <div className="row box-header">
                      <div className="col-9">
                        <div className="row d-flex">
                          <div className="col-4 profile-img">
                            <img src={costumer3} alt="profile-img" />
                          </div>
                          <div className="col">
                            <p className="profile-name">Kim Young Jou</p>
                            <p className="profile-address">
                              Seoul, South Korea
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-3 d-flex justify-content-end">
                        <p className="rank-text">4.5</p>
                        <img className="rank-icon" src={star} alt="star" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <p className="testimoni-text">
                      “This is very unusual for my taste, I haven’t liked coffee
                      before but their coffee is the best! and yup, you have to
                      order the chicken wings, the best in town!
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="list-box">
              <div className="container">
                <div className="row">
                  <div className="col-12 ">
                    <div className="row box-header">
                      <div className="col-9">
                        <div className="row d-flex">
                          <div className="col-4 profile-img">
                            <img src={costumer1} alt="profile-img" />
                          </div>
                          <div className="col">
                            <p className="profile-name">Viezh Robert</p>
                            <p className="profile-address">Warsaw, Poland</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-3 d-flex justify-content-end">
                        <p className="rank-text">4.5</p>
                        <img className="rank-icon" src={star} alt="star" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <p className="testimoni-text">
                      “Wow... I am very happy to spend my whole day here. the
                      Wi-fi is good, and the coffee and meals tho. I like it
                      here!! Very recommended!
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="list-box">
              <div className="container">
                <div className="row">
                  <div className="col-12 ">
                    <div className="row box-header">
                      <div className="col-9">
                        <div className="row d-flex">
                          <div className="col-4 profile-img">
                            <img src={costumer2} alt="profile-img" />
                          </div>
                          <div className="col">
                            <p className="profile-name">Yessica Christy</p>
                            <p className="profile-address">Shanxi, China</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-3 d-flex justify-content-end">
                        <p className="rank-text">4.5</p>
                        <img className="rank-icon" src={star} alt="star" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <p className="testimoni-text">
                      “I like it because I like to travel far and still can make
                      my day better just by drinking their Hazelnut Latte
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="list-box">
              <div className="container">
                <div className="row">
                  <div className="col-12 ">
                    <div className="row box-header">
                      <div className="col-9">
                        <div className="row d-flex">
                          <div className="col-4 profile-img">
                            <img src={costumer3} alt="profile-img" />
                          </div>
                          <div className="col">
                            <p className="profile-name">Kim Young Jou</p>
                            <p className="profile-address">
                              Seoul, South Korea
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-3 d-flex justify-content-end">
                        <p className="rank-text">4.5</p>
                        <img className="rank-icon" src={star} alt="star" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <p className="testimoni-text">
                      “This is very unusual for my taste, I haven’t liked coffee
                      before but their coffee is the best! and yup, you have to
                      order the chicken wings, the best in town!
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="list-box">
              <div className="container">
                <div className="row">
                  <div className="col-12 ">
                    <div className="row box-header">
                      <div className="col-9">
                        <div className="row d-flex">
                          <div className="col-4 profile-img">
                            <img src={costumer1} alt="profile-img" />
                          </div>
                          <div className="col">
                            <p className="profile-name">Viezh Robert</p>
                            <p className="profile-address">Warsaw, Poland</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-3 d-flex justify-content-end">
                        <p className="rank-text">4.5</p>
                        <img className="rank-icon" src={star} alt="star" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <p className="testimoni-text">
                      “Wow... I am very happy to spend my whole day here. the
                      Wi-fi is good, and the coffee and meals tho. I like it
                      here!! Very recommended!
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="list-box">
              <div className="container">
                <div className="row">
                  <div className="col-12 ">
                    <div className="row box-header">
                      <div className="col-9">
                        <div className="row d-flex">
                          <div className="col-4 profile-img">
                            <img src={costumer2} alt="profile-img" />
                          </div>
                          <div className="col">
                            <p className="profile-name">Yessica Christy</p>
                            <p className="profile-address">Shanxi, China</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-3 d-flex justify-content-end">
                        <p className="rank-text">4.5</p>
                        <img className="rank-icon" src={star} alt="star" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <p className="testimoni-text">
                      “I like it because I like to travel far and still can make
                      my day better just by drinking their Hazelnut Latte
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="list-box">
              <div className="container">
                <div className="row">
                  <div className="col-12 ">
                    <div className="row box-header">
                      <div className="col-9">
                        <div className="row d-flex">
                          <div className="col-4 profile-img">
                            <img src={costumer3} alt="profile-img" />
                          </div>
                          <div className="col">
                            <p className="profile-name">Kim Young Jou</p>
                            <p className="profile-address">
                              Seoul, South Korea
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-3 d-flex justify-content-end">
                        <p className="rank-text">4.5</p>
                        <img className="rank-icon" src={star} alt="star" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <p className="testimoni-text">
                      “This is very unusual for my taste, I haven’t liked coffee
                      before but their coffee is the best! and yup, you have to
                      order the chicken wings, the best in town!
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
        <section className="testimoni-scroll">
          <div className="row">
            <div className="col-sm-2 border-list text-start d-flex justify-content-between align-items-center">
              <section className="list-active d-flex justify-content-between align-items-center">
                <img src={border} alt="border" />
              </section>
              <section className="scroll-list"></section>
              <section className="scroll-list"></section>
              <section className="scroll-list"></section>
            </div>
            <div className="col-sm-10 border-arrow d-flex justify-content-end">
              <button className="btn-scroll">
                <img src={arrowleft} alt="arrowleft" />
              </button>
              <button className="btn-scroll btn-right">
                <img src={arrowright} alt="arrowright" />
              </button>
            </div>
          </div>
        </section>
        <section className="section-promo">
          <div className="promo-box ">
            <div className="container">
              <div className="row">
                <div className="col-sm-6 promo-text d-flex flex-column justify-content-center">
                  <h5>Check our promo today!</h5>
                  <p>Let's see the deals and pick yours!</p>
                </div>
                <div className="col-sm-6 btn-promo d-flex flex-column justify-content-center align-items-center">
                  <section href="#">See Promo</section>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default index;
