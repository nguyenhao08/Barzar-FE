import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productsActions";
import ProductComponent from "./ProductComponent";
import Footer from "./Footer";
import Header from "./Header";

const ProductPage = () => {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((err) => {});
    dispatch(setProducts(response.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <ul class="list-inline shop-top-menu pb-3 pt-1">
              <li class="list-inline-item">
                <a class="h3 text-dark text-decoration-none mr-3" href="#">
                  All
                </a>
              </li>
              <li class="list-inline-item">
                <a class="h3 text-dark text-decoration-none mr-3" href="#">
                  Men's
                </a>
              </li>
              <li class="list-inline-item">
                <a class="h3 text-dark text-decoration-none" href="#">
                  Women's
                </a>
              </li>
              <li class="list-inline-item">
                <a class="h3 text-dark text-decoration-none" href="#">
                  Other Products
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-6 pb-4">
            <div class="d-flex">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  id="inputMobileSearch"
                  placeholder="Search ..."
                />
                <div class="input-group-text">
                  <i class="fa fa-fw fa-search"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ui grid container">
          <ProductComponent />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
