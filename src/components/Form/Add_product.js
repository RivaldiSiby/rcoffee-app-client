import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ErrorsHandler from "../../helper/ErrorsHandler";
import GenerateToken from "../../helper/GenerateToken";
import { successLogin } from "../../redux/actionCreator/login";

function Add_product({ imgicon, load }) {
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  // const [categoryhour, setCategoryhour] = useState();
  const [hourstart, setHourstart] = useState(false);
  const [hourend, setHourend] = useState(false);
  const [stock, setStock] = useState("");
  const [img, setImg] = useState("");
  const [sizeS, setSizeS] = useState(false);
  const [sizeR, setSizeR] = useState(false);
  const [sizeL, setSizeL] = useState(false);
  const [category1, setCategory1] = useState(false);
  const [category2, setCategory2] = useState(false);
  const [category3, setCategory3] = useState(false);
  const [previewImg, setPreviewImage] = useState(null);

  // img handler
  const imgHandler = (e) => {
    const toPreview = URL.createObjectURL(e.target.files[0]);
    setPreviewImage(toPreview);
    const img = e.target.files[0];
    setImg(img);
    console.log(img);
  };
  // add handler
  const addHandler = async () => {
    let FormProduct = new FormData();
    setLoading(true);
    try {
      // cek token
      const token = await GenerateToken(login.auth, (Data) => {
        dispatch(successLogin(Data));
      });
      // product
      img !== "" ? FormProduct.append("photo", img) : setImg("");
      name !== "" ? FormProduct.append("name", name) : setName("");
      category !== ""
        ? FormProduct.append("category", category)
        : setCategory("");
      description !== ""
        ? FormProduct.append("description", description)
        : setDescription("");
      // post data product
      const product = await axios.post(
        `${process.env.REACT_APP_HOST}/product`,
        FormProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "multipart/form-data",
          },
        }
      );
      // stock
      if (product.data.data !== undefined) {
        let FormStock = {
          product_id: product.data.data.id,
          size: size,
          quantity: stock,
          price: price,
        };

        await axios.post(`${process.env.REACT_APP_HOST}/stock`, FormStock, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(FormProduct);
        navigate("/products", {
          replace: true,
          state: { successAddProduct: true },
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.request.status !== 400) {
        ErrorsHandler(error.request.status);
      }
    }
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
  // category method handler
  const category1Handler = () => {
    setCategory1(true);
    setCategory2(false);
    setCategory3(false);
    setCategory("coffee");
    return;
  };
  const category2Handler = () => {
    setCategory2(true);
    setCategory1(false);
    setCategory3(false);
    setCategory("food");
    return;
  };
  const category3Handler = () => {
    setCategory3(true);
    setCategory2(false);
    setCategory1(false);
    setCategory("noncoffee");
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
            <section className="col-lg-5 left-box-form">
              <section className="text-left-form d-flex">
                <Link className="link-text-form-left" to={"/products"}>
                  Favorite & Promo
                </Link>
                <p>{"> Add new product"}</p>
              </section>
              {previewImg === null ? (
                <>
                  <section className="img-left-form d-flex justify-content-center align-items-center mx-auto">
                    <img src={imgicon} alt="img-prototype" />
                  </section>
                </>
              ) : (
                <>
                  <img
                    src={previewImg}
                    className="img-left-form d-flex justify-content-center align-items-center mx-auto"
                    alt="img-preview"
                  />
                </>
              )}

              <button className="btn-form-left-box mx-auto btn-take-style">
                Take a picture
              </button>
              <label
                htmlFor="img-product"
                className="btn-form-left-box mx-auto btn-gallery-style d-flex justify-content-center align-items-center"
              >
                Choose from gallery
              </label>
              <input
                type="file"
                onChange={imgHandler}
                className="d-none"
                name="img"
                id="img-product"
              />
              <section className="section-delivery-form">
                <label className="label-box-input-form">Delivery Hour :</label>
                <input
                  type={hourstart === true ? "time" : "text"}
                  className="form-control select-input-form-left"
                  placeholder="Select start hour"
                  onFocus={() => setHourstart(true)}
                />
                <input
                  type={hourend === true ? "time" : "text"}
                  className="form-control select-input-form-left"
                  placeholder="Select end hour"
                  onFocus={() => setHourend(true)}
                />
              </section>

              <section className="section-stock-form">
                <label className="label-box-input-form">Input stock :</label>
                <input
                  type="number"
                  onChange={(e) => setStock(e.target.value)}
                  className="form-control select-input-form-left"
                  placeholder="Input stock"
                />
              </section>
            </section>
            <section className="col-lg-6 right-box-form">
              <section className="group-form-input-right-up">
                <div className="mb-3">
                  <label className="form-label label-box-input-form">
                    Name :
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    className="form-control input-box-form-right"
                    placeholder="Type product name min. 50 characters"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label label-box-input-form">
                    Price :
                  </label>
                  <input
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-control input-box-form-right"
                    placeholder="Type the price"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label label-box-input-form">
                    Description :
                  </label>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
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
                  Input Category Product :
                </label>
                <p>Click category you want to use for this product</p>
                <section className="delivery-select-form-box">
                  <section
                    onClick={() => category1Handler()}
                    className={`d-flex justify-content-center align-items-center ${
                      category1 === true
                        ? "btn-delivery-style2"
                        : "btn-delivery-style1"
                    }`}
                  >
                    Coffee
                  </section>
                  <section
                    onClick={() => category2Handler()}
                    className={`d-flex justify-content-center align-items-center ${
                      category2 === true
                        ? "btn-delivery-style2"
                        : "btn-delivery-style1"
                    }`}
                  >
                    Foods
                  </section>
                  <section
                    onClick={() => category3Handler()}
                    className={`d-flex justify-content-center align-items-center ${
                      category3 === true
                        ? "btn-delivery-style2"
                        : "btn-delivery-style1"
                    }`}
                  >
                    Non Coffee
                  </section>
                </section>

                <button onClick={addHandler} className="btn-right-form-save">
                  Save Product
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

export default Add_product;
