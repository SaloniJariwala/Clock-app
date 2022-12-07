import { useEffect, useRef, useState } from "react";
import { Button, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { AlarmWrapper } from "../style";
import { days, monthNames } from "../../Constant";
import SetAlarmModal from "./SetAlarmModal";
import defaultAlarm from "../../Assets/audios/alarm.mp3";
import { MdOutlineDeleteOutline, MdPauseCircleOutline, MdPlayCircleOutline, MdZoomOutMap, MdOutlineZoomOutMap } from "react-icons/md";
import { notifyUser } from "../../Utils/Notification";
import { audioData } from "../../Data/audioData";
import RingAlarm from "./RingAlarm";
import { useDispatch, useSelector } from "react-redux";
import { setModalClose, setShowModal } from "../../Redux/Actions/SetAlarmModalActions";

const Alarm = () => {

    const dispatch = useDispatch();
    const { alarmDetails } = useSelector((state) => state.setAlarmModalReducer);

    const [day, setDay] = useState('');
    const [currentTime, setCurrrentTime] = useState('');
    const [upcomingAlarms, setUpcomingAlarms] = useState([]);
    const [pastAlarms, setPastAlarms] = useState([]);
    const [currentAlarm, setCurrentAlarm] = useState();
    const [flag, setFlag] = useState(false);
    const [alarmPause, setAlarmPause] = useState(false);
    const [alarmAudio, setAlarmAudio] = useState();
    const [snoozeTime, setSnoozeTime] = useState();
    const [volume, setVolume] = useState(50);
    const [snonzeModal, setSnoozeModal] = useState(false);
    const [showSnooze, setShowSnooze] = useState(false);
    const [allAlarmDetails, setAllAlarmDetails] = useState({});
    const audioRef = useRef();

    const settingAlarmAudio = (value, name) => {
        if (name === 'local') {
            setAlarmAudio(value);
        } else {
            const url = URL.createObjectURL(value);
            setAlarmAudio(url);
        }
    };

    const setAlarmAudioTone = (value) => {
        setAlarmAudio(value);
    };

    const play = () => {
        audioRef.current.play();
        audioRef.current.volume = volume / 100;
        audioRef.current.loop = true;
    };

    const callAlarm = () => {
        setFlag(!flag);
    };

    const pause = () => {
        audioRef.current.pause();
    };

    const settingVolume = (value) => {
        setVolume(value);
    };

    useEffect(() => {
        audioRef.current.volume = volume / 100;
    }, [volume]);

    const closeModal = () => {
        dispatch(setModalClose());
    };

    const closeRingModal = () => {
        setSnoozeModal(false);
    }

    const updateTime = () => {
        const date = new Date();
        const time = date.toLocaleTimeString();
        const dayStr = `${days[date.getDay()].toUpperCase()} - ${monthNames[date.getMonth()].toUpperCase()} ${date.getDate()}. ${date.getFullYear()}`;
        setCurrrentTime(time);
        setDay(dayStr);
    };

    setInterval(updateTime, 1000);

    const handleStop = () => {
        pause();
        setFlag(!flag);
        setSnoozeModal(false);
    };

    const DeleteAlarm = (value) => {
        let newList = JSON.parse(localStorage.getItem("Alarms")) || [];
        let delAlarm = newList.filter((time) => time.alarmTimestamp !== value.alarmTimestamp);
        clearTimeout(value.timeoutId);
        setFlag(!flag);
        localStorage.setItem('Alarms', JSON.stringify(delAlarm))
    };

    const storeAlarm = () => {
        debugger
        const allAlarms = JSON.parse(localStorage.getItem('Alarms')) || [];
        debugger
        let newAlarm = {
            timeoutId: '',
            alarmTimestamp: alarmDetails?.alarmDate?.getTime(),
            isAlarmPause: false,
            title: alarmDetails?.alarmTitle,
            note: alarmDetails?.alarmNote,
            country: alarmDetails?.country,
            alarmTune: alarmDetails?.alarmTune,
            alarmVolume: alarmDetails?.alarmVolume
        };
        const isSnooze = 'snoozeTime' in alarmDetails;
        if (isSnooze) {
            newAlarm = { ...newAlarm, snoozeTime: alarmDetails?.snoozeTime };
        };
        debugger
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
        setCurrentAlarm(nearestAlarm);
        const currTimestamp = Date.now();
        let diff;
        diff = nearestAlarm?.alarmTimestamp - currTimestamp;
        if (diff >= 0) {
            const id = setTimeout(() => {
                notifyUser(nearestAlarm.title, nearestAlarm.note);
                play();
                setFlag(!flag);
                const allAlarms = JSON.parse(localStorage.getItem('Alarms'));
                const filterSnoozeData = allAlarms.filter((item) => item.timeoutId === id)
                if (filterSnoozeData) {
                    setShowSnooze(true);
                }
                setSnoozeModal(true);
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

    const SnoozeAlarm = () => {
        pause();
        const newStamp = currentAlarm.alarmTimestamp + snoozeTime;
        const allAlrams = JSON.parse(localStorage.getItem('Alarms'));
        allAlrams.forEach((item) => {
            if (item.alarmTimestamp === currentAlarm.alarmTimestamp) {
                item.alarmTimestamp = newStamp;
            }
        });
        localStorage.setItem('Alarms', JSON.stringify(allAlrams));
        callToAlarm();
        setFlag(!flag);
        setSnoozeModal(false);
    };

    const setSnoozeTiming = (value) => {
        setSnoozeTime(value);
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
    }

    return (
        <AlarmWrapper>
            <h1 className="display">{currentTime}</h1>
            <p className="day">{day}</p>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button variant="success" onClick={() => dispatch(setShowModal())} style={{ marginRight: 10 }}>Set Alarm</Button>
            </div>

            <RingAlarm
                closeRingModal={closeRingModal}
                snonzeModal={snonzeModal}
                handleStop={handleStop}
                SnoozeAlarm={SnoozeAlarm}
                currentAlarm={currentAlarm}
                showSnooze={showSnooze}
                getTime={getTime}
            />
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {upcomingAlarms?.map((item, index) => (
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
                closeModal={closeModal}
                play={play}
                pause={pause}
                handleStop={handleStop}
                callAlarms={callAlarm}
                callToAlarm={callToAlarm}
                storeAlarm={storeAlarm}
                audioData={audioData}
                settingAlarmAudio={settingAlarmAudio}
                setSnoozeTiming={setSnoozeTiming}
                setAlarmAudioTone={setAlarmAudioTone}
                settingVolume={settingVolume}
                setSnoozeModal={setSnoozeModal}
                snonzeModal={snonzeModal}
                SnoozeAlarm={SnoozeAlarm}
                currentAlarm={currentAlarm}
            />
        </AlarmWrapper >
    );
};

export default Alarm;   