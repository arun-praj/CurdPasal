import React from "react";
import "./SideDrawer.scss";
import sprite from "../../img/icon/sprite.svg";
import NavButton from "../NavBar/NavButton/NavButton";
const SideDrawer = (props) => {
   let drawerClasses = ["sideDrawer"];
   if (props.isOpen) {
      drawerClasses.push("open");
   }
   return (
      <nav className={drawerClasses.join(" ")}>
         <div className="sideDrawer__wrapper">
            <div className="sideDrawer__btns">
               <NavButton
                  data="Sign&nbsp;Up"
                  btnType="navBar--button--primary"
                  click={props.onLoginBtnClick}
               />
               <NavButton
                  data="Sign&nbsp;Up"
                  btnType="navBar--button--secondary"
                  click={props.onLoginBtnClick}
               />
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
         <div className="legal-info">
            &copy;2020 by Arun Prajapati. All right reserved.
         </div>
      </nav>
   );
};

export default SideDrawer;
