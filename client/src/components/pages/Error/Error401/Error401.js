import React from "react";
import { Link } from "react-router-dom";
import "./Error401.scss";
import "../Error.scss";
const Error401 = () => {
   return (
      <div className='Error401'>
         <div className='center'>
            <div className='error'>
               <div className='number'>4</div>
               <div className='illustration'>
                  <div className='circle'></div>
                  <div className='clip'>
                     <div className='paper'>
                        <div className='face'>
                           <div className='eyes'>
                              <div className='eye eye-left'></div>
                              <div className='eye eye-right'></div>
                           </div>
                           <div className='rosyCheeks rosyCheeks-left'></div>
                           <div className='rosyCheeks rosyCheeks-right'></div>
                           <div className='mouth'></div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className='number'>1</div>
            </div>

            <div className='text'>
               ( -_- ) You are not authorized to access this route. Login to continue
            </div>

            <Link to='/login' href='' className='link_404'>
               Go to Login page
            </Link>
         </div>
      </div>
   );
};

export default Error401;
