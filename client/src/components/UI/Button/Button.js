import React from "react";
const Button = (props) => {
   let style = null;
   console.log(props);
   if (props.type === "primary") {
      style = {
         width: "100%",
         backgroundColor: "#ec5252",
         padding: "12px 20px",
         borderRadius: "3px",
         border: "none",
         color: "white",
         fontSize: "16px",
         letterSpacing: "1.2px",
         fontWeight: "700",
         // " &:hover": {
         //    backgroundColor: "#d44949 !important",
         // },
      };
   } else if (props.type === "secondary") {
      style = {
         border: " 1px solid #686f7a !important",
         // " &:hover ": {
         //    color: "#000000 !important",
         //    backgroundColor: "#ffffff !important",
         // },
      };
   }

   return (
      <>
         <Button style={style}>{props.value}</Button>;
      </>
   );
};

export default Button;
