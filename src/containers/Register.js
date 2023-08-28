import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "../asset/images/bg-01.jpg";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [redirectTo, setRedirectTo] = useState("");

  useEffect(() => {
    const hasError = !email || !password || !name || error !== "";
    setIsDisabled(hasError);
  }, [email, password, name, error]);
  useEffect(() => {
    if (!email || !password || !name) {
      setError("");
    } else if (password.length < 10 || password.length > 30) {
      setError("Password must be between 10 and 30 characters");
    } else if (!validateEmail(email)) {
      setError("Invalid email");
    } else if (name.length < 1) {
      setError("Fill in your name");
    } else {
      setError("");
    }
  }, [email, password, name]);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!error && password === confirmPassword) {
      try {
        // Kiểm tra xem email đã tồn tại hay chưa
        const emailExistsResponse = await axios.get(
          `http://localhost:4000/users?email=${email}`
        );

        if (emailExistsResponse.data.length > 0) {
          // Nếu email đã tồn tại, thông báo cho người dùng
          setError("Email already exists");
        } else {
          const newUser = {
            email,
            password,
            name,
            role: "user",
          };

          // Gửi yêu cầu POST đến server
          const response = await axios.post(
            "http://localhost:4000/users",
            newUser
          );
          toast.success("Registration successful!");

          setEmail("");
          setPassword("");
          setName("");
          setConfirmPassword("");
          setError("");
          setTimeout(() => {
            setRedirectTo("/login");
          }, 1500);
        }
      } catch (error) {
        console.error("Registration failed:", error);
        setError("Failed to register. Please try again.");
      }
    } else {
      setError("Passwords do not match");
    }
  };
  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <>
      <ToastContainer />
      <div
        className="login template d-flex justify-content-center align-items-center 100-w vh-100 "
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="form_container p-5 rounded ">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center">Register</h3>
            <div className="mb-2">
              <label type="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="form-control"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="fName">Full Name</label>
              <input
                type="text"
                placeholder="Enter your Name"
                className="form-control"
                value={name}
                onChange={handleNameChange}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your email Password"
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="form-control"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>

            <div className="d-gird">
              {error && <div style={{ color: "red" }}>{error}</div>}
              <button className="btn btn-primary" disabled={isDisabled}>
                Register
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
    </>
  );
}

export default Register;
