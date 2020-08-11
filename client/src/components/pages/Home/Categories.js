import React from "react";
import "./Categories.scss";

const Categories = (props) => {
   return (
      <div className="topics-container">
         <h1 className="heading_main">Our Product Categories.</h1>
         <h2 className="heading_sub">Choose from one of the category below.</h2>
         <div className="topics">
            <a href="./collection.php?page=yogurt" className="topic-box">
               <img src="./backend/uploads/normal_dhau.jpg" alt="" className="topic-box-img" />
               Yogurt
            </a>
            <a href="./collection.php?page=cake" className="topic-box">
               <img src="./backend/uploads/red-velvet.jpg" alt="" className="topic-box-img" />
               Cake
            </a>
            <a href="./collection.php?page=cheese" className="topic-box">
               <img
                  src="./backend/uploads/Nepali-yak-cheese.jpg"
                  alt=""
                  className="topic-box-img"
               />
               Cheese
            </a>
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
