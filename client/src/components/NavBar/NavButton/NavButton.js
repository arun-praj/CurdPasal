import React from "react";
import { Link } from "react-router-dom";
import "./NavButton.scss";
import "../NavBar.scss";

const NavButton = (props) => {
   let classes = ["navBar--button", "navBar--item"];
   classes.push(props.btnType);
   return (
      <div className={classes.join(" ")} onClick={props.click}>
         <Link className="navBar--link" to={props.to} style={{ fontSize: "15px" }} href="/">
            {props.data}
         </Link>
      </div>
   );
};
export default NavButton;
