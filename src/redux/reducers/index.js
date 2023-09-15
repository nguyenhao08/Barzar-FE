import { combineReducers } from "redux";
import {
  productsReducer,
  selectedProductsReducer,
  addProduct,
} from "./productsReducer";

const reducers = combineReducers({
  allProducts: productsReducer,
  product: selectedProductsReducer,
  products: addProduct,
});
export default reducers;
