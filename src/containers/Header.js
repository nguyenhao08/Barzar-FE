import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    const initialLoggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(initialLoggedInStatus === "true");
    setLoading(false);

    // Lấy thuộc tính "name" từ API khi đăng nhập thành công
    if (initialLoggedInStatus === "true") {
      const id = localStorage.getItem("id");
      axios.get(`http://localhost:4000/users/${id}`).then((response) => {
        setName(response.data.name);
      });
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);

    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
                  <Link className="nav-link" to={`${process.env.PUBLIC_URL}/`}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`${process.env.PUBLIC_URL}/about`}
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`${process.env.PUBLIC_URL}/shop`}
                  >
                    Shop
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`${process.env.PUBLIC_URL}/contact.html`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="navbar align-self-center d-flex">
              <Link
                className="nav-icon position-relative text-decoration-none"
                to={`${process.env.PUBLIC_URL}/cart`}
              >
                <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
                <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                  7
                </span>
              </Link>

              {isLoggedIn ? (
                <Link
                  className="nav-icon position-relative text-decoration-none"
                  onClick={handleLogout}
                >
                  <i className="text-dark mr-1">Welcome {name} </i>
                  <i
                    className="fa fa-fw fa-sign-out-alt text-dark mr-1"
                    style={{ marginLeft: "20px" }}
                  ></i>
                  LogOut
                </Link>
              ) : (
                <Link
                  className="nav-icon position-relative text-decoration-none"
                  to={`${process.env.PUBLIC_URL}/login`}
                >
                  <i className="fa fa-fw fa-user text-dark mr-1">Login</i>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
