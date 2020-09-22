import React from "react";
import Rating from "react-rating";
// import Badge from "../../UI/Bagde/Badge";
import { Link } from "react-router-dom";
import "./Card.scss";
// import "./Product.scss";

const Card = (props) => {
   const { _id, name, description, averageRating, price, photo } = props.data;

   return (
      // <Link to={{ pathname: `/bootcamps/${id}`, props: props.badge }} className="card">
      <Link to={`/products/${_id}`} className='card'>
         <div className='card--img__container'>
            <img
               src={`https://res.cloudinary.com/dc6u4purx/image/upload/v1599720800/Dhaushop_products/${photo}`}
               alt='card'
               className='card--img'
            />
         </div>
         {/* {props.badge ? <Badge type="highestRated" /> : null} */}
         <div className='card__body'>
            <div className='card__body--title'>{name}</div>
            <div className='card__body--description'>{description.slice(0, 50) + "..."}</div>
            <div className='card__body--rating'>
               <Rating
                  readonly
                  initialRating={averageRating / 2}
                  fractions='1'
                  // placeholderSymbol="✭"
                  emptySymbol={<p className='icon--star'>☆</p>}
                  fullSymbol={<p className='icon--star'>★</p>}
               />
               <span className='card__body--rating--text'>{`(${averageRating.toFixed(1)})`}</span>
            </div>
            <div className='card__body--price'>
               <svg strokeWidth='125' className='icon-currency'>
                  <use xlinkHref='/icons/tabler-sprite.svg#tabler-currency-dollar' />
               </svg>
               <div>{`${price}`}</div>
            </div>
         </div>
      </Link>
   );
};
export default Card;
