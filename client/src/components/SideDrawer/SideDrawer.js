import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { logout } from "../../redux/action/auth";

import NavButton from "../NavBar/NavButton/NavButton";

//UI
import ProfilePic from "../UI/ProfilePic/ProfilePic";

//scss
import "./SideDrawer.scss";

const SideDrawer = (props) => {
   let drawerClasses = ["sideDrawer"];
   if (props.isOpen) {
      drawerClasses.push("open");
   }
   const authLink = (
      <button onClick={props.logout}>
         {props.loading ? (
            <span>Loading</span>
         ) : props.isAuthenticated ? (
            <div style={{ display: "flex" }}>
               <div
                  style={{
                     marginRight: "14px",
                  }}>
                  <ProfilePic
                     firstName={props.user.data.firstName}
                     lastName={props.user.data.lastName}
                  />
               </div>
               <div
                  style={{
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "space-between",
                  }}>
                  <span style={{ fontSize: "16px", fontWeight: "700" }}>
                     {`${props.user.data.firstName} ${props.user.data.lastName}`}
                  </span>
                  <span
                     style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#73726c",
                        textAlign: "left",
                     }}>
                     {props.user.data.email}
                  </span>
               </div>
            </div>
         ) : null}
      </button>
   );
   const guestLink = (
      <>
         <NavButton data='Sign&nbsp;Up' btnType='btn--primary' to='/signup' />
         <NavButton data='Log&nbsp;In' btnType='navBar--button--secondary' to='/login' />
      </>
   );
   return (
      <nav className={drawerClasses.join(" ")}>
         <div className='sideDrawer__wrapper'>
            <div className='sideDrawer__btns'>
               {props.isLoading ? <h1>Loading</h1> : props.isAuthenticated ? authLink : guestLink}
            </div>
            <ul className='sideDrawer__list'>
               <li className='sideDrawer__list--item '>
                  <a href='/' className='sideDrawer__list--link'>
                     <svg className='sideDrawer__list--icon'>
                        <use xlinkHref='/icons/tabler-sprite.svg#tabler-home' />
                     </svg>
                     <span>Home</span>
                  </a>
               </li>
               <li className='sideDrawer__list--item'>
                  <a href='/' className='sideDrawer__list--link'>
                     <svg className='sideDrawer__list--icon'>
                        <use xlinkHref='/icons/tabler-sprite.svg#tabler-bucket' />
                     </svg>
                     <span>Product</span>
                  </a>
               </li>
               <li className='sideDrawer__list--item'>
                  <a href='/' className='sideDrawer__list--link'>
                     <svg className='sideDrawer__list--icon'>
                        <use xlinkHref='/icons/tabler-sprite.svg#tabler-phone-incoming' />
                     </svg>
                     <span>Contact us</span>
                  </a>
               </li>
            </ul>
            <ul className='sideDrawer__list'>
               <li className='sideDrawer__list--item '></li>
               <li className='sideDrawer__list--item'>
                  <Link to='/' className='sideDrawer__list--link'>
                     <svg className='sideDrawer__list--icon'>
                        <use xlinkHref='/icons/tabler-sprite.svg#tabler-brand-github' />
                     </svg>
                     <span>My profile</span>
                  </Link>
               </li>
               <li className='sideDrawer__list--item'>
                  <Link to='/' className='sideDrawer__list--link'>
                     <svg className='sideDrawer__list--icon'>
                        <use xlinkHref='/icons/tabler-sprite.svg#tabler-history' />
                     </svg>
                     <span>Purchase History</span>
                  </Link>
               </li>
            </ul>
            <ul className='sideDrawer__list'>
               <li className='sideDrawer__list--item'>
                  <Link to='/' className='sideDrawer__list--link'>
                     <svg className='sideDrawer__list--icon'>
                        <use xlinkHref='/icons/tabler-sprite.svg#tabler-shopping-cart' />
                     </svg>
                     <span>My Cart</span>
                  </Link>
               </li>
            </ul>
            <ul className='sideDrawer__list'>
               <li className='sideDrawer__list--item'>
                  <Link to='/' className='sideDrawer__list--link'>
                     <svg className='sideDrawer__list--icon'>
                        <use xlinkHref='/icons/tabler-sprite.svg#tabler-logout' />
                     </svg>
                     <span>Log out</span>
                  </Link>
               </li>
            </ul>
         </div>
         <div className='legal-info'>&copy;2020 by Arun Prajapati. All right reserved.</div>
      </nav>
   );
};

const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
   loading: state.auth.loading,
   user: state.auth.user,
});
export default connect(mapStateToProps, { logout })(SideDrawer);
