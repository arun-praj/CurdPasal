import React from "react";
const Button = (props) => {
   let style = new Object();
   // console.log(props);

   if (props.type === "primary") {
      style = {
         width: "100%",
         backgroundColor: "#ec5252",
         padding: "12px 20px",
         borderRadius: "3px",
         border: "none",
         color: "white",
         fontSize: "16px",
         letterSpacing: "1px",
         fontWeight: "700",
         // " &:hover": {
         //    backgroundColor: "#d44949 !important",
         // },
      };
   } else if (props.type === "secondary") {
      style = {
         border: " 1px solid #686f7a !important",
      };
   }
   if (props.style) {
      style = { ...style, ...props.style };
   }
   console.log(style);
   return <button style={style}>{props.value}</button>;
};

export default Button;
