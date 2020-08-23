import React from "react";
import "./Badge.scss";
const Badge = (props) => {
   // const badgeTypes = ["HIGHEST RATED", "BESTSELLER"];
   // badgeTypes.find(function(props.type){
   //  return props.type = badgeTypes ;
   // });

   return <div className='badge'>{props.type}</div>;
};

export default Badge;
