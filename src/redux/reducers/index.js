import { combineReducers } from "redux";
import {
  productsReducer,
  selectedProductsReducer,
  addProduct,
} from "./productsReducer";
import { editProduct } from "./productsReducer";
import cartReducer from "./cartReducer";

const reducers = combineReducers({
  allProducts: productsReducer,
  product: selectedProductsReducer,
  products: addProduct,
  products: editProduct,
});
export default reducers;
