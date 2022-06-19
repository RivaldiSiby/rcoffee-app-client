import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import swal from "sweetalert2";
// img
import edit from "../../asset/img/profilePage/edit.svg";
import loadingImg from "../../asset/img/loading.gif";

import iconHide from "../../asset/img/signPage/iconHide.png";
import iconShow from "../../asset/img/signPage/iconShow.jpg";
import iconUser from "../../asset/img/usericon.png";
// img
import { useSelector, useDispatch } from "react-redux";
import NavbarSignIn from "../../components/NavbarSignIn/Navbar";
import Footer from "../../components/Footer/Footer";
import GenerateToken from "../../helper/GenerateToken";
import { failLogin, successLogin } from "../../redux/actionCreator/login";
import { clearChart } from "../../redux/actionCreator/chart";
import { addUser, clearUser } from "../../redux/actionCreator/user";
import ErrorsHandler from "../../helper/ErrorsHandler";

function Profile() {
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [editPass, setEditPass] = useState(false);
  const [MsgPass, setMsgPass] = useState("");
  const [MsgCPass, setMsgCPass] = useState("");
  const [iconPass, setIconPass] = useState(iconShow);
  const [UpdateSuccess, setUpdateSuccess] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const user = useSelector((state) => state.user);
  // user data
  const img =
    login.auth["datauser"] === false
      ? iconUser
      : process.env.REACT_APP_STATUS !== "production"
      ? process.env.REACT_APP_HOST + login.auth["datauser"]
      : login.auth["datauser"];
  const [profileImg, setProfileImg] = useState(img);
  const [profile, setProfile] = useState([]);
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [Name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Date, setDate] = useState("");
  const [Gender, setGender] = useState("");
  const [Pass, setPass] = useState("");
  const [Cpass, setCpass] = useState("");
  const [file, setfile] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [type, setType] = useState("password");
  // const [Password, setPassword] = useState("");
  const [previewImg, setPreviewImage] = useState("");

  // update data

  useEffect(() => {
    const getProfileData = async () => {
      setLoading(true);
      try {
        await GenerateToken(login.auth, (Data) => {
          dispatch(successLogin(Data));
        });
        user.user.address !== undefined
          ? setAddress(user.user.address)
          : setAddress("");
        user.user.name !== undefined ? setName(user.user.name) : setName("");
        user.user.first_name !== undefined
          ? setFirstName(user.user.first_name)
          : setFirstName("");
        user.user.last_name !== undefined
          ? setLastName(user.user.last_name)
          : setLastName("");
        user.user.date_birth !== undefined
          ? setDate(user.user.date_birth)
          : setDate("");
        user.user.gender !== undefined
          ? setGender(user.user.gender)
          : setGender("");

        setEmail(user.user.email);
        setPhone(user.user.phone);
        setProfile(user.user);
        // cek checked user gender
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        if (error.request.status !== 400) {
          ErrorsHandler(error.request.status);
        }
      }
    };
    getProfileData();
  }, []);

  useEffect(() => {
    if (UpdateSuccess === true) {
      swal.fire("Success", "Profile Update success", "success");
      if (Gender !== "") {
        document.getElementById(`${Gender}`).setAttribute("checked", "");
      }
    }

    setUpdateSuccess(false);
  }, [UpdateSuccess]);

  const editProfileHandler = () => {
    const edit = document.getElementById("edit-data");
    const editPhoto = document.getElementById("edit-photo");
    const input = document.querySelectorAll(".form-input");
    const radio = document.querySelectorAll(".input-radio");
    document.querySelector(".area-input").toggleAttribute("disabled");
    if (disable === true) {
      for (let i = 0; i < input.length; i++) {
        input[i].removeAttribute("disabled");
      }
      for (let i = 0; i < radio.length; i++) {
        radio[i].removeAttribute("disabled");
      }
      if (Gender !== "") {
        document.getElementById(`${Gender}`).setAttribute("checked", "");
      }

      setDisable(false);
    }
    if (disable === false) {
      for (let i = 0; i < input.length; i++) {
        input[i].setAttribute("disabled", "");
      }
      for (let i = 0; i < radio.length; i++) {
        radio[i].setAttribute("disabled", "");
      }
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
    setShowPass(false);
  };
  const fileHandler = (e) => {
    const toPreview = URL.createObjectURL(e.target.files[0]);
    setPreviewImage(toPreview);
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

  // logout handler
  const logoutHandler = async () => {
    const logout = async () => {
      try {
        setLoading(true);

        // logout API
        const refreshToken = login.auth["refreshkey"];
        await axios.delete(
          `${process.env.REACT_APP_HOST}/auth/${refreshToken}`
        );
      } catch (error) {
        setLoading(false);
      }
      // clear storage

      dispatch(failLogin());
      dispatch(clearChart());
      dispatch(clearUser());
      setLoading(false);
      Navigate("/", { state: { logoutSuccess: true }, replace: true });
    };
    swal
      .fire({
        title: "Are you sure?",
        text: " By clicking this you will logout",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout Now!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          logout();
        }
      });
  };
  const getUserData = async () => {
    setLoading(true);
    try {
      const token = await GenerateToken(login.auth, (Data) => {
        dispatch(successLogin(Data));
      });
      const profile = await axios.get(
        `${process.env.REACT_APP_HOST}/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (file !== "") {
        const authData = {
          tokenkey: token,
          refreshkey: login.auth.refreshkey,
          datauser: profile.data.data.img,
        };
        dispatch(successLogin(authData));
        const img =
          process.env.REACT_APP_STATUS !== "production"
            ? process.env.REACT_APP_HOST + login.auth["datauser"]
            : login.auth["datauser"];
        setProfileImg(img);
      }
      dispatch(addUser(profile.data.data));

      profile.data.data.address !== undefined
        ? setAddress(profile.data.data.address)
        : setAddress("");
      profile.data.data.name !== undefined
        ? setName(profile.data.data.name)
        : setName("");
      profile.data.data.first_name !== undefined
        ? setFirstName(profile.data.data.first_name)
        : setFirstName("");
      profile.data.data.last_name !== undefined
        ? setLastName(profile.data.data.last_name)
        : setLastName("");
      profile.data.data.date_birth !== undefined
        ? setDate(profile.data.data.date_birth)
        : setDate("");
      profile.data.data.gender !== undefined
        ? setGender(profile.data.data.gender)
        : setGender("");

      setEmail(profile.data.data.email);
      setPhone(profile.data.data.phone);
      setProfile(profile.data.data);
      // cek checked user gender

      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.request.status !== 400) {
        ErrorsHandler(error.request.status);
      }
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
      FirstName !== ""
        ? formData.append("first_name", FirstName)
        : setFirstName("");
      LastName !== ""
        ? formData.append("last_name", LastName)
        : setLastName("");
      Phone !== "" ? formData.append("phone", Phone) : setPhone("");
      Date !== "" ? formData.append("date_birth", Date) : setDate("");
      Gender !== "" ? formData.append("gender", Gender) : setGender("");

      setLoading(true);
      setEditPass(false);
      setPass("");
      setMsgCPass("");
      setMsgPass("");
      // cek token
      const token = await GenerateToken(login.auth, (Data) => {
        dispatch(successLogin(Data));
      });
      // post data
      await axios.patch(`${process.env.REACT_APP_HOST}/users`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "multipart/form-data",
        },
      });
      // get User Data dan normalisasi state
      await getUserData();

      setDisable(true);
      setEditPass(false);
      setLoading(false);
      setUpdateSuccess(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.request.status !== 400) {
        ErrorsHandler(error.request.status);
      }
    }
  };
  const showPassHandler = (e) => {
    if (showPass === true) {
      setIconPass(iconShow);
      setShowPass(false);
    }
    if (showPass === false) {
      setIconPass(iconHide);
      setShowPass(true);
    }

    type === "password" ? setType("text") : setType("password");
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
                        <img
                          src={previewImg === "" ? profileImg : previewImg}
                          alt="profile"
                        />
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
                                    <label className="form-label form-text">
                                      New Password :
                                    </label>
                                    <div className="input-group mb-3">
                                      <input
                                        type={type}
                                        className="form-control form-input "
                                        placeholder="Enter your new password"
                                        aria-label="Password"
                                        aria-describedby="basic-addon1"
                                        onChange={(e) =>
                                          setPass(e.target.value)
                                        }
                                      />
                                      <span
                                        className="input-group-text form-input "
                                        id="basic-addon1"
                                        onClick={showPassHandler}
                                      >
                                        <img src={iconPass} alt="icon-pass" />
                                      </span>
                                    </div>
                                    <p className="fw-bold text-danger msg-error-new-pass">
                                      {MsgPass}
                                    </p>
                                    <label className="form-label form-text">
                                      Confirm New Password :
                                    </label>
                                    <div className="input-group mb-3">
                                      <input
                                        type={type}
                                        className="form-control form-input "
                                        placeholder="Confirm your new password"
                                        aria-label="Password"
                                        aria-describedby="basic-addon1"
                                        onChange={(e) =>
                                          setCpass(e.target.value)
                                        }
                                      />
                                      <span
                                        className="input-group-text form-input"
                                        id="basic-addon1"
                                        onClick={showPassHandler}
                                      >
                                        <img src={iconPass} alt="icon-pass" />
                                      </span>
                                    </div>
                                    <p className="fw-bold text-danger msg-error-new-pass">
                                      {MsgCPass}
                                    </p>
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
                                        placeholder="Display Name"
                                        value={Name}
                                        disabled
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="firstname"
                                        className="form-label label-input"
                                      >
                                        First Name :
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control form-input detail-form"
                                        id="firstname"
                                        aria-describedby="firstnameHelp"
                                        onChange={(e) =>
                                          setFirstName(e.target.value)
                                        }
                                        value={FirstName}
                                        placeholder="First Name"
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
                                        onChange={(e) =>
                                          setLastName(e.target.value)
                                        }
                                        value={LastName}
                                        placeholder="Last Name"
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
                                        Mobile Number :
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control form-input detail-form"
                                        id="Mobile"
                                        onChange={(e) =>
                                          setPhone(e.target.value)
                                        }
                                        aria-describedby="MobileHelp"
                                        placeholder="Phone"
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
                                    className="form-check-input input-radio male"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="male"
                                    onChange={() => setGender("male")}
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
                                    className="form-check-input input-radio female"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="female"
                                    onChange={() => setGender("female")}
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

export default Profile;
