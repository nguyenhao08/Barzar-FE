import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import {
  selectedProduct,
  removeSelectedProduct,
  addToCart,
} from "../redux/actions/productsActions";

import Header from "./Header";
import Footer from "./Footer";

const ProductDetails = () => {
  const { productId } = useParams();
  const product = useSelector((state) => state.product);
  const { images, title, price, category, description } = product;
  const dispatch = useDispatch();

  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`http://localhost:8080/products/${id}`)
      .catch((err) => {});
    dispatch(selectedProduct(response.data));
    console.log(response.data);
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  const handleAddToCart = () => {
    const productData = {
      id: productId,
      image: images,
      title,
      price,
      quantity: 1,
    };

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = cartItems.find((item) => item.title === title);
    if (existingItem) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
      existingItem.quantity += 1;
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
      cartItems.push(productData);
    }

    // Cập nhật giỏ hàng trong localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    window.location.reload();
  };

  useEffect(() => {
    // Khi trang được tải, cập nhật tiêu đề của trang
    document.title = `${title}`;
  }, [title]);

  return (
    <>
      <Header />
      <div className="container">
        {Object.keys(product).length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <FontAwesomeIcon icon={faCircleNotch} spin size="3x" />
          </div>
        ) : (
          <div className="ui segment">
            <div className="ui two column stackable center aligned grid">
              <div className="ui vertical divider">AND</div>
              <div className="middle aligned row">
                <div className="column lp">
                  <img className="ui fluid image" src={images} alt={title} />
                </div>
                <div className="column rp">
                  <h1>{title}</h1>
                  <h2>
                    <a className="ui teal tag label">
                      {parseFloat(price).toLocaleString()} VND
                    </a>
                  </h2>
                  <h3 className="ui brown block header">{category.title}</h3>
                  <p>{description}</p>
                  <div
                    className="ui vertical animated button"
                    tabIndex="0"
                    onClick={handleAddToCart}
                  >
                    <div className="hidden content">
                      <i className="shop icon"></i>
                    </div>
                    <div className="visible content">Add to Cart</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
