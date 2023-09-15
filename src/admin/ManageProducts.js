import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

function ManageProduct({}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingItem, setDeletingItem] = useState(null);
  const [displayedProductss, setDisplayedProducts] = useState([]);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const productsPerPage = 12;

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    const handleScroll = (e) => {
      setShowGoToTop(window.scrollY >= 350);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleButtonClick = () => {
    window.scrollTo(0, 0);
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
      const selectedProduct = displayedProducts[index];
      const selectedProductId = selectedProduct.id;

      axios
        .delete(`http://localhost:4000/products/${selectedProductId}`)
        .then(() => {
          const updatedProducts = [...products];
          const updatedDisplayedProducts = [...displayedProducts];

          updatedProducts.splice(
            products.findIndex((product) => product.id === selectedProductId),
            1
          );
          updatedDisplayedProducts.splice(index, 1);

          setProducts(updatedProducts);
          setDisplayedProducts(updatedDisplayedProducts);
          setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.filter((item) => item !== index)
          );
          setDeletingItem(null);
          toast.success("Product delete successfully");
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
        .delete(`http://localhost:4000/products/`, {
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

  const handleLogout = () => {
    // Xóa thông tin đăng nhập khỏi localStorage

    localStorage.removeItem("role");
    // Đặt lại trạng thái đăng nhập
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // Khi trang được tải, cập nhật tiêu đề của trang
    document.title = "Admin - NH";
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container d-flex justify-content-between align-items-center">
          <a className="navbar-brand text-success logo h1 align-self-center">
            Admin-NH
          </a>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#templatemo_main_nav"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
            id="templatemo_main_nav"
          >
            <div className="flex-fill"></div>
            <div className="navbar align-self-center d-flex">
              <a
                className="nav-icon position-relative text-decoration-none"
                onClick={handleLogout}
                href="/"
              >
                <i className="">Sign-Out</i>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div
        className="modal fade bg-white"
        id="templatemo_search"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="w-100 pt-1 mb-5 text-right">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form
            action=""
            method="get"
            className="modal-content modal-body border-0 p-0"
          >
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                id="inputModalSearch"
                name="q"
                placeholder="Search ..."
              />
              <button
                type="submit"
                className="input-group-text bg-success text-light"
              >
                <i className="fa fa-fw fa-search text-white"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="ui grid container">
        <div className="button">
          <a href={`product/add`} className="btn btn-sm btn-danger">
            Add Product
          </a>
        </div>
        <ToastContainer />
        <table className="table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Product Image</th>
              <th>Product short description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          {Object.keys(products).length === 0 ? (
            <tfoot
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <tr>
                <td colSpan="2">
                  <FontAwesomeIcon icon={faCircleNotch} spin size="3x" />
                </td>
              </tr>
            </tfoot>
          ) : (
            <tbody>
              {displayedProducts.map((product, index) => (
                <tr key={index}>
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
                      href={`/manage/product/edit/${product.id}`}
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
          )}
        </table>
      </div>

      <div className="page-container">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
            className="page-button"
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="scrolls">
        {showGoToTop && (
          <a
            href="#"
            className="scrolls"
            style={{ display: "inline" }}
            onClick={handleButtonClick}
          >
            <img
              src="//theme.hstatic.net/1000026602/1001065742/14/arrow_final.png?v=727"
              style={{ overflow: "hidden" }}
              alt="Scroll to top"
            />
          </a>
        )}
      </div>
    </>
  );
}
export default ManageProduct;
