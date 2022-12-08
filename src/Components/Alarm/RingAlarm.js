import React from 'react'
import { Button, Modal } from "react-bootstrap";

const RingAlarm = ({
    showRingModal,
    closeRingModal,
    currentAlarm,
    handleStop,
    getTime,
    callToAlarm,
    getAlarms
}) => {

    const snoozeAlarm = () => {
        const allAlrams = JSON.parse(localStorage.getItem('Alarms'));
        allAlrams.forEach((item) => {
            if (item.alarmTimestamp === currentAlarm.alarmTimestamp) {
                item.alarmTimestamp = item.alarmTimestamp + item.snoozeTime;
            }
        });
        localStorage.setItem('Alarms', JSON.stringify(allAlrams));
        callToAlarm();
        closeRingModal();
    };

    const repeatAlarm = () => {
        if (currentAlarm.alarmRepeat === "never") {
            const newStamp = currentAlarm.alarmTimestamp;
            const getallAlrams = JSON.parse(localStorage.getItem("Alarms"));
            getallAlrams.forEach((item) => {
                if (item.alarmTimestamp === currentAlarm.alarmTimestamp) {
                    item.alarmTimestamp = newStamp;
                }
            });
            localStorage.setItem("Alarms", JSON.stringify(getallAlrams));
            getAlarms();
        } else if (currentAlarm.alarmRepeat === "daily") {
            const dailyTimeStamp = currentAlarm.alarmTimestamp + 86400000;
            const getallAlrams = JSON.parse(localStorage.getItem("Alarms"));
            getallAlrams.forEach((item) => {
                if (item.alarmTimestamp === currentAlarm.alarmTimestamp) {
                    item.alarmTimestamp = dailyTimeStamp;
                }
            });
            localStorage.setItem("Alarms", JSON.stringify(getallAlrams));
            getAlarms();
        } else if (currentAlarm.alarmRepeat === "weekdays") {

            const weekDaysStamp = currentAlarm.alarmTimestamp + 86400000;
            const getallAlrams = JSON.parse(localStorage.getItem("Alarms"));
            const day = new Date(currentAlarm.alarmTimestamp).toLocaleString(
                'default', { weekday: 'short' }
            );
            if (day === 'Mon' || day === 'Tue' || day === 'Wed' || day === 'Thu' || day === 'Fri'
            ) {
                getallAlrams.forEach((item) => {
                    if (item.alarmTimestamp === currentAlarm.alarmTimestamp) {
                        item.alarmTimestamp = weekDaysStamp;
                    }
                });
            }
            localStorage.setItem("Alarms", JSON.stringify(getallAlrams));
            getAlarms();
        }
        else if (currentAlarm.alarmRepeat === "weekends") {
            const weekendStamp = currentAlarm.alarmTimestamp + 86400000;
            const getallAlrams = JSON.parse(localStorage.getItem("Alarms"));
            const day = new Date(currentAlarm.alarmTimestamp).toLocaleString(
                'default', { weekday: 'short' }
            );
            if (day === "Sat" || day === "Sun") {
                getallAlrams.forEach((item) => {
                    if (item.alarmTimestamp === currentAlarm.alarmTimestamp) {
                        item.alarmTimestamp = weekendStamp;
                    }
                });
            }
            localStorage.setItem("Alarms", JSON.stringify(getallAlrams));
            getAlarms();
        }
    }

    const handleStopAlarm = () => {
        repeatAlarm();
        handleStop();
    }

    return (
        <Modal centered show={showRingModal} onHide={closeRingModal}>
            <Modal.Header closeButton>
                <span className="alarm-modal-title">Set Alarm</span>
            </Modal.Header>
            <Modal.Body>
                <div style={{ alignItems: "center" }}>
                    <div>Time : {getTime(currentAlarm?.alarmTimestamp)}</div>
                    <div>Title : {currentAlarm?.title}</div>
                    <div>Note : {currentAlarm?.note}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button variant="danger" onClick={handleStopAlarm}>Stop Alarm</Button>
                    {currentAlarm?.snoozeTime &&
                        <Button variant="success" onClick={snoozeAlarm} style={{ marginLeft: 10 }}>Snooze Alarm</Button>}

                </div>
            </Modal.Body>
        </Modal>
    )
}

export default RingAlarm