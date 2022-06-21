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
import iconDel from "../../asset/img/productsDetailPage/iconDel.png";
import iconCek from "../../asset/img/productsDetailPage/iconCek.svg";
import GenerateToken from "../../helper/GenerateToken";
// img

import { useSelector, useDispatch } from "react-redux";
import { successLogin } from "../../redux/actionCreator/login";
import { addChart } from "../../redux/actionCreator/chart";
import ErrorsHandler from "../../helper/ErrorsHandler";

function ProductDetails() {
  let params = useParams();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const chart = useSelector((state) => state.chart);
  const role = useSelector((state) => state.user.user.role);
  const navigate = useNavigate();
  const [isLogin, setisLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isadd, setIsadd] = useState(false);
  const Navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  // data
  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [previewImg, setPreviewImage] = useState(null);
  // data

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        await GenerateToken(login.auth, (Data) => {
          dispatch(successLogin(Data));
        });
        setisLogin(true);
        const product = await axios.get(
          `${process.env.REACT_APP_HOST}/product/${params.id}`,
          {}
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
        axios
          .get(`${process.env.REACT_APP_HOST}/product/${params.id}`, {})
          .then((product) => {
            setProducts(product.data.data);
            // get product detail
            product.data.data.map((product) =>
              product.size === params.size ? setProductDetail(product) : ""
            );

            setLoading(false);
          });
      }
    };
    getProduct();
  }, []);

  useEffect(() => {
    if (role !== "admin") {
      const btn = document.getElementById("btn-min");
      if (quantity <= 1) {
        btn.classList.add("d-none");
      }
      if (quantity > 1) {
        btn.classList.remove("d-none");
      }
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
    navigate(`/products/${params.id}/${size}`, { replace: true });
    setQuantity(1);
  };

  // add cart
  const addChartHandler = async (e) => {
    e.preventDefault();
    try {
      await GenerateToken(login.auth, (Data) => {
        dispatch(successLogin(Data));
      });
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
      if (chart.chart.length > 0) {
        const checkProduct = chart.chart.findIndex(
          (item) => item.id === dataProduct.id
        );
        if (checkProduct !== -1) {
          chart.chart[checkProduct].quantity =
            chart.chart[checkProduct].quantity + dataProduct.quantity;
          const data = [...chart.chart];
          dispatch(addChart(data));
          return setIsadd(true);
        }
        const data = [...chart.chart, dataProduct];
        dispatch(addChart(data));
        return setIsadd(true);
      }

      dispatch(addChart([dataProduct]));
      return setIsadd(true);
    } catch (error) {
      navigate("/login", { replace: true });
    }
  };
  const checkoutHandler = async (e) => {
    e.preventDefault();
    try {
      await GenerateToken(login.auth, (Data) => {
        dispatch(successLogin(Data));
      });
      addChartHandler(e);
      Navigate("/chart");
    } catch (error) {
      navigate("/login", { replace: true });
    }
  };
  // edit handler
  const editHandler = (e) => {
    e.preventDefault();
    setName(productDetail.name);
    setPrice(productDetail.price);
    setDescription(productDetail.description);
    setEdit(true);
    return;
  };
  // img handler
  const imgHandler = (e) => {
    const toPreview = URL.createObjectURL(e.target.files[0]);
    setPreviewImage(toPreview);
    const img = e.target.files[0];
    setImg(img);
  };
  // edit product handler
  const editProductHandler = async (e) => {
    let FormProduct = new FormData();
    setLoading(true);
    try {
      const token = await GenerateToken(login.auth, (Data) => {
        dispatch(successLogin(Data));
      });
      // product
      img !== "" ? FormProduct.append("photo", img) : setImg("");
      name !== "" ? FormProduct.append("name", name) : setName("");
      description !== ""
        ? FormProduct.append("description", description)
        : setDescription("");
      setLoading(false);
      await axios.patch(
        `${process.env.REACT_APP_HOST}/product/${params.id}`,
        FormProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "multipart/form-data",
          },
        }
      );
      // update price stock
      const data = {
        price: price.toString(),
      };
      await axios.patch(
        `${process.env.REACT_APP_HOST}/stock/${productDetail.stock_id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/products", {
        replace: true,
        state: { successEditProduct: true },
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.request.status !== 400) {
        ErrorsHandler(error.request.status);
      }
    }
  };
  // delete product
  const deleteHandler = async () => {
    try {
      const token = await GenerateToken(login.auth, (Data) => {
        dispatch(successLogin(Data));
      });
      await axios.delete(`${process.env.REACT_APP_HOST}/product/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/products", {
        replace: true,
        state: { successDelProduct: true },
      });
    } catch (error) {
      console.log(error);
      if (error.request.status !== 400) {
        ErrorsHandler(error.request.status);
      }
    }
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
                      <span className="span-product-name">
                        {`> ${productDetail.name}`}
                        {edit === true ? ` > Edit product` : ""}
                      </span>
                    </p>
                  </section>
                  <section className="product-detail-left-body d-flex justify-content-end">
                    {edit === true ? (
                      <>
                        <label htmlFor="img-file">
                          <img
                            className="product-detail-img"
                            src={
                              previewImg === null
                                ? process.env.REACT_APP_STATUS !== "production"
                                  ? process.env.REACT_APP_HOST +
                                    productDetail.img
                                  : productDetail.img
                                : previewImg
                            }
                            alt="product-img"
                          />
                        </label>
                        <section
                          onClick={() =>
                            Swal.fire({
                              title:
                                "Are you sure want to delete this product?",
                              text: "",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, Delete!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteHandler();
                              }
                            })
                          }
                          className="d-flex justify-content-center align-items-center"
                        >
                          <img src={iconDel} alt="iconMsg" />
                        </section>
                      </>
                    ) : (
                      <>
                        <img
                          className="product-detail-img"
                          src={
                            process.env.REACT_APP_STATUS !== "production"
                              ? process.env.REACT_APP_HOST + productDetail.img
                              : productDetail.img
                          }
                          alt="product-img"
                        />
                        <section className="d-flex justify-content-center align-items-center">
                          <img src={iconMsg} alt="iconMsg" />
                        </section>
                      </>
                    )}
                  </section>
                  <input
                    type="file"
                    id="img-file"
                    className="d-none"
                    onChange={imgHandler}
                  />
                  <section className="product-detail-left-foot">
                    <p>
                      Delivery only on <b>Monday to friday</b> at{" "}
                      <b>1 - 7 pm</b>
                    </p>
                  </section>
                </div>
                <div className="col-md product-detail-right">
                  <section className="product-detail-right-head ">
                    {role === "admin" ? (
                      ""
                    ) : (
                      <>
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
                          <p className="col-2 fw-bold text-start p-0">
                            Payment
                          </p>
                        </section>
                      </>
                    )}
                  </section>
                  <section className="product-detail-right-body">
                    {role === "admin" && edit === true ? (
                      <>
                        <input
                          className="detail-name-product input-edit-detail-product"
                          value={name}
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                        />
                        <input
                          className="detail-price-product input-edit-detail-product"
                          value={price}
                          type="number"
                          onChange={(e) => setPrice(e.target.value)}
                        />
                        <textarea
                          className="detail-desc-product input-edit-detail-product"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </>
                    ) : (
                      <>
                        <h4 className="detail-name-product">
                          {productDetail.name}
                        </h4>
                        <h5 className="detail-price-product">
                          IDR {productDetail.price}
                        </h5>
                        <p className="detail-desc-product">
                          {productDetail.description}
                        </p>
                      </>
                    )}
                  </section>
                  <section className="product-detail-right-foot">
                    <section>
                      <select
                        className="form-select input-form-detail"
                        aria-label="Default select example"
                        onChange={(e) => sizeHandler(e.target.value)}
                      >
                        {products.map((product) =>
                          product.size === productDetail.size ? (
                            <option selected value={product.size}>
                              {product.size}
                            </option>
                          ) : (
                            <option value={product.size}>{product.size}</option>
                          )
                        )}
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
                        {role === "admin" ? (
                          ""
                        ) : (
                          <>
                            <div className="col-md-4">
                              <section className="input-number-quantity d-flex justify-content-between align-items-center">
                                <h5
                                  id="btn-min"
                                  onClick={() => setQuantity(quantity - 1)}
                                  className="btn-min-quantity"
                                >
                                  {" "}
                                  -{" "}
                                </h5>
                                <h5 className="quantity-value fw-bold text-dark">
                                  {quantity}
                                </h5>
                                <h5
                                  onClick={() => setQuantity(quantity + 1)}
                                  className="btn-plus-quantity"
                                >
                                  {" "}
                                  +{" "}
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
                          </>
                        )}
                        <div className="col-md-12">
                          {role === "admin" ? (
                            <>
                              {edit === true ? (
                                <button
                                  onClick={editProductHandler}
                                  className="btn-product-detail-checkout"
                                >
                                  Save change
                                </button>
                              ) : (
                                <button
                                  onClick={editHandler}
                                  className="btn-product-detail-checkout"
                                >
                                  Edit product
                                </button>
                              )}
                            </>
                          ) : (
                            <>
                              <button
                                onClick={checkoutHandler}
                                className="btn-product-detail-checkout"
                              >
                                Checkout
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </section>
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
