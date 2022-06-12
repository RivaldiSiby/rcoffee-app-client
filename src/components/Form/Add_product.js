import React from "react";
import { Link } from "react-router-dom";

function Add_product({ imgicon }) {
  return (
    <div>
      <main className="form-main-body">
        <div className="container">
          <div className="row box-form-primary">
            <section className="col-md-5 left-box-form">
              <section className="text-left-form d-flex">
                <Link className="link-text-form-left" to={"/products"}>
                  Favorite & Promo
                </Link>
                <p>{"> Add new product"}</p>
              </section>
              <section className="img-left-form d-flex justify-content-center align-items-center mx-auto">
                <img src={imgicon} alt="img-prototype" />
              </section>
              <button className="btn-form-left-box mx-auto btn-take-style">
                Take a picture
              </button>
              <button className="btn-form-left-box mx-auto btn-gallery-style">
                Choose from gallery
              </button>
              <section className="section-delivery-form">
                <label className="label-box-input-form">Delivery Hour :</label>
                <select
                  className="form-select select-input-form-left"
                  aria-label="Default select example"
                >
                  <option selected>Select start hour</option>
                  <option value="07">07:00</option>
                  <option value="08">08:00</option>
                  <option value="09">09:00</option>
                  <option value="10">10:00</option>
                  <option value="11">11:00</option>
                  <option value="12">12:00</option>
                  <option value="13">13:00</option>
                  <option value="14">14:00</option>
                  <option value="15">15:00</option>
                  <option value="16">16:00</option>
                  <option value="17">17:00</option>
                  <option value="18">18:00</option>
                  <option value="19">19:00</option>
                  <option value="20">20:00</option>
                  <option value="21">21:00</option>
                  <option value="22">22:00</option>
                  <option value="23">23:00</option>
                  <option value="24">24:00</option>
                </select>
                <select
                  className="form-select select-input-form-left"
                  aria-label="Default select example"
                >
                  <option selected>Select end hour</option>
                  <option value="07">07:00</option>
                  <option value="08">08:00</option>
                  <option value="09">09:00</option>
                  <option value="10">10:00</option>
                  <option value="11">11:00</option>
                  <option value="12">12:00</option>
                  <option value="13">13:00</option>
                  <option value="14">14:00</option>
                  <option value="15">15:00</option>
                  <option value="16">16:00</option>
                  <option value="17">17:00</option>
                  <option value="18">18:00</option>
                  <option value="19">19:00</option>
                  <option value="20">20:00</option>
                  <option value="21">21:00</option>
                  <option value="22">22:00</option>
                  <option value="23">23:00</option>
                  <option value="24">24:00</option>
                </select>
              </section>

              <section className="section-stock-form">
                <label className="label-box-input-form">Input stock :</label>
                <input
                  type="number"
                  className="form-control select-input-form-left"
                  placeholder="Input stock"
                />
              </section>
            </section>
            <section className="col-md-6 right-box-form">
              <section className="group-form-input-right-up">
                <div className="mb-3">
                  <label className="form-label label-box-input-form">
                    Name :
                  </label>
                  <input
                    type="text"
                    className="form-control input-box-form-right"
                    placeholder="Type product name min. 50 characters"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label label-box-input-form">
                    Price :
                  </label>
                  <input
                    type="text"
                    className="form-control input-box-form-right"
                    placeholder="Type the price"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label label-box-input-form">
                    Description :
                  </label>
                  <textarea
                    className="form-control input-box-form-right"
                    placeholder="Describe your product min. 150 characters"
                  ></textarea>
                </div>
              </section>
              <section className="group-form-input-right-down">
                <label className="form-label label-box-input-form">
                  Input product size :
                </label>
                <p>Click size you want to use for this product</p>
                <section className="size-select-form-box">
                  <div className="row">
                    <div className="col-2 text-center">
                      <section className="bullet-size-form-left d-flex justify-content-center align-items-center">
                        S
                      </section>
                    </div>
                    <div className="col-2 text-center">
                      <section className="bullet-size-form-left d-flex justify-content-center align-items-center">
                        R
                      </section>
                    </div>
                    <div className="col-2 text-center">
                      <section className="bullet-size-form-left d-flex justify-content-center align-items-center">
                        L
                      </section>
                    </div>
                    <div className="col-2 text-center">
                      <section className="bullet-size-form-right d-flex justify-content-center align-items-center">
                        Small
                      </section>
                    </div>
                    <div className="col-2 text-center">
                      <section className="bullet-size-form-right d-flex justify-content-center align-items-center">
                        Reguler
                      </section>
                    </div>
                    <div className="col-2 text-center">
                      <section className="bullet-size-form-right d-flex justify-content-center align-items-center">
                        Large
                      </section>
                    </div>
                  </div>
                </section>
                <label className="form-label label-box-input-form">
                  Input delivery methods :
                </label>
                <p>Click methods you want to use for this product</p>
                <section className="delivery-select-form-box">
                  <section className="d-flex justify-content-center align-items-center btn-delivery-style1">
                    Home Delivery
                  </section>
                  <section className="d-flex justify-content-center align-items-center btn-delivery-style1">
                    Dine in
                  </section>
                  <section className="d-flex justify-content-center align-items-center btn-delivery-style2">
                    Take away
                  </section>
                </section>

                <button className="btn-right-form-save">Save Product</button>
                <button className="btn-right-form-cancel">Cancel</button>
              </section>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Add_product;
