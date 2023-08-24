import { combineReducers } from "redux";
import {
  productsReducer,
  selectedProductsReducer,
  addProduct,
} from "./productsReducer";
import { editProduct } from "../actions/productsActions";
const reducers = combineReducers({
  allProducts: productsReducer,
  product: selectedProductsReducer,
  products: addProduct,
  products: editProduct,
});
export default reducers;
