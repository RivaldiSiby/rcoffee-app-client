import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import GenerateToken from "../../helper/GenerateToken";
import { successLogin } from "../../redux/actionCreator/login";
import axios from "axios";

// img
import editIcon from "../../asset/img/productsPage/iconedit.svg";
import ErrorsHandler from "../../helper/ErrorsHandler";

function Add_promo({ imgicon, load }) {
  const [datestart, setDatestart] = useState(false);
  const [dateend, setDateend] = useState(false);
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const params = useParams(false);
  // data
  const [sizeS, setSizeS] = useState(false);
  const [sizeR, setSizeR] = useState(false);
  const [sizeL, setSizeL] = useState(false);
  const [products, setProducts] = useState(false);
  const [size, setSize] = useState("");
  const [name, setName] = useState("");
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [periodStart, setPeriodStart] = useState("");
  const [expire, setExpire] = useState("");
  const [coupon, setCoupon] = useState("");
  const [img, setImg] = useState("");
  const [previewImg, setPreviewImage] = useState(null);
  const [promo, setPromo] = useState(false);

  // tarik data product
  useEffect(() => {
    setLoading(true);
    GenerateToken(login.auth, (Data) => {
      dispatch(successLogin(Data));
    })
      .then(async (token) => {
        try {
          if (params.id !== undefined) {
            const promo = await axios.get(
              `${process.env.REACT_APP_HOST}/promos/${params.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setCoupon(promo.data.data.coupon);
            setName(promo.data.data.name);
            setDiscount(promo.data.data.discount);
            setDescription(promo.data.data.description);
            setExpire(promo.data.data.expire);

            setPromo(promo.data.data);
            if (promo.data.data.size === "small") {
              setSizeS(true);
              setSize(promo.data.data.size);
            }
            if (promo.data.data.size === "reguler") {
              setSizeR(true);
              setSize(promo.data.data.size);
            }
            if (promo.data.data.size === "large") {
              setSizeL(true);
              setSize(promo.data.data.size);
            }
          }

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
          if (error.request.status !== 400) {
            ErrorsHandler(error.request.status);
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        if (error.request.status !== 400) {
          ErrorsHandler(error.request.status);
        }
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
      console.log(img !== "");
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
      if (params.id !== undefined) {
        await axios.patch(
          `${process.env.REACT_APP_HOST}/promos/${params.id}`,
          FormPromo,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post(`${process.env.REACT_APP_HOST}/promos`, FormPromo, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "multipart/form-data",
          },
        });
      }

      setLoading(false);
      if (params.id !== undefined) {
        navigate("/products", {
          replace: true,
          state: { successEditPromo: true },
        });
        return;
      }

      navigate("/products", {
        replace: true,
        state: { successAddPromo: true },
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.request.status !== 400) {
        ErrorsHandler(error.request.status);
      }
    }
  };

  // img handler
  const imgHandler = (e) => {
    const toPreview = URL.createObjectURL(e.target.files[0]);
    setPreviewImage(toPreview);
    const img = e.target.files[0];
    setImg(img);
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
                <p>{"> Add new promo"}</p>
              </section>
              {params.id !== undefined && promo !== false ? (
                <>
                  <section className="promo-preview-edit">
                    <section className="promo-preview-edit-head text-center">
                      <img
                        className="preview-promo-head "
                        src={previewImg === null ? promo.img : previewImg}
                        alt="img-promo"
                      />
                      <label
                        htmlFor="img-promo"
                        className="d-flex justify-content-center align-items-center"
                      >
                        <img
                          className="icon-edit-preview-promo"
                          src={editIcon}
                          alt="img-edit-promo"
                        />
                      </label>
                    </section>
                    <section className="promo-preview-edit-body text-center">
                      <h5>{promo.name}</h5>
                      <h5>{parseFloat(promo.discount) * 100}% OFF</h5>
                      <p>{promo.description}</p>
                    </section>
                    <section className="promo-preview-edit-foot">
                      <p className="title-promo-coupon">COUPON CODE</p>
                      <h5>{promo.coupon}</h5>
                      <p className="token-expire-promo">
                        Valid untill {promo.expire.split("T")[0]}
                      </p>
                    </section>
                  </section>
                </>
              ) : (
                <>
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
                    htmlFor="img-promo"
                    className="btn-form-left-box mx-auto btn-gallery-style d-flex justify-content-center align-items-center"
                  >
                    Choose from gallery
                  </label>
                </>
              )}

              <input
                onChange={imgHandler}
                type="file"
                className="d-none"
                name="img"
                id="img-promo"
              />

              <section className="section-expire-form">
                <label className="label-box-input-form">Expire date :</label>
                <input
                  type={datestart === true ? "datetime-local" : "text"}
                  className="form-control select-input-form-left"
                  placeholder="Select start date"
                  value={datestart === true ? periodStart : promo.period_start}
                  onFocus={() => setDatestart(true)}
                  onChange={(e) => setPeriodStart(e.target.value)}
                />
                <input
                  type={dateend === true ? "datetime-local" : "text"}
                  className="form-control select-input-form-left"
                  placeholder="Select end date"
                  value={expire}
                  onFocus={() => setDateend(true)}
                  onChange={(e) => setExpire(e.target.value)}
                />
              </section>
              {params.id === undefined ? (
                <>
                  <section className="section-coupon-form">
                    <label className="label-box-input-form">
                      Input coupon code :
                    </label>
                    <input
                      type="text"
                      className="form-control select-input-form-left"
                      placeholder="Input code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                  </section>
                </>
              ) : (
                ""
              )}
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
                    placeholder="Type promo name min. 50 characters"
                    value={name}
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
                    {promo !== false ? (
                      <>
                        {products !== false ? (
                          <>
                            {products.map((item) =>
                              item.id === promo.product_id ? (
                                <>
                                  <option selected value={item.id}>
                                    {item.name}
                                  </option>
                                </>
                              ) : (
                                <>
                                  <option value={item.id}>{item.name}</option>
                                </>
                              )
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <>
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
                      </>
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
                    value={description}
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
                  </div>
                </section>

                <section className="section-discount-form">
                  <label className="label-box-input-form">
                    Enter the discount :
                  </label>
                  <input
                    type="number"
                    value={
                      promo.id !== undefined ? parseFloat(discount) : discount
                    }
                    onChange={(e) => setDiscount(e.target.value)}
                    className="form-control select-input-form-left"
                    placeholder="Input discount"
                  />
                </section>
                {params.id !== undefined ? (
                  <>
                    <section className="section-coupon-form">
                      <label className="label-box-input-form">
                        Input coupon code :
                      </label>
                      <input
                        type="text"
                        className="form-control select-input-form-left"
                        placeholder="Input code"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                      />
                    </section>
                  </>
                ) : (
                  ""
                )}
                <button onClick={addHandler} className="btn-right-form-save">
                  Save Promo
                </button>
                {params.id === undefined ? (
                  <>
                    <button
                      onClick={() => navigate("/products")}
                      className="btn-right-form-cancel"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  ""
                )}
              </section>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Add_promo;
