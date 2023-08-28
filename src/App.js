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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

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

  console.log("Rule: ", { userRole });
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
