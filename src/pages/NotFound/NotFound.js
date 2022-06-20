import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import NavbarSignIn from "../../components/NavbarSignIn/Navbar";

// img
import img404 from "../../asset/img/404.jpg";
import Footer from "../../components/Footer/Footer";
import { useSelector } from "react-redux";

function NotFound() {
  const isLogin = useSelector((state) => state.login.status);
  return (
    <div>
      {isLogin === true ? (
        <NavbarSignIn navActive={"products"} />
      ) : (
        <Navbar navActive={"products"} />
      )}
      <section className="no-order-chart text-center">
        <img src={img404} alt="no-order" />
      </section>
      <Footer />
    </div>
  );
}

export default NotFound;
