import React from "react";
import { Link } from "react-router-dom";

import "./Error.scss";
// const style = {
//    height: "100vh",
//    width: "100vw",
// };
const Error = (props) => (
   <div>
      <section className="page_404">
         <div class="four_zero_four_bg">
            <h1 class="text-center ">404</h1>
         </div>
         <div class="contant_box_404">
            <h3 class="h2">Look like you're lost</h3>

            <p>The page you are looking for is not available!</p>

            <Link to="/" href="" class="link_404">
               Go to Home
            </Link>
         </div>
      </section>
   </div>
   //    <div>
   //       <section class="page_404">
   //          <div class="container">
   //             <div class="row">
   //                <div class="col-sm-12 ">
   //                   <div class="col-sm-10 col-sm-offset-1  text-center">
   //                      <div class="four_zero_four_bg">
   //                         <h1 class="text-center ">404</h1>
   //                      </div>

   //                      <div class="contant_box_404">
   //                         <h3 class="h2">Look like you're lost</h3>

   //                         <p>the page you are looking for not avaible!</p>

   //                         <a href="" class="link_404">
   //                            Go to Home
   //                         </a>
   //                      </div>
   //                   </div>
   //                </div>
   //             </div>
   //          </div>
   //       </section>
   //    </div>

   //    <div>
   //       <img style={style} src="/imgs/404_page_template_03.jpg" alt="pamna boi" />
   //    </div>
);
export default Error;
