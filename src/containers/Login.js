import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../asset/images/bg-01.jpg";

function Login({ setUserRole, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [redirectTo, setRedirectTo] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasError = !email || !password || error !== "";
    setIsDisabled(hasError);
  }, [email, password, error]);

  useEffect(() => {
    if (!email || !password) {
      setError("");
    } else if (password.length < 10 || password.length > 30) {
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
        setIsLoggedIn(true);
        const storedUserRole = localStorage.getItem("role");
        setUserRole(storedUserRole);

        if (storedUserRole === "admin") {
          setRedirectTo("/manage/products");
        } else if (storedUserRole === "user") {
          setRedirectTo("/");
        }
      } else {
        setIsLoggedIn(false);
      }

      setIsLoading(false);
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
  if (isLoading) {
    return <div>Loading...</div>; // Replace with your own loading indicator or component
  }

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
      const res = await axios.post("http://localhost:4000/api/login", {
        email,
        password,
      });

      if (res.status === 200) {
        const { role, id } = res.data;

        if (role === "admin" || role === "user") {
          // Save login information to localStorage if rememberMe is checked
          if (rememberMe) {
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
          } else {
            localStorage.removeItem("email");
            localStorage.removeItem("password");
          }
          localStorage.setItem("id", id);
          localStorage.setItem("role", role);
          localStorage.setItem("isLoggedIn", true);
          setIsLoggedIn(true);
          setUserRole(role);
          setRedirectTo(role === "admin" ? "/manage/products" : "/");
        }
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      setError("Email or Password is incorrect");
    }
  };

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <div
      className="login template d-flex justify-content-center align-items-center 100-w vh-100"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
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

          <div className="d-gird">
            {error && <div style={{ color: "red" }}>{error}</div>}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isDisabled}
              onClick={isDisabled ? null : handleLogin}
            >
              Login
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
