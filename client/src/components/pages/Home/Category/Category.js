import React from "react";
import "./Category.scss";
const Category = () => (
   <section className="category">
      {/* <a class="c-preview">
         <div class="c-preview__img c-preview__img--1"></div>
         <h2 class="c-preview__title">Curd</h2>
      </a>
      <a class="c-preview">
         <div class="c-preview__img c-preview__img--2"></div>
         <h2 class="c-preview__title">Cake</h2>
      </a>
      <a class="c-preview">
         <div class="c-preview__img c-preview__img--3"></div>
         <h2 class="c-preview__title">Cheese</h2>
      </a>
      <a class="c-preview">
         <div class="c-preview__img c-preview__img--4"></div>
         <h2 class="c-preview__title">Curd</h2>
      </a> */}
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
