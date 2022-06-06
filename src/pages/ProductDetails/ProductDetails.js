import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import axios from "axios";
import Swal from "sweetalert2";

import Navbar from "../../components/Navbar/Navbar";
import NavbarSignIn from "../../components/NavbarSignIn/Navbar";
import Footer from "../../components/Footer/Footer";

// img
import loadingImg from "../../asset/img/loading.gif";
import iconMsg from "../../asset/img/productsDetailPage/iconMsg.png";
import iconCek from "../../asset/img/productsDetailPage/iconCek.svg";
// img

function ProductDetails() {
  let params = useParams();
  const [isLogin, setisLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isadd, setIsadd] = useState(false);
  const Navigate = useNavigate();
  // data
  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [quantity, setQuantity] = useState(1);
  // data

  useEffect(() => {
    const checkLogin = async () => {
      try {
        setLoading(true);
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
            setisLogin(true);
          }

          if (result.data.message === "token generate" && isLogin === true) {
            await localStorage.setItem(
              "tokenkey",
              JSON.stringify(result.data.data.accessToken)
            );
          }
          setLoading(false);
          return;
        }

        setLoading(false);
      } catch (error) {
        console.log(error);

        setLoading(false);
      }
    };
    const getProduct = async () => {
      try {
        setLoading(true);
        const product = await axios.get(
          `http://localhost:8080/product/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("tokenkey")
              )}`,
            },
          }
        );
        setProducts(product.data.data);
        // get product detail
        product.data.data.map((product) =>
          product.size === params.size ? setProductDetail(product) : ""
        );
        // get product detail
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getProduct();
    checkLogin();
  }, []);

  useEffect(() => {
    const btn = document.getElementById("btn-min");
    if (quantity <= 1) {
      btn.classList.add("d-none");
    }
    if (quantity > 1) {
      btn.classList.remove("d-none");
    }
  }, [quantity]);

  useEffect(() => {
    if (isadd === true) {
      Swal.fire(
        "Success",
        `Success add ${productDetail.name} to chart`,
        "success"
      );
      setIsadd(false);
    }
  }, [isadd]);
  const sizeHandler = (size) => {
    products.map((product) =>
      product.size === size ? setProductDetail(product) : ""
    );
    setQuantity(1);
  };

  // add cart
  const addChartHandler = (e) => {
    e.preventDefault();
    // add data ke card locastorage
    const dataProduct = {
      id: productDetail.stock_id,
      name: productDetail.name,
      price: productDetail.price,
      size: productDetail.size,
      img: productDetail.img,
      quantity: quantity,
    };
    setQuantity(1);
    if (localStorage.getItem("chart") !== null) {
      const oldData = JSON.parse(localStorage.getItem("chart"));
      const data = [...oldData, dataProduct];
      localStorage.setItem("chart", JSON.stringify(data));

      return setIsadd(true);
    }

    localStorage.setItem("chart", JSON.stringify([dataProduct]));
    return setIsadd(true);
  };
  const checkoutHandler = (e) => {
    addChartHandler(e);
    Navigate("/chart");
  };
  return (
    <div>
      {loading === true ? (
        <>
          <div className="w-100 ">
            <img
              className="img-loading mx-auto"
              src={loadingImg}
              alt="loading"
            />
          </div>
        </>
      ) : (
        <>
          {isLogin === true ? (
            <NavbarSignIn navActive={"products"} />
          ) : (
            <Navbar navActive={"products"} />
          )}
          <main className="product-details-body">
            <div className="container">
              <div className="row product-details-box ">
                <div className="col-md product-detail-left">
                  <section className="product-detail-left-head">
                    <p>
                      <Link className="link-products-detail" to="/products">
                        Favorite & Promo
                      </Link>{" "}
                      <span className="span-product-name">{`> ${productDetail.name}`}</span>
                    </p>
                  </section>
                  <section className="product-detail-left-body d-flex justify-content-end">
                    <img
                      className="product-detail-img"
                      src={"http://localhost:8080" + productDetail.img}
                      alt="product-img"
                    />
                    <section className="d-flex justify-content-center align-items-center">
                      <img src={iconMsg} alt="iconMsg" />
                    </section>
                  </section>
                  <section className="product-detail-left-foot">
                    <p>
                      Delivery only on <b>Monday to friday</b> at{" "}
                      <b>1 - 7 pm</b>
                    </p>
                  </section>
                </div>
                <div className="col-md product-detail-right">
                  <section className="product-detail-right-head ">
                    <section className="step-order-product d-flex align-items-center row">
                      <section className="step-icon col-1">
                        <img src={iconCek} alt="iconCek" />
                      </section>
                      <section className="step-line col-3"></section>
                      <section className="step-icon col-1">
                        <img src={iconCek} alt="iconCek" />
                      </section>
                      <section className="step-line col-3"></section>
                      <section className="step-icon col-1"></section>
                    </section>
                    <section className="step-order-product-text d-flex row">
                      <p className="col-2 text-center p-0">Order</p>
                      <p className="col-2 text-start p-0">Checkout</p>
                      <p className="col-2 fw-bold text-start p-0">Payment</p>
                    </section>
                  </section>
                  <section className="product-detail-right-body">
                    <h4>{productDetail.name}</h4>
                    <h5>IDR {productDetail.price}</h5>
                    <p>{productDetail.description}</p>
                  </section>
                  <section className="product-detail-right-foot">
                    <form>
                      <select
                        className="form-select input-form-detail"
                        aria-label="Default select example"
                        onChange={(e) => sizeHandler(e.target.value)}
                      >
                        <option value="" selected>
                          Select Size
                        </option>
                        {products.map((product) => (
                          <option value={product.size}>{product.size}</option>
                        ))}
                      </select>
                      <select
                        className="form-select input-form-detail"
                        aria-label="Default select example"
                      >
                        <option selected>Select Delivery Methods</option>
                        <option value="dine in">Dine in</option>
                        <option value="Door Delivery">Door Delivery</option>
                        <option value="Pick up">Pick up</option>
                      </select>
                      <div className="row ">
                        <div className="col-md-4">
                          <section className="input-number-quantity d-flex justify-content-between align-items-center">
                            <h5
                              onClick={() => setQuantity(quantity + 1)}
                              className="btn-plus-quantity"
                            >
                              {" "}
                              +{" "}
                            </h5>
                            <h5 className="quantity-value fw-bold text-dark">
                              {quantity}
                            </h5>
                            <h5
                              id="btn-min"
                              onClick={() => setQuantity(quantity - 1)}
                              className="btn-min-quantity"
                            >
                              {" "}
                              -{" "}
                            </h5>
                          </section>
                        </div>
                        <div className="col-md-8">
                          <button
                            onClick={addChartHandler}
                            className="btn-product-detail-cart"
                          >
                            Add to Cart
                          </button>
                        </div>
                        <div className="col-md-12">
                          <button
                            onClick={checkoutHandler}
                            className="btn-product-detail-checkout"
                          >
                            Checkout
                          </button>
                        </div>
                      </div>
                    </form>
                  </section>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default ProductDetails;