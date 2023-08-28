import { combineReducers } from "redux";
import { ActionTypes } from "../constants/action-types";
import { loginSuccess } from "../actions/loginActions";

const initialUserState = {
  isLoggedIn: false,
  user: null,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        user: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
