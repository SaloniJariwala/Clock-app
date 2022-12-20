import { useState, useRef } from "react";
import DisplayTimer from "./Display";
import SetTimerModal from "./SetTimerModal";
import BtnTimer from "./BtnTimer";
import defaultTimerSound from '../../Assets/audios/alarm.mp3';
import { t } from "i18next";
import { notifyUser } from "../../Utils/Notification";
import { useForm } from "react-hook-form";

const Timer = () => {

    const methods = useForm();

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
    let updateSecond = timerSecond;
    let updateMinute = timerMinute;
    let updateHour = timerHour;

    const resetForm = () => {
        methods.setValue('hour', 0);
        methods.setValue('minute', 0);
        methods.setValue('second', 0);
        methods.setValue('title', '');
        methods.setValue('sound', 'selected');
    }

    const play = () => {
        audioRef.current.play();
        audioRef.current.loop = true;
    };

    const pause = () => {
        audioRef.current.pause();
    };

    const closeModal = () => {
        resetForm();
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
        count();
    }

    function count() {
        if (updateHour > 0 && updateMinute > 0 && updateSecond > 0) {
            if (updateSecond === 0) {
                updateMinute -= 1;
                updateSecond = 60;
            }
        } else if (updateHour === 0 && updateMinute === 0 && updateSecond === 0) {
            localStorage.removeItem("timer");
            clearInterval(isInaterval);
            play();
            console.log('finish');
            alert("Hello");
            notifyUser('title');
        }
    }

    const StoreTimer = (formData) => {
        const setTimer = {
            hour: formData?.hour,
            minute: formData?.minute,
            second: formData?.second,
            title: formData?.title,
            sound: formData?.sound
        }
        localStorage.setItem('timer', JSON.stringify(setTimer));
        setStatus(1);
        closeModal();
        resetForm();
        const getTimer = JSON.parse(localStorage.getItem('timer'));
        updateHour = getTimer.hour;
        updateMinute = getTimer.minute;
        updateSecond = getTimer.second;
        setSound(getTimer.sound);
        setTitle(getTimer.title);
        setIsInterVal(setInterval(() => {
            run();
        }, 1000));
    }

    const stop = () => {
        clearInterval(isInaterval);
        setStatus(2);
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
                setTimer={StoreTimer}
                methods={methods}
            />
        </div>
    );
};

export default Timer;