import React, { useState } from "react";
import NavbarSignIn from "../../components/NavbarSignIn/Navbar";
import Footer from "../../components/Footer/Footer";
import "./History.css";

// img
import loadingImg from "../../asset/img/loading.gif";
import product from "../../asset/img/historyPage/product.png";
// img

function History() {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      {loading === true ? (
        <div className="w-100 ">
          <img className="img-loading mx-auto" src={loadingImg} alt="loading" />
        </div>
      ) : (
        <>
          <NavbarSignIn navActive={"history"} />
          <main className="history-body">
            <div className="container">
              <section className="history-bought-products">
                <section className="history-bought-head">
                  <h5>Let’s see what you have bought!</h5>
                  <p className="select-history">Select item to delete</p>
                  <p className="delete-history">Delete</p>
                </section>
                <section className="history-bought-list ">
                  <section className="box-history">
                    <div className="row">
                      <div className="col-3 box-history-img">
                        <img src={product} alt="product-img" />
                      </div>
                      <div className="col-9 ">
                        <div className="row ">
                          <div className="col-12 box-history-title ps-3">
                            <h5>Veggie tomato mix</h5>
                          </div>
                          <div className="col box-history-info ps-3">
                            <p>IDR 34.000</p>
                            <p>Delivered</p>
                          </div>
                          <div className="col-2 d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="check-history-product"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="box-history">
                    <div className="row">
                      <div className="col-3 box-history-img">
                        <img src={product} alt="product-img" />
                      </div>
                      <div className="col-9 ">
                        <div className="row ">
                          <div className="col-12 box-history-title ps-3">
                            <h5>Veggie tomato mix</h5>
                          </div>
                          <div className="col box-history-info ps-3">
                            <p>IDR 34.000</p>
                            <p>Delivered</p>
                          </div>
                          <div className="col-2 d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="check-history-product"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="box-history">
                    <div className="row">
                      <div className="col-3 box-history-img">
                        <img src={product} alt="product-img" />
                      </div>
                      <div className="col-9 ">
                        <div className="row ">
                          <div className="col-12 box-history-title ps-3">
                            <h5>Veggie tomato mix</h5>
                          </div>
                          <div className="col box-history-info ps-3">
                            <p>IDR 34.000</p>
                            <p>Delivered</p>
                          </div>
                          <div className="col-2 d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="check-history-product"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="box-history">
                    <div className="row">
                      <div className="col-3 box-history-img">
                        <img src={product} alt="product-img" />
                      </div>
                      <div className="col-9 ">
                        <div className="row ">
                          <div className="col-12 box-history-title ps-3">
                            <h5>Veggie tomato mix</h5>
                          </div>
                          <div className="col box-history-info ps-3">
                            <p>IDR 34.000</p>
                            <p>Delivered</p>
                          </div>
                          <div className="col-2 d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="check-history-product"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="box-history">
                    <div className="row">
                      <div className="col-3 box-history-img">
                        <img src={product} alt="product-img" />
                      </div>
                      <div className="col-9 ">
                        <div className="row ">
                          <div className="col-12 box-history-title ps-3">
                            <h5>Veggie tomato mix</h5>
                          </div>
                          <div className="col box-history-info ps-3">
                            <p>IDR 34.000</p>
                            <p>Delivered</p>
                          </div>
                          <div className="col-2 d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="check-history-product"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="box-history">
                    <div className="row">
                      <div className="col-3 box-history-img">
                        <img src={product} alt="product-img" />
                      </div>
                      <div className="col-9 ">
                        <div className="row ">
                          <div className="col-12 box-history-title ps-3">
                            <h5>Veggie tomato mix</h5>
                          </div>
                          <div className="col box-history-info ps-3">
                            <p>IDR 34.000</p>
                            <p>Delivered</p>
                          </div>
                          <div className="col-2 d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="check-history-product"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="box-history">
                    <div className="row">
                      <div className="col-3 box-history-img">
                        <img src={product} alt="product-img" />
                      </div>
                      <div className="col-9 ">
                        <div className="row ">
                          <div className="col-12 box-history-title ps-3">
                            <h5>Veggie tomato mix</h5>
                          </div>
                          <div className="col box-history-info ps-3">
                            <p>IDR 34.000</p>
                            <p>Delivered</p>
                          </div>
                          <div className="col-2 d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="check-history-product"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="box-history">
                    <div className="row">
                      <div className="col-3 box-history-img">
                        <img src={product} alt="product-img" />
                      </div>
                      <div className="col-9 ">
                        <div className="row ">
                          <div className="col-12 box-history-title ps-3">
                            <h5>Veggie tomato mix</h5>
                          </div>
                          <div className="col box-history-info ps-3">
                            <p>IDR 34.000</p>
                            <p>Delivered</p>
                          </div>
                          <div className="col-2 d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="check-history-product"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="box-history">
                    <div className="row">
                      <div className="col-3 box-history-img">
                        <img src={product} alt="product-img" />
                      </div>
                      <div className="col-9 ">
                        <div className="row ">
                          <div className="col-12 box-history-title ps-3">
                            <h5>Veggie tomato mix</h5>
                          </div>
                          <div className="col box-history-info ps-3">
                            <p>IDR 34.000</p>
                            <p>Delivered</p>
                          </div>
                          <div className="col-2 d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="check-history-product"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="box-history">
                    <div className="row">
                      <div className="col-3 box-history-img">
                        <img src={product} alt="product-img" />
                      </div>
                      <div className="col-9 ">
                        <div className="row ">
                          <div className="col-12 box-history-title ps-3">
                            <h5>Veggie tomato mix</h5>
                          </div>
                          <div className="col box-history-info ps-3">
                            <p>IDR 34.000</p>
                            <p>Delivered</p>
                          </div>
                          <div className="col-2 d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="check-history-product"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="box-history">
                    <div className="row">
                      <div className="col-3 box-history-img">
                        <img src={product} alt="product-img" />
                      </div>
                      <div className="col-9 ">
                        <div className="row ">
                          <div className="col-12 box-history-title ps-3">
                            <h5>Veggie tomato mix</h5>
                          </div>
                          <div className="col box-history-info ps-3">
                            <p>IDR 34.000</p>
                            <p>Delivered</p>
                          </div>
                          <div className="col-2 d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="check-history-product"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="box-history">
                    <div className="row">
                      <div className="col-3 box-history-img">
                        <img src={product} alt="product-img" />
                      </div>
                      <div className="col-9 ">
                        <div className="row ">
                          <div className="col-12 box-history-title ps-3">
                            <h5>Veggie tomato mix</h5>
                          </div>
                          <div className="col box-history-info ps-3">
                            <p>IDR 34.000</p>
                            <p>Delivered</p>
                          </div>
                          <div className="col-2 d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="check-history-product"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="box-history">
                    <div className="row">
                      <div className="col-3 box-history-img">
                        <img src={product} alt="product-img" />
                      </div>
                      <div className="col-9 ">
                        <div className="row ">
                          <div className="col-12 box-history-title ps-3">
                            <h5>Veggie tomato mix</h5>
                          </div>
                          <div className="col box-history-info ps-3">
                            <p>IDR 34.000</p>
                            <p>Delivered</p>
                          </div>
                          <div className="col-2 d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="check-history-product"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="box-history">
                    <div className="row">
                      <div className="col-3 box-history-img">
                        <img src={product} alt="product-img" />
                      </div>
                      <div className="col-9 ">
                        <div className="row ">
                          <div className="col-12 box-history-title ps-3">
                            <h5>Veggie tomato mix</h5>
                          </div>
                          <div className="col box-history-info ps-3">
                            <p>IDR 34.000</p>
                            <p>Delivered</p>
                          </div>
                          <div className="col-2 d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="check-history-product"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="box-history">
                    <div className="row">
                      <div className="col-3 box-history-img">
                        <img src={product} alt="product-img" />
                      </div>
                      <div className="col-9 ">
                        <div className="row ">
                          <div className="col-12 box-history-title ps-3">
                            <h5>Veggie tomato mix</h5>
                          </div>
                          <div className="col box-history-info ps-3">
                            <p>IDR 34.000</p>
                            <p>Delivered</p>
                          </div>
                          <div className="col-2 d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="check-history-product"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </section>
              </section>
            </div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default History;
