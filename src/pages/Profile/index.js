import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";
// img
import profile from "../../asset/img/profilePage/profile.png";
import edit from "../../asset/img/profilePage/edit.svg";

// img

import NavbarSignIn from "../../components/NavbarSignIn/Navbar";
import Footer from "../../components/Footer/Footer";

function Index() {
  const [checked, setChecked] = useState(true);
  const [isLogin, setisLogin] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    checkLogin();
  });

  const checkLogin = async () => {
    try {
      const haveToken =
        localStorage.getItem("tokenkey") !== undefined
          ? JSON.parse(localStorage.getItem("tokenkey"))
          : null;
      if (haveToken !== null) {
        const refreshToken = JSON.parse(localStorage.getItem("refreshkey"));
        // cek token

        const result = await axios.get(
          `http://localhost:8080/auth/${refreshToken}`,
          {
            headers: {
              Authorization: `Bearer ${haveToken}`,
            },
          }
        );

        if (result.data !== undefined) {
          setisLogin(true);
        }

        if (result.data.message === "") {
          console.log(result.data.message);
          localStorage.setItem(
            "tokenkey",
            JSON.stringify(result.data.data.accessToken)
          );

          return;
        }
      }
      if (isLogin === false) {
        Navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (isLogin === false) {
        Navigate("/");
      }
    }
  };

  return (
    <div>
      <NavbarSignIn />
      <section className="profile-body">
        <div className="container">
          <div className="profile">
            <div className="profile-title">User Profile</div>
            <div className="profile-box">
              <div className="row">
                <div className="col-md-4 profile-info d-flex flex-column align-items-center">
                  <div className="profile-head">
                    <img src={profile} alt="profile" />
                    <h5>
                      Zulaikha
                      <br />
                      <span>zulaikha17@gmail.com</span>
                    </h5>
                  </div>
                  <div className="profile-layout d-flex flex-column align-items-center">
                    <section className="btn-photo c-yellow">
                      Choose photo
                    </section>
                    <section className="btn-photo c-brown">
                      Remove photo
                    </section>
                    <section className="btn-edit c-white">
                      Edit Password
                    </section>
                    <p className="layout-text">
                      Do you want to save the change?
                    </p>
                    <section className="btn-edit c-brown shadow">
                      Save Change
                    </section>
                    <section className="btn-edit c-yellow mt-2">Cancel</section>
                    <section className="btn-edit c-white">Log out</section>
                  </div>
                </div>
                <div className="col-md-8 user-info">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12 form-head">
                        <p>Contacts</p>
                        <section>
                          <img src={edit} alt="edit-icon" />
                        </section>
                      </div>
                      <form className="col-md-12 profile-form">
                        <div className="row">
                          <div className="col-lg-7 left-form">
                            <div className="mb-3">
                              <label
                                htmlFor="address"
                                className="form-label label-input"
                              >
                                Email address :
                              </label>
                              <input
                                type="email"
                                className="form-control form-input"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="email"
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="address"
                                className="form-label label-input"
                              >
                                Delivery adress :
                              </label>
                              <textarea
                                className="form-control area-input"
                                id="address"
                                placeholder="address"
                                rows="2"
                              ></textarea>
                            </div>
                            <p className="form-title">Details</p>
                            <div className="mb-3">
                              <label
                                htmlFor="name"
                                className="form-label label-input"
                              >
                                Display name :
                              </label>
                              <input
                                type="text"
                                className="form-control form-input detail-form"
                                id="name"
                                aria-describedby="nameHelp"
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="firstname"
                                className="form-label label-input"
                              >
                                First name :
                              </label>
                              <input
                                type="text"
                                className="form-control form-input detail-form"
                                id="firstname"
                                aria-describedby="firstnameHelp"
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="lastname"
                                className="form-label label-input"
                              >
                                Last name :
                              </label>
                              <input
                                type="text"
                                className="form-control form-input detail-form"
                                id="lastname"
                                aria-describedby="lastnameHelp"
                              />
                            </div>
                          </div>
                          <div className="col-lg-5 right-form">
                            <div className="mb-3">
                              <label
                                htmlFor="Mobile"
                                className="form-label label-input"
                              >
                                Mobile number :
                              </label>
                              <input
                                type="text"
                                className="form-control form-input detail-form"
                                id="Mobile"
                                aria-describedby="MobileHelp"
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="Date"
                                className="form-label label-input"
                              >
                                DD/MM/YY
                              </label>
                              <input
                                type="text"
                                className="form-control form-input detail-form"
                                id="Date"
                                placeholder="mm/dd/yyyy"
                                aria-describedby="DateHelp"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                      <div className="col-md-12 form-foot">
                        <div className="row d-flex justify-content-center align-items-center">
                          <div className="col-md-5">
                            <div className="form-check form-gender d-flex justify-content-end">
                              <input
                                className="form-check-input input-radio"
                                type="radio"
                                name="flexRadioDefault"
                                id="male"
                              />
                              <label
                                className="form-check-labe label-radio d-flex justify-content-center align-items-center"
                                htmlFor="male"
                              >
                                Male
                              </label>
                            </div>
                          </div>
                          <div className="col-md-7">
                            <div className="form-check form-gender d-flex justify-content-center align-items-center">
                              <input
                                className="form-check-input input-radio"
                                type="radio"
                                name="flexRadioDefault"
                                id="Female"
                                checked={checked}
                                onChange={() => setChecked(!checked)}
                              />
                              <label
                                className="form-check-labe label-radio d-flex justify-content-center align-items-center"
                                htmlFor="Female"
                              >
                                Female
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Index;
