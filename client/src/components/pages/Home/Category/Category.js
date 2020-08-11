import React from "react";
import "./Category.scss";
const Category = () => (
   <section className="category">
      <div>
         <div className="category__item">
            <img className="category__item--img" src="/imgs/Product/dhau.jpg" alt="" />
         </div>
         <div className="category__item--text">Curd</div>
      </div>
      <div>
         <div className="category__item">
            <img className="category__item--img" src="/imgs/Product/redVelvet.jpg" alt="" />
         </div>
         <div className="category__item--text">Curd</div>
      </div>
      <div>
         <div className="category__item">
            <img className="category__item--img" src="/imgs/Product/himalayanCheese.jpg" alt="" />
         </div>
         <div className="category__item--text">Curd</div>
      </div>
      <div>
         <div className="category__item">
            <img className="category__item--img" src="/imgs/Product/dhau.jpg" alt="" />
         </div>
         <div className="category__item--text">Curd</div>
      </div>
   </section>
);
export default Category;
