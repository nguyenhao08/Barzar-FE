import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import { addProduct } from "../redux/actions/productsActions";
function Addprd() {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const url = e.target.value;

    setPreviewImage(url);
    setImage(url);
  };

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men's");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [detail, setDetail] = useState("");
  const [currency, setCurrency] = useState("VND");

  const dispatch = useDispatch();

  // Err validation
  const [titleError, setTitleError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [imageError, setImageError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [detailError, setDetailError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      handleSubmit &&
      (title === "" ||
        price === "" ||
        description === "" ||
        image === "" ||
        quantity === "" ||
        detail === "")
    ) {
      //validation
      setTitleError("");
      setPriceError("");
      setDescriptionError("");
      setImageError("");
      setQuantityError("");
      setDetailError("");

      let isValid = true;

      if (title === "") {
        setTitleError("Please enter the product name.");
        isValid = false;
      }

      if (price === "") {
        setPriceError("Please enter the product price.");
        isValid = false;
      }

      if (description === "") {
        setDescriptionError("Please enter the product description.");
        isValid = false;
      }

      if (image === "") {
        setImageError("Please enter the product image URL.");
        isValid = false;
      }

      if (quantity === "") {
        setQuantityError("Please enter the product quantity.");
        isValid = false;
      }

      if (detail === "") {
        setDetailError("Please enter the product details.");
        isValid = false;
      }

      if (!isValid) {
        return;
      }
      return;
    }

    const product = {
      title,
      price,
      description,
      category,
      image,
      quantity,
      detail,
      currency,
    };

    dispatch(addProduct(product));

    setTitle("");
    setPrice("");
    setCategory("");
    setDescription("");
    setDetail("");
    setImage("");
    setQuantity("");
    setCurrency("");
    alert("Product added successfully");

    window.location.reload(); // Reload page
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
                <i class="fa fa-fw  fa-sign-out-alt">Sign-Out</i>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <form class="form-container" onSubmit={handleSubmit}>
        <div class="form-row">
          <label className="form-label">Name:</label>
          <div className="form-row1">
            <input
              type="text"
              className={`form-input ${titleError ? "error-input" : ""}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {titleError && (
              <span
                style={{ color: "red", paddingBottom: 10 }}
                className="error"
              >
                {titleError}
              </span>
            )}
          </div>

          <label class="form-label">Price:</label>
          <div className="form-row1">
            <input
              type="number"
              className={`form-input ${priceError ? "error-input" : ""}`}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {priceError && (
              <span
                style={{ color: "red", paddingBottom: 10 }}
                className="error"
              >
                {priceError}
              </span>
            )}
          </div>

          <label class="form-label">Quantity:</label>
          <div className="form-row1">
            <input
              type="number"
              className={`form-input ${quantityError ? "error-input" : ""}`}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            {quantityError && (
              <span
                style={{ color: "red", paddingBottom: 10 }}
                className="error"
              >
                {quantityError}
              </span>
            )}
          </div>

          <label class="form-label">Currency:</label>
          <select
            class="form-row"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
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
              className={`form-input ${descriptionError ? "error-input" : ""}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {descriptionError && (
              <span
                style={{ color: "red", paddingBottom: 10 }}
                className="error"
              >
                {descriptionError}
              </span>
            )}
          </div>
          <label class="form-label">Category:</label>
          <select
            class="form-row"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            className={`form-input ${detailError ? "error-input" : ""}`}
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
          {detailError && (
            <span style={{ color: "red", paddingBottom: 10 }} className="error">
              <br></br>
              {detailError}
            </span>
          )}

          <div>
            <label class="form-label">Image URL:</label>
            {previewImage && (
              <img src={previewImage} alt="Preview" class="form-image" />
            )}

            <input
              className={`form-input ${imageError ? "error-input" : ""}`}
              type="text"
              onChange={handleImageChange}
            />
            {imageError && (
              <span
                style={{ color: "red", paddingBottom: 10 }}
                className="error"
              >
                <br />
                {imageError}
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
              Add Product
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
export default Addprd;
