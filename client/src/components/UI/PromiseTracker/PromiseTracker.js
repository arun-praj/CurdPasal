import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { usePromiseTracker } from "react-promise-tracker";

const PromiseTracker = (props) => {
   const { promiseInProgress } = usePromiseTracker();
   return <>{promiseInProgress ? <PulseLoader color='#fff' size='5' /> : "Add to Cart"}</>;
};

export default PromiseTracker;
