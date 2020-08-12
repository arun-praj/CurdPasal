import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
//REDUX
import { connect } from "react-redux";
import { login, loginWithGoogle } from "../../../redux/action/auth";

import Wrapper from "../../HOC/Wrapper/Wrapper";

import "./Login.scss";
class Login extends Component {
   state = {
      email: "",
      password: "",
   };
   componentDidMount() {
      window.scrollTo(0, 0);
   }
   onSubmitHandler = (e) => {
      e.preventDefault();
      // this.props.setAlert(this.state.email, "success");
      const { email, password } = this.state;
      this.props.login({ email, password });
   };
   googleAuthHandler = (response) => {
      this.props.loginWithGoogle(response);
   };
   failHandler = (res) => {
      console.log(res);
   };
   onChangeHandler = (e) => {
      e.preventDefault();
      this.setState({
         [e.target.name]: e.target.value,
      });
   };
   render() {
      if (this.props.isAuthenticated) {
         return <Redirect to="/" />;
      }
      return (
         <Fragment>
            {/* <img className="bg__img" src="/imgs/Scattered-Forcefields.svg" alt="bg_svg" /> */}
            {/* <img className="wave" src="/imgs/wave.png" alt="bg_svg" /> */}

            <Wrapper>
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
                           // height="24px"
                           className="login__form--img"
                           src="/imgs/pwease.gif"
                           alt="svg_icon"
                        /> */}
                        <h3>Login to your account</h3>
                        <div className="login__form__group" style={{ margin: "0px" }}>
                           <GoogleLogin
                              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                              buttonText="Login"
                              onSuccess={this.googleAuthHandler}
                              onFailure={this.failHandler}
                              cookiePolicy={"single_host_origin"}
                              render={(renderProps) => (
                                 <button
                                    className="login__form__input login__form__input--btn "
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}>
                                    Login With Google
                                 </button>
                              )}
                              // isSignedIn={true}
                           />
                           {/* <input
                              type="button"
                              className="login__form__input login__form__input--btn "
                              value="Login With Google"
                              onClick={this.googleAuthHandler}
                           /> */}
                           {/* <a
                              href="http://localhost:8000/auth/google"
                              className="login__form__input login__form__input--btn "
                              onClick={store.dispatch({
                                 type: LOGIN_SUCCESS,
                              })}>
                              {" "}
                              Login With Google
                           </a> */}
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
const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login, loginWithGoogle })(Login);
