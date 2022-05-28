import React, { Component } from "react";
import "./index.css";
import axios from "axios";

// img
import product from "../../asset/img/productsPage/product.png";

// img
import Navbar from "../../components/Navbar/Navbar";
import NavbarSignIn from "../../components/NavbarSignIn/Navbar";
import Footer from "../../components/Footer/Footer";

export class index extends Component {
  constructor() {
    super();

    this.state = {
      isLogin: false,
      products: [],
      pagination: [],
      paginationNumber: [],
      coffeeBtn: "list-menu",
      coffeeList: "",
      favoriteBtn: "list-menu menu-active",
      favoriteList: "list-active",
      foodBtn: "list-menu",
      foodList: "",
      noncoffeeBtn: "list-menu",
      noncoffeeList: "",
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
          this.setState({ isLogin: true });
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
        `http://localhost:8080/product/favorite?limit=12`
      );
      if (products.data.meta.totalPage > 1) {
        let number = [];
        for (let i = 1; i <= products.data.meta.totalPage; i++) {
          number.push(i);
        }
        this.setState({
          paginationNumber: number,
        });
      }
      this.setState({
        products: products.data.data,
        pagination: products.data.meta,
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
    const products = await axios.get(
      `http://localhost:8080/product/favorite?limit=12`
    );
    if (products.data.meta.totalPage > 1) {
      let number = [];
      for (let i = 1; i <= products.data.meta.totalPage; i++) {
        number.push(i);
      }
      this.setState({
        paginationNumber: number,
      });
    }
    this.setState({
      products: products.data.data,
      pagination: products.data.meta,
    });
  }
  async categoryHandler(category) {
    try {
      const products = await axios.get(
        `http://localhost:8080/product?limit=12&category=${category}`
      );
      if (products.data.meta.totalPage > 1) {
        let number = [];
        for (let i = 1; i <= products.data.meta.totalPage; i++) {
          number.push(i);
        }
        this.setState({
          paginationNumber: number,
        });
      }
      this.setState({
        products: products.data.data,
        pagination: products.data.meta,
        coffeeBtn: "list-menu",
        coffeeList: "",
        favoriteBtn: "list-menu",
        favoriteList: "",
        foodBtn: "list-menu",
        foodList: "",
        noncoffeeBtn: "list-menu",
        noncoffeeList: "",
      });
      if (category === "coffee") {
        this.setState({
          coffeeList: "list-active",
          coffeeBtn: "list-menu menu-active",
        });
      }
      if (category === "noncoffee") {
        this.setState({
          noncoffeeList: "list-active",
          noncoffeeBtn: "list-menu menu-active",
        });
      }
      if (category === "food") {
        this.setState({
          foodList: "list-active",
          foodBtn: "list-menu menu-active",
        });
      }
    } catch (error) {}
  }
  async favoriteHandler() {
    try {
      const products = await axios.get(
        `http://localhost:8080/product/favorite?limit=12`
      );
      if (products.data.meta.totalPage > 1) {
        let number = [];
        for (let i = 1; i <= products.data.meta.totalPage; i++) {
          number.push(i);
        }
        this.setState({
          paginationNumber: number,
        });
      }
      this.setState({
        products: products.data.data,
        pagination: products.data.meta,
        coffeeBtn: "list-menu",
        coffeeList: "",
        favoriteBtn: "list-menu",
        favoriteList: "",
        foodBtn: "list-menu",
        foodList: "",
        noncoffeeBtn: "list-menu",
        noncoffeeList: "",
      });
      this.setState({
        favoriteList: "list-active",
        favoriteBtn: "list-menu menu-active",
      });
    } catch (error) {}
  }
  async paginationHandler(page) {
    try {
      const products = await axios.get(`http://localhost:8080${page}`);
      if (products.data.meta.totalPage > 1) {
        let number = [];
        for (let i = 1; i <= products.data.meta.totalPage; i++) {
          number.push(i);
        }
        this.setState({
          paginationNumber: number,
        });
      }
      this.setState({
        products: products.data.data,
        pagination: products.data.meta,
      });
    } catch (error) {}
  }
  render() {
    return (
      <div>
        {this.state.isLogin === true ? (
          <NavbarSignIn navActive={"products"} />
        ) : (
          <Navbar navActive={"products"} />
        )}
        <section className="products-body">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-4 promo">
                <section className="promo-head text-center">
                  <h5>Promo for you</h5>
                  <p>Coupons will be updated every weeks. Check them out!</p>
                </section>
                <section className="promo-body d-flex justify-content-center align-items-center">
                  <section className="promo-info">
                    <div className="promo-info-head d-flex flex-column align-items-center justify-content-center">
                      <img src={product} alt="product" />
                      <h5>Beef Spaghetti</h5>
                      <h5>20% OFF</h5>
                      <p className="text-center">
                        Buy 1 Choco Oreo and get 20% off for Beef Spaghetti
                      </p>
                    </div>
                    <div className="promo-info-foot text-center">
                      <p>COUPON CODE</p>
                      <h5>FNPR15RG</h5>
                      <span>Valid untill October 10th 2020</span>
                    </div>
                  </section>
                  <section className="promo-info-1"></section>
                  <section className="promo-info-2"></section>
                </section>

                <section className="promo-foot">
                  <section className="mx-auto d-flex justify-content-center align-items-center">
                    Apply Coupon
                  </section>
                  <div className="promo-foot-text">
                    <ul>
                      <span className="pb-1">Terms and Condition</span>
                      <li className="p-1">
                        You can only apply 1 coupon per day
                      </li>
                      <li className="p-1">It only for dine in</li>
                      <li className="p-1">Buy 1 get 1 only for new user</li>
                      <li className="p-1">
                        Should make member card to apply coupon
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
              <div className="col-lg-8 products-container">
                <div className="products-favorite-head">
                  <ul className="products-menu">
                    <li className={this.state.favoriteList}>
                      <button
                        onClick={() => this.favoriteHandler()}
                        className={this.state.favoriteBtn}
                      >
                        Favorite Product
                      </button>
                    </li>
                    <li className={this.state.coffeeList}>
                      <button
                        onClick={() => this.categoryHandler("coffee")}
                        className={this.state.coffeeBtn}
                      >
                        Coffee
                      </button>
                    </li>
                    <li className={this.state.noncoffeeList}>
                      <button
                        onClick={() => this.categoryHandler("noncoffee")}
                        className={this.state.noncoffeeBtn}
                      >
                        Non Coffee
                      </button>
                    </li>
                    <li className={this.state.foodList}>
                      <button
                        onClick={() => this.categoryHandler("food")}
                        className={this.state.foodBtn}
                      >
                        Foods
                      </button>
                    </li>
                    <li>
                      <button className="list-menu">Add-on</button>
                    </li>
                  </ul>
                </div>
                {this.state.pagination.totalPage > 1 ? (
                  <section className="pagination-data w-100 d-flex justify-content-center">
                    <nav
                      className="pagination-box "
                      aria-label="Page navigation example"
                    >
                      <ul className="pagination ">
                        {this.state.pagination.prev !== undefined ? (
                          <li className="page-item">
                            <button
                              onClick={() =>
                                this.paginationHandler(
                                  this.state.pagination.prev
                                )
                              }
                              className="page-link bg-light text-dark fw-bold m-2 "
                            >
                              Previous
                            </button>
                          </li>
                        ) : (
                          ""
                        )}
                        {this.state.paginationNumber.map((page) =>
                          parseInt(this.state.pagination.page) === page ? (
                            <li className="page-item">
                              <button
                                onClick={() =>
                                  this.paginationHandler(
                                    `/product?limit=12&page=${page}`
                                  )
                                }
                                className="page-link bg-dark text-light fw-bold m-2 "
                              >
                                {page}
                              </button>
                            </li>
                          ) : (
                            <li className="page-item">
                              <button
                                onClick={() =>
                                  this.paginationHandler(
                                    `/product?limit=12&page=${page}`
                                  )
                                }
                                className="page-link bg-light text-dark fw-bold m-2 "
                              >
                                {page}
                              </button>
                            </li>
                          )
                        )}
                        {this.state.pagination.next !== undefined ? (
                          <li className="page-item">
                            <button
                              onClick={() =>
                                this.paginationHandler(
                                  this.state.pagination.next
                                )
                              }
                              className="page-link bg-light text-dark fw-bold m-2 "
                            >
                              Next
                            </button>
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                    </nav>
                  </section>
                ) : (
                  ""
                )}
                <div className="products-list-box">
                  {this.state.products.map((product) => (
                    <div className="box-products text-center">
                      <div className="box-head text-center">
                        <img
                          src={"http://localhost:8080" + product.img}
                          alt="products"
                        />
                      </div>
                      <h5>{product.name}</h5>
                      <span className="text-center fw-bold">
                        {product.size}
                      </span>
                      <p>IDR {product.price}</p>
                    </div>
                  ))}
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
