import React, { Component, Fragment } from "react";

//redux
import { connect } from "react-redux";
import { logout } from "../../redux/action/auth";

import Logo from "./Logo/Logo";
import ToggleButton from "./ToggleButton/ToggleButton";
import SearchBar from "./SearchBar/Searchbar";
import SearchButton from "./SearchButton/SearchButton";
import NavItem from "./NavItems/NavItem";
import NavButton from "./NavButton/NavButton";
import "./NavBar.scss";
import "./ToggleButton/ToggleButton";

import sprite from "../../img/icon/sprite.svg";
class NavBar extends Component {
   state = {
      showSearchBar: false,
      isLoginModalOpen: false,
      isSignupModalOpen: false,
      dropdownOpen: false,
   };
   searchIconClickHandler = (e) => {
      this.setState((prevState) => {
         return {
            showSearchBar: !prevState.showSearchBar,
         };
      });
   };
   dropdownClickHandler = (e) => {
      e.preventDefault();
      this.setState((prevState) => {
         return {
            dropdownOpen: !prevState.dropdownOpen,
         };
      });
   };

   render() {
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
         <svg style={iconStyle}>
            <use href={sprite + "#icon-cart"} />
         </svg>
      );
      if (!this.state.showSearchBar) {
         hamburger = (
            <div className="navBar--hamburger">
               <ToggleButton click={this.props.drawerToggle} />
            </div>
         );
      }
      const dropdown = <div>This is dropdown</div>;

      const authLink = <button onClick={this.props.logout}>Logout</button>;
      const guestLink = (
         <Fragment>
            <NavButton data="Sign&nbsp;Up" btnType="btn--primary" to="/signup" />
            <NavButton data="Log&nbsp;In" btnType="navBar--button--secondary" to="/login" />
         </Fragment>
      );
      return (
         <header className="header">
            <nav className="navBar">
               {hamburger}

               <Logo />

               <SearchBar show={this.state.showSearchBar} />
               <SearchButton show={this.state.showSearchBar} click={this.searchIconClickHandler} />
               <div className="navBar__right">
                  <ul className="navBar--list">
                     <NavItem data="Home" to="/" />
                     <NavItem data="Products" to="/products" />
                     <div style={dividerLine}></div>
                     <NavItem
                        data={cartIcon}
                        borderType="circle"
                        type="dropdown"
                        onclick={(e) => this.dropdownClickHandler}>
                        {this.state.dropdownOpen && dropdown}
                     </NavItem>
                     {this.props.isLoading ? (
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
   isLoading: state.auth.isLoading,
});
export default connect(mapStateToProps, { logout })(NavBar);
