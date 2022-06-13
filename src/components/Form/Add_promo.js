import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import GenerateToken from "../../helper/GenerateToken";
import { successLogin } from "../../redux/actionCreator/login";
import axios from "axios";

function Add_promo({ imgicon, load }) {
  const [datestart, setDatestart] = useState(false);
  const [dateend, setDateend] = useState(false);
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // data
  const [sizeS, setSizeS] = useState(false);
  const [sizeR, setSizeR] = useState(false);
  const [sizeL, setSizeL] = useState(false);
  const [products, setProducts] = useState(false);
  const [size, setSize] = useState("");
  const [delivery1, setDelivery1] = useState(false);
  const [delivery2, setDelivery2] = useState(false);
  const [delivery3, setDelivery3] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [name, setName] = useState("");
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [periodStart, setPeriodStart] = useState("");
  const [expire, setExpire] = useState("");
  const [coupon, setCoupon] = useState("");
  const [img, setImg] = useState("");

  // tarik data product
  useEffect(() => {
    setLoading(true);
    GenerateToken(login.auth, (Data) => {
      dispatch(successLogin(Data));
    })
      .then(async (token) => {
        try {
          const product = await axios.get(
            `${process.env.REACT_APP_HOST}/product/product`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProducts(product.data.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);
  // add handler
  const addHandler = async () => {
    let FormPromo = new FormData();
    try {
      setLoading(true);
      const token = await GenerateToken(login.auth, (Data) => {
        dispatch(successLogin(Data));
      });
      // Promos
      img !== "" ? FormPromo.append("photo", img) : setImg("");
      name !== "" ? FormPromo.append("name", name) : setName("");
      product !== "" ? FormPromo.append("product_id", product) : setProduct("");
      size !== "" ? FormPromo.append("size", size) : setSize("");
      expire !== "" ? FormPromo.append("expire", expire) : setExpire("");
      periodStart !== ""
        ? FormPromo.append("period_start", periodStart)
        : setPeriodStart("");
      discount !== ""
        ? FormPromo.append("discount", discount)
        : setDiscount("");
      coupon !== "" ? FormPromo.append("coupon", coupon) : setCoupon("");
      description !== ""
        ? FormPromo.append("description", description)
        : setDescription("");
      await axios.post(`${process.env.REACT_APP_HOST}/promos`, FormPromo, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "multipart/form-data",
        },
      });
      setLoading(false);
      navigate("/products", {
        replace: true,
        state: { successAddPromo: true },
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // img handler
  const imgHandler = (e) => {
    const img = e.target.files[0];
    setImg(img);
    console.log(img);
  };
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
      {loading === true ? (
        <>
          {" "}
          <img src={load} className="img-load-absolute" alt="load" />
        </>
      ) : (
        ""
      )}
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
              <input
                onChange={imgHandler}
                type="file"
                className="d-none"
                name="img"
                id="img-promo"
              />
              <section className="section-discount-form">
                <label className="label-box-input-form">
                  Enter the discount :
                </label>
                <input
                  type="number"
                  onChange={(e) => setDiscount(e.target.value)}
                  className="form-control select-input-form-left"
                  placeholder="Input discount"
                />
              </section>
              <section className="section-expire-form">
                <label className="label-box-input-form">Expire date :</label>
                <input
                  type={datestart === true ? "datetime-local" : "text"}
                  className="form-control select-input-form-left"
                  placeholder="Select start date"
                  onFocus={() => setDatestart(true)}
                  onChange={(e) => setPeriodStart(e.target.value)}
                />
                <input
                  type={dateend === true ? "datetime-local" : "text"}
                  className="form-control select-input-form-left"
                  placeholder="Select end date"
                  onFocus={() => setDateend(true)}
                  onChange={(e) => setExpire(e.target.value)}
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
                  onChange={(e) => setCoupon(e.target.value)}
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
                    onChange={(e) => setName(e.target.value)}
                    className="form-control input-box-form-right"
                    placeholder="Type promo name min. 50 characters"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label label-box-input-form">
                    Product :
                  </label>
                  <select
                    onChange={(e) => setProduct(e.target.value)}
                    className="form-select input-box-form-right"
                    aria-label="Default select example"
                  >
                    <option selected>Select Product</option>
                    {products !== false ? (
                      <>
                        {products.map((item) => (
                          <>
                            <option value={item.id}>{item.name}</option>
                          </>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label label-box-input-form">
                    Description :
                  </label>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
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

                <button onClick={addHandler} className="btn-right-form-save">
                  Save Promo
                </button>
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
