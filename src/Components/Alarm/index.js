import { useEffect, useRef, useState } from "react";
import { Button, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { AlarmWrapper } from "../style";
import { days, monthNames } from "../../Constant";
import SetAlarmModal from "./SetAlarmModal";
import defaultAlarm from "../../Assets/audios/alarm.mp3";
import { MdOutlineDeleteOutline, MdPauseCircleOutline, MdPlayCircleOutline } from "react-icons/md";
import { notifyUser } from "../../Utils/Notification";
import { audioData } from "../../Data/audioData";

const Alarm = () => {

    const [currentTime, setCurrrentTime] = useState('');
    const [day, setDay] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [hourOptions, setHourOptions] = useState();
    const [minuteOtions, setMinuteOptions] = useState();
    const [alarm, setAlarm] = useState([]);
    const [upcomingAlarms, setUpcomingAlarms] = useState([]);
    const [pastAlarms, setPastAlarms] = useState([]);
    const [currentAlarm, setCurrentAlarm] = useState();
    const [country, setCountry] = useState('India');
    const [alarmTitle, setAlarmTitle] = useState('');
    const [alarmNote, setAlarmNote] = useState('');
    const [flag, setFlag] = useState(false);
    const [alarmPause, setAlarmPause] = useState(false);
    const [alarmAudio, setAlarmAudio] = useState(defaultAlarm);
    const [snoozebutton, setSnoozeButton] = useState(false);
    const [isSnooze, setIsSnooze] = useState(false);
    const [snoozeTime, setSnoozeTime] = useState();
    const [volume, setVolume] = useState(50);
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
        setShowModal(false);
    };

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
    };

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
    };

    const handleClick = () => {
        getHours();
        getMinutes();
        setShowModal(true);
    };

    const handleStop = () => {
        pause();
        setFlag(!flag);
        setSnoozeButton(false);
        setIsSnooze(false)
    };

    const settingCountryName = (name) => {
        setCountry(name);
    };

    const DeleteAlarm = (value) => {
        let newList = JSON.parse(localStorage.getItem("Alarms")) || [];
        let delAlarm = newList.filter((time) => time.alarmTimestamp !== value.alarmTimestamp);
        clearTimeout(value.timeoutId);
        setFlag(!flag);
        localStorage.setItem('Alarms', JSON.stringify(delAlarm))
    };

    const setAlarmDetails = (value, name) => {
        if (name === 'title') {
            setAlarmTitle(value);
        } else {
            setAlarmNote(value);
        }
    };

    const settingSnooze = (value) => {
        setIsSnooze(value);
    };


    const storeAlarm = (alarm) => {
        const allAlarms = JSON.parse(localStorage.getItem('Alarms')) || [];
        const date = alarm.toDate();
        const alarmTimestamp = date.getTime();
        let newAlarms = allAlarms;

        const newAlarm = {
            timeoutId: '',
            alarmTimestamp: alarmTimestamp,
            isAlarmPause: false,
            isAlarmSnooze: isSnooze,
            title: alarmTitle,
            note: alarmNote,
            country: country,
            snoozeTime: isSnooze ? snoozeTime : ''
        };
        newAlarms.push(newAlarm);
        localStorage.setItem('Alarms', JSON.stringify(newAlarms));
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
        debugger
        if (nearestAlarm?.isAlarmSnooze) {
            setSnoozeButton(true)
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
                <Button variant="success" onClick={handleClick} style={{ marginRight: 10 }}>Set Alarm</Button>
                <Button variant="danger" onClick={handleStop}>Stop Alarm</Button>
                {snoozebutton &&
                    (<Button variant="success" onClick={SnoozeAlarm} style={{ marginLeft: 10 }}>Snooze Alarm</Button>)}

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
                                <th>Alarm Time</th>
                                <th>Date</th>
                                <th>Remaining Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {upcomingAlarms.map((item, index) => (
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
                pause={pause}
                handleStop={handleStop}
                displayAlarm={displayAlarm}
                callAlarms={callAlarm}
                callToAlarm={callToAlarm}
                storeAlarm={storeAlarm}
                setAlarmDetails={setAlarmDetails}
                settingCountryName={settingCountryName}
                audioData={audioData}
                settingAlarmAudio={settingAlarmAudio}
                setSnoozeTiming={setSnoozeTiming}
                settingSnooze={settingSnooze}
                setAlarmAudioTone={setAlarmAudioTone}
                settingVolume={settingVolume}
            />
        </AlarmWrapper >
    );
};

export default Alarm;   