import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import ProductListing from "./containers/ProductListing";
import "./App.css";
import ProductDetails from "./containers/ProductDetails";
import Notfound from "./containers/Notfound";
import Homepage from "./containers/Home";
import About from "./containers/About";
import ManageProduct from "./admin/ManageProducts";
import Addprd from "./admin/AddProduct";
import Register from "./containers/Register";
import Login from "./containers/Login";
import Editprd from "./admin/EditProduct";
import Cart from "./containers/Cart";
import Checkout from "./containers/Checkout";
import ThankYouPage from "./containers/ThankYou";
import Contact from "./containers/Contact";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn" || "false")
  );
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");

  function requireLogin(Component, props) {
    if (isLoggedIn) {
      const isAdmin = userRole === "admin";

      if (isAdmin) {
        return <Component {...props} />;
      } else {
        return <Redirect to="/" />;
      }
    } else {
      return <Redirect to="/login" />;
    }
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/shop" exact component={ProductListing} />
          <Route path="/product::productId" component={ProductDetails} />
          <Route path="/register" component={Register} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/thankyou" component={ThankYouPage} />
          <Route path="/thankyou" component={ThankYouPage} />

          <Route
            path="/login"
            render={(props) => (
              <Login
                {...props}
                setIsLoggedIn={setIsLoggedIn}
                setUserRole={setUserRole}
              />
            )}
          />
          <Route
            path="/manage/products"
            render={(props) => requireLogin(ManageProduct, props)}
          />
          <Route
            path="/manage/product/add"
            render={(props) => requireLogin(Addprd, props)}
          />
          <Route
            path="/manage/product/edit/:productId"
            render={(props) => requireLogin(Editprd, props)}
          />

          <Route component={Notfound} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
