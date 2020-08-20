import React from "react";
import { Link } from "react-router-dom";
const NavItem = (props) => {
   const classes = ["navBar--item"];
   // if (props.borderType === "circle") {
   //    classes.push("circle");
   // }
   if (props.button) {
      classes.push("navBar--button");
      if (props.button === "primary") {
         classes.push("navBar--button--primary");
      } else {
         classes.push("navBar--button--secondary");
      }
   }
   return (
      <li className={classes.join(" ")} onClick={props.onclick}>
         <Link className='navBar--link' to={props.to}>
            {props.data}
         </Link>
      </li>
   );
};
export default NavItem;
