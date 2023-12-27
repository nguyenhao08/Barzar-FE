import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrictName, setSelectDistrictName] = useState("");
  const [selectedProvinceName, setselectedProvinceName] = useState("");
  const [selectedWardName, setSelectedWardsName] = useState("");

  const [wards, setWards] = useState([]);

  const [fullNameError, setFullNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [provinceError, setProvinceError] = useState(false);
  const [districtError, setDistrictError] = useState(false);
  const [wardError, setWardError] = useState(false);

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartItemsString = JSON.stringify(cartItems);
  console.log("string", cartItemsString);

  const [quantityValues] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.title] = item.quantity;
      return acc;
    }, {})
  );

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * quantityValues[item.title];
    }, 0);
  };

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p")
      .then((response) => response.json())
      .then((data) => setProvinces(data));

    setDistricts([]);
    setWards([]);
  }, []);

  const handleProvinceChange = (event) => {
    const selectedProvinceId = event.target.value;
    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedProvinceName = selectedOption.getAttribute("data-name");
    setselectedProvinceName(selectedProvinceName);

    console.log("ID:", selectedProvinceId);
    console.log("Province:", selectedProvinceName);

    fetch(`https://provinces.open-api.vn/api/p/${selectedProvinceId}?depth=2`)
      .then((response) => response.json())
      .then((data) => setDistricts(data.districts));

    setWards([]);
  };

  const handleDistrictChange = (event) => {
    const selectedDistrictId = event.target.value;
    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedDistrictName = selectedOption.getAttribute("data-name");
    setSelectDistrictName(selectedDistrictName);

    console.log("Selected District ID:", selectedDistrictId);
    console.log("Selected District Name:", selectedDistrictName);

    fetch(`https://provinces.open-api.vn/api/d/${selectedDistrictId}?depth=2`)
      .then((response) => response.json())
      .then((data) => setWards(data.wards));
  };

  const handleWardChange = (event) => {
    const selectedWardId = event.target.value;
    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedWardName = selectedOption.getAttribute("data-name");
    setSelectedWardsName(selectedWardName);

    console.log("Selected Ward ID:", selectedWardId);
    console.log("Selected Ward Name:", selectedWardName);
  };

  // paymentMethod
  const [selectedRadio, setSelectedRadio] = useState(1);
  const [defaultRadioContent] = useState("Cash on delivery (COD)");

  const [selectedRadioContent, setSelectedRadioContent] = useState("");
  const handleRadioChange = (radioId) => {
    setSelectedRadio(radioId);

    let selectedRadioContent = "Cash on delivery (COD)";

    if (radioId === 1) {
      selectedRadioContent = "Cash on delivery (COD)";
    }
    if (radioId === 2) {
      selectedRadioContent = "Bank Transfer";
    }
    if (radioId === 3) {
      selectedRadioContent = "Momo";
    }

    setSelectedRadioContent(selectedRadioContent);
  };

  // Lần đầu render
  useEffect(() => {
    setSelectedRadioContent(defaultRadioContent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(selectedRadioContent);
  }, [selectedRadioContent]);
  const calculateGrandTotal = () => {
    const total = calculateTotal();
    const shippingFee = total > 500000 ? 0 : 30000;
    return total + shippingFee;
  };

  const addres =
    selectedWardName + "-" + selectedDistrictName + "-" + selectedProvinceName;
  const saveOrderInformation = () => {
    const orderData = {
      name: fullName,
      phoneNumber: phoneNumber,
      address: address,
      addres: addres,
      cartItems: cartItemsString,
      total: calculateTotal(),
      grandTotal: calculateGrandTotal(),
      paymentMethod: selectedRadioContent,
    };

    localStorage.setItem("orderInformation", JSON.stringify(orderData));
    console.log(cartItems);

    fetch("http://localhost:8080/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order information saved:", data);
        // Perform additional actions after successful save
      })
      .catch((error) => {
        console.error("Error saving order information:", error);
        // Handle errors if needed
      });
  };

  const handlePlaceOrder = () => {
    if (
      !fullName ||
      !phoneNumber ||
      !address ||
      !selectedProvinceName ||
      !selectedDistrictName ||
      !selectedWardName
    ) {
      // Handle validation errors if any required field is empty
      if (!fullName) {
        setFullNameError("Please enter your full name.");
      }
      if (!phoneNumber) {
        setPhoneNumberError("Please enter your phone number.");
      }
      if (!address) {
        setAddressError("Please enter your address.");
      }
      if (!selectedProvinceName) {
        setProvinceError(true);
      }
      if (!selectedDistrictName) {
        setDistrictError(true);
      }
      if (!selectedWardName) {
        setWardError(true);
      }
      return; // Prevent submission
    } else {
      saveOrderInformation();
      localStorage.removeItem("cartItems");

      window.location.href = "/thankyou";
    }
  };
  useEffect(() => {
    // Khi trang được tải, cập nhật tiêu đề của trang
    document.title = "CheckOut - NH";
  }, []);
  return (
    <>
      <div className="checkout-wrapper">
        <div className="checkout-form">
          <a href="/">
            <h2 className="h2 text-success border-bottom pb-3 border-light logo">
              NH Store
            </h2>
          </a>
          <h3 style={{ marginBottom: "25px" }}>
            <a href="/cart">Cart</a>
            <i
              style={{
                fontSize: "18px",
                marginLeft: "10px",
                marginRight: "10px",
                fontWeight: "550",
              }}
              className="fa fa-angle-right	
"
            ></i>
            <a href="/checkout" style={{ color: "black" }}>
              Checkout
            </a>
          </h3>
          <h3 style={{ marginBottom: "25px" }}>Shipping Information</h3>
          <form>
            <div className="information">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>

                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`form-input ${fullNameError ? "error-input" : ""}`}
                  placeholder="Enter Full Name"
                />

                {fullNameError && (
                  <span
                    style={{ color: "red", paddingBottom: 10, marginLeft: 5 }}
                    className="error"
                  >
                    {fullNameError}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={`form-input ${
                    phoneNumberError ? "error-input" : ""
                  }`}
                  placeholder="Enter Phone Number"
                />
                {phoneNumberError && (
                  <span
                    style={{ color: "red", paddingBottom: 10, marginLeft: 5 }}
                    className="error"
                  >
                    {phoneNumberError}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`form-input ${addressError ? "error-input" : ""}`}
                  placeholder="Enter Address"
                />
                {addressError && (
                  <span
                    style={{ color: "red", paddingBottom: 10, marginLeft: 5 }}
                    className="error"
                  >
                    {addressError}
                  </span>
                )}
              </div>
              <div className="field1">
                <div className="field-input-wrapper field-input-wrapper-select">
                  <label
                    className="field-label"
                    htmlFor="customer_shipping_province"
                  >
                    Province / City
                    <select
                      className={`field-input ${
                        provinceError ? "error-input" : ""
                      }`}
                      id="customer_shipping_province"
                      name="customer_shipping_province"
                      onChange={handleProvinceChange}
                    >
                      <option value="">Choose province</option>
                      {provinces.map((province) => (
                        <option
                          key={province.code}
                          value={province.code}
                          data-name={province.name}
                        >
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  {provinceError && (
                    <span className="error-message">
                      Please choose a province.
                    </span>
                  )}
                </div>
                <div className="field-input-wrapper field-input-wrapper-select">
                  <label
                    className="field-label"
                    htmlFor="customer_shipping_district"
                  >
                    District
                    <select
                      className={`field-input ${
                        districtError ? "error-input" : ""
                      }`}
                      id="customer_shipping_district"
                      name="customer_shipping_district"
                      onChange={handleDistrictChange}
                    >
                      <option value="">Choose district</option>
                      {districts.map((district) => (
                        <option
                          key={district.code}
                          value={district.code}
                          data-name={district.name}
                        >
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  {districtError && (
                    <span className="error-message">
                      Please choose a district.
                    </span>
                  )}
                </div>
                <div className="field-input-wrapper field-input-wrapper-select">
                  <label
                    className="field-label"
                    htmlFor="customer_shipping_ward"
                  >
                    Ward / Commune
                    <select
                      className={`field-input ${
                        wardError ? "error-input" : ""
                      }`}
                      id="customer_shipping_ward"
                      name="customer_shipping_ward"
                      onChange={handleWardChange}
                    >
                      <option value="">Choose ward</option>
                      {wards.map((ward) => (
                        <option
                          key={ward.code}
                          value={ward.code}
                          data-name={ward.name}
                        >
                          {ward.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  {wardError && (
                    <span className="error-message">Please choose a ward.</span>
                  )}
                </div>
              </div>
            </div>

            <div className="content-box">
              <div>
                <div
                  style={{
                    padding: "15px",
                  }}
                >
                  <input
                    type="radio"
                    name="radioGroup"
                    value={1}
                    checked={selectedRadio === 1}
                    onChange={() => handleRadioChange(1)}
                  />
                  <label className="labelstyle">
                    <div className="radio-content-input">
                      <img
                        className="main-img"
                        alt="icon-code"
                        src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=4"
                      />
                      <div>
                        <span
                          className={
                            selectedRadio === 1
                              ? "radio-label-primary selected"
                              : "radio-label-primary"
                          }
                        >
                          Cash on delivery (COD)
                        </span>
                      </div>
                    </div>
                  </label>
                  <div>
                    {selectedRadio === 1 && (
                      <div
                        style={{
                          marginLeft: "85px",
                        }}
                      >
                        <strong>
                          Receive Package - Inspect Goods - Make Payment
                        </strong>
                      </div>
                    )}
                  </div>
                </div>
                <hr />
                <div
                  style={{
                    padding: "15px",
                  }}
                >
                  <input
                    type="radio"
                    name="radioGroup"
                    value={2}
                    checked={selectedRadio === 2}
                    onChange={() => handleRadioChange(2)}
                  />
                  <label className="labelstyle">
                    <div className="radio-content-input">
                      <img
                        className="main-img"
                        alt="icon-pay"
                        src="https://hstatic.net/0/0/global/design/seller/image/payment/other.svg?v=4"
                      />
                      <div>
                        <span className="radio-label-primary">
                          Bank Transfer
                        </span>
                        <span className="quick-tagline hidden"></span>
                      </div>
                    </div>
                  </label>
                  <div>
                    {selectedRadio === 2 && (
                      <div
                        style={{
                          marginLeft: "85px",
                        }}
                      >
                        <strong>
                          Transfer Information:
                          <br /> Account number: 0581000798258
                          <br />
                          Account holder's name: VO NGUYEN HAO <br />
                          Bank name: VietComBank (Ngân hàng TMCP Ngoại Thương
                          Việt Nam) <br />
                          Branch: VietComBank - PGD CR
                        </strong>
                      </div>
                    )}
                  </div>
                </div>
                <hr />
                <div
                  style={{
                    padding: "15px",
                  }}
                >
                  <input
                    type="radio"
                    name="radioGroup"
                    value={3}
                    checked={selectedRadio === 3}
                    onChange={() => handleRadioChange(3)}
                  />
                  <label className="labelstyle">
                    <div className="radio-content-input">
                      <img
                        className="main-img"
                        alt="icon-momo"
                        src="https://hstatic.net/0/0/global/design/seller/image/payment/momo.svg?v=4"
                      />
                      <div>
                        <span className="radio-label-primary">Ví MoMo</span>
                      </div>
                    </div>
                  </label>
                  <div>
                    {selectedRadio === 3 && (
                      <div
                        style={{
                          marginLeft: "85px",
                        }}
                      >
                        <img
                          className="form-image3"
                          alt="qr-momo"
                          src="https://th.bing.com/th/id/R.fbf4767ba1e36a39e638bed086b38637?rik=buB1r7MihgDECQ&pid=ImgRaw&r=0"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Link to="/">
              <button
                type="submit"
                onClick={handlePlaceOrder}
                className="submit-button"
              >
                Place Order
              </button>
            </Link>
          </form>
        </div>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="order-summary">
            <h2 className="title-summary"> Order Summary</h2>
            {cartItems.map((item, index) => (
              <div key={index}>
                <div>
                  <div className="summary-order">
                    {item.image && (
                      <div className="image-container">
                        <img
                          src={item.image}
                          alt="Preview"
                          className="form-image2"
                        />
                        <span className="quantity-value">
                          {quantityValues[item.title]}
                        </span>
                      </div>
                    )}
                    <span style={{ marginLeft: "10px" }}>{item.title}</span>
                  </div>
                </div>

                <hr></hr>
              </div>
            ))}
            <div className="order-summary-item">
              <span>Total Product Cost:</span>
              <span style={{ fontWeight: "normal", marginLeft: "5px" }}>
                {calculateTotal().toLocaleString()}đ
              </span>
            </div>
            <div className="order-summary-item">
              <span>Shipping Fee:</span>
              <span style={{ fontWeight: "normal", marginLeft: "5px" }}>
                {calculateTotal() > 500000 ? "0" : "30.0000"}đ
              </span>
            </div>
            <div className="order-summary-item">
              <span>Total Amount:</span>
              <span style={{ fontWeight: "normal", marginLeft: "5px" }}>
                {calculateGrandTotal().toLocaleString()}đ
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
