import React, { useEffect } from "react";
import { connect } from "react-redux";
import MoonLoader from "react-spinners/MoonLoader";

import { loadProducts } from "../../redux/action/product";
import Card from "./Card/Card";

import "./Product.scss";

const Product = (props) => {
   // const [product, setProducts] = useState([]);
   // const { products } = props;
   useEffect(() => {
      props.loadProducts();
      // setProducts((prev) => [...prev, products]);
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
   return <div className='cards'>{val}</div>;
};

const mapStateToProps = (state) => ({
   products: state.product.products,
   loading: state.product.loading,
});
export default connect(mapStateToProps, { loadProducts })(Product);
