import React, { useEffect, useState } from 'react'
import { Button, Modal } from "react-bootstrap";

const RingAlarm=({
    closeRingModal,
    snonzeModal,
    handleStop,
    SnoozeAlarm,
    showSnooze,
    currentAlarm
})=> {

    return (
    <Modal centered show={snonzeModal} onHide={closeRingModal}>
    <Modal.Header closeButton>
        <span className="alarm-modal-title">Set Alarm</span>
    </Modal.Header>
    <Modal.Body>
         <div>
                <div>{currentAlarm?.title}</div> 
                <div>{currentAlarm?.note}</div>   
         </div>
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button variant="danger" onClick={handleStop}>Stop Alarm</Button>
                {showSnooze ===true  ?
                    (<Button variant="success" onClick={SnoozeAlarm} style={{ marginLeft: 10 }}>Snooze Alarm</Button>):""}

            </div>
    </Modal.Body>
</Modal>
  )
}

export default RingAlarm