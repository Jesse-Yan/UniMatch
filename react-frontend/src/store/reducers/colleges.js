/* eslint-disable indent */
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  page: 1,
  colleges: [],
  partialColleges: [],
  college: null,
  loading: false,
  error: null,
};

const rangeTransform = [
  { s: 0, e: 10 },
  { s: 10, e: 20 },
  { s: 20, e: 30 },
  { s: 30, e: 40 },
  { s: 40, e: 50 },
  { s: 50, e: 60 },
  { s: 60, e: 70 },
  { s: 70, e: 80 },
  { s: 80, e: 90 },
  { s: 90, e: 100 },
];

const fetchDetailCollege = (state, action) => {
  return {
    ...state,
    college: state.partialColleges[action.index],
  };
};

const fetchCollege = (state, action) => {
  const indexs = rangeTransform[action.range - 1];
  return {
    ...state,
    partialColleges: state.colleges.slice(indexs.s, indexs.e),
    loading: false,
    error: null,
  };
};

const fetchCollegesStart = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
  };
};

const fetchCollegesSuccess = (state, action) => {
  return {
    ...state,
    colleges: action.colleges,
    loading: false,
    error: null,
  };
};

const fetchCollegesFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const switchPage = (state, action) => {
  return {
    ...state,
    page: action.page,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COLLEGE:
      return fetchCollege(state, action);
    case actionTypes.FETCH_DETAIL_COLLEGE:
      return fetchDetailCollege(state, action);
    case actionTypes.FETCH_COLLEGES_START:
      return fetchCollegesStart(state, action);
    case actionTypes.FETCH_COLLEGES_SUCCESS:
      return fetchCollegesSuccess(state, action);
    case actionTypes.FETCH_COLLEGES_FAIL:
      return fetchCollegesFail(state, action);
    case actionTypes.SWITCH_PAGE:
      return switchPage(state, action);
    default:
      return state;
  }
};

export default reducer;
