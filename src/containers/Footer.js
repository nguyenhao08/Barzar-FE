import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark" id="tempaltemo_footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 pt-5">
            <h2 className="h2 text-success border-bottom pb-3 border-light logo">
              NH Store
            </h2>
            <ul className="list-unstyled text-light footer-link-list">
              <li>
                <i className="fas fa-map-marker-alt fa-fw"></i>
                NH Store Center 2th floor, 379 Ghenh Rang, Quy Nhon, Binh Dinh,
                VietNam
              </li>
              <li>
                <i className="fa fa-phone fa-fw"></i>
                <a className="text-decoration-none" href="tel:0345678910">
                  0345678910
                </a>
              </li>
              <li>
                <i className="fa fa-envelope fa-fw"></i>
                <a
                  className="text-decoration-none"
                  href="mailto:nguyenhao08@company.com"
                >
                  nguyenhao08@company.com
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4 pt-5">
            <h2 className="h2 text-light border-bottom pb-3 border-light">
              Products
            </h2>
            <ul className="list-unstyled text-light footer-link-list">
              <li>
                <a className="text-decoration-none" href="shop">
                  All
                </a>
              </li>
              <li>
                <a className="text-decoration-none" href="shop">
                  Men's
                </a>
              </li>
              <li>
                <a className="text-decoration-none" href="shop">
                  Women's
                </a>
              </li>
              <li>
                <a className="text-decoration-none" href="shop">
                  Other Products
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4 pt-5">
            <h2 className="h2 text-light border-bottom pb-3 border-light">
              Further Info
            </h2>
            <ul className="list-unstyled text-light footer-link-list">
              <li>
                <a className="text-decoration-none" href="/">
                  Home
                </a>
              </li>
              <li>
                <a className="text-decoration-none" href="about">
                  About Us
                </a>
              </li>

              <li>
                <a className="text-decoration-none" href="contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="row text-light mb-4">
          <div className="col-12 mb-3">
            <div className="w-100 my-3 border-top border-light"></div>
          </div>
          <div className="col-auto me-auto">
            <ul className="list-inline text-left footer-icons">
              <li className="list-inline-item border border-light rounded-circle text-center">
                <a
                  className="text-light text-decoration-none"
                  target="_blank"
                  href="http://facebook.com/"
                >
                  <i className="fab fa-facebook-f fa-lg fa-fw"></i>
                </a>
              </li>
              <li className="list-inline-item border border-light rounded-circle text-center">
                <a
                  className="text-light text-decoration-none"
                  target="_blank"
                  href="https://www.instagram.com/"
                >
                  <i className="fab fa-instagram fa-lg fa-fw"></i>
                </a>
              </li>
              <li className="list-inline-item border border-light rounded-circle text-center">
                <a
                  className="text-light text-decoration-none"
                  target="_blank"
                  href="https://twitter.com/"
                >
                  <i className="fab fa-twitter fa-lg fa-fw"></i>
                </a>
              </li>
              <li className="list-inline-item border border-light rounded-circle text-center">
                <a
                  className="text-light text-decoration-none"
                  target="_blank"
                  href="https://www.linkedin.com/"
                >
                  <i className="fab fa-linkedin fa-lg fa-fw"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/assets/css/templatemo.css" />
      <link rel="stylesheet" href="/assets/css/custom.css" />
      <div className="w-100 bg-black py-3">
        <div className="container">
          <div className="row pt-2">
            <div className="col-12">
              <p className="text-left text-light">
                Copyright &copy; 2023 NH | Designed by {""}
                <a
                  rel="sponsored"
                  href={`${process.env.PUBLIC_URL}/`}
                  target="_blank"
                >
                  NH
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
