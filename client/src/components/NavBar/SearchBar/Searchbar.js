import React from "react";
import "./SearchBar.scss";
import sprite from "../../../img/icon/sprite.svg";
const SearchBar = (props) => {
   let style,
      inputStyle = {};

   if (props.show) {
      style = {
         // display: "flex",
         transform: "translateX(0)",
         transition: "  200ms cubic-bezier(0.42, 0, 0, 0.99)",
         zIndex: props.show ? "999" : "0",
         display: props.show ? "block" : "none",
      };
      inputStyle = {
         width: "100%",
      };
   }
   return (
      <form style={style} className="search__box">
         <span className="search__group">
            <input
               style={inputStyle}
               type="text"
               placeholder="Search for products"
               className="search__input"
            />
            <button type="submit" className="search__btn">
               <svg className="search__icon">
                  <use href={sprite + "#icon-search"} />
               </svg>
            </button>
         </span>
      </form>
   );
};
export default SearchBar;
