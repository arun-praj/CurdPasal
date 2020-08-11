import React from "react";
import Rating from "react-rating";
// import Badge from "../../UI/Bagde/Badge";
import { Link } from "react-router-dom";
import "./Card.scss";
const Card = (props) => {
   // console.log(props.data);
   const { id, photo, name, description, averageRating, price } = props.data;
   // console.log(careers);

   // console.log(props.badge);
   return (
      // <Link to={{ pathname: `/bootcamps/${id}`, props: props.badge }} className="card">
      <Link to="" className="card">
         <div>
            <img
               src="https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg"
               alt="Bootcamp"
               className="card--img"
            />
         </div>
         {/* {props.badge ? <Badge type="highestRated" /> : null} */}
         <div className="card__body">
            <div className="card__body--title">{name}</div>
            <div className="card__body--description">{description.slice(0, 50) + "..."}</div>
            <div className="card__body--rating">
               <Rating
                  readonly
                  initialRating={averageRating / 2}
                  fractions="1"
                  // placeholderSymbol="✭"
                  emptySymbol={<p className="icon--star">☆</p>}
                  fullSymbol={<p className="icon--star">★</p>}
               />
               <span className="card__body--rating--text">{`(${averageRating.toFixed(1)})`}</span>
            </div>
            <div className="card__body--price">
               <svg strokeWidth="125" className="icon-currency">
                  <use xlinkHref="/icons/tabler-sprite.svg#tabler-currency-dollar" />
               </svg>
               <div>{`${price}`}</div>
            </div>
         </div>
      </Link>
   );
};
export default Card;
