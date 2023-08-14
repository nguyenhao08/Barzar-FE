import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/about" exact component={About} />
          <Route path="/shop" exact component={ProductListing} />
          <Route path="/product/:productId" component={ProductDetails} />
          <Route path="/manage/products" component={ManageProduct} />
          <Route path="/manage/product/add" component={Addprd} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route>
            <Notfound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
