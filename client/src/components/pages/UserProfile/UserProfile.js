import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import MoonLoader from "react-spinners/MoonLoader";
import moment from "moment";
import PulseLoader from "react-spinners/PulseLoader";
import { usePromiseTracker } from "react-promise-tracker";

import { connect } from "react-redux";
import { updateCustomerProfile } from "../../../redux/action/auth";

import Wrapper from "../../HOC/Wrapper/Wrapper";
import PageHeader from "../../UI/PageHeader/PageHeader";
import ProfilePic from "../../UI/ProfilePic/ProfilePic";
import Map from "../../UI/Maps/Mapv2";
import Button from "../../UI/Button/Button";
import Error401 from "../../pages/Error/Error401/Error401";

import "./react-tabs.scss";
import "./UserProfile.scss";
import { useState } from "react";

const UserProfile = (props) => {
   // console.log(props.user);
   // const { user, loading, isAuthenticated } = props;

   if (props.isAuthenticated) {
      if (props.loading) {
         return (
            <div
               style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%,-50%)",
                  textAlign: "center",
               }}>
               <MoonLoader size={35} color={"#123abc"} />;
            </div>
         );
      }
      return (
         <>
            <PageHeader value='User Profile' />
            <Wrapper style={{ minHeight: "35vh" }}>
               <div className='grid'>
                  <div className='grid-left'>
                     <div className='grid__profile__image'>
                        <ProfilePic
                           firstName={props.user.data.firstName}
                           lastName={props.user.data.lastName}
                           size='180px'
                        />
                     </div>
                     <div className='grid__profile__details'>
                        <div className='grid__profile__details--name'>
                           {props.user.data.firstName} {props.user.data.lastName}
                        </div>
                        <div className='grid__profile__details--email'>{props.user.data.email}</div>
                        <div className='grid__profile__details--email'>
                           {" "}
                           Joined on :{" "}
                           {moment
                              .utc(props.user.data.createdAt)
                              .format("YYYY-MMM-DD")
                              .toLocaleString("default", { month: "long" })}
                           {/* after 6mnts :{" "}
                           {moment.utc(props.user.data.createdAt).add(7, "M").format("YYYY-MM-DD")} */}
                        </div>
                     </div>
                  </div>
                  <div className='grid-right'>
                     <Tabs>
                        <TabList>
                           <Tab>My profile</Tab>
                           <Tab>Purchase history</Tab>
                           <Tab>Settings</Tab>
                        </TabList>

                        <TabPanel>
                           <Form data={props} />
                        </TabPanel>
                        <TabPanel>
                           <h2>Any content 2</h2>
                        </TabPanel>
                        <TabPanel>
                           <h2>
                              <Setting />
                           </h2>
                        </TabPanel>
                     </Tabs>
                  </div>
               </div>
            </Wrapper>
         </>
      );
   } else {
      return <Error401 />;
   }
};

const Setting = (props) => {
   return (
      <div className='form__box'>
         <div className='heading--danger' style={{ borderBottom: "1px solid #dcdacb" }}>
            Delete account
         </div>
         <span className='form__group--text'>
            Once you delete your account, there is no going back. Please be certain.
         </span>
         <div>
            <button className='button--danger button'>Delete your account</button>
         </div>
      </div>
   );
};

const Form = ({ data }) => {
   const { user } = data;
   const { promiseInProgress } = usePromiseTracker();

   const [formData, setFormData] = useState({
      firstName: user.data.firstName ? user.data.firstName : "",
      lastName: user.data.lastName ? user.data.lastName : "",
      email: user.data.email ? user.data.email : "",
      contact: user.data.contact ? user.data.contact : "",
      city: user.data.city ? user.data.city : "",
      points: user.data.points ? user.data.points : "",
   });
   const handleFormChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setFormData((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   };
   return (
      <div className='form'>
         <form action='' className='form__container'>
            <div className='form__box'>
               <div className='form__group'>
                  <label htmlFor='name' className='form__group--label'>
                     First Name
                  </label>
                  <input
                     type='text'
                     id='firstname'
                     name='firstName'
                     value={formData.firstName}
                     className='form__group--input'
                     onChange={handleFormChange}
                  />
               </div>
               <div className='form__group'>
                  <label htmlFor='name' className='form__group--label'>
                     Last Name
                  </label>
                  <input
                     type='text'
                     id='lastname'
                     name='lastName'
                     value={formData.lastName}
                     onChange={handleFormChange}
                     className='form__group--input'
                  />
               </div>
            </div>
            <div className='form__box'>
               <div className='form__group'>
                  <label htmlFor='name' className='form__group--label'>
                     Email
                  </label>
                  <input
                     type='text'
                     id='email'
                     name='email'
                     value={formData.email}
                     className='form__group--input'
                     onChange={handleFormChange}
                     disabled
                  />
                  <span className='form__group--text'>
                     * You cannot change your email. If you wish to use another email, signup with
                     that email instead.
                  </span>
               </div>
            </div>
            <div className='form__box'>
               <div className='form__group'>
                  <label htmlFor='name' className='form__group--label'>
                     Contact Number
                  </label>
                  <input
                     type='text'
                     onChange={handleFormChange}
                     id='contact'
                     name='contact'
                     value={formData.contact}
                     className='form__group--input'
                  />
                  <span className='form__group--text'>
                     * We will use this contact number to verify your order.
                  </span>
               </div>
            </div>
            <div className='form__box'>
               <div className='form__group'>
                  <label htmlFor='name' className='form__group--label'>
                     New Password
                  </label>
                  <input
                     type='password'
                     id='newPassword'
                     onChange={handleFormChange}
                     name='contact'
                     value=''
                     placeholder='Enter your new password'
                     className='form__group--input'
                  />
               </div>
               <div className='form__group'>
                  <label htmlFor='name' className='form__group--label'>
                     Old Password
                  </label>
                  <input
                     type='password'
                     id='oldPassword'
                     name='contact'
                     onChange={handleFormChange}
                     value=''
                     placeholder='Enter your old password'
                     className='form__group--input'
                  />
                  <span className='form__group--text'>
                     * Required if you wish to change your password.
                  </span>
               </div>
            </div>
            <div className='form__group form__box'>
               <Button
                  type='primary'
                  value={promiseInProgress ? <PulseLoader color='#fff' size='5' /> : "Save Changes"}
                  onClick={(e) => {
                     e.preventDefault();
                     data.updateCustomerProfile(formData);
                  }}
               />
            </div>
         </form>
         <div className='form__map'>
            <Map height='67vh' width='100%' center={formData.points} />
         </div>
      </div>
   );
};

const mapStateToProps = (state) => ({
   user: state.auth.user,
   isAuthenticated: state.auth.isAuthenticated,
   loading: state.auth.loading,
});

export default connect(mapStateToProps, { updateCustomerProfile })(UserProfile);
