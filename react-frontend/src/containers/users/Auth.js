import React, { useState, Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@material-ui/core";
import Select from "react-select";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actionCreators from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import axiosUni from "../../axios-Uni";

import CheckIcon from "../../components/UI/CheckIcon/CheckIcon";

const Auth = (props) => {
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    if (isSignUp) {
      props.onSubmitHandler(
        {
          username: data.userName,
          password: data.password,
          highschool: data.highschool,
          dreamschool: data.dreamschool.value,
        },
        isSignUp
      );
    } else {
      props.onSubmitHandler(
        {
          username: data.userName,
          password: data.password,
        },
        isSignUp
      );
    }
  };
  const [isSignUp, setIsSignUp] = useState(true);

  const signUpChangeHandler = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  const onConfirmFirstLogin = () => {
    props.confirmFirstLogin();
    props.history.replace("/");
  };

  const schoolList = [];

  const fetchAllSchools = async () => {
    const allSchools = (await axiosUni.get("/schools/all")).data;
    allSchools.forEach((school) => {
      const schoolInfo = {};
      schoolInfo.value = school.name;
      schoolInfo.label = school.name;
      schoolList.push(schoolInfo);
    });
  };

  fetchAllSchools();

  let signUp = null;
  if (isSignUp) {
    signUp = (
      <Fragment>
        <Controller
          as={TextField}
          placeholder="Your Highschool here"
          inputProps={{
            maxLength: 50,
            title: "Only letters can be used in this field",
          }}
          required
          name="highschool"
          control={control}
          defaultValue=""
        />
        <Controller
          as={<Select className={classes.Select} options={schoolList} />}
          placeholder="Choose Your Dreamschool"
          required
          name="dreamschool"
          control={control}
          defaultValue={{
            value: "Princeton University",
            label: "Princeton University",
          }}
        />
      </Fragment>
    );
  }

  let cardClasses = [classes.AuthCard, classes.AuthCardSignup];

  let mainForm = (
    <div className={classes.CheckIcon}>
      <CheckIcon />
      <Button color="primary" variant="contained" onClick={onConfirmFirstLogin}>
        CONFIRM
      </Button>
    </div>
  );

  if (!props.signup) {
    cardClasses.pop();
    const pattern = isSignUp ? "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}" : null;
    mainForm = (
      <Fragment>
        {props.isAuth && <Redirect to="/" />}
        {props.error && <p>{props.error.message}</p>}
        {props.loading ? (
          <Spinner />
        ) : (
          <form className={classes.Form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              as={TextField}
              placeholder="Your Username here"
              inputProps={{
                maxLength: 20,
                pattern: "^[A-Za-z]+$",
                title: "Only letters can be used in this field",
              }}
              required
              name="userName"
              control={control}
              defaultValue=""
            />
            <Controller
              as={TextField}
              placeholder="Your Password here"
              type="password"
              inputProps={{
                title:
                  "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
                pattern: pattern,
              }}
              required
              name="password"
              control={control}
              defaultValue=""
            />
            {signUp}
            <Button type="submit" color="secondary" variant="contained">
              {isSignUp ? "Sign Up" : "Login"}
            </Button>
            <Button
              color="primary"
              variant="outlined"
              onClick={signUpChangeHandler}
            >
              Switch To {isSignUp ? "Login" : "Sign Up"}
            </Button>
          </form>
        )}
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className={classes.Auth}>
        <div className={cardClasses.join(" ")}>
          <p>
            <strong>Welcome To UniMatch</strong>
          </p>
          {mainForm}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToPorps = (state) => {
  return {
    isAuth: state.auth.userdata !== null,
    loading: state.auth.loading,
    signup: state.auth.signup,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitHandler: (data, signup) =>
      dispatch(actionCreators.auth(data, signup)),
    confirmFirstLogin: () => dispatch(actionCreators.confirmFirstLogin()),
  };
};

export default connect(mapStateToPorps, mapDispatchToProps)(React.memo(Auth));
