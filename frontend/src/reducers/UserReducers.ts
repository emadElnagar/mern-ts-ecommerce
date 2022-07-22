import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_SIGN_IN_REQUEST,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_FAIL,
  USER_SIGN_OUT
} from "../constants/UserConstants";

export const userRegisterReducer = (state = {}, action: { type: string; payload: any; }) => {
  switch(action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const userloginReducer = (state = {}, action: { type: string; payload: any; }) => {
  switch(action.type) {
    case USER_SIGN_IN_REQUEST:
      return { loading: true }
    case USER_SIGN_IN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGN_IN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGN_OUT:
      return {};
    default:
      return state;
  }
}
