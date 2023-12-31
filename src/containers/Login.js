import React, { useState, useEffect } from "react";
import axios from "axios";
import backgroundImage from "../asset/images/bg-01.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

function Login({ setUserRole, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    const hasError = !email || !password || error !== "";
    setIsDisabled(hasError);
  }, [email, password, error]);

  useEffect(() => {
    if (!email || !password) {
      setError("");
    } else if (password.length < 5 || password.length > 30) {
      setError("Password must be between 10 and 30 characters");
    } else if (!validateEmail(email)) {
      setError("Invalid email");
    } else {
      setError("");
    }
  }, [email, password]);

  useEffect(() => {
    const checkAuthentication = async () => {
      const storedLoggedInFlag = localStorage.getItem("isLoggedIn");

      if (storedLoggedInFlag === "true") {
        const storedUserData = JSON.parse(localStorage.getItem("userData"));
        const storedAccessToken = localStorage.getItem("accessToken");
        const { roles, id } = storedUserData;
        const role = roles[0];
        console.log("Role: " + role);

        // Lưu thông tin người dùng và token vào state
        setUserData(storedUserData);
        setAccessToken(storedAccessToken);

        setIsLoggedIn(true);
        setUserRole(role);

        if (role === "admin") {
          window.location.href = "/manage/products";
        } else if (role === "user") {
          window.location.href = "/";
        }
      } else {
        setIsLoggedIn(false);

        // Xóa thông tin người dùng và token trong state
        setUserData(null);
        setAccessToken("");

        // Xóa thông tin người dùng và token trong localStorage
        localStorage.removeItem("userData");
        localStorage.removeItem("accessToken");
      }
    };

    checkAuthentication();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!error) {
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

    setIsLoading(true); // Bật trạng thái chờ

    try {
      const res = await axios.post("http://localhost:8080/authenticate", {
        email,
        password,
      });
      console.log(res.status);
      console.log(res.data);
      if (res.status === 200) {
        const { accessToken } = res.data;
        const user = res.data;
        const { roles, id } = user;
        const role = roles;

        console.log("roles", role);

        // Lưu thông tin người dùng và token vào state
        setUserData(user);
        setAccessToken(accessToken);

        // Lưu thông tin người dùng và token vào localStorage
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem("accessToken", accessToken);

        // Tiến hành chuyển hướng
        setIsLoggedIn(true);
        setUserRole(role);
        if (role === "admin" || role === "user") {
          // Save login information to localStorage if rememberMe is checked
          if (rememberMe) {
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            localStorage.setItem("rememberMe", true);
          } else {
            localStorage.removeItem("email");
            localStorage.removeItem("password");
            localStorage.removeItem("rememberMe");
          }
          localStorage.setItem("id", id);
          localStorage.setItem("role", role);
          localStorage.setItem("isLoggedIn", true);
          setIsLoggedIn(true);
          setUserRole(role);
          if (role === "admin") {
            window.location.href = "/manage/products";
          } else {
            window.location.href = "/";
          }
        }
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      setError("Email or Password is incorrect");
    }

    setIsLoading(false); // Tắt trạng thái chờ
  };
  useEffect(() => {
    // Khi trang được tải, cập nhật tiêu đề của trang
    document.title = "Login - NH";
  }, []);
  return (
    <div
      className="login template d-flex justify-content-center align-items-center 100-w vh-100"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <a href="/">
        <h2 className="h2 text-success border-bottom pb-3 border-light logo1">
          NH Store
        </h2>
      </a>
      <div className="form_container p-5 rounded  ">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center">ACCOUNT LOGIN</h3>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="form-control"
              value={email}
              onChange={handleEmailChange}
              autoComplete="on"
            />
          </div>
          <div className="mb2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your email Password"
              className="form-control"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="on"
            />
          </div>

          <div>
            <input
              type="checkbox"
              className="custom-control custom-checkbox"
              id="check"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />

            <label htmlFor="check" className="custom-input-lable ms-2">
              Remember me
            </label>
          </div>

          <div className="d-grid">
            {error && <div style={{ color: "red" }}>{error}</div>}

            <button
              type="submit"
              className="btn1 btn-primary"
              disabled={isDisabled}
              onClick={isLoading ? null : handleLogin}
            >
              {isLoading ? (
                <FontAwesomeIcon icon={faCircleNotch} spin size="1x" />
              ) : (
                "Login"
              )}
            </button>

            <p className="text-end mt-2">
              Don't have an account?
              <a
                href="/register"
                className="ms-2"
                style={{ color: "Purple-Red Bright" }}
              >
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
