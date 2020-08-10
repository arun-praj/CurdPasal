import React, { Fragment } from "react";
import Mapv2 from "../../UI/Maps/Mapv2";
import Wrapper from "../../HOC/Wrapper/Wrapper";
import Categories from "./Categories";
import Carousel from "../../UI/Carousel/Carousel";
const Home = (props) => {
   return (
      <Fragment>
         <div>
            <Carousel />
         </div>
         <Wrapper>
            <Categories />
         </Wrapper>
         <div>
            <Mapv2 />
         </div>
      </Fragment>
   );
};
export default Home;
