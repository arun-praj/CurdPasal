import React from "react";
import "./ToggleButton.scss";
const ToggleButton = (props) => (
   <div className="toggleButton" onClick={props.click}>
      <div className="toggleButton--line"></div>
      <div className="toggleButton--line"></div>
      <div className="toggleButton--line"></div>
   </div>
);
export default ToggleButton;
