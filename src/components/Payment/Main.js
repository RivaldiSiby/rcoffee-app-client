import React from "react";
// img
import card from "../../asset/img/paymentPage/card.svg";
import bank from "../../asset/img/paymentPage/bank.svg";
import deliv from "../../asset/img/paymentPage/deliv.svg";
// img

function Main({ chart, subtotal, delivery, tax, setPayment, confirmPayment }) {
  return (
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
                                src={"http://localhost:8080" + product.img}
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
                      IDR {delivery + subtotal + (delivery + subtotal) * tax}
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
                        Km 5 refinery road oppsite re public road, effurun,
                        Jakarta
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
                        onChange={() => setPayment("cash on delivery")}
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
                <button onClick={confirmPayment}>Confirm and Pay</button>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;
