import { SET_ALERT } from "../action/types";
import { toast } from "react-toastify";
// const initialState = [];
const initialState = {};

const alertReducer = (state = initialState, action) => {
   const { type, payload } = action;

   switch (type) {
      case SET_ALERT:
         switch (payload.alert) {
            case "warning":
               toast.warning(payload.msg, {
                  position: toast.POSITION.TOP_CENTER,
                  toastId: payload.id,
               });
               break;
            case "success":
               toast.success(payload.msg, {
                  position: toast.POSITION.TOP_CENTER,
                  toastId: payload.id,
               });
               break;
            case "error":
               toast.error(payload.msg, {
                  position: toast.POSITION.TOP_CENTER,
                  toastId: payload.id,
               });
               break;
            default:
               toast.info("Invalid Error Message", {
                  position: toast.POSITION.TOP_CENTER,
                  toastId: payload.id,
               });
         }

         return { ...state, payload };
      // case REMOVE_ALERT:
      //    return state.filter((alert) => alert.id !== payload);
      default:
         return state;
   }
};

export default alertReducer;
