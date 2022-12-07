import { SetAlarmModalTypes } from "../../Constant/SetAlarmModalTypes";

export const setShowModal = () => ({
    type: SetAlarmModalTypes.SET_SHOW_MODAL
});

export const setModalClose = () => ({
    type: SetAlarmModalTypes.SET_CLOSE_MODAL
});

export const setAllAlarmDetails = (payload) => {
    debugger
    return {
        type: SetAlarmModalTypes.SET_ALARM_DETAILS,
        value: payload
    }
};