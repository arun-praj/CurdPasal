import React from "react";
import "./ProfilePic.scss";

const ProfilePic = ({ firstName, lastName }) => {
   // const randomColors = [
   //    {
   //       backgroundColor: "#69BDE3",
   //       color: "#fff",
   //    },
   //    {
   //       backgroundColor: "#0FBF84",
   //       color: "#fff",
   //    },
   //    {
   //       backgroundColor: "#48EBFF",
   //       color: "#fff",
   //    },
   //    {
   //       backgroundColor: "#07B2FF",
   //       color: "#fff",
   //    },
   //    {
   //       backgroundColor: "#131314",
   //       color: "#fff",
   //    },
   // ];
   const randomColors = [
      {
         backgroundColor: "#0FBF84",
         color: "#fff",
      },
   ];

   const style = {
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWidth: "700",
      fontSize: "16px",
   };
   let item = randomColors[Math.floor(Math.random() * randomColors.length)];
   const newStyle = { ...style, ...item };
   return (
      <div style={newStyle} className='profilePic'>
         {firstName.slice(0, 1)}
         {lastName && lastName.slice(0, 1)}
      </div>
   );
};

export default ProfilePic;
