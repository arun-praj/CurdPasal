import { SET_ALERT, REMOVE_ALERT } from "../action/types";
import { toast } from "react-toastify";
// const initialState = [];
const initialState = {};

const alertReducer = (state = initialState, action) => {
   const { type, payload } = action;

   switch (type) {
      case SET_ALERT:
         toast.success(payload.msg, {
            position: toast.POSITION.TOP_CENTER,
            toastId: payload.id,
         });
         return { ...state, payload };
      // case REMOVE_ALERT:
      //    return state.filter((alert) => alert.id !== payload);
      default:
         return state;
   }
};

export default alertReducer;
