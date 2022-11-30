import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { AlarmWrapper } from "./style";
import { days, monthNames } from "../Constant";
import SetAlarmModal from "./SetAlarmModal";
import alarmAudio from "../Assets/audios/alarm.mp3";

const Alarm = () => {

    const [currentTime, setCurrrentTime] = useState('');
    const [day, setDay] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [hourOptions, setHourOptions] = useState();
    const [minuteOtions, setMinuteOptions] = useState();
    const [alarm, setAlarm] = useState([]);
    const [upcomingAlarms, setUpcomingAlarms] = useState([]);
    const [pastAlarms, setPastAlarms] = useState([]);
    const [flag, setFlag] = useState(false);
    const audioRef = useRef();

    // const audio = new Audio(alarmAudio);

    const play = () => {
        audioRef.current.play();
        audioRef.current.loop = true;
    }

    const callAlarm = () => {
        setFlag(!flag);
    }

    const pause = () => {
        audioRef.current.pause();
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const displayAlarm = (hour, minute, second, country, GMT) => {
        const newAlarm = {
            hour,
            minute,
            second,
            country,
            GMT
        };
        const newArr = alarm;
        newArr.push(newAlarm);
        setAlarm(newArr);
    };

    const updateTime = () => {
        const date = new Date();
        const time = date.toLocaleTimeString();
        const dayStr = `${days[date.getDay()].toUpperCase()} - ${monthNames[date.getMonth()].toUpperCase()} ${date.getDate()}. ${date.getFullYear()}`;
        setCurrrentTime(time);
        setDay(dayStr);
    };

    setInterval(updateTime, 1000);

    const getHours = () => {
        let arr = [];
        for (let i = 1; i <= 24; i++) {
            if (i < 10) {
                arr = [...arr, `0${i.toString()}`];
            } else {
                arr = [...arr, i.toString()];
            }
        }
        setHourOptions(arr);
    }

    const getMinutes = () => {
        let mArr = [];
        for (let j = 0; j <= 59; j++) {
            if (j < 10) {
                mArr = [...mArr, `0${j.toString()}`];
            } else {
                mArr = [...mArr, j.toString()];
            }
        }
        setMinuteOptions(mArr);
    }

    const handleClick = () => {
        getHours();
        getMinutes();
        setShowModal(true);
    }

    const handleStop = () => {
        pause();
    }

    // const getAlarms = () => {
    //     const allAlarms = JSON.parse(localStorage.getItem('Alarms')) || [];
    //     const upcomingAlarm = allAlarms.filter((item) => item.alarmTimestamp > Date.now());
    //     setUpcomingAlarms(upcomingAlarm);
    //     const pastAlarm = allAlarms.filter((item) => item.alarmTimestamp < Date.now());
    //     setPastAlarms(pastAlarm);
    // }

    useEffect(() => {
        const allAlarms = JSON.parse(localStorage.getItem('Alarms')) || [];
        const upcomingAlarm = allAlarms.filter((item) => item.alarmTimestamp > Date.now());
        setUpcomingAlarms(upcomingAlarm);
        const pastAlarm = allAlarms.filter((item) => item.alarmTimestamp < Date.now());
        setPastAlarms(pastAlarm);
    }, [flag]);

    const getTime = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }

    return (
        <AlarmWrapper>
            <h1 className="display">{currentTime}</h1>
            <p className="day">{day}</p>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button variant="success" onClick={handleClick} style={{ marginRight: 10 }}>Set Alarm</Button>
                <Button variant="danger" onClick={handleStop}>Stop Alarm</Button>
            </div>
            <div className="container-fluid d-flex justify-content-evenly">
                <div className="w-50 m-5 text-center">
                    <h3>Past Alarm</h3>
                    {pastAlarms.map((item, index) => (
                        <div className="d-flex" key={index}>
                            <span style={{ marginRight: 15 }}>{item.title}</span>
                            <span style={{ marginRight: 15 }}>{getTime(item.alarmTimestamp)}</span>
                            <span>{new Date(item.alarmTimestamp).toLocaleDateString()}</span>
                        </div>
                    ))}
                </div>
                <div className="w-50 m-5 text-center">
                    <h3>Upcoming Alarm</h3>
                    {upcomingAlarms.map((item, index) => (
                        <div className="d-flex" key={index}>
                            <span style={{ marginRight: 15 }}>{item.title}</span>
                            <span style={{ marginRight: 15 }}>{getTime(item.alarmTimestamp)}</span>
                            <span>{new Date(item.alarmTimestamp).toLocaleDateString()}</span>
                        </div>
                    ))}
                </div>
            </div>
            <audio src={alarmAudio} ref={audioRef} />
            <SetAlarmModal
                showModal={showModal}
                closeModal={closeModal}
                hourOptions={hourOptions}
                minuteOptions={minuteOtions}
                currentTime={currentTime}
                play={play}
                handleStop={handleStop}
                displayAlarm={displayAlarm}
                callAlarms={callAlarm}
            />
        </AlarmWrapper>
    );
};

export default Alarm;   