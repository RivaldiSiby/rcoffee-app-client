import React, { useState } from "react";
import AddProduct from "../../components/Form/Add_product";
import "./Form.css";
// img

import loadingImg from "../../asset/img/loading.gif";
import loadImg from "../../asset/img/load.gif";
import imgicon from "../../asset/img/formPage/imgicon.png";
// img

import Footer from "../../components/Footer/Footer";
import NavbarSignIn from "../../components/NavbarSignIn/Navbar";
import AddPromo from "../../components/Form/Add_promo";

function Form({ form }) {
  return (
    <>
      <NavbarSignIn navActive={"products"} />
      {form === "add_product" ? (
        <>
          <AddProduct imgicon={imgicon} load={loadImg} />
        </>
      ) : (
        <></>
      )}
      {form === "add_promo" ? (
        <>
          <AddPromo imgicon={imgicon} load={loadImg} />
        </>
      ) : (
        <></>
      )}

      <Footer />
    </>
  );
}

export default Form;
