import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

//REDUX
import { connect } from "react-redux";
import { setAlert } from "../../../redux/action/alert";

import Wrapper from "../../HOC/Wrapper/Wrapper";
import Alert from "../../UI/Alert/Alert";

import "./Login.scss";
class Login extends Component {
   state = {
      email: "",
      password: "",
   };
   onSubmitHandler = (e) => {
      e.preventDefault();
      this.props.setAlert(this.state.email, "success");
   };
   onChangeHandler = (e) => {
      e.preventDefault();
      this.setState({
         [e.target.name]: e.target.value,
      });
   };
   render() {
      return (
         <Fragment>
            {/* <img className="bg__img" src="/imgs/Scattered-Forcefields.svg" alt="bg_svg" /> */}
            {/* <img className="wave" src="/imgs/wave.png" alt="bg_svg" /> */}

            <Wrapper>
               <Alert />

               <div className="login">
                  {/* <div>
                     <img
                        className="login__img"
                        src="/imgs/undraw_web_shopping_dd4l.svg"
                        alt="svg_icon"
                     />
                  </div> */}
                  <div className="login__container">
                     <form className="login__form" onSubmit={(e) => this.onSubmitHandler(e)}>
                        {/* <img
                           height="24px"
                           className="login__form--img"
                           src="/imgs/undraw_female_avatar_w3jk.svg"
                           alt="svg_icon"
                        /> */}
                        <h3>Login to your account</h3>
                        <div className="login__form__group" style={{ margin: "0px" }}>
                           <input
                              type="button"
                              className="login__form__input login__form__input--btn "
                              value="Login With Google"
                           />
                           <img
                              className="login__form--icon"
                              height="24px"
                              width="24px"
                              src="/icons/icon-google.png"
                              alt="google ko icon"
                           />
                        </div>
                        <div className="breaker">
                           <div className="line"></div>
                           <div className="text">OR, Sign in with email</div>
                           <div className="line"></div>
                        </div>
                        <div className="login__form__group">
                           <input
                              type="email"
                              name="email"
                              id="email"
                              value={this.state.email}
                              className="login__form__input"
                              placeholder="Email"
                              onChange={this.onChangeHandler}
                              required
                           />

                           <label htmlFor="email" className="login__form__label">
                              Email
                           </label>
                           <svg width="24" height="24" className="login__form--icon">
                              <use xlinkHref="/icons/tabler-sprite.svg#tabler-user" />
                           </svg>
                        </div>
                        <div className="login__form__group">
                           <input
                              type="password"
                              id="password"
                              name="password"
                              minlength="8"
                              onChange={this.onChangeHandler}
                              value={this.state.password}
                              className="login__form__input"
                              placeholder="Password"
                              required
                           />

                           <label htmlFor="password" className="login__form__label">
                              Password
                           </label>
                           <svg className="login__form--icon" width="24" height="24">
                              <use xlinkHref="/icons/tabler-sprite.svg#tabler-lock" />
                           </svg>
                        </div>
                        <a href="/" className="login__link">
                           Forgot your Password?
                        </a>

                        <input type="submit" value="LOGIN" className="login__btn" />
                        <p className="text" style={{ marginTop: "25px" }}>
                           Don't have an account?
                           <Link href="/signup" className="link">
                              {" "}
                              Signup
                           </Link>
                        </p>
                     </form>
                  </div>
               </div>
            </Wrapper>
         </Fragment>
      );
   }
}
export default connect(null, { setAlert })(Login);