import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { logout } from "../../redux/action/auth";

//navbar component
import Logo from "./Logo/Logo";
import ToggleButton from "./ToggleButton/ToggleButton";
import SearchBar from "./SearchBar/Searchbar";
import SearchButton from "./SearchButton/SearchButton";
import NavItem from "./NavItems/NavItem";
import NavButton from "./NavButton/NavButton";
import "./ToggleButton/ToggleButton";

//UI component
import ProfilePic from "../UI/ProfilePic/ProfilePic";
import { Dropdown, Dropgroup, DropLink } from "../UI/Dropdown/Dropdown";

//scss
import "./NavBar.scss";

import sprite from "../../img/icon/sprite.svg";
class NavBar extends Component {
   state = {
      showSearchBar: false,
      isLoginModalOpen: false,
      isSignupModalOpen: false,
   };
   searchIconClickHandler = (e) => {
      this.setState((prevState) => {
         return {
            showSearchBar: !prevState.showSearchBar,
         };
      });
   };

   render() {
      // console.log(this.props.user.data.firstName);
      let hamburger;
      const dividerLine = {
         height: "60%",
         borderLeft: "1px solid #dedfe0",
         margin: "0 8px",
      };
      const iconStyle = {
         // borderRadius: "50%",
         marginTop: "7px",
         height: "20px",
         width: "20px",
         // marginRight: "5px",
      };
      const cartIcon = (
         <Dropdown
            button={
               <svg style={iconStyle}>
                  <use href={sprite + "#icon-cart"} />
               </svg>
            }>
            <Dropgroup>
               <DropLink style={{ textAlign: "center" }} value='No item in cart' />
            </Dropgroup>
         </Dropdown>
      );
      if (!this.state.showSearchBar) {
         hamburger = (
            <div className='navBar--hamburger'>
               <ToggleButton click={this.props.drawerToggle} />
            </div>
         );
      }
      // const authLink = (
      //    <GoogleLogout
      //       clientId="796317557299-6qekcgm9mdudfudt0accng26ngpv6jic.apps.googleusercontent.com"
      //       buttonText="Logout"
      //       onLogoutSuccess={this.props.logout}
      //       onFailure={store.dispatch(setAlert("Logout failed", "error"))}></GoogleLogout>
      // );
      const authLink = (
         <div style={{ display: "flex" }}>
            {this.props.loading ? (
               <span>Loading</span>
            ) : this.props.isAuthenticated ? (
               <Dropdown
                  button={
                     <ProfilePic
                        firstName={this.props.user.data.firstName}
                        lastName={this.props.user.data.lastName}
                     />
                  }>
                  <Dropgroup>
                     <Link className='dropdown__link' to='/profile'>
                        <div style={{ display: "flex" }}>
                           <div
                              style={{
                                 marginRight: "14px",
                              }}>
                              <ProfilePic
                                 firstName={this.props.user.data.firstName}
                                 lastName={this.props.user.data.lastName}
                              />
                           </div>
                           <div
                              style={{
                                 display: "flex",
                                 flexDirection: "column",
                                 justifyContent: "space-between",
                              }}>
                              <span style={{ fontSize: "16px", fontWeight: "700" }}>
                                 {`${this.props.user.data.firstName} ${this.props.user.data.lastName}`}
                              </span>
                              <span
                                 style={{ fontSize: "12px", fontWeight: "500", color: "#73726c" }}>
                                 {this.props.user.data.email}
                              </span>
                           </div>
                        </div>
                     </Link>
                  </Dropgroup>
                  <Dropgroup>
                     <DropLink value='My profile' to='/profile' />
                     <DropLink value='Purchase History' to='/purchase-history' />
                  </Dropgroup>
                  <Dropgroup>
                     <DropLink value='My cart' to='/cart' />
                  </Dropgroup>

                  <Dropgroup>
                     <DropLink onClick={this.props.logout} value=' Log out' to='/' />
                  </Dropgroup>
               </Dropdown>
            ) : null}
         </div>
      );
      const guestLink = (
         <Fragment>
            <NavButton data='Sign&nbsp;Up' btnType='btn--primary' to='/signup' />
            <NavButton data='Log&nbsp;In' btnType='navBar--button--secondary' to='/login' />
         </Fragment>
      );
      return (
         <header className='header'>
            <nav className='navBar'>
               {hamburger}

               <Logo />

               <SearchBar show={this.state.showSearchBar} />
               <SearchButton show={this.state.showSearchBar} click={this.searchIconClickHandler} />
               <div className='navBar__right'>
                  <ul className='navBar--list'>
                     <NavItem data='Home' to='/' />
                     <NavItem data='Products' to='/products' />
                     <div style={dividerLine}></div>
                     {cartIcon}
                     {/* <NavItem data={cartIcon} borderType='circle' type='dropdown' to='/cart'>
                        {this.state.dropdownOpen && dropdown}
                     </NavItem> */}
                     {this.props.loading ? (
                        <h1>Loading</h1>
                     ) : this.props.isAuthenticated ? (
                        authLink
                     ) : (
                        guestLink
                     )}
                  </ul>
               </div>
            </nav>
         </header>
      );
   }
}
const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
   loading: state.auth.loading,
   user: state.auth.user,
});
export default connect(mapStateToProps, { logout })(NavBar);
