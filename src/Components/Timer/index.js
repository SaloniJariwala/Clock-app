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
    const [isSetTimer, setIsSetTimer] = useState(false);

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

    const stopInterval = () => {

    }

    const timer = () => {
        if (timerHour === 0 && timerMinute === 0 && timerSecond === 0) {
            stopInterval();
        } else if (timerSecond) {

        }
    }

    const setTimerStart = () => {
        setIsSetTimer(true);
        setTimerHour(hour);
        setTimerMinute(minute);
        setTimerSecond(second);
        closeModal();
        const countdownTimer = setInterval(() => {
            timer();
        }, 1000);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <DisplayTimer
                timerHour={timerHour}
                timerMinute={timerMinute}
                timerSecond={timerSecond}
                title={title}
            />
            {isSetTimer ? (
                <div>
                    <Button variant="outline-warning" style={{ marginRight: 20 }}>Stop</Button>
                    <Button variant="outline-danger">Reset</Button>
                </div>
            ) : (
                <Button
                    variant="outline-success"
                    onClick={() => setShowModal(true)}
                    style={{ margin: '40px 0' }}
                >
                    {t(`set_timer`)}
                </Button>
            )}
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