import { AudioActionTypes } from "../../Constant/AudioTypes";

export const setIsAudioPlay = () => ({
    type: AudioActionTypes.SET_AUDIO_PLAY
});

export const setIsAudioPause = () => ({
    type: AudioActionTypes.SET_AUDIO_PAUSE
});