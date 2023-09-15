import { ActionTypes } from "../constants/action-types";
const intialState = {
  products: [],
};

export const productsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    default:
      return state;
  }
};

export const selectedProductsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_PRODUCT:
      return {};
    default:
      return state;
  }
};

export const addProduct = (state = intialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    default:
      return state;
  }
};

export const editProduct = (state = intialState, action) => {
  switch (action.type) {
    case ActionTypes.EDIT_PRODUCT:
      const updatedProducts = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return action.payload;
        }
        return product;
      });
      return {
        ...state,
        products: updatedProducts,
      };
    default:
      return state;
  }
};
