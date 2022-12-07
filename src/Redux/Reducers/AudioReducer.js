import { AudioActionTypes } from "../../Constant/AudioTypes";


const initState = {
    isAudioPlay: false,
};

const audioReducer = (state = initState, action) => {
    switch (action.type) {
        case AudioActionTypes.SET_AUDIO_PLAY:
            return {
                ...state,
                isAudioPlay: true
            };

        case AudioActionTypes.SET_AUDIO_PAUSE:
            return {
                ...state,
                isAudioPlay: false
            };

        default:
            return state;
    }
};

export default audioReducer;