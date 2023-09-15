import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const ThankYouPage = () => {
  const handleSubmit = () => {
    window.location.href = "/shop";
  };
  useEffect(() => {
    // Khi trang được tải, cập nhật tiêu đề của trang
    document.title = "ThankYou - NH";
  }, []);
  return (
    <>
      <Header />
      <div className="thank-you-container">
        <h1 className="thank-you-heading">
          <img
            className="main-img"
            alt="icon-code"
            src="https://uploads-ssl.webflow.com/5e961452aa6e89f98371a402/5f5bd2ae40edd9819b3a8b9b_Green%20Check%20Website.png"
          />
          Order Successfully Placed
        </h1>
        <br />

        <p className="thank-you-info" style={{ textAlign: "center" }}>
          Thank you for your order
        </p>
        <p className="thank-you-content" style={{ textAlign: "center" }}>
          If you have any questions about your order, you can email us at
        </p>
        <p className="thank-you-content">
          <a className="thank-you-info" href="mailto:nghao@company.com">
            nguyenhao08@company.com
          </a>{" "}
          or call us at{" "}
          <strong>
            <a className="thank-you-info" href="tel:0345678910">
              0345678910
            </a>
          </strong>
        </p>
        <br />
        <button className="button-thank" onClick={handleSubmit}>
          To continue shopping
        </button>
      </div>

      <Footer />
    </>
  );
};

export default ThankYouPage;
