import React from "react";
import "./Display.css";

export default function display(props) {
  return <div className="display">
            <span className="item">{props.value}</span>
          </div>;
}
