import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../store/actions/index";
import CollegeCard from "../../components/CollegeCard/CollegeCard";
import Spinner from "../../components/UI/Spinner/Spinner";

import classes from "./Colleges.module.css";

const CollegeSearch = (props) => {
  const {
    onFetchColleges,
    onFetchPartialColleges,
    page,
    colleges,
    partialColleges,
    loading,
  } = props;

  useEffect(() => {
    if (colleges.length === 0) {
      onFetchColleges();
    } else {
      onFetchPartialColleges(page);
    }
  }, [onFetchColleges, onFetchPartialColleges, page, colleges]);

  let mainContent = <Spinner />;

  if (!loading) {
    mainContent = (
      <Fragment>
        {partialColleges.map((college, index) => (
          <CollegeCard
            {...college}
            fetchDetail={() => props.onFetchDetailCollege(index)}
            key={index}
          />
        ))}
      </Fragment>
    );
  }

  return <div className={classes.MainLayout}>{mainContent}</div>;
};

const mapStateToProps = (state) => {
  return {
    colleges: state.college.colleges,
    partialColleges: state.college.partialColleges,
    page: state.college.page,
    loading: state.college.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchColleges: () => dispatch(actionCreators.fetchColleges()),
    onFetchPartialColleges: (page) =>
      dispatch(actionCreators.fetchCollege(page)),
    onFetchDetailCollege: (index) =>
      dispatch(actionCreators.fetchDetailCollege(index)),
    onSwitchPage: (page) => dispatch(actionCreators.switchPage(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CollegeSearch);
