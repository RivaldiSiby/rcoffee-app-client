import React, { useState, useEffect } from "react";

import NavbarSignIn from "../../components/NavbarSignIn/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Payment.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// img
import loadingImg from "../../asset/img/loading.gif";
import card from "../../asset/img/paymentPage/card.svg";
import bank from "../../asset/img/paymentPage/bank.svg";
import deliv from "../../asset/img/paymentPage/deliv.svg";
import noorder from "../../asset/img/bgchart.png";
// img

function Payment(props) {
  const navigate = useNavigate();
  const params = useParams();
  const [isLogin, setisLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chart, setChart] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(null);
  const [delivery, setDelivery] = useState(null);
  const [payment, setPayment] = useState(null);
  const [coupon, setCoupon] = useState(null);
  useEffect(() => {
    setLoading(true);
    const checkToken = async () => {
      try {
        const refreshToken = JSON.parse(localStorage.getItem("refreshkey"));
        const result = await axios.get(
          `http://localhost:8080/auth/${refreshToken}`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("tokenkey")
              )}`,
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
      } catch (error) {
        setLoading(false);
        console.log(error);
        if (isLogin === false) {
          navigate("/", { replace: true, state: { isLogin: false } });
        }
      }
    };
    if (props.pageDetail === true && params.id !== null) {
      const getTrans = async () => {
        const dataTrans = await axios.get(
          `http://localhost:8080/transaction/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("tokenkey")
              )}`,
            },
          }
        );
        setTransaction(dataTrans.data.data);

        setLoading(false);
      };
      checkToken();
      getTrans();
      return;
    }
    if (localStorage.getItem("chart") !== null) {
      const dataChart = JSON.parse(localStorage.getItem("chart"));
      setChart(dataChart);
      // jumlahkan sub total
      let subtotal = [];
      dataChart.map((item) => subtotal.push(item.quantity * item.price));
      setSubtotal(subtotal.reduce((total, value) => total + value));

      // atur pajak dan ongkos kirim
      setTax(0.1);
      setDelivery(10000);

      setLoading(false);
      return;
    }
  }, []);
  const checkToken = async () => {
    try {
      const refreshToken = JSON.parse(localStorage.getItem("refreshkey"));
      const result = await axios.get(
        `http://localhost:8080/auth/${refreshToken}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("tokenkey")
            )}`,
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
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (isLogin === false) {
        navigate("/", { replace: true, state: { isLogin: false } });
      }
    }
  };
  const confirmPayment = async () => {
    try {
      setLoading(true);
      // cek token
      await checkToken();
      // jalankan operasi
      let products = [];
      chart.map((item) =>
        products.push({ stock_id: item.id, quantity: item.quantity })
      );
      const data = {
        coupon: coupon,
        products,
        delivery_cost: `${delivery}`,
        tax: `${tax}`,
        payment_method: payment,
      };
      await axios.post("http://localhost:8080/transaction", data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("tokenkey")
          )}`,
        },
      });
      // hapus local storage chart
      localStorage.removeItem("chart");
      setLoading(false);
      return navigate("/products", {
        replace: true,
        state: { successToPay: true },
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading === true ? (
        <div className="w-100 ">
          <img className="img-loading mx-auto" src={loadingImg} alt="loading" />
        </div>
      ) : (
        <>
          <NavbarSignIn navActive={"chart"} />

          <>
            {chart !== null ? (
              <>
                <main className="payment-body">
                  <div className="container">
                    <div className="row payment-box d-flex justify-content-between">
                      <div className="col-lg-5 payment-order ">
                        <section className="order-head ">
                          <h5>Checkout your item now!</h5>
                        </section>
                        <section className="order-body">
                          <div class="container">
                            <section className="order-body-head d-flex justify-content-center align-items-center">
                              <h5>Order Summary</h5>
                            </section>
                            <section className="order-body-list ">
                              <div class="row d-flex justify-content-center">
                                {chart.map((product) => (
                                  <>
                                    <section class="col-md-11 box-order-list p-0">
                                      <section class="order-product-img">
                                        <img
                                          src={
                                            "http://localhost:8080" +
                                            product.img
                                          }
                                          alt="product-list"
                                        />
                                      </section>
                                      <section class="order-info">
                                        <section class="order-products-info">
                                          <p>{product.name}</p>
                                          <p>x {product.quantity}</p>
                                          <p>{product.size}</p>
                                        </section>

                                        <section class="order-price  d-flex align-items-center">
                                          <p>IDR {product.price}</p>
                                        </section>
                                      </section>
                                    </section>
                                  </>
                                ))}
                              </div>
                            </section>
                            <section className="order-body-cost">
                              <section class="price-order-title">
                                <p>SUBTOTAL</p>
                                <p>TAX & FEES</p>
                                <p>SHIPPING</p>
                              </section>
                              <section class="price-order-cost">
                                <p>IDR {subtotal}</p>
                                <p>IDR {(delivery + subtotal) * tax}</p>
                                <p>IDR {delivery}</p>
                              </section>
                            </section>
                            <section className="order-body-foot">
                              <h5>TOTAL</h5>
                              <h5>
                                IDR{" "}
                                {delivery +
                                  subtotal +
                                  (delivery + subtotal) * tax}
                              </h5>
                            </section>
                          </div>
                        </section>
                      </div>
                      <div className="col-lg-5 payment-option ">
                        <section className="option-address">
                          <section className="option-address-head d-flex justify-content-between">
                            <h5>Address details</h5>
                            <p className="d-flex align-items-center">edit</p>
                          </section>
                          <section className="option-address-body">
                            <div className="container">
                              <div className="option-address-title">
                                <p>
                                  Delivery <span>to Iskandar Street</span>
                                </p>
                              </div>
                              <div className="option-address-text">
                                <p>
                                  Km 5 refinery road oppsite re public road,
                                  effurun, Jakarta
                                </p>
                              </div>
                              <div className="option-address-phone">
                                <p>+62 81348287878</p>
                              </div>
                            </div>
                          </section>
                        </section>
                        <section className="option-method">
                          <section className="option-method-head">
                            <h5>Payment method</h5>
                          </section>
                          <section className="option-method-body d-flex justify-content-center align-items-center">
                            <div className="container ">
                              <div className="form-check form-method-option">
                                <input
                                  onChange={() => setPayment("card")}
                                  className="form-check-input input-radio-method "
                                  type="radio"
                                  name="exampleRadios"
                                  id="exampleRadios1"
                                  value="option1"
                                />
                                <label
                                  className="form-check-label label-method-payment label-method-payment"
                                  htmlFor="exampleRadios1"
                                >
                                  <section className="d-flex justify-content-center align-items-center color-method-card">
                                    <img src={card} alt="vector-method" />
                                  </section>
                                  <p>Card</p>
                                </label>
                              </div>
                              <div className="form-check form-method-option">
                                <input
                                  onChange={() => setPayment("bank account")}
                                  className="form-check-input input-radio-method"
                                  type="radio"
                                  name="exampleRadios"
                                  id="exampleRadios2"
                                  value="option2"
                                />
                                <label
                                  className="form-check-label label-method-payment"
                                  htmlFor="exampleRadios2"
                                >
                                  <section className="d-flex justify-content-center align-items-center color-method-bank">
                                    <img src={bank} alt="vector-method" />
                                  </section>
                                  <p>Bank account</p>
                                </label>
                              </div>
                              <div className="form-check form-method-option">
                                <input
                                  onChange={() =>
                                    setPayment("cash on delivery")
                                  }
                                  className="form-check-input input-radio-method"
                                  type="radio"
                                  name="exampleRadios"
                                  id="exampleRadios3"
                                  value="option3"
                                />
                                <label
                                  className="form-check-label label-method-payment "
                                  htmlFor="exampleRadios3"
                                >
                                  <section className="d-flex justify-content-center align-items-center color-method-deliv">
                                    <img src={deliv} alt="vector-method" />
                                  </section>
                                  <p>Cash on delivery</p>
                                </label>
                              </div>
                            </div>
                          </section>
                        </section>
                        <section className="option-foot d-flex justify-content-center ">
                          <button onClick={confirmPayment}>
                            Confirm and Pay
                          </button>
                        </section>
                      </div>
                    </div>
                  </div>
                </main>
              </>
            ) : (
              <>
                <section className="no-order-chart text-center">
                  <img src={noorder} alt="no-order" />
                  <h5>no order for checkout</h5>
                </section>
              </>
            )}
          </>
          <Footer />
        </>
      )}
    </div>
  );
}

export default Payment;
