import React from "react";

const Sticky = (props) => {
   const style = {
      position: "fixed",
      bottom: "0px",
      left: "-1px",
      width: "101vw",
      height: "10vh",
      zIndex: "9",
      overflow: "hidden",

      // background: "rgba(255,255,255,0.7)",
      // mixBlendMode: "screen",
      color: "#fff",
      backgroundColor: "#1e1e1c",
      boxShadow: " 0 -2px 4px rgba(0,0,0,.08), 0 -4px 12px rgba(0,0,0,.16)",
      padding: "16px 24px",
   };
   return <div style={style}>This is a sickypy</div>;
};

export default Sticky;
