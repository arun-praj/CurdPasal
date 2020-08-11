import React, { Component } from "react";
import { connect } from "react-redux";

import { loadProducts } from "../../redux/action/product";

import Card from "./Card/Card";

// class Product extends Component {
//    componentDidMount() {
//       this.props.loadProducts();
//    }

//    render() {
//       let val;

//       return <> Leage of legends</>;
//    }
// }
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
