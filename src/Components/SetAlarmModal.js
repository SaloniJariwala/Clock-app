import { Button, Modal } from "react-bootstrap";
import "../App.css";
import { AlarmTitleWrapper } from "./style";
import HourContainer from "./SetAlarmForm/HourContainer";
import MinutesContainer from "./SetAlarmForm/MinutesContainer";
import { useState } from "react";

import SecondsContainer from "./SetAlarmForm/SecondsContainer";
import { notifyUser } from "../Utils/Notification";

const SetAlarmModal = ({
    showModal,
    closeModal,
    hourOptions,
    minuteOptions,
    play,
    handleStop
}) => {

    const date = new Date();

    const [hour, setHour] = useState(date.getHours());
    const [minute, setMinute] = useState(date.getMinutes());
    const [second, setSecond] = useState(date.getSeconds());
    // const [started, setStarted] = useState(false);
    // const [overTime, setOverTime] = useState();

    const setTime = (value, name) => {
        if (name === 'hour') {
            setHour(value);
        } else if (name === 'minute') {
            setMinute(value);
        } else {
            setSecond(value);
        }
    }

    // useEffect(() => {
    //     if (started) {
    //         const date = new Date();
    //         const diff = overTime - date;
    //         setTimeout(() => {
    //             setStarted(false);
    //             handleStop();
    //         }, diff);
    //     }
    // }, [started]);

    // useEffect(() => {
    //     if (hour && minute && second) {
    //         const laterDate = new Date();
    //         laterDate.setHours(Number(hour));
    //         laterDate.setMinutes(Number(minute) + 1)
    //         laterDate.setSeconds(Number(second));
    //         setOverTime(laterDate);
    //     }
    // }, [hour, minute, second]);

    const setAlarm = () => {
        const curr = new Date();
        curr.setHours(Number(hour));
        curr.setMinutes(Number(minute));
        curr.setSeconds(Number(second));
        console.log(`Alarm set for ${hour}:${minute}:${second}`);
        const newD = new Date();
        const diff = curr - newD;
        closeModal();

        if (diff >= 0) {
            setTimeout(() => {
                // setStarted(true);
                notifyUser('Its Time Now...');
                play();
            }, diff);
        }
    }

    return (
        <Modal
            centered
            show={showModal}
            onHide={closeModal}
        >
            <Modal.Header closeButton>
                <span className="alarm-modal-title">Set Alarm</span>
            </Modal.Header>
            <Modal.Body>
                <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ width: '33%', padding: '0 10px' }}>
                        <HourContainer options={hourOptions} setTime={setTime} />
                    </div>
                    <div style={{ width: '33%', padding: '0 10px' }}>
                        <MinutesContainer options={minuteOptions} setTime={setTime} />
                    </div>
                    <div style={{ width: '33%', padding: '0 10px' }}>
                        <SecondsContainer options={minuteOptions} setTime={setTime} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <AlarmTitleWrapper>
                    <div className="footer-row">
                        <Button onClick={play}>Test</Button>
                        <div>
                            <Button onClick={closeModal}>Cancel</Button>
                            <Button style={{ background: 'rebeccapurple', color: 'white' }} onClick={setAlarm}>Start</Button>
                        </div>
                    </div>
                </AlarmTitleWrapper>
            </Modal.Footer>
        </Modal >
    );
};

export default SetAlarmModal;