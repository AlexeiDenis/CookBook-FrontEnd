import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <main>
      <h1>{props.title}</h1>
      {props.content}
      <p>{props.actions}</p>
    </main>,
    document.querySelector("#modal")
  );
};

export default Modal;
