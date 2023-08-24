import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProductListing from "./containers/ProductListing";
import Header from "./containers/Header";
import "./App.css";
import ProductDetails from "./containers/ProductDetails";
import Footer from "./containers/Footer";
import Notfound from "./containers/Notfound";
import Homepage from "./containers/Home";
import About from "./containers/About";
import ManageProduct from "./admin/ManageProducts";
import Addprd from "./admin/AddProduct";
import Register from "./containers/Register";
import Login from "./containers/Login";
import Editprd from "./admin/EditProduct";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function requireLogin(Component, props) {
    if (isLoggedIn) {
      const isAdmin =
        props.location.state &&
        (props.location.state.email === "hao@gmail.com" ||
          props.location.state.email === "admin@gmail.com");

      if (isAdmin) {
        return <Component {...props} />;
      } else {
        return <Redirect to="/" />;
      }
    } else {
      return (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      );
    }
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/about" exact component={About} />
          <Route path="/shop" exact component={ProductListing} />
          <Route path="/product/:productId" component={ProductDetails} />
          <Route path="/register" component={Register} />
          <Route
            path="/login"
            render={(props) => <Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/manage/products" component={ManageProduct} />
          <Route path="/manage/product/add" component={Addprd} />
          <Route path="/manage/product/edit/:productId" component={Editprd} />
          <Route component={Notfound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
