import React from "react";

import { connect } from "react-redux";

import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const notify = (msg, id) => {
   //    toast("Default Notification !");

   toast.success(msg, {
      position: toast.POSITION.TOP_CENTER,
      toastId: id,
   });

   // toast.error("Error Notification !", {
   //   position: toast.POSITION.TOP_LEFT
   // });

   // toast.warn("Warning Notification !", {
   //   position: toast.POSITION.BOTTOM_LEFT
   // });

   // toast.info("Info Notification !", {
   //   position: toast.POSITION.BOTTOM_CENTER
   // });

   // toast("Custom Style Notification with css class!", {
   //   position: toast.POSITION.BOTTOM_RIGHT,
   //   className: 'foo-bar'
   // });
};

const Alert = ({ alerts }) => {
   return (
      alerts !== null &&
      alerts.length > 0 && (
         <div style={{ color: "red" }} key={alert.id}>
            {notify(alert.msg)}
         </div>
      )
      //   alerts.map((alert) => {
      //      return (
      //         <div style={{ color: "red" }} key={alert.id}>
      //            {notify(alert.msg)}
      //         </div>
      //      );
      //   })
   );
};

const mapStateToProps = (state) => ({
   alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
