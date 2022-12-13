import { useEffect, useRef, useState } from "react";
import { Button, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { Button as AntButton } from "antd";
import { AlarmWrapper } from "../style";
import { days, monthNames } from "../../Constant";
import SetAlarmModal from "./SetAlarmModal";
import defaultAlarm from "../../Assets/audios/alarm.mp3";
import {
    MdOutlineDeleteOutline,
    MdPauseCircleOutline,
    MdPlayCircleOutline,
    MdSnooze,
} from "react-icons/md";
import { notifyUser } from "../../Utils/Notification";
import RingAlarm from "./RingAlarm";
import { specificTimeData } from "../../Data/specificTimeData";
import { useTranslation } from "react-i18next";
import { CSVLink } from "react-csv";
import { BiExport } from "react-icons/bi";

const Alarm = () => {
    const [currentTime, setCurrrentTime] = useState("");
    const [day, setDay] = useState("");
    const [alarmData, setAlarmData] = useState([]);
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
    const { t } = useTranslation();
    document.title = t('alarm_clock')

    const updateTime = () => {
        const date = new Date();
        const time = date.toLocaleTimeString();
        const dayStr = `${days[date.getDay()].toUpperCase()} - ${monthNames[
            date.getMonth()
        ].toUpperCase()} ${date.getDate()}. ${date.getFullYear()}`;
        setCurrrentTime(time);
        setDay(dayStr);
    };

    useEffect(() => {
        updateTime();
        setInterval(updateTime, 1000);
    }, []);

    const settingAlarmAudio = (value, name) => {
        if (name === "local") {
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
    };

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
        localStorage.setItem("Alarms", JSON.stringify(delAlarm));
    };

    const storeAlarm = (alarmDetails, type) => {
        let newAlarm;
        const allAlarms = JSON.parse(localStorage.getItem("Alarms")) || [];
        if (type !== 'specific') {
            newAlarm = {
                timeoutId: "",
                alarmTimestamp: alarmDetails?.alarmDate?.getTime(),
                orgTimestamp: alarmDetails?.alarmDate?.getTime(),
                isAlarmPause: false,
                alarmRepeat: 'never',
                title: alarmDetails?.alarmTitle,
                note: alarmDetails?.alarmNote,
                country: alarmDetails?.country,
                alarmTune: alarmAudio,
                alarmVolume: alarmDetails?.alarmVolume,
            };
            const isSnooze = "snoozeTime" in alarmDetails;
            if (isSnooze) {
                newAlarm = { ...newAlarm, snoozeTime: alarmDetails?.snoozeTime };
            }
            const isRepeatAlarm = "alarmRepeat" in alarmDetails;
            if (isRepeatAlarm) {
                newAlarm = { ...newAlarm, alarmRepeat: alarmDetails?.alarmRepeat };
            }
        } else {
            newAlarm = alarmDetails;
        }
        allAlarms.push(newAlarm);
        localStorage.setItem('Alarms', JSON.stringify(allAlarms));
        closeModal();
        setFlag(!flag);
    };

    const callToAlarm = () => {
        const allAlarms = JSON.parse(localStorage.getItem("Alarms")) || [];
        const currentTimestamp = Date.now();
        let newList = allAlarms.filter(
            (item) => item.alarmTimestamp > currentTimestamp && !item.isAlarmPause
        );
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
                setVolume(nearestAlarm?.alarmVolume);
                notifyUser(nearestAlarm.title, nearestAlarm.note);
                play();
                setFlag(!flag);
                setCurrentAlarm(nearestAlarm);
                setShowRingModal(true);
            }, diff);
            const allAlarms = JSON.parse(localStorage.getItem("Alarms"));
            allAlarms.forEach((item) => {
                if (item.alarmTimestamp === nearestAlarm.alarmTimestamp) {
                    item.timeoutId = id;
                }
            });
            localStorage.setItem("Alarms", JSON.stringify(allAlarms));
            setFlag(!flag);
        }
    };

    useEffect(() => {
        const allAlarms = JSON.parse(localStorage.getItem('Alarms')) || [];
        setAlarmData(allAlarms);
        const upcomingAlarm = allAlarms.filter((item) => item.alarmTimestamp > Date.now());
        setUpcomingAlarms(upcomingAlarm);
        const pastAlarm = allAlarms.filter(
            (item) => item.alarmTimestamp < Date.now()
        );
        setPastAlarms(pastAlarm);
    }, [flag]);

    const getTime = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    };

    const setPauseAlarm = (value) => {
        if (!alarmPause) {
            setAlarmPause(true);
            clearTimeout(value.timeoutId);
            const allAlarms = JSON.parse(localStorage.getItem("Alarms"));
            allAlarms.forEach((item) => {
                if (item.alarmTimestamp === value.alarmTimestamp) {
                    item.isAlarmPause = true;
                }
            });
            localStorage.setItem("Alarms", JSON.stringify(allAlarms));
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
                const allAlarms = JSON.parse(localStorage.getItem("Alarms"));
                allAlarms.forEach((item) => {
                    if (item.alarmTimestamp === value.alarmTimestamp) {
                        item.timeoutId = id;
                        item.isAlarmPause = false;
                    }
                });
                localStorage.setItem("Alarms", JSON.stringify(allAlarms));
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

        const str =
            `${hours > 0 ? (hours < 10 ? `0${hours}:` : `${hours}:`) : "00:"}` +
            `${minutes > 0 ? (minutes < 10 ? `0${minutes}:` : `${minutes}:`) : "00:"
            }` +
            `${seconds > 0 ? (seconds < 10 ? `0${seconds}` : `${seconds}`) : "00"}`;

        return str;
    };

    const handleSpecificTime = (time) => {
        if (time < Date.now()) {
            time = time + 86400000;
        }
        const alarmTime = new Date(time);
        console.log(
            `Alarm Set for ${alarmTime.getHours()}:${alarmTime.getMinutes()}:${alarmTime.getSeconds()}`
        );
        const payload = {
            timeoutId: "",
            alarmTimestamp: time,
            isAlarmPause: false,
            title: `${alarmTime.getHours()}:${alarmTime.getMinutes()}`,
            note: `Alarm set for ${alarmTime.getHours()}:${alarmTime.getMinutes()}`,
            isSpecificTime: true
        };
        storeAlarm(payload, 'specific');
        callToAlarm();
    };

    return (
        <AlarmWrapper>
            {currentTime ? (
                <>
                    <h1 className="display">{currentTime}</h1>
                    <p className="day">{day}</p>
                </>
            ) : (
                <h1 className="display">00:00:00</h1>
            )}
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button
                    variant="success"
                    onClick={() => setShowModal(true)}
                    style={{ marginRight: 10 }}
                >
                    {" "}
                    {t("set_alarm")}
                </Button>
            </div>
            <div className="container-fluid d-flex justify-content-evenly">
                <div className="w-50 m-5 text-center">
                    <h3 className="text-decoration-underline"> {t("past_alarm")}</h3>
                    <Table striped bordered hover className="mt-4">
                        <thead>
                            <tr>
                                <th>{t('title')}</th>
                                <th>{t('alarm_time')}</th>
                                <th>{t('date')}</th>
                                <th>{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pastAlarms?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.title}</td>
                                    <td>{item.orgTimestamp ? getTime(item.orgTimestamp) : getTime(item.alarmTimestamp)}</td>
                                    <td>{new Date(item.alarmTimestamp).toLocaleDateString()}</td>
                                    <td>
                                        <OverlayTrigger
                                            placement={"top"}
                                            overlay={
                                                <Tooltip id={`tooltip-${index}`}>{t('delete')}</Tooltip>
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
                    <h3 className="text-decoration-underline">{t('upcoming_alarm')}</h3>
                    <Table striped bordered hover className="mt-4">
                        <thead>
                            <tr>
                                <th>{t('title')}</th>
                                <th>{t('alarm_time')}</th>
                                <th>{t('date')}</th>
                                <th>{t('remaining_time')}</th>
                                <th>{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {upcomingAlarms?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.title}</td>
                                    <td>
                                        <span>{item.orgTimestamp ? getTime(item.orgTimestamp) : getTime(item.alarmTimestamp)}</span>
                                        <span style={{ marginLeft: "10px" }}>
                                            {item.orgTimestamp !== item.alarmTimestamp && !item.isSpecificTime && (
                                                <MdSnooze fill="red" />
                                            )}
                                        </span>
                                    </td>
                                    <td>{new Date(item.alarmTimestamp).toLocaleDateString()}</td>
                                    <td>{countRemaining(item.alarmTimestamp)}</td>
                                    <td>
                                        <OverlayTrigger
                                            placement={"top"}
                                            overlay={
                                                <Tooltip id={`tooltip-${index}`}>
                                                    {!item.isAlarmPause ? t('pause') : t('play')}
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
                                                <Tooltip id={`tooltip-${index}`}>{t('delete')}</Tooltip>
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
            <div style={{ margin: '0 0 30px 0', width: '130px' }}>
                <CSVLink data={alarmData} style={{ width: '100%', textDecoration: 'none' }}>
                    <Button variant="outline-secondary" className="d-flex align-items-center justify-content-around w-100">
                        <BiExport />
                        {t(`export_csv`)}
                    </Button>
                </CSVLink>
            </div>
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    {specificTimeData.map((item, index) => (
                        <AntButton
                            type="primary"
                            key={index}
                            onClick={() => handleSpecificTime(item.value)}
                            style={{ margin: "10px" }}
                        >
                            {item.title}
                        </AntButton>
                    ))}
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
                getAlarms={getAlarms}
            />
        </AlarmWrapper>
    );
};

export default Alarm;   