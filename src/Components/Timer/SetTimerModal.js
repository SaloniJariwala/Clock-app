import React, { useEffect }  from 'react';
import { Divider, Modal } from 'antd';
import { t } from 'i18next';
import AudioContainer from './AudioContainer';
import TimeContainer from './TimeContainer';

const SetTimerModal = ({
    showModal,
    closeModal,
    setTimerDetails,
    setTimer
}) => {

    return (
        <Modal
            title={<div className='alarm-modal-title'>{t('set_timer')}</div>}
            open={showModal}
            okText={t('start')}
            onOk={setTimer}
            cancelText={t('cancel')}
            onCancel={closeModal}
        >
            <Divider />
            <TimeContainer setTimerDetails={setTimerDetails} />
            <AudioContainer setAlarmDetails={setTimerDetails} />
            <div style={{ padding: "0 10px", marginBottom: "1em" }}>
                <label htmlFor="title">{t('title')}</label>
                <input
                    id="title"
                    className="form-control"
                    placeholder={t('enter_timer_title')}
                    onChange={(event) => setTimerDetails(event.target.value, "title")}
                />
            </div>
            <Divider />
        </Modal>
    );
}

export default SetTimerModal;