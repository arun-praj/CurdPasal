import React, { useEffect } from "react";
import { connect } from "react-redux";

import { loadProducts } from "../../redux/action/product";

import Card from "./Card/Card";
const Product = (props) => {
   const { products } = props;
   useEffect(async () => {
      await props.loadProducts();
   }, []);
   // console.log(props.products);
   let val;
   if (props.loading) {
      val = <div>Loading</div>;
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
