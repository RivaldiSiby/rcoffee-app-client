import React, { Component } from "react";
import "./index.css";
import axios from "axios";

// img
import product from "../../asset/img/productsPage/product.png";
import loadingImg from "../../asset/img/loading.gif";
import loadImg from "../../asset/img/load.gif";
// img
import Navbar from "../../components/Navbar/Navbar";
import NavbarSignIn from "../../components/NavbarSignIn/Navbar";
import Footer from "../../components/Footer/Footer";

export class index extends Component {
  constructor() {
    super();

    this.state = {
      isLogin: false,
      loading: false,
      load: false,
      promo: [],
      products: [],
      pagination: [],
      paginationNumber: [],
      coffeeBtn: "list-menu",
      coffeeList: "",
      favoriteBtn: "list-menu menu-active",
      favoriteList: "list-active",
      foodBtn: "list-menu",
      foodList: "",
      allBtn: "list-menu",
      allList: "",
      noncoffeeBtn: "list-menu",
      noncoffeeList: "",
      search: "",
      searchKey: "",
      sort: "",
      order: "asc",
      linkUrl: "http://localhost:8080/product?limit=12",
    };
  }
  async componentDidMount() {
    try {
      this.setState({ loading: true });
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
        if (
          result.data.message === "token generate" &&
          this.state.isLogin === true
        ) {
          await localStorage.setItem(
            "tokenkey",
            JSON.stringify(result.data.data.accessToken)
          );

          return;
        }
      }
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error.response.data.message);
    }
    try {
      this.setState({ loading: true });
      // tarik data
      // product api
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
      // promo
      const promos = await axios.get(`http://localhost:8080/promos?limit=1`);
      this.setState({
        promo: promos.data.data,
      });
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
    }
  }
  async categoryHandler(category) {
    this.setState({
      products: [],
    });
    try {
      this.setState({ load: true });
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
        linkUrl: `http://localhost:8080/product?limit=12&category=${category}`,
        products: products.data.data,
        pagination: products.data.meta,
        coffeeBtn: "list-menu",
        coffeeList: "",
        favoriteBtn: "list-menu",
        favoriteList: "",
        foodBtn: "list-menu",
        foodList: "",
        allBtn: "list-menu",
        allList: "",
        noncoffeeBtn: "list-menu",
        noncoffeeList: "",
        search: "",
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
      this.setState({ load: false });
    } catch (error) {
      this.setState({ load: false, products: [], searchKey: category });
    }
  }
  async favoriteHandler() {
    this.setState({
      products: [],
    });
    try {
      this.setState({ load: true });
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
        linkUrl: `http://localhost:8080/product?limit=12`,
        products: products.data.data,
        pagination: products.data.meta,
        coffeeBtn: "list-menu",
        coffeeList: "",
        favoriteBtn: "list-menu",
        favoriteList: "",
        foodBtn: "list-menu",
        foodList: "",
        allBtn: "list-menu",
        allList: "",
        noncoffeeBtn: "list-menu",
        noncoffeeList: "",
        search: "",
      });
      this.setState({
        favoriteList: "list-active",
        favoriteBtn: "list-menu menu-active",
      });
      this.setState({ load: false });
    } catch (error) {
      this.setState({ load: false, products: [], searchKey: "Favorite" });
    }
  }
  async searchHandler() {
    this.setState({
      products: [],
    });
    try {
      this.setState({ load: true });
      if (this.state.search !== "") {
        const products = await axios.get(
          `http://localhost:8080/product?name=${this.state.search}`
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
          linkUrl: `http://localhost:8080/product?name=${this.state.search}&limit=12`,
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
          allList: "list-active",
          allBtn: "list-menu menu-active",
        });

        this.setState({ load: false });
        return;
      }
    } catch (error) {
      this.setState({
        load: false,
        products: [],
        searchKey: this.state.search,
      });
    }
  }
  async allHandler() {
    this.setState({
      products: [],
    });
    try {
      this.setState({ load: true });
      const products = await axios.get(
        `http://localhost:8080/product?limit=12`
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
        linkUrl: `http://localhost:8080/product?limit=12`,
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
        allList: "list-active",
        allBtn: "list-menu menu-active",
      });
      this.setState({ load: false });
    } catch (error) {
      this.setState({
        load: false,
        products: [],
        searchKey: "All ",
      });
    }
  }
  async paginationHandler(page) {
    this.setState({
      products: [],
    });
    try {
      this.setState({ load: true });
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
        linkUrl: `http://localhost:8080${page}`,
        products: products.data.data,
        pagination: products.data.meta,
      });
      this.setState({ load: false });
    } catch (error) {
      this.setState({ load: false });
    }
  }
  async sortHandler() {
    try {
      this.setState({ load: true });
      const products = await axios.get(
        `${this.state.linkUrl}${
          this.state.sort !== "" ? "&sort=" + this.state.sort : ""
        }&order=${this.state.order}`
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
      this.setState({ load: false });
    } catch (error) {
      this.setState({ load: false });
    }
  }
  render() {
    return (
      <div>
        {this.state.loading === true ? (
          <div className="w-100 ">
            <img
              className="img-loading mx-auto"
              src={loadingImg}
              alt="loading"
            />
          </div>
        ) : (
          <>
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
                      <p>
                        Coupons will be updated every weeks. Check them out!
                      </p>
                    </section>
                    <section className="promo-body d-flex justify-content-center align-items-center">
                      {this.state.promo.map((item) => (
                        <section className="promo-info">
                          <div className="promo-info-head d-flex flex-column align-items-center justify-content-center">
                            <img src={product} alt="product" />
                            <h5>{item.name}</h5>
                            <h5>{parseFloat(item.discount) * 100}% OFF</h5>
                            <p className="text-center">{item.description}</p>
                          </div>
                          <div className="promo-info-foot text-center">
                            <p>COUPON CODE</p>
                            <h5>{item.coupon}</h5>
                            <span>Valid untill October 10th 2022</span>
                          </div>
                        </section>
                      ))}
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
                        <li className={this.state.allList}>
                          <button
                            onClick={() => this.allHandler()}
                            className={this.state.allBtn}
                          >
                            All
                          </button>
                        </li>
                      </ul>
                    </div>
                    <section className="products-options ">
                      <div className="row m-2 ms-5 me-5">
                        <div className="col-md-6 d-flex mb-4 options-product-list">
                          <input
                            className="form-control me-2 select-form-sort"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={(e) =>
                              this.setState({
                                search: e.target.value,
                              })
                            }
                          />
                          <button
                            className="products-options-btn fw-bold"
                            type="submit"
                            onClick={() => this.searchHandler()}
                          >
                            Search
                          </button>
                        </div>
                        <div className="col-md-6 d-flex mb-4 options-product-list">
                          <select
                            className="form-select select-form-sort fw-bold me-2 mb-2"
                            aria-label="Default select example"
                            onChange={(e) =>
                              this.setState({
                                sort: e.target.value,
                              })
                            }
                          >
                            <option value="" selected>
                              Sort
                            </option>
                            <option value="price">Price</option>
                            <option value="time">Time</option>
                          </select>
                          <select
                            className="form-select select-form-sort fw-bold me-2 mb-2"
                            aria-label="Default select example"
                            onChange={(e) =>
                              this.setState({
                                order: e.target.value,
                              })
                            }
                          >
                            <option value="asc" selected>
                              Order
                            </option>
                            <option value="asc">Asc</option>
                            <option value="desc">Desc</option>
                          </select>
                          <button
                            onClick={() => this.sortHandler()}
                            className="products-options-btn fw-bold"
                          >
                            Sorting
                          </button>
                        </div>
                      </div>
                    </section>
                    {this.state.load === true ? (
                      <div className="w-100 d-flex justify-content-center">
                        <img
                          className="mx-auto mt-5"
                          src={loadImg}
                          alt="loading"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="products-list-box">
                          {this.state.products.length > 0 ? (
                            <>
                              {this.state.products.map((product) => (
                                <div className="box-products text-center">
                                  <div className="box-head text-center">
                                    <img
                                      src={
                                        "http://localhost:8080" + product.img
                                      }
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
                            </>
                          ) : (
                            <>
                              <section className="not-found-error text-center w-100 m-5">
                                <h5>SEARCH : "{this.state.searchKey}"</h5>
                                <p>Product Not Found</p>
                              </section>
                            </>
                          )}
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
                                  parseInt(this.state.pagination.page) ===
                                  page ? (
                                    <li className="page-item">
                                      <button
                                        onClick={() =>
                                          this.paginationHandler(
                                            `/product?limit=12&page=${page}${
                                              this.state.sort !== ""
                                                ? "&sort=" + this.state.sort
                                                : ""
                                            }&order=${this.state.order}`
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
                                            `/product?limit=12&page=${page}${
                                              this.state.sort !== ""
                                                ? "&sort=" + this.state.sort
                                                : ""
                                            }&order=${this.state.order}`
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
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <Footer />
          </>
        )}
      </div>
    );
  }
}

export default index;
