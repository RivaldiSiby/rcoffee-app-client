import React, { useState, useEffect } from "react";
import NavbarSignIn from "../../components/NavbarSignIn/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate, Link } from "react-router-dom";
import "./History.css";
import axios from "axios";
import GenerateToken from "../../helper/GenerateToken";
import { useSelector, useDispatch } from "react-redux";
import { failLogin, successLogin } from "../../redux/actionCreator/login";
// img
import loadingImg from "../../asset/img/loading.gif";
import icon from "../../asset/img/historyPage/icon.png";

// img

function History() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState(false);

  // data
  const [history, setHistory] = useState([]);
  // data
  useEffect(() => {
    const getTransaction = async () => {
      try {
        setLoading(true);
        const token = await GenerateToken(login.auth, (Data) => {
          dispatch(successLogin(Data));
        });
        const data = await axios.get(
          `${process.env.REACT_APP_HOST}/transaction`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data !== undefined) {
          setHistory(data.data.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        dispatch(failLogin());
        Navigate("/login", { replace: true });
      }
    };
    getTransaction();
  }, []);

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
                  <p
                    onClick={() => setSelect(select === false ? true : false)}
                    className="select-history"
                  >
                    Select item to delete
                  </p>
                  {select === true ? (
                    <>
                      <p className="delete-history">Delete</p>
                    </>
                  ) : (
                    <></>
                  )}
                </section>
                <section className="history-bought-list ">
                  {select === true ? (
                    <>
                      {history.map((item) => (
                        <>
                          <section className="box-history ">
                            <div className="row">
                              <div className="col-3 box-history-img">
                                <img src={icon} alt="product-img" />
                              </div>
                              <div className="col-9 ">
                                <div className="row ">
                                  <div className="col-12 box-history-title ps-3">
                                    <h5>{item.payment_method}</h5>
                                  </div>
                                  <div className="col box-history-info ps-3">
                                    <p>IDR {item.total}</p>
                                    <p>{item.created_at.split("T")[0]}</p>
                                  </div>
                                  <div className="col-2 d-flex align-items-center">
                                    {select === true ? (
                                      <>
                                        <input
                                          type="checkbox"
                                          className="check-history-product"
                                        />
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </>
                      ))}
                    </>
                  ) : (
                    <>
                      {history.map((item) => (
                        <>
                          <Link
                            to={"/history/" + item.id}
                            className="box-history box-cursor-pointer"
                          >
                            <div className="row">
                              <div className="col-3 box-history-img">
                                <img src={icon} alt="product-img" />
                              </div>
                              <div className="col-9 ">
                                <div className="row ">
                                  <div className="col-12 box-history-title ps-3">
                                    <h5>{item.payment_method}</h5>
                                  </div>
                                  <div className="col box-history-info ps-3">
                                    <p>IDR {item.total}</p>
                                    <p>{item.created_at.split("T")[0]}</p>
                                  </div>
                                  <div className="col-2 d-flex align-items-center">
                                    {select === true ? (
                                      <>
                                        <input
                                          type="checkbox"
                                          className="check-history-product"
                                        />
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </>
                      ))}
                    </>
                  )}
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
