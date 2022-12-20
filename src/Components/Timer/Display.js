import React from 'react';
import { ClockWrapper } from "../style";

const DisplayTimer = ({
    timerHour,
    timerMinute,
    timerSecond,
    title
}) => {

    return (
        <ClockWrapper>
            <div className="display" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <small style={{ fontFamily: 'serif', fontSize: 40 }}>{title}</small>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        {timerHour < 10 ? '0' + timerHour : timerHour}
                        <small style={{ fontSize: 40 }}>Hours</small>
                    </div>:
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        {timerMinute < 10 ? '0' + timerMinute : timerMinute}
                        <small style={{ fontSize: 40 }}>Minutes</small>
                    </div>:
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        {timerSecond < 10 ? '0' + timerSecond : timerSecond}
                        <small style={{ fontSize: 40 }}>Second</small>
                    </div>
                </div>
            </div>
        </ClockWrapper>
    )
}

export default DisplayTimer;