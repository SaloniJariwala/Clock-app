import React from 'react';
import { Divider, Modal, Tabs } from 'antd';
import { t } from 'i18next';
import CountdownTimer from './CountdownTimer';
import DateTimeTimer from './DateTimeTimer';

const SetTimerModal = ({
    showModal,
    closeModal,
    setTimer,
    setDateTime,
    isEdit
}) => {

    return (
        <Modal
            title={<div className='alarm-modal-title'>{isEdit ? t('update') : 'set Timer'}</div>}
            open={showModal}
            footer={null}
        >
            <Tabs>
                <Tabs.TabPane tab="Countdown" key="item-1">
                    <CountdownTimer
                        closeModal={closeModal}
                        setTimer={setTimer}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Count till (from) date and time" key="item-2">
                    <DateTimeTimer
                        closeModal={closeModal}
                        setDateTime={setDateTime} />
                </Tabs.TabPane>
            </Tabs>
            <Divider />

        </Modal>
    );
}

export default SetTimerModal;