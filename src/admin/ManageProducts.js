import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "../App.css";

function ManageProduct() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingItem, setDeletingItem] = useState(null);

  const productsPerPage = 6;

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (selectAll) {
      const allIndexes = products.map((_, index) => index);
      setSelectedItems(allIndexes);
    } else {
      setSelectedItems([]);
    }
  }, [selectAll, products]);

  const handleCheckboxChange = (event, index) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedItems((prevSelectedItems) => {
        // Kiểm tra xem sản phẩm đã được chọn hay chưa
        if (!prevSelectedItems.includes(index)) {
          return [...prevSelectedItems, index];
        }
        return prevSelectedItems;
      });
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item !== index)
      );
    }
  };

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
  };
  const displayedProducts = useMemo(() => {
    // Tính toán danh sách sản phẩm hiển thị trên trang
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.slice(startIndex, endIndex);
  }, [products, currentPage]);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleDelete = (index) => {
    setDeletingItem(index);
    const confirmation = window.confirm(
      "Are you sure you want to delete the product?"
    );

    if (confirmation) {
      // Lấy id của sản phẩm được chọn
      const selectedProductId = products[index].id;

      axios
        .delete(`http://localhost:8080/products/${selectedProductId}`)
        .then(() => {
          const updatedProducts = [...products];
          updatedProducts.splice(index, 1);
          setProducts(updatedProducts);
          setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.filter((item) => item !== index)
          );
          setDeletingItem(null);
        })
        .catch((error) => console.log(error));
    } else {
      setDeletingItem(null);
    }
  };

  const handleDeleteSelect = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one product to delete.");
      return;
    }
    const confirmation = window.confirm(
      "Are you sure you want to delete the product?"
    );

    if (confirmation) {
      // Lấy danh sách các id của các sản phẩm được chọn
      const selectedProductIds = selectedItems.map(
        (index) => products[index].id
      );

      axios
        .delete(`http://localhost:8080/products/`, {
          data: { ids: selectedProductIds },
        })
        .then(() => {
          const updatedProducts = products.filter(
            (_, index) => !selectedItems.includes(index)
          );
          setProducts(updatedProducts);
          setSelectedItems([]);
        })
        .catch((error) => console.log(error));
    }
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
            <div class="flex-fill"></div>
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
      <div
        class="modal fade bg-white"
        id="templatemo_search"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="w-100 pt-1 mb-5 text-right">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form
            action=""
            method="get"
            class="modal-content modal-body border-0 p-0"
          >
            <div class="input-group mb-2">
              <input
                type="text"
                class="form-control"
                id="inputModalSearch"
                name="q"
                placeholder="Search ..."
              />
              <button
                type="submit"
                class="input-group-text bg-success text-light"
              >
                <i class="fa fa-fw fa-search text-white"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="ui grid container">
        <div className="button">
          <button className="btn btn-danger" onClick={handleDeleteSelect}>
            Delete selections
          </button>
          <a href={`product/add`} className="btn btn-sm btn-danger">
            Add Product
          </a>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Product Image</th>
              <th>Product short description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((product, index) => (
              <tr key={index}>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(index)}
                    onChange={(event) => handleCheckboxChange(event, index)}
                  />
                </th>
                <td scope="row">{product.id}</td>
                <td>{product.title}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ height: "200px", width: "200px" }}
                  />
                </td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <a
                    href={`edit/${product.id}`}
                    className="btn btn-sm btn-info"
                  >
                    Edit
                  </a>
                  {deletingItem === index ? (
                    <button className="btn btn-danger" disabled>
                      Deleting...
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="page-container">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
            class="page-button"
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}
export default ManageProduct;
