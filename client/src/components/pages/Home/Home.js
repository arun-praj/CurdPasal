import React, { Fragment } from "react";
import Mapv2 from "../../UI/Maps/Mapv2";
// import Category from "./Category/Category";
import Wrapper from "../../HOC/Wrapper/Wrapper";
import SimpleSlider from "../../UI/Carousel/Carousel";
const Home = (props) => {
   return (
      <Fragment>
         <div style={{ maxWidth: "1200px", margin: "auto auto 15px auto" }}>
            <SimpleSlider />
         </div>
         <Wrapper>
            {/* <h1
               className="heading__primary--main"
               style={{ color: "#3c3b37", marginBottom: "24px" }}>
               Explore our Categories
            </h1> */}
            {/* <Category /> */}
         </Wrapper>
         <div>
            <Mapv2 />
         </div>
      </Fragment>
   );
};
export default Home;
