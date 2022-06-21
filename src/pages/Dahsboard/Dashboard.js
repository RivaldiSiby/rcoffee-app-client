import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/NavbarSignIn/Navbar";

import "./Dahsboard.css";
// img
import loadingImg from "../../asset/img/loading.gif";
import stafPhoto from "../../asset/img/dashboardPage/iconphoto.png";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { successLogin } from "../../redux/actionCreator/login";
import GenerateToken from "../../helper/GenerateToken";
import axios from "axios";
import ErrorsHandler from "../../helper/ErrorsHandler";
// img

function Dashboard() {
  // css untuk mengatur data penjualan
  // income
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  // const navigate = useNavigate();
  const [dailyDate, setDailyDate] = useState(false);
  // const [dailyTotal, setDailyTotal] = useState(false);

  // data daily
  // income
  const [stem_income_1, setStem_income_1] = useState({ height: "1%" });
  const [stem_income_2, setStem_income_2] = useState({ height: "1%" });
  const [stem_income_3, setStem_income_3] = useState({ height: "1%" });
  const [stem_income_4, setStem_income_4] = useState({ height: "1%" });
  const [stem_income_5, setStem_income_5] = useState({ height: "1%" });
  const [stem_income_6, setStem_income_6] = useState({ height: "1%" });
  // outcome
  const [stem_outcome_1, setStem_outcome_1] = useState({ height: "1%" });
  const [stem_outcome_2, setStem_outcome_2] = useState({ height: "1%" });
  const [stem_outcome_3, setStem_outcome_3] = useState({ height: "1%" });
  const [stem_outcome_4, setStem_outcome_4] = useState({ height: "1%" });
  const [stem_outcome_5, setStem_outcome_5] = useState({ height: "1%" });
  const [stem_outcome_6, setStem_outcome_6] = useState({ height: "1%" });

  // tarik data product
  useEffect(() => {
    const getDaily = async () => {
      setLoading(true);
      GenerateToken(login.auth, (Data) => {
        dispatch(successLogin(Data));
      })
        .then(async (token) => {
          try {
            const data = await axios.get(
              `${process.env.REACT_APP_HOST}/transaction/daily`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            // console.log(data.data.data.totalDay1.total);
            // console.log(data.data.data.totalDay1.date);
            // console.log(data.data.data.totalDay1.total.toString().slice(0, 3));
            // console.log(data.data.data.totalDay2.total.toString().slice(0, 3));
            // //  atur total penjualan dengan
            // data.data.data.map((item) => {
            //   console.log(item.total);
            // });
            console.log(data.data.data);
            if (data.data.data !== false) {
              const stemincome1 = {
                height: `${(data.data.data.totalDay0.total / 1000000) * 100}%`,
              };
              const stemincome2 = {
                height: `${(data.data.data.totalDay1.total / 1000000) * 100}%`,
              };
              const stemincome3 = {
                height: `${(data.data.data.totalDay2.total / 1000000) * 100}%`,
              };
              const stemincome4 = {
                height: `${(data.data.data.totalDay3.total / 1000000) * 100}%`,
              };
              const stemincome5 = {
                height: `${(data.data.data.totalDay4.total / 1000000) * 100}%`,
              };
              const stemincome6 = {
                height: `${(data.data.data.totalDay5.total / 1000000) * 100}%`,
              };

              setStem_income_1(stemincome6);
              setStem_income_2(stemincome5);
              setStem_income_3(stemincome4);
              setStem_income_4(stemincome3);
              setStem_income_5(stemincome2);
              setStem_income_6(stemincome1);

              // outcome
              const stemoutcome1 = {
                height: "5%",
              };
              const stemoutcome2 = {
                height: "5%",
              };
              const stemoutcome3 = {
                height: "5%",
              };
              const stemoutcome4 = {
                height: "5%",
              };
              const stemoutcome5 = {
                height: "5%",
              };
              const stemoutcome6 = {
                height: "5%",
              };
              setStem_outcome_1(stemoutcome6);
              setStem_outcome_2(stemoutcome5);
              setStem_outcome_3(stemoutcome4);
              setStem_outcome_4(stemoutcome3);
              setStem_outcome_5(stemoutcome2);
              setStem_outcome_6(stemoutcome1);

              // date daily
              const monthStr = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ];
              const dateDaily = [
                `${new Date(data.data.data.totalDay0.date).getDate()} ${
                  monthStr[new Date(data.data.data.totalDay0.date).getMonth()]
                }`,
                `${new Date(data.data.data.totalDay1.date).getDate()} ${
                  monthStr[new Date(data.data.data.totalDay1.date).getMonth()]
                }`,
                `${new Date(data.data.data.totalDay2.date).getDate()} ${
                  monthStr[new Date(data.data.data.totalDay2.date).getMonth()]
                }`,
                `${new Date(data.data.data.totalDay3.date).getDate()} ${
                  monthStr[new Date(data.data.data.totalDay3.date).getMonth()]
                }`,
                `${new Date(data.data.data.totalDay4.date).getDate()} ${
                  monthStr[new Date(data.data.data.totalDay4.date).getMonth()]
                }`,
                `${new Date(data.data.data.totalDay5.date).getDate()} ${
                  monthStr[new Date(data.data.data.totalDay5.date).getMonth()]
                }`,
              ];
              setDailyDate(dateDaily);
            }
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
    };
    getDaily();
  }, []);
  return (
    <>
      {loading === true ? (
        <div className="w-100 ">
          <img className="img-loading mx-auto" src={loadingImg} alt="loading" />
        </div>
      ) : (
        <>
          <Navbar navActive={"dashboard"} />
          <main className="dashboard-body">
            <div className="container">
              <div className="row">
                <section className="col-md-12  dashboard-body-head">
                  <h5>See how your store progress so far</h5>
                  <section className="row list-bullet-dashboard d-flex justify-content-center">
                    <section className="col-3  d-flex justify-content-center ">
                      <section className="bullet-dashboard bullet-dashboard-active"></section>
                    </section>
                    <section className="col-3  d-flex justify-content-center">
                      <section className="bullet-dashboard "></section>
                    </section>
                    <section className="col-3  d-flex justify-content-center">
                      <section className="bullet-dashboard"></section>
                    </section>
                  </section>
                  <section className="row list-bullet-dashboard d-flex justify-content-center">
                    <section className="col-3  text-center bullet-text-active">
                      Daily
                    </section>
                    <section className="col-3  text-center ">Weekly</section>
                    <section className="col-3  text-center">Monthly</section>
                  </section>
                </section>
                {/* chart */}
                <section className="col-lg-8  dashboard-body-chart shadow">
                  <div className="container">
                    <section className="body-chart-head d-flex">
                      <div className="text-head-chart">
                        <h5>Daily Report</h5>
                        <p>Last 6 days</p>
                      </div>
                      <div className="bullet-list-chart d-flex justify-content-end">
                        <section className="bullet-btn-chart"></section>
                        <section className="bullet-btn-chart"></section>
                        <section className="bullet-btn-chart"></section>
                      </div>
                    </section>
                    <section className="body-chart-main">
                      <div className="row">
                        <section className="col-3 side-text-chart">
                          <section className="chart-text-income">
                            <section>
                              <p className="id-rupiah-text">IDR</p>
                              <p>1M</p>
                            </section>
                            <section>
                              <p className="id-rupiah-text">IDR</p>
                              <p>600k</p>
                            </section>
                            <section>
                              <p className="id-rupiah-text">IDR</p>
                              <p>0k</p>
                            </section>
                          </section>
                          <section className="chart-text-outcome">
                            -
                            <section>
                              <p className="id-rupiah-text">IDR</p>
                              <p>400k</p>
                            </section>
                          </section>
                        </section>
                        <section className="col-9 chart-info-graphic">
                          <section className="main-graphic-chart">
                            <section className="graphic-chart-income">
                              <div className="row">
                                <section className="col-2 stem-chart-income d-flex justify-content-center align-items-end">
                                  <section
                                    style={stem_income_1}
                                    className="stem-graph-income"
                                  ></section>
                                </section>
                                <section className="col-2 stem-chart-income d-flex justify-content-center align-items-end">
                                  <section
                                    style={stem_income_2}
                                    className="stem-graph-income"
                                  ></section>
                                </section>
                                <section className="col-2 stem-chart-income d-flex justify-content-center align-items-end">
                                  <section
                                    style={stem_income_3}
                                    className="stem-graph-income"
                                  ></section>
                                </section>
                                <section className="col-2 stem-chart-income d-flex justify-content-center align-items-end">
                                  <section
                                    style={stem_income_4}
                                    className="stem-graph-income"
                                  ></section>
                                </section>
                                <section className="col-2 stem-chart-income d-flex justify-content-center align-items-end">
                                  <section
                                    style={stem_income_5}
                                    className="stem-graph-income"
                                  ></section>
                                </section>
                                <section className="col-2 stem-chart-income d-flex justify-content-center align-items-end">
                                  <section
                                    style={stem_income_6}
                                    className="stem-graph-income"
                                  ></section>
                                </section>
                              </div>
                            </section>
                            <section className="graphic-chart-outcome">
                              <div className="row">
                                <section className="col-2 stem-chart-outcome d-flex justify-content-center ">
                                  <section
                                    style={stem_outcome_1}
                                    className="stem-graph-outcome "
                                  ></section>
                                </section>
                                <section className="col-2 stem-chart-outcome d-flex justify-content-center ">
                                  <section
                                    style={stem_outcome_2}
                                    className="stem-graph-outcome "
                                  ></section>
                                </section>
                                <section className="col-2 stem-chart-outcome d-flex justify-content-center ">
                                  <section
                                    style={stem_outcome_3}
                                    className="stem-graph-outcome "
                                  ></section>
                                </section>
                                <section className="col-2 stem-chart-outcome d-flex justify-content-center ">
                                  <section
                                    style={stem_outcome_4}
                                    className="stem-graph-outcome "
                                  ></section>
                                </section>
                                <section className="col-2 stem-chart-outcome d-flex justify-content-center ">
                                  <section
                                    style={stem_outcome_5}
                                    className="stem-graph-outcome "
                                  ></section>
                                </section>
                                <section className="col-2 stem-chart-outcome d-flex justify-content-center ">
                                  <section
                                    style={stem_outcome_6}
                                    className="stem-graph-outcome "
                                  ></section>
                                </section>
                              </div>
                            </section>
                          </section>
                          <section className="main-graphic-text">
                            <div className="row info-graph-text">
                              <section className="col-2 ">
                                <p>{dailyDate[5]}</p>
                              </section>
                              <section className="col-2 ">
                                <p>{dailyDate[4]}</p>
                              </section>
                              <section className="col-2 ">
                                <p>{dailyDate[3]}</p>
                              </section>
                              <section className="col-2 ">
                                <p>{dailyDate[2]}</p>
                              </section>
                              <section className="col-2 ">
                                <p>{dailyDate[1]}</p>
                              </section>
                              <section className="col-2 ">
                                <p>{dailyDate[0]}</p>
                              </section>
                            </div>
                          </section>
                        </section>
                      </div>
                    </section>
                    <section className="body-chart-foot ">
                      <div className="d-flex justify-content-center w-100 ">
                        <section className="d-flex ">
                          <section className="bullet-income"></section>{" "}
                          <p>Income</p>
                        </section>
                        <section className="d-flex ">
                          <section className="bullet-outcome"></section>{" "}
                          <p>Outcome</p>
                        </section>
                      </div>
                    </section>
                  </div>
                </section>
                {/* chart */}
                <section className="col-lg-4  dashboard-body-info">
                  <section className="dashboard-body-info-up shadow">
                    <section className="best-staf-info-head">
                      <div className="row d-flex">
                        <section className="col-4 photo-staf-icon ">
                          <img src={stafPhoto} alt="staf-best" />
                        </section>
                        <section className=" col-8 text-staf-info">
                          <h5>Cheryn Laurent</h5>
                          <p>Keep up the good work and spread love!</p>
                        </section>
                      </div>
                    </section>
                    <section className="best-staf-info-body text-center">
                      <h5>Best Staff of the Month</h5>
                      <section className="mx-auto d-flex align-items-center justify-content-center ">
                        80%
                      </section>
                      <p>Achieved 3.5M of total 5M 478 Customer</p>
                    </section>
                  </section>
                  <section className="dashboard-body-info-down shadow">
                    <h5>Goals</h5>
                    <p>Your goals is still on 76%. Keep up the good work!</p>
                    <section className="mx-auto d-flex align-items-center justify-content-center ">
                      76%
                    </section>
                    <div className="info-bullet-down">
                      <div className="row d-flex justify-content-center">
                        <section className="col-1 text-center">
                          <section className="bullet-goals-icon-active"></section>
                        </section>
                        <section className="col-1 text-center">
                          <section className="bullet-goals-icon"></section>
                        </section>
                        <section className="col-1 text-center">
                          <section className="bullet-goals-icon"></section>
                        </section>
                      </div>
                    </div>
                  </section>
                </section>
                <section className="col-md-12  dashboard-body-foot">
                  <div className="row d-flex">
                    <section className="col-sm-8">
                      <button className="w-100">Download Report</button>
                    </section>
                    <section className="col-sm-4">
                      <button className="share-btn-report">Share Report</button>
                    </section>
                  </div>
                </section>
              </div>
            </div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default Dashboard;
