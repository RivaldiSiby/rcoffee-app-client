import React, { Component } from "react";
import "./index.css";

// img
import product from "../../asset/img/productsPage/product.png";
import product1 from "../../asset/img/productsPage/product1.png";
import product2 from "../../asset/img/productsPage/product2.png";
import product3 from "../../asset/img/productsPage/product3.png";
import product4 from "../../asset/img/productsPage/product4.png";
import product5 from "../../asset/img/productsPage/product5.png";
import product6 from "../../asset/img/productsPage/product6.png";
// img
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export class index extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <section className="products-body">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-4 promo">
                <section className="promo-head text-center">
                  <h5>Promo for you</h5>
                  <p>Coupons will be updated every weeks. Check them out!</p>
                </section>
                <section className="promo-body d-flex justify-content-center align-items-center">
                  <section className="promo-info">
                    <div className="promo-info-head d-flex flex-column align-items-center justify-content-center">
                      <img src={product} alt="product" />
                      <h5>Beef Spaghetti</h5>
                      <h5>20% OFF</h5>
                      <p className="text-center">
                        Buy 1 Choco Oreo and get 20% off for Beef Spaghetti
                      </p>
                    </div>
                    <div className="promo-info-foot text-center">
                      <p>COUPON CODE</p>
                      <h5>FNPR15RG</h5>
                      <span>Valid untill October 10th 2020</span>
                    </div>
                  </section>
                  <section className="promo-info-1"></section>
                  <section className="promo-info-2"></section>
                </section>

                <section className="promo-foot">
                  <section className="mx-auto d-flex justify-content-center align-items-center">
                    Apply Coupon
                  </section>
                  <div className="promo-foot-text">
                    <ul>
                      <span className="pb-1">Terms and Condition</span>
                      <li className="p-1">
                        You can only apply 1 coupon per day
                      </li>
                      <li className="p-1">It only for dine in</li>
                      <li className="p-1">Buy 1 get 1 only for new user</li>
                      <li className="p-1">
                        Should make member card to apply coupon
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
              <div className="col-lg-8 products">
                <div className="products-head">
                  <ul className="products-menu">
                    <li className="list-active">
                      <section className="list-menu menu-active">
                        Favorite Product
                      </section>
                    </li>
                    <li>
                      <section className="list-menu">Coffee</section>
                    </li>
                    <li>
                      <section className="list-menu">Non Coffee</section>
                    </li>
                    <li>
                      <section className="list-menu">Foods</section>
                    </li>
                    <li>
                      <section className="list-menu">Add-on</section>
                    </li>
                  </ul>
                </div>
                <div className="products-list">
                  <div className="box-products">
                    <div className="box-head text-center">
                      <img src={product1} alt="products" />
                    </div>
                    <h5>Veggie tomato mix</h5>
                    <p>IDR 34.000</p>
                  </div>
                  <div className="box-products">
                    <div className="box-head text-center">
                      <img src={product2} alt="products" />
                    </div>
                    <h5>Hazelnut Latte</h5>
                    <p>IDR 25.000</p>
                  </div>
                  <div className="box-products">
                    <div className="box-head text-center">
                      <img src={product3} alt="products" />
                    </div>
                    <h5>Summer fried rice</h5>
                    <p>IDR 32.000</p>
                  </div>
                  <div className="box-products">
                    <div className="box-head text-center">
                      <img src={product4} alt="products" />
                    </div>
                    <h5>Creamy Ice Latte</h5>
                    <p>IDR 27.000</p>
                  </div>
                  <div className="box-products">
                    <div className="box-head text-center">
                      <img src={product5} alt="products" />
                    </div>
                    <h5>Drum Sticks</h5>
                    <p>IDR 30.000</p>
                  </div>
                  <div className="box-products">
                    <div className="box-head text-center">
                      <img src={product6} alt="products" />
                    </div>
                    <h5>Salty Rice</h5>
                    <p>IDR 20.000</p>
                  </div>
                  <div className="box-products">
                    <div className="box-head text-center">
                      <img src={product1} alt="products" />
                    </div>
                    <h5>Veggie tomato mix</h5>
                    <p>IDR 34.000</p>
                  </div>
                  <div className="box-products">
                    <div className="box-head text-center">
                      <img src={product2} alt="products" />
                    </div>
                    <h5>Hazelnut Latte</h5>
                    <p>IDR 25.000</p>
                  </div>
                  <div className="box-products">
                    <div className="box-head text-center">
                      <img src={product3} alt="products" />
                    </div>
                    <h5>Summer fried rice</h5>
                    <p>IDR 32.000</p>
                  </div>
                  <div className="box-products">
                    <div className="box-head text-center">
                      <img src={product4} alt="products" />
                    </div>
                    <h5>Creamy Ice Latte</h5>
                    <p>IDR 27.000</p>
                  </div>
                  <div className="box-products">
                    <div className="box-head text-center">
                      <img src={product5} alt="products" />
                    </div>
                    <h5>Drum Sticks</h5>
                    <p>IDR 30.000</p>
                  </div>
                  <div className="box-products">
                    <div className="box-head text-center">
                      <img src={product6} alt="products" />
                    </div>
                    <h5>Salty Rice</h5>
                    <p>IDR 20.000</p>
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
}

export default index;
