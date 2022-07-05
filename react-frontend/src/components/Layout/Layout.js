import React, { useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as actionCreators from "../../store/actions/index";
import Toolbar from "../UI/Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";

const Layout = (props) => {
  const { autoLogin } = props;
  useEffect(() => {
    autoLogin();
  }, [autoLogin]);
  let pageSwitcher = null;
  if (props.location.pathname === "/") {
    const { onSwitchPage, page } = props;
    const paginationChangeHandler = (event, value) => {
      onSwitchPage(value);
    };
    pageSwitcher = (
      <div className={classes.Pagination}>
        <Pagination
          color="secondary"
          variant="outlined"
          shape="rounded"
          page={page}
          count={10}
          onChange={paginationChangeHandler}
        />
      </div>
    );
  }
  return (
    <div className={classes.Layout}>
      <nav>
        <Toolbar isAuth={props.isAuth} />
        {pageSwitcher}
      </nav>
      <main>{props.children}</main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    page: state.college.page,
    isAuth: state.auth.userdata !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchPage: (page) => dispatch(actionCreators.switchPage(page)),
    autoLogin: () => dispatch(actionCreators.autoLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));
