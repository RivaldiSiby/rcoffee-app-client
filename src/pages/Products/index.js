import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import axios from "axios";
import Swal from "sweetalert2";
import GenerateToken from "../../helper/GenerateToken";

import { failLogin, successLogin } from "../../redux/actionCreator/login";

// img
import product from "../../asset/img/productsPage/product.png";
import editIcon from "../../asset/img/productsPage/iconedit.svg";
import loadingImg from "../../asset/img/loading.gif";
import loadImg from "../../asset/img/load.gif";
// img
import Navbar from "../../components/Navbar/Navbar";
import NavbarSignIn from "../../components/NavbarSignIn/Navbar";
import Footer from "../../components/Footer/Footer";
import Hooks from "../../helper/Hooks";
import { connect } from "react-redux";
import { addProducts, clearProducts } from "../../redux/actionCreator/products";
import { addSearch, clearSearch } from "../../redux/actionCreator/search";

class index extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      load: false,
      promo: [],
      products: [],
      pagination: [],
      paginationNumber: [],
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
      searchKey: "",
      sort: "",
      order: "asc",
      linkUrl: process.env.REACT_APP_HOST + "/product?limit=12",
    };
  }
  async componentDidMount() {
    this.props.dispatch(clearSearch());
    if (this.props.location.state !== null) {
      if (this.props.location.state.successToPay === true) {
        Swal.fire("Success", "Payment Success", "success");
      }
    }
    // cek search

    if (this.props.searchParams.get("search") !== null) {
      this.setState({
        allList: "list-active",
        allBtn: "list-menu menu-active",
      });
    }
    if (
      this.props.searchParams.get("search") === "" ||
      this.props.searchParams.get("search") === `""`
    ) {
      this.props.dispatch(
        addProducts(`${process.env.REACT_APP_HOST}/product?limit=12`)
      );
      this.props.dispatch(addSearch());
      this.setState({
        allList: "list-active",
        allBtn: "list-menu menu-active",
      });
    }
    // cek category
    if (this.props.searchParams.get("category") !== null) {
      if (this.props.searchParams.get("category") === "coffee") {
        this.setState({
          coffeeList: "list-active",
          coffeeBtn: "list-menu menu-active",
        });
      }
      if (this.props.searchParams.get("category") === "noncoffee") {
        this.setState({
          noncoffeeList: "list-active",
          noncoffeeBtn: "list-menu menu-active",
        });
      }
      if (this.props.searchParams.get("category") === "food") {
        this.setState({
          foodList: "list-active",
          foodBtn: "list-menu menu-active",
        });
      }
      if (this.props.searchParams.get("category") === "favorite") {
        this.setState({
          favoriteList: "list-active",
          favoriteBtn: "list-menu menu-active",
        });
      }
    }
    if (
      this.props.searchParams.get("search") === null &&
      this.props.searchParams.get("category") === null
    ) {
      this.setState({
        favoriteList: "list-active",
        favoriteBtn: "list-menu menu-active",
      });
      this.props.dispatch(clearProducts());
    }
    try {
      this.setState({ loading: true });
      if (this.props.auth["refreshkey"] === undefined) {
        this.props.dispatch(failLogin());
      }
      if (this.props.auth["refreshkey"] !== undefined) {
        await GenerateToken(this.props.auth, (Data) => {
          this.props.dispatch(successLogin(Data));
        });
      }
      // tarik data
      // product api
      let url = `${this.props.url}`;
      const products = await axios.get(url);
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
      // if (products.data.data !== undefined) {
      //   this.props.dispatch(
      //     addProducts(`${process.env.REACT_APP_HOST}/product?limit=12`)
      //   );
      // }
      // promo
      const promos = await axios.get(
        `${process.env.REACT_APP_HOST}/promos?limit=1`
      );
      this.setState({
        promo: promos.data.data,
      });
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
      await axios.get(`${this.props.url}`).then((products) => {
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
        axios
          .get(`${process.env.REACT_APP_HOST}/promos?limit=1`)
          .then((promos) => {
            this.setState({
              promo: promos.data.data,
            });
            this.setState({ loading: false });
          });
      });
      this.props.dispatch(failLogin());
    }
  }
  async categoryHandler(category) {
    this.setState({
      products: [],
    });
    try {
      this.setState({ load: true });
      const products = await axios.get(
        `${process.env.REACT_APP_HOST}/product?limit=12&category=${category}`
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
        linkUrl: `${process.env.REACT_APP_HOST}/product?limit=12&category=${category}`,
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
      this.props.dispatch(
        addProducts(
          `${process.env.REACT_APP_HOST}/product?limit=12&category=${category}`
        )
      );
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

      this.props.navigate(`/products?category=${category}`);
      this.setState({ load: false });
    } catch (error) {
      this.setState({ load: false, products: [], searchKey: category });
      this.props.navigate(`/products?category=${category}`);
    }
  }
  async favoriteHandler() {
    this.setState({
      products: [],
    });
    try {
      this.setState({ load: true });
      const products = await axios.get(
        `${process.env.REACT_APP_HOST}/product/favorite?limit=12`
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
        linkUrl: `${process.env.REACT_APP_HOST}/product?limit=12`,
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
      this.props.navigate(`/products?category=favorite`);
      this.setState({ load: false });
    } catch (error) {
      this.setState({ load: false, products: [], searchKey: "Favorite" });
      this.props.navigate(`/products?category=favorite`);
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
          `${process.env.REACT_APP_HOST}/product?limit=12&name=${this.state.search}`
        );
        this.props.dispatch(
          addProducts(
            `${process.env.REACT_APP_HOST}/product?limit=12&name=${this.state.search}`
          )
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
          linkUrl: `${process.env.REACT_APP_HOST}/product?limit=12&search=${this.state.search}`,
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
        this.props.navigate(`/products?search=${this.state.search}`);
        this.setState({ load: false });
        return;
      }
      throw new Error("not found");
    } catch (error) {
      this.setState({
        load: false,
        products: [],
        pagination: [],
        searchKey: this.state.search,
        coffeeBtn: "list-menu",
        coffeeList: "",
        favoriteBtn: "list-menu",
        favoriteList: "",
        foodBtn: "list-menu",
        foodList: "",
        noncoffeeBtn: "list-menu",
        noncoffeeList: "",
        allList: "list-active",
        allBtn: "list-menu menu-active",
      });
      this.props.navigate(`/products?search=${this.state.search}`);
    }
  }
  async allHandler() {
    this.setState({
      products: [],
    });
    try {
      this.setState({ load: true });
      const products = await axios.get(
        `${process.env.REACT_APP_HOST}/product?limit=12`
      );
      this.props.dispatch(
        addProducts(`${process.env.REACT_APP_HOST}/product?limit=12`)
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
        linkUrl: `${process.env.REACT_APP_HOST}/product?limit=12`,
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
      this.props.navigate(`/products`);
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
      const products = await axios.get(`${process.env.REACT_APP_HOST}${page}`);
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
        linkUrl: `${process.env.REACT_APP_HOST}${page}`,
        products: products.data.data,
        pagination: products.data.meta,
      });
      this.props.dispatch(addProducts(`${process.env.REACT_APP_HOST}${page}`));
      // pecahkan link
      const pageNow = page.split("&");
      this.props.navigate(`/products?${pageNow[1]}`);
      this.setState({ load: false });
    } catch (error) {
      this.setState({ load: false });
    }
  }
  async sortHandler() {
    try {
      this.setState({ load: true });
      console.log(this.props.url);
      let urlQuery = this.props.url.split("&");
      console.log(urlQuery.length);
      const products = await axios.get(
        `${
          urlQuery.length > 1
            ? urlQuery[0] + "&" + urlQuery[1]
            : process.env.REACT_APP_HOST + "/product?limit=12"
        }${this.state.sort !== "" ? "&sort=" + this.state.sort : ""}&order=${
          this.state.order
        }`
      );
      // input data kedalam redux
      this.props.dispatch(
        addProducts(
          `${urlQuery[0] + "&" + urlQuery[1]}${
            this.state.sort !== "" ? "&sort=" + this.state.sort : ""
          }&order=${this.state.order}`
        )
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
      // atur url
      this.props.navigate(
        `/products?${urlQuery[1] === undefined ? "" : urlQuery[1]}${
          this.state.sort !== "" ? "&sort=" + this.state.sort : ""
        }&order=${this.state.order}`
      );
      this.setState({ load: false });
    } catch (error) {
      console.log(error);
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
            {this.props.status === true ? (
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
                          {this.props.user.role === "admin" ? (
                            <>
                              <section className="box-icon-edit-section w-100 d-flex justify-content-end ">
                                <section className="edit-icon-promo text-center">
                                  <img src={editIcon} alt="edit-icon" />
                                </section>
                              </section>
                            </>
                          ) : (
                            ""
                          )}
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

                    {this.props.user.role === "admin" ? (
                      <>
                        {" "}
                        <button className="btn-add-new-promo">
                          Add new promo
                        </button>
                      </>
                    ) : (
                      ""
                    )}
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
                        {this.props.search === true ? (
                          <>
                            <section className="col-md-12 mb-3 text-center w-100 fw-bold d-flex justify-content-center align-items-center">
                              <p className=" d-flex align-items-center">
                                You Can search Products By Name
                              </p>
                            </section>
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
                          </>
                        ) : (
                          ""
                        )}

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
                                <Link
                                  to={
                                    "/products/" +
                                    product.id +
                                    "/" +
                                    product.size
                                  }
                                  className="box-products text-center"
                                >
                                  <div className="box-head text-center">
                                    <img
                                      src={
                                        process.env.REACT_APP_HOST +
                                        "" +
                                        product.img
                                      }
                                      alt="products"
                                    />
                                  </div>
                                  <h5>{product.name}</h5>
                                  <span className="text-center fw-bold text-dark">
                                    {product.size}
                                  </span>
                                  <p>IDR {product.price}</p>
                                  {this.props.user.role === "admin" ? (
                                    <>
                                      <section className="box-icon-edit-section box-edit-product d-flex justify-content-end ">
                                        <section className="edit-icon-product">
                                          <img src={editIcon} alt="edit-icon" />
                                        </section>
                                      </section>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </Link>
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

                        {this.props.user.role === "admin" ? (
                          <>
                            <button className="btn-add-new-product">
                              Add new product
                            </button>
                          </>
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

const mapStateToProps = (reduxState) => {
  const {
    login: { status, auth },
    products: { url },
    search: { search },
    user: { user },
  } = reduxState;
  return {
    status,
    auth,
    url,
    search,
    user,
  };
};
export default connect(mapStateToProps)(Hooks(index));
