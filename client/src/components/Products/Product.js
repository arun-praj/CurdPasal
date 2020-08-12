import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import MoonLoader from "react-spinners/MoonLoader";

import { loadProducts } from "../../redux/action/product";

import Card from "./Card/Card";

const Product = (props) => {
   const [prodcut, setProducts] = useState([]);
   const { products } = props;
   useEffect(() => {
      props.loadProducts();
      setProducts((prev) => [...prev, products]);
   }, []);
   // console.log(props.products);
   let val;
   if (props.loading) {
      val = (
         <div style={{ position: "absolute", left: "50%", textAlign: "center" }}>
            <MoonLoader size={35} color={"#123abc"} loading={props.loading} />;
         </div>
      );
   } else {
      val = props.products.map((el) => {
         return <Card key={el._id} data={el} />;
      });
   }
   return <div>{val}</div>;
   //    return <div>{props.loading === true ? : <div>product.map()</div>}</div>;
};

const mapStateToProps = (state) => ({
   products: state.product.products,
   loading: state.product.loading,
});
export default connect(mapStateToProps, { loadProducts })(Product);
