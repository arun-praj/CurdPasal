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
            }
            to='/cart'>
            {console.log(this.props.cartEmpty)}
            {this.props.cartLoading ? (
               <div>Loading</div>
            ) : this.props.cartEmpty ? (
               <Dropgroup>
                  <DropLink style={{ textAlign: "center" }} to='' value='No item in cart' />
               </Dropgroup>
            ) : (
               <>
                  {this.props.cartProducts.products !== undefined &&
                     this.props.cartProducts.products.map((el) => {
                        return (
                           <Dropgroup>
                              <div style={{ display: "flex" }}>
                                 <div style={{ padding: "0 8px" }}>
                                    <img
                                       height='60px'
                                       // width='64px'
                                       src='data:image/jpeg;base64,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'
                                    />
                                 </div>
                                 <div
                                    style={{
                                       fontSize: "15px",
                                       fontWeight: "700",
                                    }}>
                                    {el.name}
                                 </div>
                              </div>
                           </Dropgroup>
                        );
                     })}
               </>
            )}
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
                  to='/'
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
   cartCount: state.userCart.cart.count,
   cartLoading: state.userCart.loading,
   cartEmpty: state.userCart.empty,
   cartProducts: state.userCart.cart.data,
});

export default connect(mapStateToProps, { logout })(NavBar);
