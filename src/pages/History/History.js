import React, { useState, useEffect } from "react";
import NavbarSignIn from "../../components/NavbarSignIn/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate, Link } from "react-router-dom";
import "./History.css";
import axios from "axios";
import GenerateToken from "../../helper/GenerateToken";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { failLogin, successLogin } from "../../redux/actionCreator/login";
// img
import loadingImg from "../../asset/img/loading.gif";
import icon from "../../asset/img/historyPage/icon.png";
import loadImg from "../../asset/img/load.gif";
import ErrorsHandler from "../../helper/ErrorsHandler";
// img

function History() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [select, setSelect] = useState(false);
  const [relog, setRelog] = useState(false);

  // data
  const [history, setHistory] = useState([]);
  const [dataDelete, setDataDelete] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
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
          setRelog(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        dispatch(failLogin());
        Navigate("/login", { replace: true });
      }
    };
    getTransaction();
  }, [relog]);

  useEffect(() => {
    if (isDelete === true) {
      Swal.fire("Success", "Delete Success", "success");
    }
  }, [isDelete]);

  const addDeleteHandler = (id) => {
    if (dataDelete.length === 0) {
      setDataDelete([...dataDelete, id]);
      return;
    }

    const findData = dataDelete.indexOf(id);
    // hapus data jika sudah ada

    console.log(findData);
    if (findData >= 0) {
      let replaceData = [...dataDelete];
      replaceData.splice(findData, 1);
      setDataDelete([...replaceData]);
      return;
    }
    if (findData === -1) {
      setDataDelete([...dataDelete, id]);
      return;
    }

    return;
  };
  const deleteHandler = async () => {
    try {
      setLoad(true);
      const token = await GenerateToken(login.auth, (Data) => {
        dispatch(successLogin(Data));
      });
      const data = { id: dataDelete };
      await axios.patch(
        `${process.env.REACT_APP_HOST}/transaction/delete`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsDelete(true);
      setLoad(false);
      setRelog(true);
    } catch (error) {
      console.log(error);
      setLoad(false);
      if (error.request.status !== 400) {
        ErrorsHandler(error.request.status);
      }
    }
  };

  return (
    <div>
      {load === true ? (
        <>
          {" "}
          <img src={loadImg} className="img-load-absolute" alt="load" />
        </>
      ) : (
        ""
      )}
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
                    onClick={() => {
                      setDataDelete([]);
                      setSelect(select === false ? true : false);
                    }}
                    className="select-history"
                  >
                    Select item to delete
                  </p>
                  {select === true ? (
                    <>
                      <p onClick={deleteHandler} className="delete-history">
                        Delete
                      </p>
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
                                          onChange={() =>
                                            addDeleteHandler(item.id)
                                          }
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
