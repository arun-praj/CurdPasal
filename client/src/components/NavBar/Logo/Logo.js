import React from "react";
import "./Logo.scss";
import logo from "./logo.svg";
const Logo = (props) => {
   return (
      <div className="logo">
         <img src={logo} alt="logo" className="logo__img" />
      </div>
   );
};
export default Logo;
