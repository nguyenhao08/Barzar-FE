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
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
