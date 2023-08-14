import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../asset/images/bg-01.jpg";

function Register() {
  return (
    <div
      className="login template d-flex justify-content-center align-items-center 100-w vh-100 "
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="form_container p-5 rounded ">
        <form>
          <h3 className="text-center">Register</h3>
          <div className="mb-2">
            <label type="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="fName">Full Name</label>
            <input
              type="text"
              placeholder="Enter your Name"
              className="form-control"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter new Password"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Confirm password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control"
            />
          </div>

          <div className="d-gird">
            <button className="btn btn-primary">
              <Link to="/login">Register</Link>
            </button>
          </div>
          <p className="text-end mt-2">
            Already Registerd?
            <Link to="/login" className="ms-2">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
