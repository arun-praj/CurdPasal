import React, { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import MoonLoader from "react-spinners/MoonLoader";
import "react-alice-carousel/lib/alice-carousel.css";
import { connect } from "react-redux";

import { loadProducts } from "../../../../redux/action/product";

import Card from "../../../UI/Card/Card";

const ProductCarousel = (props) => {
   // const [products, setProducts] = useState([]);
   useEffect(() => {
      props.loadProducts();
      // await setProducts((prev) => [...prev, products]);
   }, []);
   console.log("check", props.products);
   const settings = {
      showSlideInfo: true,
      controlsStrategy: "responsive",
      //   playButtonEnabled: true,
      //   touchTrackingEnabled: true,
      //   dotsDisabled: true,
      //   buttonsDisabled: true,
      //   infinite: true,
      //   autoPlay: true,
      //   autoPlayInterval: 5000,
      //   stopAutoPlayOnHover: true,
      //   swipeDisabled: true,
   };
   let val;
   if (props.loading) {
      val = (
         <div style={{ position: "absolute", left: "50%", textAlign: "center" }}>
            <MoonLoader size={35} color={"#123abc"} loading={props.loading} />;
         </div>
      );
   } else {
      val =
         props.products &&
         props.products.map((el) => {
            return <Card key={el._id} data={el} />;
         });
   }
   const responsive = {
      0: {
         items: 1,
      },
      481: {
         items: 3,
      },
      769: {
         items: 4,
      },
      1200: {
         items: 5,
      },
   };
   const stagePadding = {
      paddingLeft: 55, // in pixels
      paddingRight: 55,
   };
   // const handleOnDragStart = (e) => e.preventDefault();
   return (
      <>
         {props.loading ? (
            <div style={{ position: "absolute", left: "50%", textAlign: "center" }}>
               <MoonLoader size={35} color={"#123abc"} loading={props.loading} />;
            </div>
         ) : (
            <div className='cards'>
               <AliceCarousel
                  mouseTrackingEnabled
                  {...settings}
                  stagePadding={stagePadding}
                  responsive={responsive}>
                  {val}
               </AliceCarousel>
            </div>
         )}
      </>
   );
};

const mapStateToProps = (state) => ({
   products: state.product.products,
   loading: state.product.loading,
});
export default connect(mapStateToProps, { loadProducts })(ProductCarousel);
