import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

const Effective = () => {
  return (
    <section id="effective">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-12">
            <div
              data-aos="fade-down"
              data-aos-duration="1000"
              className="title"
            >
              <span>EFFECTIVE FOR SKIN</span>
              <h3>Guaranteed Result In 2 Weeks</h3>
              <p className="ma">
                Quickly pursue granular synergy after just-in-time niche
                markets. Phosfluorescently syndicate sticky content whereas
                robust resources. Uniquely target integrated meta-services and
                inexpensive process improvements. Distinctively matrix robust
                ideas through customer-directed leadership skills. Efficiently
                evolve.
              </p>
              <div className="info">
                <div className="widget">
                  <ul>
                    <li>
                      <span className="loc">
                        <MdOutlineLocationOn />
                      </span>
                      <span>
                      72 St. Merch Street, LA,California.
                      </span>
                    </li>
                    <li>
                      <span className="loca">
                        <FaPhone />
                      </span>
                      <span>+1 000-123-456789</span>
                    </li>
                    <li>
                      <span className="loc">
                        <IoIosMail />
                      </span>{" "}
                      <span>info@example.com</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-12">
            <div data-aos="fade-up" data-aos-duration="1000" className="image">
              <img
                src="https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/about-1.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Effective;
