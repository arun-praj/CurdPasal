import React from "react";
import { Link } from "react-router-dom";
import "./Categories.scss";

const Categories = (props) => {
   return (
      <>
         <div className='topics-container card__style'>
            <h1 className='heading_main'>Our Product Categories.</h1>
            <h2 className='heading_sub'>Choose from one of the category below.</h2>
            <div>
               <div
                  style={{
                     height: "140px",
                     width: "100px",
                     // backgroundColor: "#FAFAFA",
                     borderRadius: "4px",
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "center",
                     alignItems: "center",
                     border: "solid 1px #dcdacb",
                  }}
                  className='card__sm'>
                  <img
                     style={{
                        borderRadius: "4px",
                     }}
                     height='70px'
                     width='70px'
                     src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Dhau.JPG/220px-Dhau.JPG'
                     alt='dhau ko photo'
                  />
                  <div style={{ marginTop: "16px", fontSize: "16px" }}>Curd</div>
               </div>
            </div>
         </div>
         <div className='topics-container list__style'>
            <h1 className='heading_main'>Our Product Categories.</h1>
            <h2 className='heading_sub'>Choose from one of the category below.</h2>
            <div className='topics'>
               <Link to='/' className='topic-box'>
                  <img src='./backend/uploads/normal_dhau.jpg' alt='' className='topic-box-img' />
                  Yogurt
               </Link>
               <Link to='/' className='topic-box'>
                  <img src='./backend/uploads/red-velvet.jpg' alt='' className='topic-box-img' />
                  Cake
               </Link>
               <Link to='/' className='topic-box'>
                  <img
                     src='./backend/uploads/Nepali-yak-cheese.jpg'
                     alt=''
                     className='topic-box-img'
                  />
                  Cheese
               </Link>
               <div className='topic-box'>
                  Butter
                  <span className='topic-box-text-sm'>Comming Soon!</span>
               </div>
               <div className='topic-box'>
                  Butter
                  <span className='topic-box-text-sm'>Comming Soon!</span>
               </div>
            </div>
         </div>
      </>
   );
};

export default Categories;
