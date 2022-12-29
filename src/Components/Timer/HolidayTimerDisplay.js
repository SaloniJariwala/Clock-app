import React from "react";
import { ClockWrapper } from "../style";

const HolidayTimerDisplay = ({
    isFlag,
    holidayTimerDay,
    holidayTimerHour,
    holidayTimerMinute,
    holidaytimerSecond,
    title,
    getTimer,
}) => {
    return (
        <ClockWrapper>
            <>
                <div
                    className="display"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <small style={{ fontFamily: "serif", fontSize: 40 }}>
                        {getTimer?.title ? getTimer?.title : title}
                    </small>
                    <div style={{ display: "flex" }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {holidayTimerDay < 10 ? "0" + holidayTimerDay : holidayTimerDay}
                            <small style={{ fontSize: 40 }}>Day</small>
                        </div>
                        :
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {holidayTimerHour < 10
                                ? "0" + holidayTimerHour
                                : holidayTimerHour}
                            <small style={{ fontSize: 40 }}>Hours</small>
                        </div>
                        :
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {holidayTimerMinute < 10
                                ? "0" + holidayTimerMinute
                                : holidayTimerMinute}
                            <small style={{ fontSize: 40 }}>Minutes</small>
                        </div>
                        :
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {holidaytimerSecond < 10
                                ? "0" + holidaytimerSecond
                                : holidaytimerSecond}
                            <small style={{ fontSize: 40 }}>Second</small>
                        </div>
                    </div>
                </div>
            </>
        </ClockWrapper>
    );
};

export default HolidayTimerDisplay;
