import React from "react";
import { CSSTransition } from "react-transition-group";

import "./Backdrop.css";

const Backdrop = (props) => {
  return (
    <CSSTransition
      in={props.show}
      timeout={500}
      mountOnEnter
      unmountOnExit
      classNames={{
        enterActive: "BackdropOpen",
        exitActive: "BackdropClosed",
      }}
    >
      <div className="Backdrop" onClick={props.clicked}></div>
    </CSSTransition>
  );
};

export default Backdrop;
