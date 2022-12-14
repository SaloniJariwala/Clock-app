import { t } from "i18next";
import { useState } from "react";
import { Button } from "react-bootstrap";
import DisplayTimer from "./Display";
import SetTimerModal from "./SetTimerModal";
import defaultTimerSound from '../../Assets/audios/alarm.mp3';
import { useRef } from "react";

const Timer = () => {

    document.title = t('timer');
    const audioRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [hour, setHour] = useState(10);
    const [minute, setMinute] = useState(10);
    const [second, setSecond] = useState(10);
    const [sound, setSound] = useState(defaultTimerSound);
    const [title, setTitle] = useState('Test Title');
    const [timerHour, setTimerHour] = useState(0);
    const [timerMinute, setTimerMinute] = useState(0);
    const [timerSecond, setTimerSecond] = useState(0);

    const [time, setTime] = useState();

    const setTimerDetails = (value, name) => {
        switch (name) {
            case 'hour':
                setHour(value);
                break;

            case 'minute':
                setMinute(value);
                break;

            case 'second':
                setSecond(value);
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

    const toMilliseconds = (hrs, min, sec) => {
        return (hrs * 60 * 60 + min * 60 + sec) * 1000;
    }

    const setTimerStart = () => {
        debugger
        closeModal();
        debugger
        // const countDownDate = new Date().setHours(hour, minute, second);
        let countDownTime = toMilliseconds(hour, minute, second);
        debugger
        // setTime(countDownTime);
        setInterval(() => {
            const hours = Math.floor((countDownTime % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60));
            const minutes = Math.floor((countDownTime % (60 * 60 * 1000)) / (1000 * 60));
            const seconds = Math.ceil((countDownTime % (60 * 1000)) / 1000);
            debugger
            setTimerHour(hours);
            setTimerMinute(minutes);
            setTimerSecond(seconds);
            debugger
            countDownTime--;
            debugger
        }, 1000);
        debugger
        debugger
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <DisplayTimer
                timerHour={timerHour}
                timerMinute={timerMinute}
                timerSecond={timerSecond}
                title={title}
            />
            <Button
                variant="outline-success"
                onClick={() => setShowModal(true)}
                style={{ margin: '40px 0' }}
            >
                {t(`set_timer`)}
            </Button>
            <audio src={sound} ref={audioRef} />
            <SetTimerModal
                showModal={showModal}
                closeModal={closeModal}
                setTimerDetails={setTimerDetails}
                setTimer={setTimerStart}
            />
        </div>
    );
};

export default Timer;