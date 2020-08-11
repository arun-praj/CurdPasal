import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Header.scss";

const Carousel = () => {
   const handleOnDragStart = (e) => e.preventDefault();
   const settings = {
      dotsDisabled: true,
      buttonsDisabled: true,
      infinite: true,
      autoPlay: true,
      autoPlayInterval: 5000,
      stopAutoPlayOnHover: true,
      swipeDisabled: true,
   };
   return (
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
         <AliceCarousel mouseTrackingEnabled dotsDisabled {...settings}>
            <div className="carousel carousel-1" onDragStart={handleOnDragStart}>
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

            <div className="carousel carousel-2" onDragStart={handleOnDragStart}>
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
         </AliceCarousel>
      </div>
   );
};

export default Carousel;
