import { Button, Modal } from "antd";
import "../App.css";
import { AlarmTitleWrapper } from "./style";
import HourContainer from "./SetAlarmForm/HourContainer";
import MinutesContainer from "./SetAlarmForm/MinutesContainer";
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';



import { useState } from "react";

import SecondsContainer from "./SetAlarmForm/SecondsContainer";

const SetAlarmModal = ({
    showModal,
    closeModal,
    hourOptions,
    minuteOptions,
    play,
    handleStop
}) => {

    const [hour, setHour] = useState();
    const [minute, setMinute] = useState();
    const [second, setSecond] = useState();
    const [started, setStarted] = useState(false);
    const [overTime, setOverTime] = useState();

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
                setStarted(true);
                addNotification({
                    title: 'wake up',
                    message: 'Go to gym',
                    theme: "darkblue",
                    duration: 4000,
                    native: true
                });
                play();
            }, diff);
        }
    }

    return (
        <Modal
            centered
            open={showModal}
            onCancel={closeModal}
            title={<span className="alarm-modal-title">Set Alarm</span>}
            footer={
                <AlarmTitleWrapper>
                    <div className="footer-row">
                        <Button onClick={play}>Test</Button>
                        <div>
                            <Button onClick={closeModal}>Cancel</Button>
                            <Button style={{ background: 'rebeccapurple', color: 'white' }} onClick={setAlarm}>Start</Button>
                        </div>
                    </div>
                </AlarmTitleWrapper>
            }
        >
            <Notifications />
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
        </Modal >
    );
};

export default SetAlarmModal;