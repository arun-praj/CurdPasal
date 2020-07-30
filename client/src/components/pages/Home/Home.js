import React, { Fragment } from "react";
import Mapv2 from "../../UI/Maps/Mapv2";

import Wrapper from "../../HOC/Wrapper/Wrapper";
const Home = (props) => {
   return (
      <Fragment>
         <Wrapper>
            <div style={{ minHeight: "80vh" }}></div>
         </Wrapper>
         <Mapv2 />
      </Fragment>
   );
};
export default Home;
