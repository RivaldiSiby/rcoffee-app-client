import React, { useState, useEffect } from "react";
import GenerateToken from "../../helper/GenerateToken";
import NavbarSignIn from "../../components/NavbarSignIn/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Payment.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// img
import loadingImg from "../../asset/img/loading.gif";

import noorder from "../../asset/img/bgchart.png";
import Main from "../../components/Payment/Main";
// img
import { useSelector, useDispatch } from "react-redux";
import { successLogin } from "../../redux/actionCreator/login";
import { clearChart } from "../../redux/actionCreator/chart";

function Payment() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const chart = useSelector((state) => state.chart);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(null);
  const [delivery, setDelivery] = useState(null);
  const [payment, setPayment] = useState(null);
  const [coupon, setCoupon] = useState(null);
  useEffect(() => {
    if (chart.chart.length > 0) {
      setLoading(true);
      // jumlahkan sub total
      let subtotal = [];
      chart.chart.map((item) => subtotal.push(item.quantity * item.price));
      setSubtotal(subtotal.reduce((total, value) => total + value));

      // atur pajak dan ongkos kirim
      setTax(0.1);
      setDelivery(10000);
      setCoupon(null);
      setLoading(false);
      return;
    }
  }, []);

  const confirmPayment = async () => {
    try {
      setLoading(true);
      // cek token
      const token = await GenerateToken(login.auth, (Data) => {
        dispatch(successLogin(Data));
      });
      // jalankan operasi
      let products = [];
      chart.chart.map((item) =>
        products.push({ stock_id: item.id, quantity: item.quantity })
      );
      const data = {
        coupon: coupon,
        products,
        delivery_cost: `${delivery}`,
        tax: `${tax}`,
        payment_method: payment,
      };
      await axios.post("http://localhost:8080/transaction", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // hapus local storage chart
      dispatch(clearChart());
      setLoading(false);
      return navigate("/products", {
        replace: true,
        state: { successToPay: true },
      });
    } catch (error) {
      console.log(error);
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
          <NavbarSignIn navActive={"chart"} />
          {chart.chart !== null ? (
            <>
              <Main
                chart={chart.chart}
                subtotal={subtotal}
                delivery={delivery}
                tax={tax}
                setPayment={setPayment}
                confirmPayment={confirmPayment}
              />
            </>
          ) : (
            <>
              <section className="no-order-chart text-center">
                <img src={noorder} alt="no-order" />
                <h5>no order for checkout</h5>
              </section>
            </>
          )}
          <Footer />
        </>
      )}
    </div>
  );
}

export default Payment;
