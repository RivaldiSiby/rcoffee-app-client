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

function Payment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [chart, setChart] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(null);
  const [delivery, setDelivery] = useState(null);
  const [payment, setPayment] = useState(null);
  const [coupon, setCoupon] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("chart") !== null) {
      setLoading(true);
      const dataChart = JSON.parse(localStorage.getItem("chart"));
      setChart(dataChart);
      // jumlahkan sub total
      let subtotal = [];
      dataChart.map((item) => subtotal.push(item.quantity * item.price));
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
      await GenerateToken();
      // jalankan operasi
      let products = [];
      chart.map((item) =>
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
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("tokenkey")
          )}`,
        },
      });
      // hapus local storage chart
      localStorage.removeItem("chart");
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
          {chart !== null ? (
            <>
              <Main
                chart={chart}
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
