import React from "react";
import { Link } from "react-router-dom";
import "./Categories.scss";

const Categories = (props) => {
   return (
      <div className="topics-container">
         <h1 className="heading_main">Our Product Categories.</h1>
         <h2 className="heading_sub">Choose from one of the category below.</h2>
         <div className="topics">
            <Link to="/" className="topic-box">
               <img src="./backend/uploads/normal_dhau.jpg" alt="" className="topic-box-img" />
               Yogurt
            </Link>
            <Link to="/" className="topic-box">
               <img src="./backend/uploads/red-velvet.jpg" alt="" className="topic-box-img" />
               Cake
            </Link>
            <Link to="/" className="topic-box">
               <img
                  src="./backend/uploads/Nepali-yak-cheese.jpg"
                  alt=""
                  className="topic-box-img"
               />
               Cheese
            </Link>
            <div className="topic-box">
               Butter
               <span className="topic-box-text-sm">Comming Soon!</span>
            </div>
            <div className="topic-box">
               Butter
               <span className="topic-box-text-sm">Comming Soon!</span>
            </div>
         </div>
      </div>
   );
};

export default Categories;
