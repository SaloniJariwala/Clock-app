import React, { useState } from "react";
import { ClockWrapper } from "./style";
import { days, monthNames } from "../Constant";

const Clock = () => {

    const [currentTime, setCurrrentTime] = useState();
    const [day, setDay] = useState();

    const updateTime = () => {
        const date = new Date();
        const time = date.toLocaleTimeString();
        const dayStr = `${days[date.getDay()].toUpperCase()} - ${monthNames[date.getMonth()].toUpperCase()} ${date.getDate()}. ${date.getFullYear()}`;
        setCurrrentTime(time);
        setDay(dayStr);
    };

    setInterval(updateTime, 1000);

    return (
        <ClockWrapper>
            <p className="title">Time Now</p>
            <h1 className="display">{currentTime}</h1>
            <p className="day">{day}</p>
        </ClockWrapper>
    );
};

export default Clock;