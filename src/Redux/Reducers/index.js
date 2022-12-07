import { combineReducers } from "redux";
import audioReducer from "./AudioReducer";
import setAlarmModalReducer from "./SetAlarmModalReducer";

export default combineReducers({
    audioReducer,
    setAlarmModalReducer
});