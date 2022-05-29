import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
// img
import edit from "../../asset/img/profilePage/edit.svg";
import loadingImg from "../../asset/img/loading.gif";
// img

import NavbarSignIn from "../../components/NavbarSignIn/Navbar";
import Footer from "../../components/Footer/Footer";

function Index() {
  const [checked, setChecked] = useState(true);
  const [isLogin, setisLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [editPass, setEditPass] = useState(false);
  const [MsgPass, setMsgPass] = useState("");
  const [MsgCPass, setMsgCPass] = useState("");
  const Navigate = useNavigate();

  // user data
  const img =
    "http://localhost:8080" + JSON.parse(localStorage.getItem("datauser"));
  const [profileImg, setProfileImg] = useState(img);
  const [profile, setProfile] = useState([]);
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Date, setDate] = useState("");
  const [Gender, setGender] = useState("");
  const [Pass, setPass] = useState("");
  const [Cpass, setCpass] = useState("");
  const [file, setfile] = useState("");
  // const [Password, setPassword] = useState("");

  // update data

  useEffect(() => {
    const checkLogin = async () => {
      setLoading(true);
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

          if (result.data.message === "token generate" && isLogin === true) {
            await localStorage.setItem(
              "tokenkey",
              JSON.stringify(result.data.data.accessToken)
            );
          }
          return;
        }
        Navigate("/");
      } catch (error) {
        setLoading(false);
        console.log(error);
        if (isLogin === false) {
          Navigate("/");
        }
      }
    };
    const getProfileData = async () => {
      setLoading(true);
      try {
        const profile = await axios.get(`http://localhost:8080/users/profile`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("tokenkey")
            )}`,
          },
        });
        setEmail(profile.data.data.email);
        setName(profile.data.data.name);
        setAddress(profile.data.data.address);
        setPhone(profile.data.data.phone);
        setDate(profile.data.data.date_birth);
        setProfile(profile.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    checkLogin();
    getProfileData();
  }, []);

  const editProfileHandler = () => {
    const edit = document.getElementById("edit-data");
    const editPhoto = document.getElementById("edit-photo");
    const input = document.querySelectorAll(".form-input");
    const area = document.querySelector(".area-input");
    const radio = document.querySelectorAll(".input-radio");

    if (disable === true) {
      for (let i = 0; i < input.length; i++) {
        input[i].removeAttribute("disabled");
      }
      for (let i = 0; i < radio.length; i++) {
        radio[i].removeAttribute("disabled");
      }
      area.removeAttribute("disabled");
      setDisable(false);
    }
    if (disable === false) {
      for (let i = 0; i < input.length; i++) {
        input[i].setAttribute("disabled", "");
      }
      for (let i = 0; i < radio.length; i++) {
        radio[i].setAttribute("disabled", "");
      }
      area.setAttribute("disabled", "");
      setDisable(true);
    }

    edit.classList.toggle("d-none");
    editPhoto.classList.toggle("d-none");
  };
  const editPasswordHandler = () => {
    const edit = document.getElementById("edit-data");
    const radio = document.getElementById("radio-foot");
    const head = document.querySelector(".form-head");
    if (editPass === false) {
      setEditPass(true);
    }
    if (editPass === true) {
      setEditPass(false);
    }
    setMsgCPass("");
    setMsgPass("");
    edit.classList.toggle("d-none");
    head.classList.toggle("d-none");
    radio.classList.toggle("d-none");
  };
  const fileHandler = (e) => {
    const file = e.target.files[0];
    const remove = document.getElementById("remove-img");
    setfile(file);
    remove.classList.toggle("d-none");
  };
  const removeFile = () => {
    const remove = document.getElementById("remove-img");
    setfile("");
    remove.classList.toggle("d-none");
  };

  const checkToken = async () => {
    try {
      const refreshToken = JSON.parse(localStorage.getItem("refreshkey"));
      const result = await axios.get(
        `http://localhost:8080/auth/${refreshToken}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("tokenkey")
            )}`,
          },
        }
      );
      if (result.data !== undefined) {
        setisLogin(true);
      }

      if (result.data.message === "token generate" && isLogin === true) {
        await localStorage.setItem(
          "tokenkey",
          JSON.stringify(result.data.data.accessToken)
        );
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (isLogin === false) {
        Navigate("/");
      }
    }
  };
  // logout handler
  const logoutHandler = async () => {
    try {
      setLoading(true);
      // cek token
      await checkToken();

      // logout API
      const refreshToken = JSON.parse(localStorage.getItem("refreshkey"));
      await axios.delete(`http://localhost:8080/auth/${refreshToken}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("tokenkey")
          )}`,
        },
      });
    } catch (error) {
      setLoading(false);
    }
    // clear storage
    setisLogin(false);
    localStorage.clear();
    setLoading(false);
    Navigate("/");
  };
  const getUserData = async () => {
    setLoading(true);
    try {
      const profile = await axios.get(`http://localhost:8080/users/profile`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("tokenkey")
          )}`,
        },
      });

      if (file !== "") {
        localStorage.setItem("datauser", JSON.stringify(profile.data.data.img));
        const img =
          "http://localhost:8080" +
          JSON.parse(localStorage.getItem("datauser"));
        setProfileImg(img);
      }

      setEmail(profile.data.data.email);
      setName(profile.data.data.name);
      setAddress(profile.data.data.address);
      setPhone(profile.data.data.phone);
      setDate(profile.data.data.date_birth);
      setProfile(profile.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const saveFormHandler = async () => {
    let formData = new FormData();

    // handler change password

    try {
      if (Pass !== "") {
        setMsgCPass("Confirm password does not match");
        if (Pass.length < 8) {
          setMsgPass("Password Length Min Must 8 ");
          return;
        }

        if (Pass !== Cpass) {
          setMsgCPass("Confirm password does not match");
          return;
        }
        Pass !== "" ? formData.append("password", Pass) : setPass("");
      }

      file !== "" ? formData.append("photo", file) : setfile("");
      Email !== "" ? formData.append("email", Email) : setEmail("");
      Address !== "" ? formData.append("address", Address) : setAddress("");
      Name !== "" ? formData.append("name", Name) : setName("");
      Phone !== "" ? formData.append("phone", Phone) : setPhone("");
      Date !== "" ? formData.append("date_birth", Date) : setDate("");

      setLoading(true);
      setEditPass(false);
      setPass("");
      setMsgCPass("");
      setMsgPass("");
      // cek token
      await checkToken();
      // post data
      await axios.patch("http://localhost:8080/users", formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("tokenkey")
          )}`,
          "Content-type": "multipart/form-data",
        },
      });
      // get User Data
      await getUserData();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading === true ? (
        <div className="w-100 ">
          <img className="img-loading mx-auto" src={loadingImg} alt="loading" />
        </div>
      ) : (
        <>
          <NavbarSignIn />
          <section className="profile-body">
            <div className="container">
              <div className="profile">
                <div className="profile-title">User Profile</div>
                <div className="profile-box">
                  <div className="row">
                    <div className="col-md-4 profile-info d-flex flex-column align-items-center">
                      <div className="profile-head">
                        <img src={profileImg} alt="profile" />
                        <h5>
                          {profile.name}
                          <br />
                          <span>{profile.email}</span>
                        </h5>
                      </div>
                      <div className="profile-layout d-flex flex-column align-items-center">
                        <div
                          id="edit-photo"
                          className="d-flex flex-column align-items-center d-none"
                        >
                          <p className="fw-bold">
                            {file.name !== undefined
                              ? `Img : ${file.name}`
                              : ""}
                          </p>
                          <label
                            htmlFor="img-file"
                            className="btn-photo c-yellow"
                          >
                            Choose photo
                          </label>
                          <button
                            id="remove-img"
                            className="btn-photo c-brown d-none"
                            onClick={removeFile}
                          >
                            Remove photo
                          </button>
                        </div>

                        <button
                          onClick={() => editPasswordHandler()}
                          className="btn-edit c-white"
                        >
                          Edit Password
                        </button>
                        <div
                          id="edit-data"
                          className="d-flex flex-column align-items-center d-none"
                        >
                          <p className="layout-text">
                            Do you want to save the change?
                          </p>
                          <button
                            type="submit"
                            onClick={saveFormHandler}
                            className="btn-edit c-brown shadow"
                          >
                            Save Change
                          </button>
                          <button
                            onClick={
                              editPass === true
                                ? () => editPasswordHandler()
                                : () => editProfileHandler()
                            }
                            className="btn-edit c-yellow mt-2"
                          >
                            Cancel
                          </button>
                        </div>

                        <button
                          onClick={logoutHandler}
                          className="btn-edit c-white"
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                    <div className="col-md-8 user-info">
                      <div className="container">
                        <div className="row">
                          <div className="col-md-12 form-head">
                            <p>Contacts</p>
                            <section onClick={() => editProfileHandler()}>
                              <img src={edit} alt="edit-icon" />
                            </section>
                          </div>
                          <form className="col-md-12 profile-form">
                            <div className="row">
                              {editPass === true ? (
                                <>
                                  <div className="col-lg-7 left-form">
                                    <p className="form-title">Edit Password</p>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="new-pass"
                                        className="form-label label-input"
                                      >
                                        New Password :
                                      </label>
                                      <input
                                        onChange={(e) =>
                                          setPass(e.target.value)
                                        }
                                        type="password"
                                        className="form-control form-input detail-form"
                                        id="new-pass"
                                        aria-describedby="nameHelp"
                                      />
                                      <p className="fw-bold text-danger">
                                        {MsgPass}
                                      </p>
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="confirm-pass"
                                        className="form-label label-input"
                                      >
                                        Confirm New Password :
                                      </label>
                                      <input
                                        type="password"
                                        onChange={(e) =>
                                          setCpass(e.target.value)
                                        }
                                        className="form-control form-input detail-form"
                                        id="confirm-pass"
                                        aria-describedby="nameHelp"
                                      />
                                      <p className="fw-bold text-danger">
                                        {MsgCPass}
                                      </p>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
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
                                        name="email"
                                        className="form-control form-input"
                                        id="email"
                                        onChange={(e) =>
                                          setEmail(e.target.value)
                                        }
                                        aria-describedby="emailHelp"
                                        placeholder="email"
                                        value={Email}
                                        disabled
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="address"
                                        className="form-label label-input"
                                      >
                                        Delivery address :
                                      </label>
                                      <textarea
                                        className="form-control area-input"
                                        id="address"
                                        onChange={(e) =>
                                          setAddress(e.target.value)
                                        }
                                        placeholder="address"
                                        rows="2"
                                        value={Address}
                                        disabled
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
                                        onChange={(e) =>
                                          setName(e.target.value)
                                        }
                                        aria-describedby="nameHelp"
                                        value={Name}
                                        disabled
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
                                        value={Name}
                                        disabled
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
                                        value={Name}
                                        disabled
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
                                        onChange={(e) =>
                                          setPhone(e.target.value)
                                        }
                                        aria-describedby="MobileHelp"
                                        value={Phone}
                                        disabled
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
                                        type="date"
                                        className="form-control form-input detail-form"
                                        id="Date"
                                        onChange={(e) =>
                                          setDate(e.target.value)
                                        }
                                        placeholder="mm/dd/yyyy"
                                        aria-describedby="DateHelp"
                                        value={Date}
                                        disabled
                                      />
                                    </div>
                                    <input
                                      id="img-file"
                                      type="file"
                                      onChange={fileHandler}
                                      className="d-none"
                                    />
                                  </div>
                                </>
                              )}
                            </div>
                          </form>
                          <div className="col-md-12 form-foot">
                            <div
                              id="radio-foot"
                              className="row d-flex justify-content-center align-items-center"
                            >
                              <div className="col-md-5">
                                <div className="form-check form-gender d-flex justify-content-end">
                                  <input
                                    className="form-check-input input-radio"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="male"
                                    disabled
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
                                    disabled
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
        </>
      )}
    </div>
  );
}

export default Index;
