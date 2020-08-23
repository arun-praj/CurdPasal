import React from "react";
import "./Wrapper.scss";

const Wrapper = (props) => {
   return (
      <div style={props.style} className='Wrapper'>
         {props.children}
      </div>
   );
};

export default Wrapper;

// 1270;
