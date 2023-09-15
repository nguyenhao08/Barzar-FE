import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

function Contact() {
  useEffect(() => {
    // Khi trang được tải, cập nhật tiêu đề của trang
    document.title = "Contact - NH";
  }, []);
  return (
    <>
      <Header />
      <div className="container-contact">
        <div className="contact-wrapper">
          <div className="contact-form">
            <form>
              <h4 className="contact-heading">Send Us A Message</h4>
              <div className="form-group">
                <div className="input-wrapper">
                  <img
                    className="contact-img"
                    src="https://th.bing.com/th/id/R.ae02dc6e376588611128b7b579b6ee14?rik=BnuvqxnXAxCdOw&riu=http%3a%2f%2ffreevector.co%2fwp-content%2fuploads%2f2013%2f01%2f55081-email-closed-envelope-outline.png&ehk=LeWIjSIwxhmOP0IlcjyA6a96Sro25sBq9Bxki7saiL0%3d&risl=&pid=ImgRaw&r=0"
                    alt="Email Icon"
                  />
                  <input
                    className="input-field-1"
                    type="text"
                    name="email"
                    placeholder="Your Email Address"
                  />
                </div>
              </div>
              <div className="form-group">
                <textarea
                  className="input-field"
                  name="msg"
                  placeholder="How Can We Help?"
                ></textarea>
              </div>
              <button className="submit-button">Submit</button>
            </form>
          </div>
          <div className="contact-info">
            <div className="address-section">
              <span className="icon">
                <span className="lnr lnr-map-marker"></span>
              </span>
              <div className="info">
                <span className="info-heading">Address</span>
                <p className="info-text">
                  <i
                    className="fas fa-map-marker-alt fa-fw"
                    style={{ color: "black", marginLeft: "5px" }}
                  ></i>
                  NH Store Center 2th floor, 379 Ghenh Rang St, Quy Nhon, Binh
                  Dinh , VietNam
                </p>
              </div>
            </div>
            <div className="phone-section">
              <span className="icon">
                <span className="lnr lnr-phone-handset"></span>
              </span>
              <div className="info">
                <span className="info-heading">Lets Talk</span>
                <p className="info-text">
                  <i className="fa fa-phone fa-fw"></i>
                  <a
                    className="text-decoration-none"
                    href="tel:0345678910"
                    style={{ color: "black", marginLeft: "5px" }}
                  >
                    0345678910
                  </a>
                </p>
              </div>
            </div>
            <div className="email-section">
              <span className="icon">
                <span className="lnr lnr-envelope"></span>
              </span>
              <div className="info">
                <span className="info-heading">Sale Support</span>
                <p className="info-text">
                  <i className="fa fa-envelope fa-fw"></i>
                  <a
                    className="text-decoration-none"
                    href="mailto:nguyenhao08@company.com"
                    style={{ color: "black", marginLeft: "5px" }}
                  >
                    nguyenhao08@company.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
