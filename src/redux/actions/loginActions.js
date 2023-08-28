import { ActionTypes } from "../constants/action-types";

export const loginSuccess = (user) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload: user,
});
