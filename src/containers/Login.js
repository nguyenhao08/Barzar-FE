import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../asset/images/bg-01.jpg";
import { useState, useEffect } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    setIsDisabled(!email || !password);
  }, [email, password]);

  useEffect(() => {
    if (!email || !password) {
      setError("");
    } else if (password.length < 10 || password.length > 30) {
      setError("Password phải có ít nhất 10 ký tự và không quá 30 ký tự");
    } else if (!validateEmail(email)) {
      setError("Email không hợp lệ");
    } else {
      setError("");
    }
  }, [email, password]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!error) {
      // Gửi thông tin đăng nhập đến server để xác thực
      console.log(`Email: ${email}, Password: ${password}`);
      setEmail("");
      setPassword("");
    }
  };

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
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      });
      // Xử lý phản hồi từ API ở đây
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="login template d-flex justify-content-center align-items-center 100-w vh-100"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="form_container p-5 rounded  ">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center">ACCOUNT LOGIN</h3>
          <div className="mb-2">
            <label type="email">Email</label>
            <input
              type="email"
              id="password"
              name="password"
              placeholder="Enter your email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <input
              type="checkbox"
              className="custom-control custom-checkbox"
              id="check"
            />

            <label htmlFor="check" className="custom-input-lable ms-2">
              Remember me
            </label>
          </div>

          <div className="d-gird">
            {error && <div style={{ color: "red" }}>{error}</div>}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isDisabled}
              onClick={isDisabled ? null : handleLogin}
            >
              <Link to="/manage/products">Login</Link>
            </button>

            <p className="text-end mt-2">
              Don't have an account?
              <Link
                to="/register"
                className="ms-2"
                style={{ color: "Purple-Red Bright" }}
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
