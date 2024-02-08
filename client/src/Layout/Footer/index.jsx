import React, { useEffect, useState } from "react";
import "./index.scss";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { TiHeart } from "react-icons/ti";
import axios from "axios";
import { NavLink } from "react-router-dom";
const Footer = () => {
  const [logo, setLogo] = useState([]);
  async function getLogo() {
    const res = await axios("http://localhost:5000/logo");
    setLogo(res.data);
  }
  useEffect(() => {
    getLogo();
  }, []);
  return (
    <footer id="footer">
      <div className="top-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-12 col-12">
              <div className="logo">
                {logo &&
                  logo.map((x) => <img key={x._id} src={x.image} alt="" />)}
              </div>
              <p>
                Sed viverra tellus in hac habitasse platea dictumst vestibulum.
                Mauris augue neque gravida in. In cursus turpis massa tincidunt.{" "}
              </p>
            </div>
            <div className="col-lg-2 col-md-4 col-12">
              <h4>About</h4>
              <ul>
                <li>
                  <NavLink>Career</NavLink>
                </li>
                <li>
                  <NavLink>Stockists</NavLink>
                </li>
                <li>
                  <NavLink>Shop Locator</NavLink>
                </li>
                <li>
                  <NavLink>Contact</NavLink>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-4 col-12">
              <h4>Help</h4>
              <ul>
                <li>
                  <NavLink>Shipping & Returns</NavLink>
                </li>
                <li>
                  <NavLink>Track Order</NavLink>
                </li>
                <li>
                  <NavLink>FAQ</NavLink>
                </li>
                <li>
                  <NavLink>Checkout</NavLink>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-4 col-12">
              <h4>Information</h4>
              <ul>
                <li>
                  <NavLink>Store Information</NavLink>
                </li>
                <li>
                  <NavLink>About Store</NavLink>
                </li>
                <li>
                  <NavLink>Latest Products</NavLink>
                </li>
                <li>
                  <NavLink>Sale Products</NavLink>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-12 col-12 ema">
              <h3>Newsletter</h3>
              <p>
                Signup for our newsletter to stay up to date on sales and
                events.
              </p>
              <div className="forma">
                <input type="email" placeholder="Email Address" />
                <div className="but">
                  <span>
                    <IoMdSend />
                  </span>
                </div>
              </div>
              <div className="sosials">
                <span>
                  <FaFacebookF />
                </span>

                <span>
                  <FaTwitter />
                </span>
                <span>
                  <FaInstagram />{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="foot-copy">
        <p>© Copyright 2024 Lilac. All Rights Made with <TiHeart className="red"/> By Nura</p>
      </div>
    </footer>
  );
};

export default Footer;
