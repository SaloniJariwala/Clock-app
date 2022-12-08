import React from 'react'
import { Button, Modal } from "react-bootstrap";

const RingAlarm = ({
    showRingModal,
    closeRingModal,
    currentAlarm,
    handleStop,
    getTime,
    callToAlarm
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
                    <Button variant="danger" onClick={handleStop}>Stop Alarm</Button>
                    {currentAlarm?.snoozeTime &&
                        <Button variant="success" onClick={snoozeAlarm} style={{ marginLeft: 10 }}>Snooze Alarm</Button>}

                </div>
            </Modal.Body>
        </Modal>
    )
}

export default RingAlarm