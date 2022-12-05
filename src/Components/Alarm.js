import { useEffect, useRef, useState } from "react";
import { Button, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { AlarmWrapper } from "./style";
import { days, monthNames } from "../Constant";
import SetAlarmModal from "./SetAlarmModal";
import alarmAudio from "../Assets/audios/alarm.mp3";
import { MdOutlineDeleteOutline, MdPauseCircleOutline, MdPlayCircleOutline } from "react-icons/md";
import { notifyUser } from "../Utils/Notification";

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
    const [alarmPause, setAlarmPause] = useState(false);
    const audioRef = useRef();

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
        for (let i = 0; i <= 23; i++) {
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
        callAlarm();
    }

    const DeleteAlarm = (value) => {
        let newList = JSON.parse(localStorage.getItem("Alarms")) || [];
        let delAlarm = newList.filter((time) => time.alarmTimestamp !== value.alarmTimestamp)
        clearTimeout(value.timeoutId)
        callAlarm();
        localStorage.setItem('Alarms', JSON.stringify(delAlarm))
    };



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

    const setPauseAlarm = (value) => {
        if (!alarmPause) {
            setAlarmPause(true);
            clearTimeout(value.timeoutId);
            const allAlarms = JSON.parse(localStorage.getItem('Alarms'));
            allAlarms.forEach((item) => {
                if (item.alarmTimestamp === value.alarmTimestamp) {
                    item.isAlarmPause = true;
                }
            });
            localStorage.setItem('Alarms', JSON.stringify(allAlarms));
            callAlarm()

        } else {
            setAlarmPause(false);
            const diff = value.alarmTimestamp - Date.now()
            if (diff >= 0) {
                const id = setTimeout(() => {
                    notifyUser(value.title, value.note);
                    play();
                    callAlarm();
                }, diff);
                const allAlarms = JSON.parse(localStorage.getItem('Alarms'));
                allAlarms.forEach((item) => {
                    if (item.alarmTimestamp === value.alarmTimestamp) {
                        item.timeoutId = id;
                        item.isAlarmPause = false
                    }
                });
                localStorage.setItem('Alarms', JSON.stringify(allAlarms));
            }

            callAlarm()

        }


    }


    const SnoozeAlarm = (value) => {
        const getAlarm = JSON.parse(localStorage.getItem('Alarms')) || [];
        console.log(getAlarm);
        getAlarm.forEach((item) => {
            const Snoozetime = new Date(item.alarmTimestamp)
            console.log(Snoozetime);

        })
    }

    return (
        <AlarmWrapper>
            <h1 className="display">{currentTime}</h1>
            <p className="day">{day}</p>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button variant="success" onClick={handleClick} style={{ marginRight: 10 }}>Set Alarm</Button>
                <Button variant="danger" onClick={handleStop}>Stop Alarm</Button>
                <Button variant="success" onClick={SnoozeAlarm} style={{ marginLeft: 10 }}>Snooze Alarm</Button>
            </div>
            <div className="container-fluid d-flex justify-content-evenly">
                <div className="w-50 m-5 text-center">
                    <h3 className="text-decoration-underline">Past Alarm</h3>
                    <Table striped bordered hover className="mt-4">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Time</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pastAlarms.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.title}</td>
                                    <td>{getTime(item.alarmTimestamp)}</td>
                                    <td>{new Date(item.alarmTimestamp).toLocaleDateString()}</td>
                                    <td>
                                        <OverlayTrigger
                                            placement={'top'}
                                            overlay={
                                                <Tooltip id={`tooltip-${index}`}>
                                                    Delete
                                                </Tooltip>
                                            }
                                        >
                                            <Button
                                                className="btn-sm"
                                                variant="outline-danger"
                                                style={{ marginLeft: 10 }}
                                                onClick={() => DeleteAlarm(item)}
                                            >
                                                <MdOutlineDeleteOutline />
                                            </Button>
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div className="w-50 m-5 text-center">
                    <h3 className="text-decoration-underline">Upcoming Alarm</h3>
                    <Table striped bordered hover className="mt-4">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Time</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {upcomingAlarms.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.title}</td>
                                    <td>{getTime(item.alarmTimestamp)}</td>
                                    <td>{new Date(item.alarmTimestamp).toLocaleDateString()}</td>
                                    <td>
                                        <OverlayTrigger
                                            placement={'top'}
                                            overlay={
                                                <Tooltip id={`tooltip-${index}`}>
                                                    {!item.isAlarmPause ? 'Pause' : 'Play'}
                                                </Tooltip>
                                            }
                                        >
                                            <Button
                                                className="btn-sm"
                                                variant="outline-primary"
                                                style={{ marginLeft: 10 }}
                                                onClick={() => setPauseAlarm(item)}
                                            >
                                                {!item.isAlarmPause ? <MdPauseCircleOutline /> : <MdPlayCircleOutline />}
                                            </Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement={'top'}
                                            overlay={
                                                <Tooltip id={`tooltip-${index}`}>
                                                    Delete
                                                </Tooltip>
                                            }
                                        >
                                            <Button
                                                className="btn-sm"
                                                variant="outline-danger"
                                                style={{ marginLeft: 10 }}
                                                onClick={() => DeleteAlarm(item)}
                                            >
                                                <MdOutlineDeleteOutline />
                                            </Button>
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
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
        </AlarmWrapper >
    );
};

export default Alarm;   