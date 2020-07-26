import React from "react";

const style = {
   maxWidth: "1200px",
   margin: "auto",
};
const Wrapper = (props) => {
   return <div style={style}>{props.children}</div>;
};

export default Wrapper;
