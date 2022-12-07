import { SetAlarmModalTypes } from "../../Constant/SetAlarmModalTypes";

const initState = {
    showModal: false,
    alarmDetails: {},
};

const setAlarmModalReducer = (state = initState, action) => {
    debugger
    switch (action.type) {
        case SetAlarmModalTypes.SET_SHOW_MODAL:
            return {
                ...state,
                showModal: true
            };

        case SetAlarmModalTypes.SET_CLOSE_MODAL:
            return {
                ...state,
                showModal: false
            };

        case SetAlarmModalTypes.SET_ALARM_DETAILS:
            debugger
            return {
                ...state,
                alarmDetails: action.value
            };

        default:
            return state;
    }
};

export default setAlarmModalReducer;