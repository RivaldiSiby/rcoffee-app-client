import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/NavbarSignIn/Navbar";

import "./Dahsboard.css";
// img
import stafPhoto from "../../asset/img/dashboardPage/iconphoto.png";
// img

// css untuk mengatur data penjualan
// income
const stem_income_1 = {
  height: "60%",
};
const stem_income_2 = {
  height: "100%",
};
const stem_income_3 = {
  height: "80%",
};
const stem_income_4 = {
  height: "70%",
};
const stem_income_5 = {
  height: "90%",
};
const stem_income_6 = {
  height: "75%",
};
// outcome
const stem_outcome_1 = {
  height: "50%",
};
const stem_outcome_2 = {
  height: "60%",
};
const stem_outcome_3 = {
  height: "100%",
};
const stem_outcome_4 = {
  height: "40%",
};
const stem_outcome_5 = {
  height: "80%",
};
const stem_outcome_6 = {
  height: "90%",
};
function Dashboard() {
  return (
    <>
      <Navbar />
      <main className="dashboard-body">
        <div className="container">
          <div className="row">
            <section className="col-md-12  dashboard-body-head">
              <h5>See how your store progress so far</h5>
              <section className="row list-bullet-dashboard d-flex justify-content-center">
                <section className="col-3  d-flex justify-content-center ">
                  <section className="bullet-dashboard"></section>
                </section>
                <section className="col-3  d-flex justify-content-center">
                  <section className="bullet-dashboard bullet-dashboard-active"></section>
                </section>
                <section className="col-3  d-flex justify-content-center">
                  <section className="bullet-dashboard"></section>
                </section>
              </section>
              <section className="row list-bullet-dashboard d-flex justify-content-center">
                <section className="col-3  text-center">Daily</section>
                <section className="col-3  text-center bullet-text-active">
                  Weekly
                </section>
                <section className="col-3  text-center">Monthly</section>
              </section>
            </section>
            {/* chart */}
            <section className="col-lg-8  dashboard-body-chart shadow">
              <div className="container">
                <section className="body-chart-head d-flex">
                  <div className="text-head-chart">
                    <h5>Weekly Report</h5>
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
                          <p>IDR</p>
                          <p>1M</p>
                        </section>
                        <section>
                          <p>IDR</p>
                          <p>600k</p>
                        </section>
                        <section>
                          <p>IDR</p>
                          <p>0k</p>
                        </section>
                      </section>
                      <section className="chart-text-outcome">
                        -
                        <section>
                          <p>IDR</p>
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
                          <section className="col-2 text-center">
                            <p>Mon</p>
                          </section>
                          <section className="col-2 text-center">
                            <p>Teu</p>
                          </section>
                          <section className="col-2 text-center">
                            <p>Wed</p>
                          </section>
                          <section className="col-2 text-center">
                            <p>Thu</p>
                          </section>
                          <section className="col-2 text-center">
                            <p>Fri</p>
                          </section>
                          <section className="col-2 text-center">
                            <p>Sat</p>
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
                <section className="col-md-8">
                  <button className="w-100">Download Report</button>
                </section>
                <section className="col-md-4">
                  <button className="share-btn-report">Share Report</button>
                </section>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Dashboard;
