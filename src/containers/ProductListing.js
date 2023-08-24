import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productsActions";
import ProductComponent from "./ProductComponent";
import unidecode from "unidecode";
import Footer from "./Footer";
import Header from "./Header";

const ProductPage = () => {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  };
  useEffect(() => {
    let results = products;
    if (currentCategory !== "All") {
      results = results.filter(
        (product) => product.category === currentCategory
      );
    }
    if (searchTerm) {
      results = results.filter((product) =>
        unidecode(product.title.toLowerCase()).includes(
          unidecode(searchTerm.toLowerCase())
        )
      );
    }
    setSearchResults(results);
  }, [searchTerm, products, currentCategory]);
  const fetchProducts = async () => {
    const response = await axios
      .get("http://localhost:8080/products")
      .catch((err) => {});
    dispatch(setProducts(response.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(searchResults);

  //////////////////

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <ul className="list-inline shop-top-menu pb-3 pt-1">
              <li className="list-inline-item">
                <a
                  className={`h3 text-dark text-decoration-none mr-3 ${
                    currentCategory === "All" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("All")}
                >
                  All
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  className={`h3 text-dark text-decoration-none mr-3 ${
                    currentCategory === "Men's" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("Men's")}
                >
                  Men's
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  className={`h3 text-dark text-decoration-none ${
                    currentCategory === "women" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("women")}
                >
                  Women's
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  className={`h3 text-dark text-decoration-none ${
                    currentCategory === "other" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("other")}
                >
                  Other Products
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-6 pb-4">
            <div className="d-flex">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="inputMobileSearch"
                  placeholder="Search ..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <div className="input-group-text">
                  <i className="fa fa-fw fa-search"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProductComponent products={searchResults} />
      </div>

      <Footer />
    </>
  );
};

export default ProductPage;
