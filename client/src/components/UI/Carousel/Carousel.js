import React, { Component } from "react";
import Slider from "react-slick";

import "./Header.scss";

// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";

export default class SimpleSlider extends Component {
   render() {
      const settings = {
         dots: false,
         infinite: true,
         speed: 500,
         slidesToShow: 1,
         slidesToScroll: 1,
         autoplay: true,
         autoplaySpeed: 20000,
      };
      return (
         <Slider {...settings}>
            <div className="carousel carousel-1">
               <div className="board board-1">
                  <h1 className="heading__primary--main">We serve you best dairy in town.</h1>
                  <h3 className="heading__secondary--sub u-margin-top-small">
                     "Take a taste. Come join us. Life is so endlessly delicious.”
                  </h3>
                  <form className="u-margin-top-small carousel_form">
                     <input
                        type="email"
                        placeholder="Enter your Email"
                        className="carousel_input"
                     />
                     <input
                        type="submit"
                        value="Subscribe"
                        name="submit"
                        className="carousel_btn"
                     />
                  </form>
               </div>
            </div>

            <div className="carousel carousel-2">
               <div className="board board-2">
                  <h1 className="heading__primary--main">Having a feast? Don't worry</h1>
                  <h3 className="heading__secondary--sub u-margin-top-small">
                     "Order as mush product as you want. We will deliver to your door step.”
                  </h3>
                  <form className="u-margin-top-small carousel_form">
                     <input
                        type="submit"
                        value="Order Now"
                        name="submit"
                        className="carousel_btn"
                     />
                  </form>
               </div>
            </div>
         </Slider>
      );
   }
}
