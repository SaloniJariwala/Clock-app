import React from "react";
import { ClockWrapper } from "../style";

const DisplayTimer = ({
    isFlag,
    timerDay,
    timerHour,
    timerMinute,
    timerSecond,
    title,
    getTimer,
}) => {
    return (
        <ClockWrapper>
            {isFlag ? (
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
                                {timerDay < 10 ? "0" + timerDay : timerDay}
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
                                {timerHour < 10 ? "0" + timerHour : timerHour}
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
                                {timerMinute < 10 ? "0" + timerMinute : timerMinute}
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
                                {timerSecond < 10 ? "0" + timerSecond : timerSecond}
                                <small style={{ fontSize: 40 }}>Second</small>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
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
                                {timerHour < 10 ? "0" + timerHour : timerHour}
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
                                {timerMinute < 10 ? "0" + timerMinute : timerMinute}
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
                                {timerSecond < 10 ? "0" + timerSecond : timerSecond}
                                <small style={{ fontSize: 40 }}>Second</small>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </ClockWrapper>
    );
};

export default DisplayTimer;
