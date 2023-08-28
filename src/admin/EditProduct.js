import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productsActions";

function Editprd() {
  const [errors, setErrors] = useState({});
  // Các trường error tương ứng với các trường input

  const { productId } = useParams();
  let product = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`http://localhost:8080/products/${id}`)
      .catch((err) => {});
    dispatch(selectedProduct(response.data));
  };
  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  const handleTitleChange = (e) => {
    const updatedProduct = { ...product, title: e.target.value };
    dispatch(selectedProduct(updatedProduct));
  };
  const handlePriceChange = (e) => {
    const updatedProduct = { ...product, price: e.target.value };
    dispatch(selectedProduct(updatedProduct));
  };
  const handleQuantityChange = (e) => {
    const updatedProduct = { ...product, quantity: e.target.value };
    dispatch(selectedProduct(updatedProduct));
  };
  const handleCurrencyChange = (e) => {
    const updatedProduct = { ...product, currency: e.target.value };
    dispatch(selectedProduct(updatedProduct));
  };
  const handleDescriptionChange = (e) => {
    const updatedProduct = { ...product, description: e.target.value };
    dispatch(selectedProduct(updatedProduct));
  };
  const handleCategoryChange = (e) => {
    const updatedProduct = { ...product, category: e.target.value };
    dispatch(selectedProduct(updatedProduct));
  };
  const handleDetailChange = (e) => {
    const updatedProduct = { ...product, detail: e.target.value };
    dispatch(selectedProduct(updatedProduct));
  };

  const [previewImage, setPreviewImage] = useState(null);
  const [images, setImage] = useState("");

  const handleImageChange = (e) => {
    const url = e.target.value;
    const updatedProduct = { ...product, image: e.target.value };
    dispatch(selectedProduct(updatedProduct));
    setPreviewImage(url);
    setImage(url);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formErrors = {};
    if (!product.title) {
      formErrors.title = "Please enter a title";
    }

    if (!product.price) {
      formErrors.price = "Please enter a price";
    }
    if (!product.quantity) {
      formErrors.quantity = "Please enter a quantity";
    }

    if (!product.description) {
      formErrors.description = "Please enter a description";
    }

    if (!product.detail) {
      formErrors.detail = "Please enter a detail";
    }
    if (!product.image) {
      formErrors.image = "Please enter a image";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    axios
      .put(`http://localhost:8080/products/${productId}`, product)
      .then(() => {})
      .catch((error) => console.log(error));
    setTimeout(() => {
      window.location.href = "/manage/products";
    }, 2000);
    toast.success("Product edit successfully");
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light shadow">
        <div class="container d-flex justify-content-between align-items-center">
          <a class="navbar-brand text-success logo h1 align-self-center">
            Admin-NH
          </a>

          <button
            class="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#templatemo_main_nav"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            class="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
            id="templatemo_main_nav"
          >
            <div class="flex-fill">
              <ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                <li class="nav-item">
                  <a class="nav-link" href={`/manage/products`}>
                    Products List
                  </a>
                </li>
              </ul>
            </div>
            <div class="navbar align-self-center d-flex">
              <a
                class="nav-icon position-relative text-decoration-none"
                href={`/`}
              >
                <i>Sign-Out</i>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <ToastContainer />
      <form class="form-container" onSubmit={handleSubmit}>
        <div class="form-row">
          <label class="form-label">Name:</label>
          <div className="form-row1">
            <input
              type="text"
              class={`form-input ${errors.title && "error-input"}`}
              value={product.title}
              onChange={handleTitleChange}
            />

            {errors.title && (
              <span class="error" style={{ color: "red", paddingBottom: 10 }}>
                {errors.title}
              </span>
            )}
          </div>
          <label class="form-label">Price:</label>
          <div className="form-row1">
            <input
              type="number"
              class={`form-input ${errors.price && "error-input"}`}
              value={product.price}
              onChange={handlePriceChange}
            />
            {errors.price && (
              <span class="error" style={{ color: "red", paddingBottom: 10 }}>
                {errors.price}
              </span>
            )}
          </div>

          <label class="form-label">Quantity:</label>
          <div className="form-row1">
            <input
              type="number"
              class={`form-input ${errors.quantity && "error-input"}`}
              value={product.quantity}
              onChange={handleQuantityChange}
            />
            {errors.quantity && (
              <span class="error" style={{ color: "red", paddingBottom: 10 }}>
                {errors.quantity}
              </span>
            )}
          </div>
          <label class="form-label">Currency:</label>
          <select
            class="form-row"
            value={product.currency}
            onChange={handleCurrencyChange}
          >
            <option value="VND">VND</option>
            <option value="USD">USD</option>
          </select>
        </div>
        <div class="form-row">
          <label class="form-label">Short Description:</label>
          <div className="form-row1">
            <input
              type="text"
              class={`form-input ${errors.description && "error-input"}`}
              value={product.description}
              onChange={handleDescriptionChange}
            />
            {errors.description && (
              <span class="error" style={{ color: "red", paddingBottom: 10 }}>
                {errors.description}
              </span>
            )}
          </div>
          <label class="form-label">Category:</label>
          <select
            class="form-row"
            value={product.category}
            onChange={handleCategoryChange}
          >
            <option value="men">Men's</option>
            <option value="women">Women's</option>
            <option value="other">Other Product </option>
          </select>
        </div>
        <div class="form-row-2">
          <label class="form-label">Details:</label>

          <textarea
            type="text"
            class={`form-input ${errors.detail && "error-input"}`}
            value={product.detail}
            onChange={handleDetailChange}
          />
          {errors.detail && (
            <span class="error" style={{ color: "red", paddingBottom: 10 }}>
              {errors.detail}
            </span>
          )}

          <div>
            <label class="form-label">Image URL:</label>
            {product.image && (
              <img src={product.image} alt="Preview" class="form-image" />
            )}
          </div>

          <input
            class={`form-input ${errors.image && "error-input"}`}
            type="text"
            onChange={handleImageChange}
            value={product.image}
          />
          <div className="form-row1">
            {errors.image && (
              <span class="error" style={{ color: "red", paddingBottom: 10 }}>
                {errors.image}
              </span>
            )}
          </div>
        </div>

        <hr />
        <div class="form-group" style={{ marginLeft: "30px" }}>
          <div class="col-sm-offset-3 col-sm-9">
            <a type="submit" class="btn btn-primary" href="/manage/products">
              Cancel
            </a>
            <button
              type="submit"
              class="btn btn-primary"
              style={{ marginLeft: "20px" }}
            >
              Edit Product
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Editprd;
