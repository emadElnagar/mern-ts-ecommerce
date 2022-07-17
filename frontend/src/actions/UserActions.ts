import axios from "axios";
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from "../constants/UserConstants";

export const register: any = (firstName: string, lastName: string, email: string, password: string) => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post('http://localhost:5000/api/users/register', { firstName, lastName, email, password });
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    });
    sessionStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error: any) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}
