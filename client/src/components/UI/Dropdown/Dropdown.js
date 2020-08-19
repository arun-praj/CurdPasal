import React from "react";

import "./Dropdown.scss";
const Dropdown = (props) => {
   return (
      <div>
         <div className='dropdown'>
            <div className='dropdown__button'>{props.button}</div>
            <div className='dropdown__box'>
               <div className='dropdown__box__container'>{props.children}</div>
            </div>
         </div>
      </div>
   );
};

export default Dropdown;
