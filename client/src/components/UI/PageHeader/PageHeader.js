import React from "react";
import Wrapper from "../../HOC/Wrapper/Wrapper";
import "./PageHeader.scss";
const PageHeader = (props) => {
   return (
      <div className='page__header'>
         <Wrapper style={{ height: "100%" }}>
            <div className='page__header__container'>
               <div>{props.value}</div>
            </div>
         </Wrapper>
      </div>
   );
};

export default PageHeader;
