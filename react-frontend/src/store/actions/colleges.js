import * as actionTypes from "./actionTypes";

import axiosUni from "../../axios-Uni";

export const fetchCollegesStart = () => {
  return {
    type: actionTypes.FETCH_COLLEGES_START,
  };
};

export const fetchCollegesSuccess = (colleges) => {
  return {
    type: actionTypes.FETCH_COLLEGES_SUCCESS,
    colleges: colleges,
  };
};

export const fetchCollegesFail = (error) => {
  return {
    type: actionTypes.FETCH_COLLEGES_FAIL,
    error: error,
  };
};

export const fetchColleges = () => {
  return async (dispatch) => {
    dispatch(fetchCollegesStart());
    try {
      const response = await axiosUni.get("/schools/all");
      dispatch(fetchCollegesSuccess(response.data));
    } catch (error) {
      dispatch(fetchCollegesFail(error));
    }
  };
};

export const fetchCollege = (range) => {
  return {
    type: actionTypes.FETCH_COLLEGE,
    range: range,
  };
};

export const fetchDetailCollege = (index) => {
  return {
    type: actionTypes.FETCH_DETAIL_COLLEGE,
    index: index,
  };
};

export const switchPage = (page) => {
  return {
    type: actionTypes.SWITCH_PAGE,
    page: page,
  };
};
