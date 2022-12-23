import React from "react";
import { Button, Modal } from "react-bootstrap";
import { t } from "i18next"

const TestModal = ({ showTestModal, closeTestModal, methods }) => {
  return (
    <Modal centered show={showTestModal} onHide={closeTestModal}>
      <Modal.Header closeButton>
        <span className="alarm-modal-title">Test Alarm</span>
      </Modal.Header>
      <Modal.Body>
        <div style={{ alignItems: "center" }}>
          <div>
            {t('time')} : {methods.getValues('hour')}:
            {methods.getValues('minute')}:{methods.getValues('second')}
          </div>
          <div>{t('title')} : {methods.getValues('alarmTitle')}</div>
          <div>{t('note')} : {methods.getValues('alarmNote')}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button variant="danger" onClick={closeTestModal}>
            {t('okay')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TestModal;
