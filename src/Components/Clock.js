import React, { useState } from "react";
import { ClockWrapper } from "./style";
import { days, monthNames } from "../Constant";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Clock = () => {

    const [currentTime, setCurrrentTime] = useState();
    const [day, setDay] = useState();
    const { t } = useTranslation();
    document.title = t('clock') + '  ' + currentTime;

    const updateTime = () => {
        const date = new Date();
        const time = date.toLocaleTimeString();
        const dayStr = `${days[date.getDay()].toUpperCase()} - ${monthNames[date.getMonth()].toUpperCase()} ${date.getDate()}. ${date.getFullYear()}`;
        setCurrrentTime(time);
        setDay(dayStr);
    };

    useEffect(() => {
        updateTime();
        setInterval(updateTime, 1000);
    }, []);

    return (
        <ClockWrapper>
            <p className="title">{t('Time_Now')}</p>
            <h1 className="display">{currentTime}</h1>
            <p className="day">{day}</p>
        </ClockWrapper>
    );
};

export default Clock;