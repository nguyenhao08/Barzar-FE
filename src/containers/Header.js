import React, { useState, useEffect } from "react";

import axios from "axios";
import "font-awesome/css/font-awesome.min.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [name, setName] = useState("");
  const [total, setTotal] = useState(0); // Tổng số lượng sản phẩm

  useEffect(() => {
    const initialLoggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(initialLoggedInStatus === "true");

    // Lấy thuộc tính "name" từ API khi đăng nhập thành công
    // Lấy dữ liệu từ localStorage
    const userData = localStorage.getItem("userData");

    // Kiểm tra nếu dữ liệu tồn tại
    if (userData) {
      // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
      const user = JSON.parse(userData);
      // Lấy giá trị thuộc tính "name"
      setName(user.name);
    }

    // Tính tổng số lượng sản phẩm trong localStorage
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalQuantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setTotal(totalQuantity);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);

    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container d-flex justify-content-between align-items-center">
          <a
            className="navbar-brand text-success logo h1 align-self-center"
            href={`${process.env.PUBLIC_URL}/`}
          >
            NH
          </a>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#templatemo_main_nav"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
            id="templatemo_main_nav"
          >
            <div className="flex-fill">
              <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                <li className="nav-item">
                  <a className="nav-link" href={`${process.env.PUBLIC_URL}/`}>
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href={`${process.env.PUBLIC_URL}/about`}
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href={`${process.env.PUBLIC_URL}/shop`}
                  >
                    Shop
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    href={`${process.env.PUBLIC_URL}/contact`}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="navbar align-self-center d-flex">
              <a
                href={`${process.env.PUBLIC_URL}/cart`}
                className="nav-icon position-relative text-decoration-none"
              >
                <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
                {total > 0 && (
                  <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                    {total}
                  </span>
                )}
              </a>

              {isLoggedIn ? (
                <div>
                  <i className="text-dark mr-1">
                    Welcome <strong> {name}</strong>{" "}
                  </i>
                  <a
                    className="nav-icon position-relative text-decoration-none"
                    onClick={handleLogout}
                  >
                    <i
                      className="fa fa-fw fa-user text-dark mr-1"
                      style={{ marginLeft: "20px" }}
                    ></i>
                    LogOut
                  </a>
                </div>
              ) : (
                <a
                  className="nav-icon position-relative text-decoration-none"
                  href={`${process.env.PUBLIC_URL}/login`}
                >
                  <i className="fa fa-fw fa-user text-dark mr-1">Login</i>
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
      <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/assets/css/templatemo.css" />
      <link rel="stylesheet" href="/assets/css/custom.css" />
    </>
  );
};

export default Header;
