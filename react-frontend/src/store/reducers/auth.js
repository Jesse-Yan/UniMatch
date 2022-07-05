/* eslint-disable indent */
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  tokenData: null,
  userdata: null,
  loading: false,
  signup: false,
  error: null,
};

const authStart = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    userdata: action.response,
    signup: action.signup,
    loading: false,
    error: null,
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const confirmFirstLogin = (state, action) => {
  return {
    ...state,
    signup: false,
  };
};

const tokenDataFetched = (state, action) => {
  return {
    ...state,
    tokenData: action.data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.LOGOUT:
      return initialState;
    case actionTypes.CONFIRM_FIRST_LOGIN:
      return confirmFirstLogin(state, action);
    case actionTypes.FETCH_BY_TOKEN:
      return tokenDataFetched(state, action);
    default:
      return state;
  }
};

export default reducer;
