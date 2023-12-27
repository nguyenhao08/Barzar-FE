import React, { useMemo, useState, useEffect } from "react";

const ProductComponent = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const productsPerPage = 16;

  // Sử dụng danh sách sản phẩm đã được truyền từ prop
  const displayedProducts = useMemo(() => {
    if (!Array.isArray(products)) {
      return []; // hoặc giá trị mặc định khác nếu phù hợp với trường hợp của bạn
    }

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
            product; // Sửa đổi thành "product" thay vì "products"
          console.log("sản phẩm", product.image);

          return (
            <div className="four wide column" key={product.id}>
              <a href={`/product:${id}`}>
                <div className="ui link cards">
                  <div className="card">
                    <div className="image">
                      <img src={product.images[0]} alt={product.title} />
                    </div>
                    <div className="content">
                      <div className="header">{product.title}</div>
                      <div className="meta price">
                        {(price * 1).toLocaleString()}VND {currency}
                      </div>
                      <div className="meta">{product.description}</div>
                      <div className="meta">{products.category}</div>
                    </div>
                  </div>
                </div>
              </a>
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
