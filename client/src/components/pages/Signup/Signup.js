import React, { Component } from "react";
import Stepper from "react-stepper-horizontal";
import { Redirect } from "react-router-dom";
//REDUX
import { connect } from "react-redux";
import { setAlert } from "../../../redux/action/alert";
import { register } from "../../../redux/action/auth";

import MapWithIcons from "../../UI/Maps/Mapv1";
import "../Login/Login.scss";
import "./Signup.scss";
import Wrapper from "../../HOC/Wrapper/Wrapper";
class Signup extends Component {
   state = {
      activeStep: 0,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordRepeat: "",
      contact: "",
      city: "",
      points: [],
      showMap: true,
      passwordValidate: {
         capital: false,
         number: false,
         eightCharacters: false,
         small: false,
      },
      // latitude: "",
      // longitude: "",
   };
   componentDidUpdate() {
      window.scrollTo(0, 0);
   }

   setPointsHandler = (coords) => {
      this.setState({
         points: coords,
      });
   };
   passwordChangeHandler = (e) => {
      e.preventDefault();

      let sameState = { ...this.state.passwordValidate };
      let password = this.state.password;
      //check the length of password
      if (password.length >= 7) {
         sameState.eightCharacters = true;
      } else {
         sameState.eightCharacters = false;
      }
      //Check if string consist of Capital letter

      if (password.replace(/[^A-Z]/g, "").length >= 1) {
         sameState.capital = true;
      } else {
         sameState.capital = false;
      }

      //Check if string consist of small letter
      if (password.replace(/[^a-z]/g, "").length >= 1) {
         sameState.small = true;
      } else {
         sameState.small = false;
      }

      //Check if string consist of number
      var numberCount = password.match(/\d+/g);
      if (numberCount) {
         sameState.number = true;
      } else {
         sameState.number = false;
      }

      this.setState({
         passwordValidate: sameState,
      });
   };
   nextStepHandler = (e) => {
      const { activeStep, firstName, lastName, email, contact, city, points, showMap } = this.state;
      e.preventDefault();
      if ((!firstName || !lastName || !email) && activeStep === 0) {
         return this.props.setAlert("All input fields must be filled.", "error");
      }
      if ((!city || !contact) && activeStep === 1) {
         return this.props.setAlert("All input fields must be filled.", "error");
      }
      if (showMap && points.length === 0 && activeStep === 1) {
         return this.props.setAlert("😺 Please put a point on the map.", "error");
      }
      if (!showMap) {
         this.props.setAlert("😞 Geolocation helps us for accurate delivary.", "warning");
      } else if (showMap && activeStep === 1) {
         this.props.setAlert("😁 Dont Worry. Your data will be safe with us .", "success");
      }

      this.setState((prevState) => {
         return {
            activeStep: prevState.activeStep + 1,
         };
      });
   };
   prevStepHandler = (e) => {
      e.preventDefault();
      this.setState((prevState) => {
         return {
            activeStep: prevState.activeStep - 1,
         };
      });
   };
   formHandler = (e) => {
      this.setState({
         [e.target.name]: e.target.value,
      });
   };
   onSubmitHandler = (e) => {
      e.preventDefault();
      const {
         passwordValidate: { capital, number, small, eightCharacters },
         password,
         passwordRepeat,
      } = this.state;
      if (password !== passwordRepeat) {
         return this.props.setAlert("🔑 Passwords didnot match.", "error");
      }
      if (!capital || !number || !small || !eightCharacters) {
         return this.props.setAlert("😁 Invalid Password.", "error");
      }
      this.props.register(this.state);
      // this.props.setAlert("😁", "success");
   };
   handlerCheckbox = (e) => {
      // const { showMap } = this.state;
      // showMap = !showMap;
      this.setState((prevState) => {
         return { ...prevState, showMap: !prevState.showMap };
      });
   };
   render() {
      let formGroup;
      let style = {
         textDecoration: "line-through",
         color: "#cccccc",
         transition: "0.4s ease all",
      };
      let svgStyle = {
         color: "#cccccc",
         transition: "0.4s ease all",
      };
      if (this.props.isAuthenticated) {
         return <Redirect to="/" />;
      }
      switch (this.state.activeStep) {
         case 0:
            formGroup = (
               <form className="login__form" onSubmit={(e) => this.onSubmitHandler(e)}>
                  <div className="login__form__group">
                     <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        minLength="2"
                        value={this.state.firstName}
                        className="login__form__input"
                        placeholder="First name"
                        onChange={this.formHandler}
                        required
                     />

                     <label htmlFor="firstName" className="login__form__label">
                        First name
                     </label>
                     <svg width="24" height="24" className="login__form--icon">
                        <use xlinkHref="/icons/tabler-sprite.svg#tabler-user" />
                     </svg>
                  </div>
                  <div className="login__form__group">
                     <input
                        type="text"
                        name="lastName"
                        id="lastname"
                        minLength="2"
                        value={this.state.lastName}
                        className="login__form__input"
                        placeholder="Last name"
                        onChange={this.formHandler}
                        required
                     />

                     <label htmlFor="lastName" className="login__form__label">
                        Last name
                     </label>
                     <svg width="24" height="24" className="login__form--icon">
                        <use xlinkHref="/icons/tabler-sprite.svg#tabler-man" />
                     </svg>
                  </div>
                  <div className="login__form__group">
                     <input
                        type="email"
                        id="email"
                        name="email"
                        minlength="8"
                        value={this.state.email}
                        className="login__form__input"
                        placeholder="Email"
                        onChange={this.formHandler}
                        required
                     />

                     <label htmlFor="email" className="login__form__label">
                        Email
                     </label>
                     <svg className="login__form--icon" width="24" height="24">
                        <use xlinkHref="/icons/tabler-sprite.svg#tabler-at" />
                     </svg>
                  </div>
                  <button
                     type="submit"
                     className="login__btn"
                     style={{ marginTop: "0px" }}
                     onClick={this.nextStepHandler}>
                     Continue
                  </button>

                  <div className="breaker">
                     <div className="line"></div>
                     <div className="text">OR, Sign up with google</div>
                     <div className="line"></div>
                  </div>
                  <div className="login__form__group">
                     <input
                        type="button"
                        className="login__form__input login__form__input--btn "
                        value="Signup With Google"
                     />
                     <img
                        className="login__form--icon"
                        height="24px"
                        width="24px"
                        src="/icons/icon-google.png"
                        alt="google ko icon"
                     />
                  </div>
               </form>
            );
            break;

         case 1:
            formGroup = (
               <form className="login__form" onSubmit={(e) => this.onSubmitHandler(e)}>
                  <div className="login__form__group">
                     <input
                        type="number"
                        name="contact"
                        id="contact"
                        minLength="7"
                        value={this.state.contact}
                        className="login__form__input"
                        placeholder="Phone number"
                        onChange={this.formHandler}
                        required
                     />

                     <label htmlFor="contact" className="login__form__label">
                        Phone number
                     </label>
                     <svg width="24" height="24" className="login__form--icon">
                        <use xlinkHref="/icons/tabler-sprite.svg#tabler-device-mobile" />
                     </svg>
                  </div>
                  <div className="login__form__group">
                     <input
                        type="name"
                        name="city"
                        id="city"
                        minLength="2"
                        value={this.state.city}
                        className="login__form__input"
                        placeholder="City , Eg. Bhaktapur"
                        onChange={this.formHandler}
                        required
                     />

                     <label htmlFor="city" className="login__form__label">
                        City
                     </label>
                     <svg width="24" height="24" className="login__form--icon">
                        <use xlinkHref="/icons/tabler-sprite.svg#tabler-map-2" />
                     </svg>
                  </div>
                  <div className="login__form__group">
                     <input
                        type="checkbox"
                        name="showMap"
                        id="showMap"
                        checked={this.state.showMap}
                        onChange={this.handlerCheckbox}
                     />
                     <label for="showMap"> Use my geoloaction</label>
                  </div>
                  {this.state.showMap && (
                     <div className="login__form__group">
                        <div style={{ fontSize: "14px" }}>
                           <span>Please click on a point of your residence.</span>
                        </div>
                        <MapWithIcons sendData={this.setPointsHandler} points={this.state.points} />
                        <div style={{ fontSize: "10px" }}>
                           <span>Your data will be safe with us.</span>
                        </div>
                     </div>
                  )}

                  <div className="signup__btn-group">
                     <button
                        style={{
                           marginTop: "0px",
                           width: "150px",
                           backgroundColor: "white",
                           color: "black",
                           border: " 1px solid #686f7a ",
                        }}
                        className="login__btn"
                        onClick={this.prevStepHandler}>
                        Back
                     </button>

                     <button
                        style={{
                           marginTop: "0px",
                           width: "150px",
                        }}
                        className="login__btn"
                        onClick={this.nextStepHandler}>
                        Continue
                     </button>
                  </div>
               </form>
            );
            break;
         case 2:
            formGroup = (
               <form className="login__form" onSubmit={(e) => this.onSubmitHandler(e)}>
                  <div className="login__form__group">
                     <input
                        type="password"
                        id="password"
                        name="password"
                        minLength="8"
                        onChange={this.formHandler}
                        onKeyUp={this.passwordChangeHandler}
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
                  <div className="login__form__group">
                     <input
                        type="password"
                        id="passwordRepeat"
                        name="passwordRepeat"
                        minLength="8"
                        onChange={this.formHandler}
                        value={this.state.passwordRepeat}
                        className="login__form__input"
                        placeholder="Enter your password again."
                        required
                     />

                     <label htmlFor="password" className="login__form__label">
                        Re-Password
                     </label>
                     <svg className="login__form--icon" width="24" height="24">
                        <use xlinkHref="/icons/tabler-sprite.svg#tabler-repeat" />
                     </svg>
                  </div>
                  <span>A password must contain : </span>
                  <div className="password__validation">
                     <div>
                        <div
                           className="password__validation__text"
                           style={this.state.passwordValidate.eightCharacters ? style : null}>
                           <svg
                              style={this.state.passwordValidate.eightCharacters ? svgStyle : null}
                              className="password__validation__icon">
                              <use xlinkHref="/icons/tabler-sprite.svg#tabler-point" />
                           </svg>
                           Minimum 8 characters
                        </div>
                        <div
                           className="password__validation__text"
                           style={this.state.passwordValidate.number ? style : null}>
                           <svg
                              style={this.state.passwordValidate.number ? svgStyle : null}
                              className="password__validation__icon">
                              <use xlinkHref="/icons/tabler-sprite.svg#tabler-point" />
                           </svg>
                           One number
                        </div>
                     </div>
                     <div>
                        <div
                           className="password__validation__text"
                           style={this.state.passwordValidate.capital ? style : null}>
                           <svg
                              style={this.state.passwordValidate.capital ? svgStyle : null}
                              className="password__validation__icon">
                              <use xlinkHref="/icons/tabler-sprite.svg#tabler-point" />
                           </svg>
                           One capital character
                        </div>
                        <div
                           className="password__validation__text"
                           style={this.state.passwordValidate.small ? style : null}>
                           <svg
                              style={this.state.passwordValidate.small ? svgStyle : null}
                              className="password__validation__icon">
                              <use xlinkHref="/icons/tabler-sprite.svg#tabler-point" />
                           </svg>
                           One small character
                        </div>
                     </div>
                  </div>
                  <div className="signup__btn-group">
                     <button
                        style={{
                           width: "150px",
                           backgroundColor: "white",
                           color: "black",
                           border: " 1px solid #686f7a ",
                        }}
                        className="login__btn"
                        onClick={this.prevStepHandler}>
                        Back
                     </button>

                     <button
                        style={{
                           width: "150px",
                        }}
                        className="login__btn"
                        onClick={this.onSubmitHandler}>
                        Submit
                     </button>
                  </div>
               </form>
            );
            break;

         default:
            formGroup = <div>Invalid step</div>;
      }
      return (
         <Wrapper>
            <div className="signup">
               <div className="signup__steeper">
                  <Stepper
                     steps={[
                        { title: "User details" },
                        { title: "Contact info" },
                        { title: "Auth" },
                     ]}
                     activeStep={this.state.activeStep}
                     circleFontSize="20px"
                  />
               </div>
               <div className="login__container">{formGroup}</div>
            </div>
         </Wrapper>
      );
   }
}
const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Signup);
