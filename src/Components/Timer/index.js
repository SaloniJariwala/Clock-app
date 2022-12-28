import { useState, useRef, useEffect } from "react";
import DisplayTimer from "./Display";
import SetTimerModal from "./SetTimerModal";
import BtnTimer from "./BtnTimer";
import defaultTimerSound from "../../Assets/audios/alarm.mp3";
import { t } from "i18next";
import { notifyUser } from "../../Utils/Notification";
import { useForm } from "react-hook-form";
import TimerModal from "./TimerModal";
import { useParams } from "react-router-dom";

const Timer = () => {
    const { name, days } = useParams();
    const methods = useForm();
    document.title = t("timer");
    const audioRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState(0);
    const [sound, setSound] = useState(defaultTimerSound);
    const [title, setTitle] = useState("Test Title");
    const [timerHour, setTimerHour] = useState(0);
    const [timerMinute, setTimerMinute] = useState(0);
    const [timerSecond, setTimerSecond] = useState(0);
    const [timerDay, setTimerDays] = useState(0);
    const [isInaterval, setIsInterVal] = useState();
    const [isHolidayInterval, setIsHolidayInterval] = useState();
    const [isTimeout, setIsTimeOut] = useState();
    const [showTimerModal, setTimerModal] = useState(false);
    const [isFlag, setIsFlag] = useState(false);
    const [isTimer, setIsTimer] = useState(false)
    let updateDateTime = timerDay;
    let updateSecond = timerSecond;
    let updateMinute = timerMinute;
    let updateHour = timerHour;

    const resetForm = () => {
        methods.setValue('dateTime', new Date());
        methods.setValue("hour", 0);
        methods.setValue("minute", 0);
        methods.setValue("second", 0);
        methods.setValue("title", "");
        methods.setValue("sound", "selected");
    };

    const play = () => {
        audioRef.current.play();
        audioRef.current.loop = true;
    };

    const pause = () => {
        setTimerModal(false);
        audioRef.current.pause();
        localStorage.removeItem("timer");
        clearInterval(isInaterval);
        setStatus(0);
    };

    const closeModal = () => {
        resetForm();
        setShowModal(false);
    };
    const run = () => {
        if (updateSecond > 60) {
            updateMinute++;
            updateSecond = parseInt(updateSecond) - 59;
        }
        if (updateMinute > 60) {
            updateHour++;
            updateMinute = parseInt(updateMinute) - 60;
        }
        updateMinute = updateMinute > 60 ? 60 : updateMinute;

        if (updateSecond !== 0) {
            const sec = `${updateSecond <= 10 ? "0" : ""}${updateSecond--}`;
            setTimerSecond(sec);
        } else if (updateMinute !== 0 && updateSecond === 0) {
            updateSecond = 59;
            const min = `${updateMinute <= 10 ? "0" : ""}${updateMinute--}`;
            setTimerMinute(min);
        } else if (updateHour !== 0 && updateMinute === 0) {
            updateMinute = 60;
            const hr = `${updateHour <= 10 ? "0" : ""}${updateHour--}`;
            setTimerHour(hr);
        } else {
            return;
        }
        setTimerSecond(updateSecond);
        setTimerMinute(updateMinute);
        setTimerHour(updateHour);
        const getTimer = JSON.parse(localStorage.getItem("timer"));
        debugger;
        const obj = {
            hour: updateHour,
            minute: updateMinute,
            second: updateSecond,
            sound: getTimer?.sound,
            title: getTimer?.title,
        };
        debugger;
        localStorage.setItem("timer", JSON.stringify(obj));
        debugger;
        count();
    };

    function count() {
        if (
            updateDateTime === 0 &&
            updateHour === 0 &&
            updateMinute === 0 &&
            updateSecond === 0
        ) {
            const timer = JSON.parse(localStorage.getItem("timer"));
            play();
            notifyUser(timer?.title);
            setTimerModal(true);
            setStatus(0);
        } else if (
            updateDateTime > 0 &&
            updateHour > 0 &&
            updateMinute > 0 &&
            updateSecond > 0
        ) {
            debugger;
            if (updateSecond === 0) {
                updateMinute -= 1;
                updateSecond = 60;
            }
        }
    }

    // /Countdown
    const StoreTimer = (formData) => {
        debugger;
        const setTimer = {
            hour: formData?.hour,
            minute: formData?.minute,
            second: formData?.second,
            sound: formData?.sound,
            title: formData?.title,
        };
        localStorage.setItem("timer", JSON.stringify(setTimer));
        closeModal();
        resetForm();
        getTimers();
    };
    const getTimers = () => {
        const getTimer = JSON.parse(localStorage.getItem("timer"));
        updateHour = getTimer?.hour;
        updateMinute = getTimer?.minute;
        updateSecond = getTimer?.second;
        setSound(getTimer?.sound);
        setTitle(getTimer?.title);
        debugger;
        setStatus(1);
        setIsInterVal(
            setInterval(() => {
                run();
            }, 1000)
        );
    };

    const stop = () => {
        clearInterval(isInaterval);
        setStatus(2);
    };

    const Reset = () => {
        clearInterval(isInaterval);
        clearTimeout(isTimeout);
        setStatus(0);
        setTimerDays(new Date());
        setTimerHour(0);
        setTimerMinute(0);
        setTimerSecond(0);
    };

    const resume = () => {
        getTimers();
    };

    //Count till (from) date and time
    const setDateTimer = (value) => {
        setIsFlag(true);
        const startDate = new Date();
        var endDate = new Date(value?.dateTime);
        const timeRemaining = endDate.getTime() - startDate.getTime();
        if (timeRemaining > 0) {
            const start_date = new Date(startDate);
            const end_date = new Date(endDate);
            const start_millis = start_date?.getTime();
            const end_millis = end_date?.getTime();
            const old_sec = start_millis / 1000;
            const current_sec = end_millis / 1000;
            let seconds = current_sec - old_sec;
            let days = Math.floor(seconds / (24 * 60 * 60));
            seconds -= days * 24 * 60 * 60;
            updateDateTime = Math.abs(days);
            let hours = Math.floor(seconds / (60 * 60));
            seconds -= hours * 60 * 60;
            updateHour = Math.abs(hours);
            let minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;
            updateMinute = Math.abs(minutes);
            updateSecond = Math.floor(Math.abs(seconds));
            setTimerDays(updateDateTime);
            setTimerHour(updateHour);
            setTimerMinute(updateMinute);
            setTimerSecond(updateSecond);
            getDateTimer(value);
            const obj = {
                dateTime: new Date(value?.dateTime),
                day: updateDateTime,
                hour: updateHour,
                minute: updateMinute,
                second: updateSecond,
                sound: value?.sound,
                title: value?.title,
            };
            localStorage.setItem("timer", JSON.stringify(obj));
            count();
        }
    };

    // /Count till (from) date and time
    const getDateTimer = (data) => {
        setIsFlag(true);
        const getTime = JSON.parse(localStorage.getItem("timer"));
        const obj = {
            dateTime: getTime?.dateTime,
            day: getTime?.day,
            hour: getTime?.hour,
            minute: getTime?.minute,
            second: getTime?.second,
            sound: getTime?.sound,
            title: getTime?.title,
        };
        localStorage.setItem("timer", JSON.stringify(obj));
        storeDateTime(data);
        closeModal();
        resetForm();
    };

    const storeDateTime = (fromData) => {
        const getTime = JSON.parse(localStorage.getItem("timer"));
        const obj = {
            dateTime: getTime?.dateTime,
            day: getTime?.day,
            hour: getTime?.hour,
            minute: getTime?.minute,
            second: getTime?.second,
            sound: getTime?.sound,
            title: getTime?.title,
        };
        localStorage.setItem("timer", JSON.stringify(obj));

        setTimeout(() => {
            setDateTimer(fromData);
        }, 1000);
    };

    useEffect(() => {
        const getTimer = JSON.parse(localStorage.getItem("timer"));
        if (getTimer?.day) {
            if (localStorage.getItem("timer") === null) {
                setStatus(0);
            } else {
                storeDateTime(getTimer);
            }
        } else {
            if (localStorage.getItem("timer") === null) {
                setStatus(0);
            } else {
                getTimers();
                setStatus(1);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const holidayDay = () => {
        const getTimer = JSON.parse(localStorage.getItem("timer"));
        if (getTimer?.day) {
            setStatus(0);
            return;
        } else if (days) {
            setIsFlag(true);
            const startDate = new Date();
            var endDate = new Date(days);
            const timeRemaining = endDate.getTime() - startDate.getTime();
            if (timeRemaining > 0) {
                const start_date = new Date(startDate);
                const end_date = new Date(endDate);
                const start_millis = start_date?.getTime();
                const end_millis = end_date?.getTime();
                const old_sec = start_millis / 1000;
                const current_sec = end_millis / 1000;
                let seconds = current_sec - old_sec;
                let days = Math.floor(seconds / (24 * 60 * 60));
                seconds -= days * 24 * 60 * 60;
                updateDateTime = Math.abs(days);
                let hours = Math.floor(seconds / (60 * 60));
                seconds -= hours * 60 * 60;
                updateHour = Math.abs(hours);
                let minutes = Math.floor(seconds / 60);
                seconds -= minutes * 60;
                updateMinute = Math.abs(minutes);
                updateSecond = Math.floor(Math.abs(seconds));
                setTimerDays(updateDateTime);
                setTimerHour(updateHour);
                setTimerMinute(updateMinute);
                setTimerSecond(updateSecond);
            }
        }
    }

    const setHolidayData = () => {
        setTitle(name)
        setIsHolidayInterval(setInterval(() => {
            holidayDay();
        }, 1000));
    }

    useEffect(() => {
        setHolidayData();
        clearInterval(isHolidayInterval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const clearData = () => {
        setTitle("");
        setTimerDays(0);
        setTimerHour(0);
        setTimerMinute(0);
        setTimerSecond(0);
        clearInterval(isHolidayInterval);
        setStatus(0);
        setIsTimer(false);
    }
    useEffect(() => {
        debugger
        if (!name || !days) {
            debugger
            clearData();
            debugger
        } else if (name || days) {
            debugger
            setIsTimer(true);
        }

    }, [days, name, isHolidayInterval, timerDay, timerHour, timerMinute, timerSecond])
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <DisplayTimer
                timerDay={updateDateTime ? updateDateTime : "0"}
                timerHour={updateHour ? updateHour : "0"}
                timerMinute={updateMinute ? updateMinute : "0"}
                timerSecond={updateSecond ? updateSecond : "0"}
                title={title}
                isFlag={isFlag}
            />
            {!isTimer && (<BtnTimer
                setShowModal={setShowModal}
                stop={stop}
                status={status}
                Reset={Reset}
                resume={resume}
                pause={pause}
            />)}

            <audio src={sound} ref={audioRef} />
            <SetTimerModal
                showModal={showModal}
                closeModal={closeModal}
                setTimer={StoreTimer}
                methods={methods}
                setDateTime={getDateTimer}
            />

            <TimerModal showTimerModal={showTimerModal} pause={pause} />
        </div>
    );
};

export default Timer;
