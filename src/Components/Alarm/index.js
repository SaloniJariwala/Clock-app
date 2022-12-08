import { useEffect, useRef, useState } from "react";
import { Button, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { AlarmWrapper } from "../style";
import { days, monthNames } from "../../Constant";
import SetAlarmModal from "./SetAlarmModal";
import defaultAlarm from "../../Assets/audios/alarm.mp3";
import {
    MdOutlineDeleteOutline,
    MdPauseCircleOutline,
    MdPlayCircleOutline,
    MdZoomOutMap,
} from "react-icons/md";
import { notifyUser } from "../../Utils/Notification";
import RingAlarm from "./RingAlarm";

const Alarm = () => {

    const [currentTime, setCurrrentTime] = useState('');
    const [day, setDay] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [pastAlarms, setPastAlarms] = useState([]);
    const [upcomingAlarms, setUpcomingAlarms] = useState([]);
    const [currentAlarm, setCurrentAlarm] = useState();
    const [flag, setFlag] = useState(false);
    const [alarmPause, setAlarmPause] = useState(false);
    const [alarmAudio, setAlarmAudio] = useState(defaultAlarm);
    const [volume, setVolume] = useState(50);
    const [showRingModal, setShowRingModal] = useState(false);
    const audioRef = useRef();

    useEffect(() => {
        setInterval(() => {
            const date = new Date();
            const time = date.toLocaleTimeString();
            const dayStr = `${days[date.getDay()].toUpperCase()} - ${monthNames[date.getMonth()].toUpperCase()} ${date.getDate()}. ${date.getFullYear()}`;
            setCurrrentTime(time);
            setDay(dayStr);
        }, 1000);
    }, []);

    const settingAlarmAudio = (value, name) => {
        if (name === 'local') {
            setAlarmAudio(value);
        } else {
            const url = URL.createObjectURL(value);
            setAlarmAudio(url);
        }
    };

    const play = () => {
        audioRef.current.play();
        audioRef.current.volume = volume / 100;
        audioRef.current.loop = true;
    };

    const getAlarms = () => {
        setFlag(!flag);
    };

    const pause = () => {
        audioRef.current.pause();
        setFlag(!flag);
    };

    const settingVolume = (value) => {
        setVolume(value);
    };

    useEffect(() => {
        audioRef.current.volume = volume / 100;
    }, [volume]);

    const closeModal = () => {
        setShowModal(false);
    };

    const closeRingModal = () => {
        pause();
        setShowRingModal(false);
    }

    const handleStop = () => {
        pause();
        setFlag(!flag);
        setShowRingModal(false);
    };

    const DeleteAlarm = (value) => {
        let newList = JSON.parse(localStorage.getItem("Alarms")) || [];
        let delAlarm = newList.filter(
            (time) => time.alarmTimestamp !== value.alarmTimestamp
        );
        clearTimeout(value.timeoutId);
        setFlag(!flag);
        localStorage.setItem('Alarms', JSON.stringify(delAlarm))
    };

    const storeAlarm = (alarmDetails) => {
        const allAlarms = JSON.parse(localStorage.getItem('Alarms')) || [];
        let newAlarm = {
            timeoutId: '',
            alarmTimestamp: alarmDetails?.alarmDate?.getTime(),
            isAlarmPause: false,
            title: alarmDetails?.alarmTitle,
            note: alarmDetails?.alarmNote,
            country: alarmDetails?.country,
            alarmTune: alarmAudio,
            alarmVolume: alarmDetails?.alarmVolume
        };
        const isSnooze = 'snoozeTime' in alarmDetails;
        if (isSnooze) {
            newAlarm = { ...newAlarm, snoozeTime: alarmDetails?.snoozeTime };
        };
        const isRepeatAlarm = 'alarmRepeat' in alarmDetails;
        if (isRepeatAlarm) {
            newAlarm = { ...newAlarm, alarmRepeat: alarmDetails?.alarmRepeat };
        }
        allAlarms.push(newAlarm);
        localStorage.setItem('Alarms', JSON.stringify(allAlarms));
        closeModal();
        setFlag(!flag);
    };

    const callToAlarm = () => {
        const allAlarms = JSON.parse(localStorage.getItem('Alarms')) || [];
        const currentTimestamp = Date.now();
        let newList = allAlarms.filter((item) => item.alarmTimestamp > currentTimestamp && !item.isAlarmPause);
        let nearestAlarm;
        if (newList.length > 1) {
            for (let i = 0; i < newList.length; i++) {
                for (let j = 0; j <= i; j++) {
                    if (newList[j].alarmTimestamp >= newList[i].alarmTimestamp) {
                        nearestAlarm = newList[j];
                    }
                }
            }
        } else {
            nearestAlarm = newList[0];
        }
        const currTimestamp = Date.now();
        let diff;
        diff = nearestAlarm?.alarmTimestamp - currTimestamp;
        if (diff >= 0) {
            const id = setTimeout(() => {
                setAlarmAudio(nearestAlarm?.alarmTune);
                // setVolume(nearestAlarm?.alarmVolume);
                notifyUser(nearestAlarm.title, nearestAlarm.note);
                play();
                setFlag(!flag);
                setCurrentAlarm(nearestAlarm);
                setShowRingModal(true);
                if (nearestAlarm.alarmRepeat === "never") {
                    const newStamp = nearestAlarm.alarmTimestamp;
                    const getallAlrams = JSON.parse(localStorage.getItem("Alarms"));
                    getallAlrams.forEach((item) => {
                        if (item.alarmTimestamp === nearestAlarm.alarmTimestamp) {
                            item.alarmTimestamp = newStamp;
                        }
                    });
                    localStorage.setItem("Alarms", JSON.stringify(getallAlrams));
                    setFlag(!flag);
                    getAlarms();
                } else if (nearestAlarm.alarmRepeat === "daily") {
                    const dailyTimeStamp = nearestAlarm.alarmTimestamp + 86400000;
                    const getallAlrams = JSON.parse(localStorage.getItem("Alarms"));
                    getallAlrams.forEach((item) => {
                        if (item.alarmTimestamp === nearestAlarm.alarmTimestamp) {
                            item.alarmTimestamp = dailyTimeStamp;
                        }
                    });
                    localStorage.setItem("Alarms", JSON.stringify(getallAlrams));
                    setFlag(!flag);
                } else if (nearestAlarm.alarmRepeat === "weekdays") {

                    const weekDaysStamp = nearestAlarm.alarmTimestamp + 86400000;
                    const getallAlrams = JSON.parse(localStorage.getItem("Alarms"));
                    const day = new Date(nearestAlarm.alarmTimestamp).toLocaleString(
                        'default', { weekday: 'short' }
                    );
                    if (day === 'Mon' || day === 'Tue' || day === 'Wed' || day === 'Thu' || day === 'Fri'
                    ) {
                        getallAlrams.forEach((item) => {
                            if (item.alarmTimestamp === nearestAlarm.alarmTimestamp) {
                                item.alarmTimestamp = weekDaysStamp;
                            }
                        });
                    }
                    localStorage.setItem("Alarms", JSON.stringify(getallAlrams));
                    setFlag(!flag);
                }
                else if (nearestAlarm.alarmRepeat === "weekends") {
                    const weekendStamp = nearestAlarm.alarmTimestamp + 86400000;
                    const getallAlrams = JSON.parse(localStorage.getItem("Alarms"));
                    const day = new Date(nearestAlarm.alarmTimestamp).toLocaleString(
                        'default', { weekday: 'short' }
                    );
                    if (day === "Sat" || day === "Sun") {
                        getallAlrams.forEach((item) => {
                            if (item.alarmTimestamp === nearestAlarm.alarmTimestamp) {
                                item.alarmTimestamp = weekendStamp;
                            }
                        });
                    }
                    localStorage.setItem("Alarms", JSON.stringify(getallAlrams));
                    setFlag(!flag);
                }
            }, diff);
            const allAlarms = JSON.parse(localStorage.getItem('Alarms'));
            allAlarms.forEach((item) => {
                if (item.alarmTimestamp === nearestAlarm.alarmTimestamp) {
                    item.timeoutId = id;
                }
            });
            localStorage.setItem('Alarms', JSON.stringify(allAlarms));
            setFlag(!flag);
        }
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
    };

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
            setFlag(!flag);
        } else {
            setAlarmPause(false);
            const diff = value.alarmTimestamp - Date.now();
            if (diff >= 0) {
                const id = setTimeout(() => {
                    notifyUser(value.title, value.note);
                    play();
                    setFlag(!flag);
                }, diff);
                const allAlarms = JSON.parse(localStorage.getItem('Alarms'));
                allAlarms.forEach((item) => {
                    if (item.alarmTimestamp === value.alarmTimestamp) {
                        item.timeoutId = id;
                        item.isAlarmPause = false;
                    }
                });
                localStorage.setItem('Alarms', JSON.stringify(allAlarms));
            }
            setFlag(!flag);
        }
    };

    const countRemaining = (alarmTime) => {
        const current = Date.now();
        const remaining = alarmTime - current;

        let seconds = Math.floor(remaining / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        seconds = seconds % 60;
        minutes = minutes % 60;
        hours = hours % 24;

        const str = `${hours > 0 ? (hours < 10 ? `0${hours}:` : `${hours}:`) : "00:"}` +
            `${minutes > 0 ? (minutes < 10 ? `0${minutes}:` : `${minutes}:`) : "00:"}` +
            `${seconds > 0 ? (seconds < 10 ? `0${seconds}` : `${seconds}`) : "00"}`;

        return str;
    };

    return (
        <AlarmWrapper>
            {currentTime ? (
                <>
                    <h1 className="display">{currentTime}</h1>
                    <p className="day">{day}</p>
                </>
            ) : <h1 className="display">00:00:00</h1>}
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button variant="success" onClick={() => setShowModal(true)} style={{ marginRight: 10 }}>Set Alarm</Button>
            </div>
            <div className="container-fluid d-flex justify-content-evenly">
                <div className="w-50 m-5 text-center">
                    <h3 className="text-decoration-underline">Past Alarm</h3>
                    <Table striped bordered hover className="mt-4">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Alarm Time</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pastAlarms?.map((item, index) => (
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
                                <th>Alarm Time</th>
                                <th>Date</th>
                                <th>Remaining Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {upcomingAlarms?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.title}</td>
                                    <td>{getTime(item.alarmTimestamp)}</td>
                                    <td>{new Date(item.alarmTimestamp).toLocaleDateString()}</td>
                                    <td>{countRemaining(item.alarmTimestamp)}</td>
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

                                        <OverlayTrigger
                                            placement={'top'}
                                            overlay={
                                                <Tooltip id={`tooltip-${index}`}>
                                                    View
                                                </Tooltip>
                                            }
                                        >
                                            <Button
                                                className="btn-sm"
                                                variant="outline-info"
                                                style={{ marginLeft: 10 }}
                                            >
                                                <MdZoomOutMap />
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
                play={play}
                pause={pause}
                getAlarms={getAlarms}
                callToAlarm={callToAlarm}
                storeAlarm={storeAlarm}
                settingAlarmAudio={settingAlarmAudio}
                settingVolume={settingVolume}
            />
            <RingAlarm
                closeRingModal={closeRingModal}
                currentAlarm={currentAlarm}
                showRingModal={showRingModal}
                handleStop={handleStop}
                callToAlarm={callToAlarm}
                getTime={getTime}
            />
        </AlarmWrapper >
    );
};

export default Alarm;   