import React, { useState } from "react";
import { Table } from "react-bootstrap";
import BtnStopWatch from "../StopWatch/BtnStopwatch";
import { StopWatchWrapper } from "../style";
import {t} from "i18next"
import DisplayStopWatch from "./DisplayStopWatch";

function Index() {
    const [isInaterval, setIsIntaerVal] = useState();
    const [status, setStatus] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const getStopWatch = JSON.parse(localStorage.getItem("stopWatchLap"));
    const [time, setTime] = useState({
        lastId:0,
        milisecond: 0,
        second: 0,
        minute: 0,
        hour: 0,
    });
    let updtaeMs = time.milisecond;
    let updateSecond = time.second;
    let updateMinute = time.minute;
    let updateHour = time.hour;
    let lastId=1;
    document.title = t('stop_watch') + updateSecond ;
    
    
    const run = () => {
        if (updateMinute === 60) {
            updateHour++;
            updateMinute = 0;
        }
        if (updateSecond === 60) {
            updateMinute++;
            updateSecond = 0;
        }
        if (updtaeMs === 60) {
            updateSecond++;
            updtaeMs = 0;
        }
        updtaeMs++;
        return setTime({
            milisecond: updtaeMs,
            second: updateSecond,
            minute: updateMinute,
            hour: updateHour,
        });
    };

    const start = () => {
        if (!isRunning) {
            setIsRunning(true);
            run();
            setIsIntaerVal(setInterval(run, 10));
            setStatus(1);
        }
    };

    const stop = () => {
        setIsRunning(false);
        clearInterval(isInaterval);
        setStatus(2);
    };

    const reset = () => {
        clearInterval(isInaterval);
        setStatus(0);
        setTime({milisecond: 0, second: 0, minute: 0, hour: 0 });
    };

    const resume = () => {
        start();
    };

    const lap = () => {
        setIsRunning(true);
        const allStopTime = JSON.parse(localStorage.getItem("stopWatchLap")) || [];
        start();
        allStopTime.push(time);
        allStopTime.reverse();
        localStorage.setItem("stopWatchLap", JSON.stringify(allStopTime));
    };

    const resetHistory = () => {
        localStorage.removeItem("stopWatchLap");
    };

    return (
        <div>
            <StopWatchWrapper>
                <h1>{t('stop_watch')}</h1>
                <DisplayStopWatch time={time} />
                <BtnStopWatch
                    start={start}
                    status={status}
                    stop={stop}
                    reset={reset}
                    resume={resume}
                    isRunning={isRunning}
                    lap={lap}
                    resetHistory={resetHistory}
                />

                {getStopWatch && getStopWatch.length > 0 && (
                    <Table striped bordered hover className="mt-4">
                        <thead>
                            <tr>
                            <th>#</th>
                                <th>Hour</th>
                                <th>Minutes</th>
                                <th>MiliSecond</th>
                                <th>Second</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getStopWatch?.map((item, index) => (
                                <tr key={index}>
                                    <td>{lastId++}</td>
                                    <td>{item.hour}</td>
                                    <td>{item.minute}</td>
                                    <td>{item.milisecond}</td>
                                    <td>{item.second}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </StopWatchWrapper>
        </div>
    );
}

export default Index;
