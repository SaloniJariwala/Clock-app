import alert from "../Assets/audios/alert.mp3";
import chipTunes from "../Assets/audios/chiptune.mp3";
import clockSound from "../Assets/audios/clcokSound.mp3";
import clockStrikes from "../Assets/audios/clcokStrikes.mp3";
import clockChime from "../Assets/audios/clockChime.mp3";
import creepyClock from "../Assets/audios/creepyClock.mp3";
import overSimplified from "../Assets/audios/oversimplified.mp3";
import superMario from "../Assets/audios/superMario.mp3";
import defaultAlarm from "../Assets/audios/alarm.mp3";

export const audioData = [
    {
        audioId: '1',
        audioTitle: "Alarm",
        track: defaultAlarm
    },
    {
        audioId: '2',
        audioTitle: "Alert",
        track: alert
    },
    {
        audioId: '3',
        audioTitle: "Chiptune",
        track: chipTunes
    },
    {
        audioId: '4',
        audioTitle: "Clock Sound",
        track: clockSound
    },
    {
        audioId: '5',
        audioTitle: "Clock Strikes",
        track: clockStrikes
    },
    {
        audioId: '6',
        audioTitle: "Clock Chime",
        track: clockChime
    },
    {
        audioId: '7',
        audioTitle: "Creepy Clock",
        track: creepyClock
    },
    {
        audioId: '8',
        audioTitle: "Over Simplified",
        track: overSimplified
    },
    {
        audioId: '9',
        audioTitle: "Super Mario",
        track: superMario
    }
];