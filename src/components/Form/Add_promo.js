import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Add_promo({ imgicon }) {
  const [datestart, setDatestart] = useState(false);
  const [dateend, setDateend] = useState(false);
  const navigate = useNavigate();
  // data
  const [sizeS, setSizeS] = useState(false);
  const [sizeR, setSizeR] = useState(false);
  const [sizeL, setSizeL] = useState(false);
  const [size, setSize] = useState("");
  const [delivery1, setDelivery1] = useState(false);
  const [delivery2, setDelivery2] = useState(false);
  const [delivery3, setDelivery3] = useState(false);
  const [delivery, setDelivery] = useState(false);

  // size handler
  // size handler
  const smallHandler = () => {
    setSizeS(true);
    setSizeR(false);
    setSizeL(false);
    setSize("small");
    return;
  };
  const regulerHandler = () => {
    setSizeR(true);
    setSizeL(false);
    setSizeS(false);
    setSize("reguler");
    return;
  };
  const largeHandler = () => {
    setSizeL(true);
    setSizeS(false);
    setSizeR(false);
    setSize("large");
    return;
  };

  // delivery method handler
  const delivery1Handler = () => {
    setDelivery1(true);
    setDelivery2(false);
    setDelivery3(false);
    setDelivery("home delivery");
    return;
  };
  const delivery2Handler = () => {
    setDelivery2(true);
    setDelivery1(false);
    setDelivery3(false);
    setDelivery("dine in");
    return;
  };
  const delivery3Handler = () => {
    setDelivery3(true);
    setDelivery2(false);
    setDelivery1(false);
    setDelivery("take away");
    return;
  };
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
                <p>{"> Add new promo"}</p>
              </section>
              <section className="img-left-form d-flex justify-content-center align-items-center mx-auto">
                <img src={imgicon} alt="img-prototype" />
              </section>
              <button className="btn-form-left-box mx-auto btn-take-style">
                Take a picture
              </button>
              <label
                htmlFor="img-promo"
                className="btn-form-left-box mx-auto btn-gallery-style d-flex justify-content-center align-items-center"
              >
                Choose from gallery
              </label>
              <input type="file" className="d-none" name="img" id="img-promo" />
              <section className="section-discount-form">
                <label className="label-box-input-form">
                  Enter the discount :
                </label>
                <input
                  type="number"
                  className="form-control select-input-form-left"
                  placeholder="Input discount"
                />
              </section>
              <section className="section-expire-form">
                <label className="label-box-input-form">Expire date :</label>
                <input
                  type={datestart === true ? "date" : "text"}
                  className="form-control select-input-form-left"
                  placeholder="Select start date"
                  onFocus={() => setDatestart(true)}
                />
                <input
                  type={dateend === true ? "date" : "text"}
                  className="form-control select-input-form-left"
                  placeholder="Select end date"
                  onFocus={() => setDateend(true)}
                />
              </section>
              <section className="section-coupon-form">
                <label className="label-box-input-form">
                  Input coupon code :
                </label>
                <input
                  type="text"
                  className="form-control select-input-form-left"
                  placeholder="Input code"
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
                    placeholder="Type promo name min. 50 characters"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label label-box-input-form">
                    Normal Price : :
                  </label>
                  <input
                    type="text"
                    className="form-control input-box-form-right"
                    placeholder="Type the normal price"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label label-box-input-form">
                    Description :
                  </label>
                  <textarea
                    className="form-control input-box-form-right"
                    placeholder="Describe your promo min. 150 characters"
                  ></textarea>
                </div>
              </section>
              <section className="group-form-input-right-down">
                <label className="form-label label-box-input-form">
                  Input product size :
                </label>
                <p>Click product size you want to use for this promo</p>
                <section className="size-select-form-box">
                  <div className="row">
                    <div className="col-2 text-center">
                      <section
                        onClick={() => smallHandler()}
                        className={`bullet-size-form-left d-flex justify-content-center align-items-center ${
                          sizeS === true ? "bullet-size-form-left-active" : ""
                        }`}
                      >
                        S
                      </section>
                    </div>
                    <div className="col-2 text-center">
                      <section
                        onClick={() => regulerHandler()}
                        className={`bullet-size-form-left d-flex justify-content-center align-items-center ${
                          sizeR === true ? "bullet-size-form-left-active" : ""
                        }`}
                      >
                        R
                      </section>
                    </div>
                    <div className="col-2 text-center">
                      <section
                        onClick={() => largeHandler()}
                        className={`bullet-size-form-left d-flex justify-content-center align-items-center ${
                          sizeL === true ? "bullet-size-form-left-active" : ""
                        }`}
                      >
                        L
                      </section>
                    </div>
                    <div className="col-2 text-center">
                      <section
                        onClick={() => smallHandler()}
                        className={`bullet-size-form-right d-flex justify-content-center align-items-center ${
                          sizeS === true ? "bullet-size-form-right-active" : ""
                        }`}
                      >
                        Small
                      </section>
                    </div>
                    <div className="col-2 text-center">
                      <section
                        onClick={() => regulerHandler()}
                        className={`bullet-size-form-right d-flex justify-content-center align-items-center ${
                          sizeR === true ? "bullet-size-form-right-active" : ""
                        }`}
                      >
                        Reguler
                      </section>
                    </div>
                    <div className="col-2 text-center">
                      <section
                        onClick={() => largeHandler()}
                        className={`bullet-size-form-right d-flex justify-content-center align-items-center ${
                          sizeL === true ? "bullet-size-form-right-active" : ""
                        }`}
                      >
                        Large
                      </section>
                    </div>
                  </div>
                </section>
                <label className="form-label label-box-input-form">
                  Input delivery methods :
                </label>
                <p>Click methods you want to use for this promo</p>
                <section className="delivery-select-form-box">
                  <section
                    onClick={() => delivery1Handler()}
                    className={`d-flex justify-content-center align-items-center ${
                      delivery1 === true
                        ? "btn-delivery-style2"
                        : "btn-delivery-style1"
                    }`}
                  >
                    Home Delivery
                  </section>
                  <section
                    onClick={() => delivery2Handler()}
                    className={`d-flex justify-content-center align-items-center ${
                      delivery2 === true
                        ? "btn-delivery-style2"
                        : "btn-delivery-style1"
                    }`}
                  >
                    Dine in
                  </section>
                  <section
                    onClick={() => delivery3Handler()}
                    className={`d-flex justify-content-center align-items-center ${
                      delivery3 === true
                        ? "btn-delivery-style2"
                        : "btn-delivery-style1"
                    }`}
                  >
                    Take away
                  </section>
                </section>

                <button className="btn-right-form-save">Save Promo</button>
                <button
                  onClick={() => navigate("/products")}
                  className="btn-right-form-cancel"
                >
                  Cancel
                </button>
              </section>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Add_promo;
