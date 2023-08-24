import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useMemo, useState, useEffect } from "react";

const ProductComponent = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const productsPerPage = 16;

  // Sử dụng danh sách sản phẩm đã được truyền từ prop
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

  // Scroll
  useEffect(() => {
    const handleScroll = () => {
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

  return (
    <>
      <div className="ui grid container">
        {displayedProducts.map((product) => {
          const { id, title, image, price, category, currency, description } =
            product;

          return (
            <div className="four wide column" key={id}>
              <Link to={`/product/${id}`}>
                <div className="ui link cards">
                  <div className="card">
                    <div className="image">
                      <img src={image} alt={title} />
                    </div>
                    <div className="content">
                      <div className="header">{title}</div>
                      <div className="meta price">
                        {price} {currency}
                      </div>
                      <div className="meta">{description}</div>
                      <div className="meta">{category}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="page-container1">
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
};

export default ProductComponent;
