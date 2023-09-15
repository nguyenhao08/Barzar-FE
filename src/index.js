import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers";
import { createRoot } from "react-dom/client";

const store = createStore(rootReducer, applyMiddleware(thunk));

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
