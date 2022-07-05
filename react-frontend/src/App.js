import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { TransitionGroup, Transition } from "react-transition-group";

import Layout from "./components/Layout/Layout";
import CollegeSearch from "./containers/Colleges/Colleges";
import Auth from "./containers/users/Auth";
import Logout from "./containers/users/Logout/Logout";
import DetailCollege from "./containers/DetailedCollege/DetailedCollege";

import classes from "./App.module.css";
import Profile from "./containers/Profile/Profile";

const App = (props) => {
  return (
    <div className={classes.App}>
      <Layout>
        <Route
          render={({ location }) => {
            const { key } = location;

            const duration = 500;

            const defaultStyle = {
              transition: `opacity ${duration}ms ease-in-out`,
              opacity: 0,
            };

            const transitionStyles = {
              entering: { opacity: 0 },
              entered: { opacity: 1 },
              exiting: { opacity: 1 },
              exited: { opacity: 0 },
            };

            return (
              <TransitionGroup component={null} appear>
                <Transition key={key} timeout={duration}>
                  {(state) => (
                    <div
                      style={{
                        ...defaultStyle,
                        ...transitionStyles[state],
                      }}
                    >
                      <Switch location={location}>
                        <Route path="/myprofile" component={Profile} />
                        <Route path="/detail" component={DetailCollege} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/auth" component={Auth} />
                        <Route path="/" exact component={CollegeSearch} />
                        <Redirect to="/" />
                      </Switch>
                    </div>
                  )}
                </Transition>
              </TransitionGroup>
            );
          }}
        />
      </Layout>
    </div>
  );
};

export default App;
