import React from "react";
import "./Backdrop.scss";
const Backdrop = (props) => {
   return (
      <div
         className="backdrop"
         style={{ zIndex: props.zIndex }}
         onClick={props.drawerToggle}></div>
   );
};
export default Backdrop;
