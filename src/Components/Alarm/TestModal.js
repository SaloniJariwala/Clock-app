import React from "react";
import { Button, Modal } from "react-bootstrap";

const TestModal = ({ showTestModal, closeTestModal, alarm }) => {
  return (
    <Modal centered show={showTestModal} onHide={closeTestModal}>
      <Modal.Header closeButton>
        <span className="alarm-modal-title">Test Alarm</span>
      </Modal.Header>
      <Modal.Body>
        <div style={{ alignItems: "center" }}>
          <div>
            Time : {alarm?.originalAlarm?.getHours()}:
            {alarm?.originalAlarm?.getMinutes()}:{alarm?.originalAlarm?.getSeconds()}
          </div>
          <div>Title : {alarm?.alarmTitle}</div>
          <div>Note : {alarm?.alarmNote}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button variant="danger" onClick={closeTestModal}>
            Okay
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TestModal;
