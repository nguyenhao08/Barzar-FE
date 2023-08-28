import { legacy_createStore as createStore, combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  // Add your other reducers here
});

const store = createStore(rootReducer, {});
console.log(store);

export default store;
