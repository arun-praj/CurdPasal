import React from "react";

import { connect } from "react-redux";
import { logout } from "../../redux/action/auth";

import "./SideDrawer.scss";
import sprite from "../../img/icon/sprite.svg";
import NavButton from "../NavBar/NavButton/NavButton";
const SideDrawer = (props) => {
   let drawerClasses = ["sideDrawer"];
   if (props.isOpen) {
      drawerClasses.push("open");
   }
   const authLink = <button onClick={props.logout}>Logout</button>;
   const guestLink = (
      <>
         <NavButton data="Sign&nbsp;Up" btnType="btn--primary" to="/signup" />
         <NavButton data="Log&nbsp;In" btnType="navBar--button--secondary" to="/login" />
      </>
   );
   return (
      <nav className={drawerClasses.join(" ")}>
         <div className="sideDrawer__wrapper">
            <div className="sideDrawer__btns">
               {props.isLoading ? <h1>Loading</h1> : props.isAuthenticated ? authLink : guestLink}
            </div>
            <ul className="sideDrawer__list">
               <li className="sideDrawer__list--item ">
                  <a href="/" className="sideDrawer__list--link">
                     <svg className="sideDrawer__list--icon">
                        <use href={sprite + "#icon-home"} />
                     </svg>
                     <span>Home</span>
                  </a>
               </li>
               <li className="sideDrawer__list--item">
                  <a href="/" className="sideDrawer__list--link">
                     <svg className="sideDrawer__list--icon">
                        <use href={sprite + "#icon-shopping_basket"} />
                     </svg>
                     <span>Product</span>
                  </a>
               </li>
               <li className="sideDrawer__list--item">
                  <a href="/" className="sideDrawer__list--link">
                     <svg className="sideDrawer__list--icon">
                        <use href={sprite + "#icon-old-phone"} />
                     </svg>
                     <span>Contact us</span>
                  </a>
               </li>
            </ul>
         </div>
         <div className="legal-info">&copy;2020 by Arun Prajapati. All right reserved.</div>
      </nav>
   );
};

const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
   isLoading: state.auth.isLoading,
});
export default connect(mapStateToProps, { logout })(SideDrawer);
