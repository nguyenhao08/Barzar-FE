import React, { useState } from "react";
import "../App.css";
function Addprd() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light shadow">
        <div class="container d-flex justify-content-between align-items-center">
          <a class="navbar-brand text-success logo h1 align-self-center">NH</a>

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

      <form class="form-container">
        <div class="form-row">
          <label class="form-label">Name:</label>
          <input type="text" class="form-input" />
          <label class="form-label">Price:</label>
          <input type="text" class="form-input" />
          <label class="form-label">Quantity:</label>
          <input type="text" class="form-input" />
          <label class="form-label">Currency:</label>
          <select class="form-row">
            <option value="VND">VND</option>
            <option value="USD">USD</option>
          </select>
        </div>
        <div class="form-row">
          <label class="form-label">Short Description:</label>
          <input type="text" class="form-input" />
        </div>
        <div class="form-row-2">
          <label class="form-label">Details:</label>
          <textarea type="text" class="form-input" />
          <label class="form-label">Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {previewImage && (
            <img src={previewImage} alt="Preview" class="form-image" />
          )}
        </div>
        <hr />
        <div class="form-group" style={{ marginLeft: "30px" }}>
          <div class="col-sm-offset-3 col-sm-9">
            <button type="submit" class="btn btn-primary">
              Cancel
            </button>
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
