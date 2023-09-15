import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Cart = () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const FREESHIP_THRESHOLD = 500000;
  const [total, setTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0); // Tổng số lượng sản phẩm
  const [remainingAmountForFreeship, setRemainingAmountForFreeship] =
    useState(0);

  const [quantityValues, setQuantityValues] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.title] = item.quantity;
      return acc;
    }, {})
  );

  useEffect(() => {
    const newTotal = calculateTotal();
    setTotal(newTotal);
    setRemainingAmountForFreeship(FREESHIP_THRESHOLD - newTotal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantityValues]);

  const handleQuantityChange = (event, title) => {
    const newQuantity = parseInt(event.target.value);
    setQuantityValues((prevValues) => ({
      ...prevValues,
      [title]: newQuantity,
    }));

    const updatedCartItems = cartItems.map((item) => {
      if (item.title === title) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleDeleteItem = (title) => {
    const updatedCartItems = cartItems.filter((item) => item.title !== title);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    window.location.reload(); // Refresh the page to reflect the changes
  };

  const handleCheckout = () => {
    window.location.href = "/checkout";
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * quantityValues[item.title];
    }, 0);
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let quantitySum = 0;

    storedCartItems.forEach((item) => {
      quantitySum += item.quantity;
    });

    setTotalQuantity(quantitySum);
  }, []);

  useEffect(() => {
    // Khi trang được tải, cập nhật tiêu đề của trang
    document.title = "Cart - NH";
  }, []);

  return (
    <>
      <Header />
      <div
        className="row"
        style={{
          marginTop: "25px",
          marginBottom: "25px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <ul
          className="item-discount freeship-cart"
          style={{ display: "flex", marginLeft: "20px", alignItems: "center" }}
        >
          <div
            className="icon-discount"
            style={{ flex: "0 0 auto", marginRight: "10px" }}
          >
            <img
              src="//theme.hstatic.net/1000026602/1001065742/14/truck.png?v=776"
              alt="Freeship"
              style={{ width: "50px", height: "auto" }} // Thay đổi kích thước hình ảnh tại đây
            />
          </div>
          <div className="detail-discount" style={{ flex: "1" }}>
            {total < FREESHIP_THRESHOLD ? (
              <span>
                Buy more{" "}
                <strong>{remainingAmountForFreeship.toLocaleString()}₫</strong>{" "}
                to get
                <strong style={{ fontWeight: "bold" }}>
                  {" "}
                  FREE NATIONWIDE SHIPPING
                </strong>
                {total < FREESHIP_THRESHOLD && (
                  <a
                    href="/shop"
                    className="btn-style btn-buycoutinue"
                    style={{ marginLeft: "30px" }}
                  >
                    Buy more
                  </a>
                )}
              </span>
            ) : (
              <span>
                You are eligible for{" "}
                <strong style={{ fontWeight: "bold" }}>
                  FREE NATIONWIDE SHIPPING
                </strong>{" "}
              </span>
            )}
          </div>
        </ul>
        {cartItems.length === 0 ? (
          <div className="cart-container">
            <p className="empty-cart-message">Your cart is empty.</p>
          </div>
        ) : (
          <div className="ui grid container">
            <div className="table-container">
              <h4>Item Summary ({totalQuantity})</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div>
                          <label className="form-label"></label>
                          {item.image && (
                            <img
                              src={item.image}
                              alt="Preview"
                              className="form-image1"
                            />
                          )}
                          <br />
                          {item.title}
                        </div>
                      </td>
                      <td style={{ fontWeight: "normal" }}>
                        {(item.price * 1).toLocaleString()}đ
                      </td>
                      <td>
                        <input
                          type="number"
                          value={quantityValues[item.title]}
                          onChange={(e) => handleQuantityChange(e, item.title)}
                          min="1"
                        />
                      </td>
                      <td style={{ fontWeight: "normal" }}>
                        {(
                          item.price * quantityValues[item.title]
                        ).toLocaleString()}
                        đ
                      </td>
                      <td>
                        <button
                          className="button-btn1"
                          onClick={() => handleDeleteItem(item.title)}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="total-container">
              <br />

              <h4 style={{ fontWeight: "bold" }}>Order Summary</h4>
              <br />
              <h5 style={{ fontWeight: "normal" }}>
                Total All: {calculateTotal().toLocaleString()}đ
              </h5>
              <button className="button-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
