import axios from "axios";
import { ActionTypes } from "../constants/action-types";

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const selectedProduct = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};
export const removeSelectedProduct = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_PRODUCT,
  };
};

export const addProduct = (product) => {
  return (dispatch) => {
    axios
      .post("http://localhost:8080/products", product)
      .then((response) => {
        dispatch({
          type: ActionTypes.ADD_PRODUCT,
          payload: response.data,
        });
        console.log(response, "success", product);
      })

      .catch((error) => {
        console.log("Lỗi add", error);
      });
  };
};

export const editProduct = (product) => {
  return (dispatch) => {
    axios
      .put(`http://localhost:8080/products/${product.id}`, product)
      .then((response) => {
        dispatch({
          type: ActionTypes.EDIT_PRODUCT,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addToCart = (product) => {
  return {
    type: "ADD_TO_CART",
    payload: product,
  };
};
