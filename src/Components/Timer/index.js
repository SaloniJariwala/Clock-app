import { useState, useRef, useEffect } from "react";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import DisplayTimer from "./Display";
import SetTimerModal from "./SetTimerModal";
import BtnTimer from "./BtnTimer";
import { notifyUser } from "../../Utils/Notification";
import defaultTimerSound from "../../Assets/audios/alarm.mp3";
import TimerModal from "./TimerModal";
import HolidayTimerDisplay from "../Timer/HolidayTimerDisplay"

const Timer = () => {
    const getTimer = JSON.parse(localStorage.getItem("timer"));
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
    const [showTimerModal, setTimerModal] = useState(false);
    const [isFlag, setIsFlag] = useState(false);
    const [isTimer, setIsTimer] = useState(false);
    const [holidayTimerHour, setHolidayTimerHour] = useState(0);
    const [holidayTimerMinute, setHolidayTimerMinute] = useState(0);
    const [holidaytimerSecond, setTHolidayTimerSecond] = useState(0);
    const [holidayTimerDay, setHolidayTimerDays] = useState(0);
    let updateDateTime = timerDay;
    let updateSecond = timerSecond;
    let updateMinute = timerMinute;
    let updateHour = timerHour;

    let updateHolidayTimeDay = holidayTimerDay;
    let updateHolidayHour = holidayTimerHour;
    let updateHolidayMinute = holidayTimerMinute;
    let updateHolidaySecond = holidaytimerSecond;

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
        const obj = {
            hour: updateHour,
            minute: updateMinute,
            second: updateSecond,
            sound: getTimer?.sound,
            title: getTimer?.title,
            state: 1,
        };
        localStorage.setItem("timer", JSON.stringify(obj));
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
            if (updateSecond === 0) {
                updateMinute -= 1;
                updateSecond = 60;
            }
        }
    }

    // /Countdown
    const StoreTimer = (formData) => {
        const setTimer = {
            hour: formData?.hour,
            minute: formData?.minute,
            second: formData?.second,
            sound: formData?.sound,
            title: formData?.title,
            state: status,
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
        setStatus(1);
        setIsInterVal(
            setInterval(() => {
                run();
            }, 1000)
        );
    };

    const stop = () => {
        clearInterval(isInaterval);
        const obj = {
            dateTime: getTimer.dateTime,
            day: getTimer.day,
            hour: getTimer.hour,
            minute: getTimer.minute,
            second: getTimer.second,
            sound: getTimer.sound,
            title: getTimer.title,
            state: 2,
        };
        setStatus(2);
        localStorage.setItem("timer", JSON.stringify(obj));
    };

    const Reset = () => {
        clearInterval(isInaterval);
        setStatus(0);
        setTimerDays(new Date());
        setTimerHour(0);
        setTimerMinute(0);
        setTimerSecond(0);
        setTitle("");
        localStorage.removeItem("timer");
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
        if(endDate < startDate){
            alert('please select proper date');
            setIsTimer(false);
        }
       else if (timeRemaining > 0) {
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
        };
        localStorage.setItem("timer", JSON.stringify(obj));
        setTimeout(() => {
            setDateTimer(fromData);
        }, 1000);
    };

    useEffect(() => {
        const getTimer = JSON.parse(localStorage.getItem("timer")) || [];
        if (getTimer?.day) {
            if (localStorage.getItem("timer") === null) {
                setStatus(0);
            } else {
                storeDateTime(getTimer);
            }
        } else {
            if (localStorage.getItem("timer") === null) {
                setStatus(0);
            } else if (status === 1) {
                getTimers();
            } else {
                stop();
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
                updateHolidayTimeDay = Math.abs(days);
                let hours = Math.floor(seconds / (60 * 60));
                seconds -= hours * 60 * 60;
                updateHolidayHour = Math.abs(hours);
                let minutes = Math.floor(seconds / 60);
                seconds -= minutes * 60;
                updateHolidayMinute = Math.abs(minutes);
                updateHolidaySecond = Math.floor(Math.abs(seconds));
                setHolidayTimerDays(updateHolidayTimeDay);
                setHolidayTimerHour(updateHolidayHour);
                setHolidayTimerMinute(updateHolidayMinute);
                setTHolidayTimerSecond(updateHolidaySecond);
            }
        }
    };

    const setHolidayData = () => {
        setTitle(name);
        setIsHolidayInterval(
            setInterval(() => {
                holidayDay();
            }, 1000)
        );
    };

    useEffect(() => {
        if (!name || !days) {
            clearInterval(isHolidayInterval);
            setIsTimer(false);
            setTitle("");
        } else if (name || days) {
            setIsTimer(true);
            setHolidayData();
            localStorage.removeItem('timer');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, days]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {name || days ? (
                <HolidayTimerDisplay
                    holidayTimerDay={updateHolidayTimeDay ? updateHolidayTimeDay : "0"}
                    holidayTimerHour={updateHolidayHour ? updateHolidayHour : "0"}
                    holidayTimerMinute={updateHolidayMinute ? updateHolidayMinute : "0"}
                    holidaytimerSecond={updateHolidaySecond ? updateHolidaySecond : "0"}
                    title={title}
                    isFlag={isFlag}
                />
            ) : (
                <DisplayTimer
                    timerDay={updateDateTime ? updateDateTime : "0"}
                    timerHour={updateHour ? updateHour : "0"}
                    timerMinute={updateMinute ? updateMinute : "0"}
                    timerSecond={updateSecond ? updateSecond : "0"}
                    title={title}
                    isFlag={isFlag}
                    getTimer={getTimer}
                />
            )}

            {!isTimer && (
                <BtnTimer
                    setShowModal={setShowModal}
                    stop={stop}
                    status={status}
                    Reset={Reset}
                    resume={resume}
                    pause={pause}
                    getTimer={getTimer}
                />
            )}

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
