import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";

import Spinner from "../../components/UI/Spinner/Spinner";
import * as actionCreators from "../../store/actions/index";

const Profile = (props) => {
  const { userdata, loginData, onFetchByToken } = props;
  useEffect(() => {
    if (!userdata && loginData) {
      onFetchByToken(loginData.data.access_token);
    }
  }, [userdata, loginData, onFetchByToken]);

  let content = <Spinner />;
  if (userdata) {
    content = <div></div>;
  }
  return <Fragment>{content}</Fragment>;
};

const mapStateToProps = (state) => {
  return { userdata: state.auth.tokenData, loginData: state.auth.userdata };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchByToken: (token) => dispatch(actionCreators.fetchByToken(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
