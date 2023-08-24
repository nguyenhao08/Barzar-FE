import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light shadow">
        <div class="container d-flex justify-content-between align-items-center">
          <a
            class="navbar-brand text-success logo h1 align-self-center"
            href={`${process.env.PUBLIC_URL}/`}
          >
            NH
          </a>

          <button
            class="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#templatemo_main_nav"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            class="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
            id="templatemo_main_nav"
          >
            <div class="flex-fill">
              <ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                <li class="nav-item">
                  <Link class="nav-link" to={`${process.env.PUBLIC_URL}/`}>
                    Home
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to={`${process.env.PUBLIC_URL}/about`}>
                    About
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to={`${process.env.PUBLIC_URL}/shop`}>
                    Shop
                  </Link>
                </li>

                <li class="nav-item">
                  <Link
                    class="nav-link"
                    to={`${process.env.PUBLIC_URL}/contact.html`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div class="navbar align-self-center d-flex">
              <Link
                class="nav-icon position-relative text-decoration-none"
                to={`${process.env.PUBLIC_URL}/cart`}
              >
                <i class="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
                <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                  7
                </span>
              </Link>
              <Link
                class="nav-icon position-relative text-decoration-none"
                to={`${process.env.PUBLIC_URL}/login`}
              >
                <i class="fa fa-fw fa-user text-dark mr-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
