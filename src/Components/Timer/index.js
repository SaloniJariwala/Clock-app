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
    let countdownTimer;
    const [showModal, setShowModal] = useState(false);
    const [sound, setSound] = useState(defaultTimerSound);
    const [title, setTitle] = useState('Test Title');
    const [timerHour, setTimerHour] = useState(0);
    const [timerMinute, setTimerMinute] = useState(0);
    const [timerSecond, setTimerSecond] = useState(0);
    const [isSetTimer, setIsSetTimer] = useState(false);
    const [isInaterval, setIsInterVal] = useState();

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


    const timer = () => {
        // closeModal();
        if (timerSecond > 60) {
            timerMinute++;
            timerSecond = parseInt(timerSecond) - 59;
        }
        if (timerMinute > 60) {
            timerHour++;
            timerMinute = parseInt(timerMinute) - 60;
        }
        let min1 = timerMinute > 60 ? 60 : timerMinute;
        setTimerMinute(min1);
        // Formatting the time - END

        // Updating the Time - START
        if (timerHour == 0 && timerMinute == 0 && timerSecond == 0) {
            timerHour = 0;
            timerMinute = 0;
            timerSecond = 0;
            stopInterval();
        } else if (timerSecond != 0) {
            let sec = `${timerSecond <= 10 ? "0" : ""}${timerSecond - 1}`;
            setTimerSecond(sec);
        } else if (timerMinute != 0 && timerSecond == 0) {
            timerSecond = 59;
            let min = `${timerMinute <= 10 ? "0" : ""}${timerMinute - 1}`;
            setTimerMinute(min);
        } else if (timerHour != 0 && timerMinute == 0) {
            timerMinute = 60;
            let hr = `${timerHour <= 10 ? "0" : ""}${timerHour - 1}`;
        }
        return;
    };

    function stopInterval(state) {
        setIsSetTimer(false);
        clearInterval(countdownTimer);
    }

    const setTimerStart = () => {
        closeModal();
        function startInterval() {
            countdownTimer = setInterval(function () {
                timer();
            }, 1000);
        }
        startInterval();
    };

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