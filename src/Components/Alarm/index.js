import { useEffect, useRef, useState } from "react";
import { Button, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Button as AntButton } from "antd";
import { useTranslation } from "react-i18next";
import { CSVLink } from "react-csv";
import { BiExport } from "react-icons/bi";
import { useForm } from "react-hook-form";
import {
    MdEdit,
    MdOutlineDeleteOutline,
    MdPauseCircleOutline,
    MdPlayCircleOutline,
    MdSnooze,
} from "react-icons/md";
import { AlarmWrapper } from "../style";
import SetAlarmModal from "./SetAlarmModal";
import defaultAlarm from "../../Assets/audios/alarm.mp3";
import { notifyUser } from "../../Utils/Notification";
import RingAlarm from "./RingAlarm";
import { specificTimeData } from "../../Data/specificTimeData";
import timezoneData from "../../Data/timezones.json";
import { countryData } from "../../Data/countryData";
import Clock from "../Clock";

const Alarm = () => {
    const methods = useForm();
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [pastAlarms, setPastAlarms] = useState([]);
    const [upcomingAlarms, setUpcomingAlarms] = useState([]);
    const [currentAlarm, setCurrentAlarm] = useState();
    const [flag, setFlag] = useState(false);
    const [alarmPause, setAlarmPause] = useState(false);
    const [alarmAudio, setAlarmAudio] = useState(defaultAlarm);
    const [volume, setVolume] = useState(50);
    const [showRingModal, setShowRingModal] = useState(false);
    const [selectedAlarm, setSelectedAlarm] = useState();
    const [csvData, setCsvData] = useState([]);
    const [currentTime, setCurrrentTime] = useState();
    const [isInterval, setIsInterval] = useState(true);
    const audioRef = useRef();
    const { t } = useTranslation();
    document.title = t("alarm_clock");

    const allAlarms = JSON.parse(localStorage.getItem("Alarms")) || [];
    const play = () => {
        audioRef.current?.play();
        // audioRef.current.volume = parseFloat(volume / 100);
        audioRef.current.loop = true;
    };

    const getAlarms = () => {
        setFlag(!flag);
    };

    const pause = () => {
        audioRef.current?.pause();
        setFlag(!flag);
    };

    useEffect(() => {
        // audioRef.current.volume = parseFloat(volume / 100);
    }, [volume]);

    const closeModal = () => {
        setShowModal(false);
        resetForm();
        if (isEdit) {
            setIsEdit(false);
        }
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

    const resetForm = () => {
        methods.setValue("country", "India");
        methods.setValue("hour", "0");
        methods.setValue("minute", "0");
        methods.setValue("second", "0");
        methods.setValue("sound", "selected");
        methods.setValue("volume", 50);
        methods.setValue("alarmTitle", "");
        methods.setValue("alarmNote", "");
        methods.setValue("isSnooze", false);
        methods.setValue("snoozeTime", 300000);
        methods.setValue("repeat", "never");
        methods.setValue("isRepeat", false);
    };

    const handleEdit = (alarmId) => {
        setIsEdit(true);
        const allAlarms = JSON.parse(localStorage.getItem("Alarms")) || [];
        const oldAlarm = allAlarms.filter((item) => item.alarmId === alarmId);
        const format = localStorage.getItem("format");
        setSelectedAlarm(oldAlarm[0]);
        methods.setValue("country", JSON.stringify(oldAlarm[0].country));
        if (format === "12") {
            methods.setValue(
                "hour",
                new Date(oldAlarm[0].orgTimestamp).getHours().toString() - 12
            );
        } else {
            methods.setValue(
                "hour",
                new Date(oldAlarm[0].orgTimestamp).getHours().toString()
            );
        }
        methods.setValue(
            "minute",
            new Date(oldAlarm[0].orgTimestamp).getMinutes().toString()
        );
        methods.setValue(
            "second",
            new Date(oldAlarm[0].orgTimestamp).getSeconds().toString()
        );
        methods.setValue(
            "ampm",
            new Date(oldAlarm[0].orgTimestamp).getHours() > 12 ? "PM" : "AM"
        );
        methods.setValue("sound", oldAlarm[0].alarmTune);
        methods.setValue("volume", oldAlarm[0].alarmVolume);
        methods.setValue("alarmTitle", oldAlarm[0].title);
        methods.setValue("alarmNote", oldAlarm[0].note);
        methods.setValue("repeat", oldAlarm[0].alarmRepeat);
        if (oldAlarm[0].snoozeTime) {
            methods.setValue("isSnooze", true);
            methods.setValue("snoozeTime", oldAlarm[0].snoozeTime);
        } else {
            methods.setValue("isSnooze", false);
        }
        if (oldAlarm[0].alarmRepeat) {
            methods.setValue("isRepeat", true);
            methods.setValue("repeat", oldAlarm[0].alarmRepeat);
        } else {
            methods.setValue("isRepeat", false);
        }
        setShowModal(true);
    };

    const DeleteAlarm = (alarmId, timeoutId) => {
        let newList = JSON.parse(localStorage.getItem("Alarms")) || [];
        let delAlarm = newList.filter((item) => item.alarmId !== alarmId);
        clearTimeout(timeoutId);
        setFlag(!flag);
        localStorage.setItem("Alarms", JSON.stringify(delAlarm));
    };

    const handleEditAlarm = (alarmDetails) => {
        const allAlarms = JSON.parse(localStorage.getItem("Alarms")) || [];
        const newAlarms = allAlarms.filter(
            (item) => item.alarmId !== selectedAlarm?.alarmId
        );
        let editedAlarm = {
            alarmId: selectedAlarm?.alarmId,
            timeoutId: selectedAlarm?.timeoutId,
            alarmTimestamp: alarmDetails?.alarmDate?.getTime(),
            orgTimestamp: alarmDetails?.alarmDate?.getTime(),
            isAlarmPause: false,
            alarmRepeat: alarmDetails?.alarmRepeat,
            title: alarmDetails?.alarmTitle,
            note: alarmDetails?.alarmNote,
            country: alarmDetails?.country,
            alarmTune: alarmDetails?.alarmTune,
            alarmVolume: alarmDetails?.alarmVolume,
        };
        const isSnooze = "snoozeTime" in alarmDetails;
        if (isSnooze) {
            editedAlarm = { ...editedAlarm, snoozeTime: alarmDetails?.snoozeTime };
        }
        const isRepeatAlarm = "alarmRepeat" in alarmDetails;
        if (isRepeatAlarm) {
            editedAlarm = { ...editedAlarm, alarmRepeat: alarmDetails?.alarmRepeat };
        }
        newAlarms.push(editedAlarm);
        localStorage.setItem("Alarms", JSON.stringify(newAlarms));
        closeModal();
        setFlag(!flag);
        setIsEdit(false);
    };

    const storeAlarm = (alarmDetails, type = "") => {
        let newAlarm;
        const allAlarms = JSON.parse(localStorage.getItem("Alarms")) || [];
        if (type !== "specific") {
            newAlarm = {
                alarmId: uuidv4(),
                timeoutId: "",
                countryTimestamp: alarmDetails?.countryTime.getTime(),
                alarmTimestamp: alarmDetails?.alarmDate?.getTime(),
                orgTimestamp: alarmDetails?.alarmDate?.getTime(),
                isAlarmPause: false,
                alarmRepeat: alarmDetails?.alarmRepeat,
                title: alarmDetails?.alarmTitle,
                note: alarmDetails?.alarmNote,
                country: alarmDetails?.country,
                alarmTune: alarmDetails?.alarmTune,
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
        localStorage.setItem("Alarms", JSON.stringify(allAlarms));
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
        setAlarmAudio(nearestAlarm?.alarmTune);
        setVolume(nearestAlarm?.alarmVolume);
        const currTimestamp = Date.now();
        let diff;
        diff = nearestAlarm?.alarmTimestamp - currTimestamp;
        if (diff >= 0) {
            const id = setTimeout(() => {
                play();
                notifyUser(nearestAlarm.title, nearestAlarm.note);
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
        const allAlarms = JSON.parse(localStorage.getItem("Alarms")) || [];
        const upcomingAlarm = allAlarms.filter(
            (item) => item.alarmTimestamp > Date.now()
        );
        setUpcomingAlarms(upcomingAlarm);
        const pastAlarm = allAlarms.filter(
            (item) => item.alarmTimestamp < Date.now()
        );
        setPastAlarms(pastAlarm);
        let array = [];
        allAlarms.forEach((item) => {
            const obj = {
                alarmId: item.alarmId,
                timeoutId: item.timeoutId,
                countryTime: getTime(item.countryTimestamp),
                alarmTime: getTime(item.alarmTimestamp),
                originalTime: getTime(item.orgTimestamp),
                isAlarmPause: item.isAlarmPause,
                title: item.title,
                note: item.note,
                country: item.country.value,
                alarmTune: item.alarmTune,
                alarmVolume: item.alarmVolume,
            };
            array.push(obj);
        });
        setCsvData(array);
    }, [flag]);

    const getTime = (timestamp) => {
        const date = new Date(timestamp);
        const format = localStorage.getItem("format");
        if (format === "24") {
            return date.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: false,
            });
        } else {
            return date.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
            });
        }
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
        clearInterval(isInterval);
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

    const updateTime = () => {
        const time = new Date();
        const format = localStorage.getItem("format");
        if (format === "12") {
            setCurrrentTime(
                time.toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                })
            );
        } else {
            setCurrrentTime(
                time.toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: false,
                })
            );
        }
    };

    useEffect(() => {
        updateTime();
        setIsInterval(setInterval(updateTime, 1000));
    }, [currentTime]);

    const getLocalCountry = () => {
        let result;
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const country = timezoneData[timezone];
        countryData.forEach((item) => {
            if (item.countryName === country) {
                result = item;
            }
        });
        return result;
    };

    const handleSpecificTime = (time) => {
        if (time < Date.now()) {
            time = time + 86400000;
        }
        const alarmTime = new Date(time);
        const payload = {
            timeoutId: "",
            country: getLocalCountry(),
            alarmTimestamp: time,
            isAlarmPause: false,
            title: `${alarmTime.getHours()}:${alarmTime.getMinutes()}`,
            note: `Alarm set for ${alarmTime.getHours()}:${alarmTime.getMinutes()}`,
            isSpecificTime: true,
        };
        storeAlarm(payload, "specific");
        callToAlarm();
    };

    const handleSetAlarm = () => {
        resetForm();
        setShowModal(true);
    };

    return (
        <AlarmWrapper>
            <div style={{ width: "100%" }}>
                <Clock />
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button
                    variant="success"
                    onClick={handleSetAlarm}
                    style={{ marginRight: 10 }}
                >
                    {" "}
                    {t("set_alarm")}
                </Button>
            </div>
            {allAlarms.length > 0 && (
                <>
                    <div className="w-100 container-fluid d-flex justify-content-evenly">
                        {pastAlarms.length > 0 && (
                            <div className="w-50 m-5 text-center">
                                <h3 className="text-decoration-underline">
                                    {" "}
                                    {t("past_alarm")}
                                </h3>
                                <Table striped bordered hover className="mt-4">
                                    <thead>
                                        <tr>
                                            <th>{t("title")}</th>
                                            <th>{t("country")}</th>
                                            <th>{t("country_time")}</th>
                                            <th>{t("local_time")}</th>
                                            <th>{t("date")}</th>
                                            <th>{t("actions")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pastAlarms?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.title}</td>
                                                <td>{item.country?.value}</td>
                                                <td>
                                                    {item.countryTimestamp
                                                        ? getTime(item.countryTimestamp)
                                                        : getTime(item.alarmTimestamp)}
                                                </td>
                                                <td>
                                                    {item.orgTimestamp
                                                        ? getTime(item.orgTimestamp)
                                                        : getTime(item.alarmTimestamp)}
                                                </td>
                                                <td>
                                                    {new Date(item.alarmTimestamp).toLocaleString(
                                                        "en-US",
                                                        {
                                                            dateStyle: "medium",
                                                        }
                                                    )}
                                                </td>
                                                <td>
                                                    <OverlayTrigger
                                                        placement={"top"}
                                                        overlay={
                                                            <Tooltip id={`tooltip-${index}`}>
                                                                {t("edit")}
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <Button
                                                            className="btn-sm"
                                                            variant="outline-secondary"
                                                            style={{ marginLeft: 10 }}
                                                            onClick={() => handleEdit(item.alarmId)}
                                                        >
                                                            <MdEdit />
                                                        </Button>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger
                                                        placement={"top"}
                                                        overlay={
                                                            <Tooltip id={`tooltip-${index}`}>
                                                                {t("delete")}
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <Button
                                                            className="btn-sm"
                                                            variant="outline-danger"
                                                            style={{ marginLeft: 10 }}
                                                            onClick={() =>
                                                                DeleteAlarm(item.alarmId, item.timeoutId)
                                                            }
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
                        )}

                        {upcomingAlarms.length > 0 && (
                            <div className="w-50 m-5 text-center">
                                <h3 className="text-decoration-underline">
                                    {t("upcoming_alarm")}
                                </h3>
                                <Table striped bordered hover className="mt-4">
                                    <thead>
                                        <tr>
                                            <th>{t("title")}</th>
                                            <th>{t("country")}</th>
                                            <th>{t("country_time")}</th>
                                            <th>{t("local_time")}</th>
                                            <th>{t("date")}</th>
                                            <th>{t("remaining_time")}</th>
                                            <th>{t("actions")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {upcomingAlarms?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.title}</td>
                                                <td>{item.country?.value}</td>
                                                <td>
                                                    {item.countryTimestamp
                                                        ? getTime(item.countryTimestamp)
                                                        : getTime(item.alarmTimestamp)}
                                                </td>
                                                <td>
                                                    <span>
                                                        {item.orgTimestamp
                                                            ? getTime(item.orgTimestamp)
                                                            : getTime(item.alarmTimestamp)}
                                                    </span>
                                                    <span style={{ marginLeft: "10px" }}>
                                                        {item.orgTimestamp !== item.alarmTimestamp &&
                                                            !item.isSpecificTime && <MdSnooze fill="red" />}
                                                    </span>
                                                </td>
                                                <td>
                                                    {new Date(item.alarmTimestamp).toLocaleString(
                                                        "en-US",
                                                        {
                                                            dateStyle: "medium",
                                                        }
                                                    )}
                                                </td>
                                                <td>{countRemaining(item.alarmTimestamp)}</td>
                                                <td>
                                                    <OverlayTrigger
                                                        placement={"top"}
                                                        overlay={
                                                            <Tooltip id={`tooltip-${index}`}>
                                                                {!item.isAlarmPause ? t("pause") : t("play")}
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <Button
                                                            className="btn-sm"
                                                            variant="outline-primary"
                                                            style={{ marginLeft: 10 }}
                                                            onClick={() => setPauseAlarm(item)}
                                                        >
                                                            {!item.isAlarmPause ? (
                                                                <MdPauseCircleOutline />
                                                            ) : (
                                                                <MdPlayCircleOutline />
                                                            )}
                                                        </Button>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger
                                                        placement={"top"}
                                                        overlay={
                                                            <Tooltip id={`tooltip-${index}`}>
                                                                {t("edit")}
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <Button
                                                            className="btn-sm"
                                                            variant="outline-secondary"
                                                            style={{ marginLeft: 10 }}
                                                            onClick={() => handleEdit(item.alarmId)}
                                                        >
                                                            <MdEdit />
                                                        </Button>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger
                                                        placement={"top"}
                                                        overlay={
                                                            <Tooltip id={`tooltip-${index}`}>
                                                                {t("delete")}
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <Button
                                                            className="btn-sm"
                                                            variant="outline-danger"
                                                            style={{ marginLeft: 10 }}
                                                            onClick={() =>
                                                                DeleteAlarm(item.alarmId, item.timeoutId)
                                                            }
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
                        )}
                    </div>
                    <div style={{ margin: "0 0 30px 0", width: "130px" }}>
                        <CSVLink
                            data={csvData}
                            style={{ width: "100%", textDecoration: "none" }}
                        >
                            <Button
                                variant="outline-secondary"
                                className="d-flex align-items-center justify-content-around w-100"
                            >
                                <BiExport />
                                {t(`export_csv`)}
                            </Button>
                        </CSVLink>
                    </div>
                </>
            )}
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
                isEdit={isEdit}
                closeModal={closeModal}
                play={play}
                pause={pause}
                getAlarms={getAlarms}
                callToAlarm={callToAlarm}
                storeAlarm={storeAlarm}
                methods={methods}
                selectedAlarm={selectedAlarm}
                handleEditAlarm={handleEditAlarm}
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
