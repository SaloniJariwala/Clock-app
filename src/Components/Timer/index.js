import { useState, useRef, useEffect } from "react";
import DisplayTimer from "./Display";
import SetTimerModal from "./SetTimerModal";
import BtnTimer from "./BtnTimer";
import defaultTimerSound from '../../Assets/audios/alarm.mp3';
import { t } from "i18next";
import { notifyUser } from "../../Utils/Notification";

const Timer = () => {

    document.title = t('timer');
    const audioRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState(0);
    const [sound, setSound] = useState(defaultTimerSound);
    const [title, setTitle] = useState('Test Title');
    const [timerHour, setTimerHour] = useState(0);
    const [timerMinute, setTimerMinute] = useState(0);
    const [timerSecond, setTimerSecond] = useState(0);
    const [isInaterval, setIsInterVal] = useState();
    const [flag, setFlag] = useState(false);
    let updateSecond = timerSecond;
    let updateMinute = timerMinute;
    let updateHour = timerHour;

    const play = () => {
        audioRef.current.play();
        // audioRef.current.volume = volume / 100;
        audioRef.current.loop = true;
    };

    const pause = () => {
        audioRef.current.pause();
        setFlag(!flag);
    };

    const setTimerDetails = (value, name) => {
        switch (name) {
            case 'hour':
                setTimerHour(value);
                break;

            case 'minute':
                setTimerMinute(value);
                break;

            case 'second':
                setTimerSecond(value);
                break;

            case 'sound':
                setSound(value);
                break;

            case 'title':
                setTitle(value);
                break;

            default:
                console.log('Invalid Input');
        }
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const run = () => {

        if (updateSecond > 60) {
            updateMinute++;
            updateSecond = parseInt(updateSecond) - 59;
        }
        if (updateMinute > 60) {
            updateHour++;
            updateMinute = parseInt(updateMinute) - 60
        }

        updateMinute = updateMinute > 60 ? 60 : updateMinute;
        if (updateSecond !== 0) {
            const sec = `${updateSecond <= 10 ? "0" : ""}${updateSecond--}`;
            setTimerSecond(sec);
        } else if (updateMinute !== 0 && updateSecond === 0) {
            updateSecond = 59;
            const min = `${updateMinute <= 10 ? "0" : ""}${updateMinute--}`;
            setTimerMinute(min);
        } else if (updateHour !== 0 && updateMinute === 0) {
            updateMinute = 60;
            const hr = `${updateHour <= 10 ? "0" : ""}${updateHour--}`;
            setTimerHour(hr)
        } else {
            return;
        }
        setTimerSecond(updateSecond);
        setTimerMinute(updateMinute);
        setTimerHour(updateHour);
        setFlag(!flag);
    }

    function count() {
        //this function is the count control is will check if the count down is finish
        if (updateHour > 0 && updateMinute > 0 && updateSecond > 0) {
            if (updateSecond === 0) {
                debugger
                updateMinute -= 1;
                debugger
                updateSecond = 60;
                setFlag(!flag)
                debugger
            }
        } else {
            debugger
            localStorage.removeItem("timer");
            clearInterval(isInaterval);
            debugger
            console.log('finish');
            setFlag(!flag)
        }
    }

    const StoreTimer = () => {
        debugger
        const setTimer = {
            hour: updateHour,
            minute: updateMinute,
            second: updateSecond,
            title: title,
            sound: sound
        }
        debugger
        localStorage.setItem('timer', JSON.stringify(setTimer));
        debugger
        setStatus(1)
        debugger
        closeModal();
        const getTimer = JSON.parse(localStorage.getItem('timer'));
        updateHour = getTimer.hour;
        updateMinute = getTimer.minute;
        updateSecond = getTimer.second;
        setSound(getTimer.sound);
        setTitle(getTimer.title);
        setIsInterVal(setInterval(() => {
            debugger
            run();
            if (updateHour === 0 && updateMinute === 0 && updateSecond === 0) {
                debugger
                clearInterval(isInaterval);
                debugger
                count();
                debugger
                // play();
                // debugger
                notifyUser(getTimer.title)
                debugger
            }

        }, 1000));
        setFlag(!flag);
    }

    const stop = () => {
        clearInterval(isInaterval);
        setStatus(2);
        setFlag(!flag);
    };

    const Reset = () => {
        clearInterval(isInaterval);
        setStatus(0);
        setTimerHour(0);
        setTimerMinute(0);
        setTimerSecond(0);
        localStorage.removeItem("timer");
    }

    const resume = () => {
        StoreTimer();
    };

// useEffect(()=>{
//     const time=JSON.parse(localStorage.getItem('timer'));
//     if(time?.hour !== null && time?.minute !== null && time?.second !== null){
//     setTimerHour(time?.hour ? time?.hour :"0");
//     setTimerMinute(time?.minute ? time?.minute :"0");
//     setTimerSecond(time?.second ? time?.second :"0");
// //    if(time !==null){
// //        count();
// //    }
//    }
// },[flag])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <DisplayTimer
                timerHour={timerHour}
                timerMinute={timerMinute}
                timerSecond={timerSecond}
                title={title}

            />
            <BtnTimer
                setShowModal={setShowModal}
                stop={stop}
                status={status}
                Reset={Reset}
                resume={resume}
                pause={pause}
            />
            <audio src={sound} ref={audioRef} />
            <SetTimerModal
                showModal={showModal}
                closeModal={closeModal}
                setTimerDetails={setTimerDetails}
                setTimer={StoreTimer}
            />
        </div>
    );
};

export default Timer;