import React from "react";
// img
import card from "../../asset/img/paymentPage/card.svg";
import bank from "../../asset/img/paymentPage/bank.svg";
import deliv from "../../asset/img/paymentPage/deliv.svg";
// img

function Detail({ data, user }) {
  return (
    <>
      <main className="payment-body">
        <div className="container">
          <div className="row payment-box d-flex justify-content-between">
            <div className="col-lg-5 payment-order ">
              <section className="order-head ">
                <h5>Detail your Transcation item </h5>
              </section>
              <section className="order-body">
                <div className="container">
                  <section className="order-body-head d-flex justify-content-center align-items-center">
                    <h5>Order Summary</h5>
                  </section>
                  <section className="order-body-list ">
                    <div className="row d-flex justify-content-center">
                      {data.products.map((product) => (
                        <>
                          {product.name !== undefined ? (
                            <section className="col-md-11 box-order-list p-0">
                              <section className="order-product-img">
                                <img
                                  src={
                                    process.env.REACT_APP_STATUS !==
                                    "production"
                                      ? process.env.REACT_APP_HOST + product.img
                                      : product.img
                                  }
                                  alt="product-list"
                                />
                              </section>
                              <section className="order-info">
                                <section className="order-products-info">
                                  <p>{product.name}</p>
                                  <p>x {product.quantity}</p>
                                  <p>{product.size}</p>
                                </section>

                                <section className="order-price  d-flex align-items-center">
                                  <p>IDR {product.price}</p>
                                </section>
                              </section>
                            </section>
                          ) : (
                            ""
                          )}
                        </>
                      ))}
                    </div>
                  </section>
                  <section className="order-body-cost">
                    <section className="price-order-title">
                      <p>SUBTOTAL</p>
                      <p>TAX & FEES</p>
                      <p>SHIPPING</p>
                    </section>
                    <section className="price-order-cost">
                      <p>
                        IDR {data.products[data.products.length - 1].item_total}
                      </p>
                      <p>
                        IDR{" "}
                        {parseInt(
                          data.products[data.products.length - 1].item_total
                        ) * parseFloat(data.tax)}
                      </p>
                      <p>IDR {data.delivery_cost}</p>
                    </section>
                  </section>
                  <section className="order-body-foot">
                    <h5>TOTAL</h5>
                    <h5>IDR {data.total}</h5>
                  </section>
                </div>
              </section>
            </div>
            <div className="col-lg-5 payment-option ">
              <section className="option-address">
                <section className="option-address-head d-flex justify-content-between">
                  <h5>Address details</h5>
                  <p className="d-flex align-items-center"></p>
                </section>
                <section className="option-address-body">
                  <div className="container">
                    <div className="option-address-title">
                      <p>
                        Delivery <span>to </span>
                      </p>
                    </div>
                    <div className="option-address-text">
                      <p>{user.user.address}</p>
                    </div>
                    <div className="option-address-phone">
                      <p>{user.user.phone}</p>
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
                      {data.payment_method === "card" ? (
                        <>
                          <input
                            className="form-check-input input-radio-method "
                            type="radio"
                            disabled
                            name="exampleRadios"
                            id="exampleRadios1"
                            value="option1"
                            defaultChecked
                          />
                        </>
                      ) : (
                        <>
                          <input
                            className="form-check-input input-radio-method "
                            type="radio"
                            disabled
                            name="exampleRadios"
                            id="exampleRadios1"
                            value="option1"
                          />
                        </>
                      )}
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
                      {data.payment_method === "bank account" ? (
                        <>
                          <input
                            className="form-check-input input-radio-method "
                            type="radio"
                            disabled
                            name="exampleRadios"
                            id="exampleRadios2"
                            value="option2"
                            defaultChecked
                          />
                        </>
                      ) : (
                        <>
                          <input
                            className="form-check-input input-radio-method "
                            type="radio"
                            disabled
                            name="exampleRadios"
                            id="exampleRadios2"
                            value="option2"
                          />
                        </>
                      )}
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
                      {data.payment_method === "cash on delivery" ? (
                        <>
                          <input
                            className="form-check-input input-radio-method "
                            type="radio"
                            disabled
                            name="exampleRadios"
                            id="exampleRadios3"
                            value="option3"
                            defaultChecked
                          />
                        </>
                      ) : (
                        <>
                          <input
                            className="form-check-input input-radio-method "
                            type="radio"
                            disabled
                            name="exampleRadios"
                            id="exampleRadios3"
                            value="option3"
                          />
                        </>
                      )}
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Detail;
