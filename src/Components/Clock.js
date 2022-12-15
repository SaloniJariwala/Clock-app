import React, { useState } from "react";
import { ClockWrapper } from "./style";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FormatState } from "../Context/FormatProvider";

const Clock = () => {

    const { format } = FormatState();
    const [currentTime, setCurrrentTime] = useState();
    const [day, setDay] = useState();
    const { t } = useTranslation();
    document.title = t('clock') + '  ' + currentTime;

    const updateTime = () => {
        const time = new Date();
        if (format === 12) {
            setCurrrentTime(time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }));
        } else {
            setCurrrentTime(time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }));
        }
        setDay(`${time.toLocaleString('en-US', { weekday: 'short' })} - ${time.toLocaleString('en-US', { dateStyle: 'medium' })}`)
    };

    useEffect(() => {
        updateTime();
        setInterval(updateTime, 1000);
        // eslint-disable-next-line
    }, []);

    return (
        <ClockWrapper>
            <p className="title">{t('Time_Now')}</p>
            <div className="display">
                {currentTime}
            </div>
            <p className="day">{day}</p>
        </ClockWrapper>
    );
};

export default Clock;