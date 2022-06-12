import React, { useState } from "react";
import AddProduct from "../../components/Form/Add_product";
import "./Form.css";
// img

import loadingImg from "../../asset/img/loading.gif";
// import loadImg from "../../asset/img/load.gif";
import imgicon from "../../asset/img/formPage/imgicon.png";
// img

import Footer from "../../components/Footer/Footer";
import NavbarSignIn from "../../components/NavbarSignIn/Navbar";
import AddPromo from "../../components/Form/Add_promo";

function Form({ form }) {
  const [loading, setLoading] = useState(false);
  return (
    <>
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
          <NavbarSignIn navActive={"products"} />
          {form === "add_product" ? (
            <>
              <AddProduct imgicon={imgicon} />
            </>
          ) : (
            <></>
          )}
          {form === "add_promo" ? (
            <>
              <AddPromo imgicon={imgicon} />
            </>
          ) : (
            <></>
          )}

          <Footer />
        </>
      )}
    </>
  );
}

export default Form;
