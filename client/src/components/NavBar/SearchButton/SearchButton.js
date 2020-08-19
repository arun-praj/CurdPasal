import React from "react";
//UI
import Backdrop from "../../UI/Backdrop/Backdrop";

import searchBtn from "../SearchBar/search.svg";
import "./SearchButton.scss";
const SearchBtn = (props) => {
   let style = {};
   let backdrop;
   if (props.show) {
      style = {
         display: "none",
      };
      backdrop = <Backdrop drawerToggle={props.click} zIndex='100' />;
   }
   return (
      <div>
         <button style={style} className='search__btn--sm' onClick={props.click}>
            <img className='search__btn--sm--img' src={searchBtn} alt='Search button' />
         </button>
         {backdrop}
      </div>
   );
};
export default SearchBtn;
