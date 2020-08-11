import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./Error.scss";
// const style = {
//    height: "100vh",
//    width: "100vw",
// };
const Error = (props) => {
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);
   return (
      <div>
         <section className="page_404">
            <div class="four_zero_four_bg">
               <h1 class="text-center ">404</h1>
            </div>
            <div class="contant_box_404">
               <h3 class="h2">Looks like you're lost</h3>

               <p>The page you are looking for is not available!</p>

               <Link to="/" href="" class="link_404">
                  Go to Home
               </Link>
            </div>
         </section>
      </div>
   );
};
export default Error;
