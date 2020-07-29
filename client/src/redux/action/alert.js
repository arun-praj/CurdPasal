import { v4 as uuidv4 } from "uuid";

import { SET_ALERT } from "./types";

export const setAlert = (msg, alert) => (dispatch) => {
   const id = uuidv4();
   //@Action        Sets alert
   const actionSetAlert = {
      type: SET_ALERT,
      payload: { msg, alert, id },
   };

   //@ Dispatch(action)
   //@desc      dispatch tries to match the action with the switch in reducer and executes
   //            the statement in that case.
   dispatch(actionSetAlert);
   // setTimeout(() => dispatch(actionRemoveAlert), 500);
};
// export const removeAlert = (id) => (dispatch) => {
//    const actionRemoveAlert = {
//       type: REMOVE_ALERT,
//       payload: id,
//    };
//    dispatch(actionRemoveAlert);
// };
