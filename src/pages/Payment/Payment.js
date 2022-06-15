import React, { useState, useEffect } from "react";
import GenerateToken from "../../helper/GenerateToken";
import NavbarSignIn from "../../components/NavbarSignIn/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Payment.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// img
import loadingImg from "../../asset/img/loading.gif";
import loadImg from "../../asset/img/load.gif";

import noorder from "../../asset/img/bgchart.png";
import Main from "../../components/Payment/Main";
// img
import { useSelector, useDispatch } from "react-redux";
import { successLogin } from "../../redux/actionCreator/login";
import { clearChart } from "../../redux/actionCreator/chart";
import Detail from "../../components/Payment/Detail";

function Payment({ detailTrans = false }) {
  let params = useParams();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const chart = useSelector((state) => state.chart);
  const user = useSelector((state) => state.user);
  const [detail, setDetail] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(null);
  const [delivery, setDelivery] = useState(null);
  const [payment, setPayment] = useState("card");
  const [coupon, setCoupon] = useState(null);
  useEffect(() => {
    if (detailTrans === true) {
      const transDetail = async () => {
        try {
          const token = await GenerateToken(login.auth, (Data) => {
            dispatch(successLogin(Data));
          });
          const data = await axios.get(
            process.env.REACT_APP_HOST + "/transaction/" + params.id,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setDetail(data.data.data);
        } catch (error) {
          if (error.status === 401) {
            return navigate("/", {
              replace: true,
            });
          }
        }
      };
      transDetail();
      return;
    }
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
      await axios.post(`${process.env.REACT_APP_HOST}/transaction`, data, {
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
          {detailTrans === true ? (
            <>
              {detail !== false ? (
                <>
                  <NavbarSignIn navActive={"history"} />
                  <Detail data={detail} user={user} />
                </>
              ) : (
                <>
                  <div className="w-100 d-flex justify-content-center">
                    <img className="mx-auto mt-5" src={loadImg} alt="loading" />
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {chart.chart.length > 0 ? (
                <>
                  <NavbarSignIn navActive={"chart"} />
                  <Main
                    chart={chart.chart}
                    subtotal={subtotal}
                    delivery={delivery}
                    tax={tax}
                    user={user}
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
            </>
          )}

          <Footer />
        </>
      )}
    </div>
  );
}

export default Payment;
