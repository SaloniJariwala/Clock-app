import { Divider, Modal } from 'antd';
import React from 'react'
import { Form } from 'react-bootstrap';

const SetReminderModal = ({
    showSetReminder,
    closeSetReminderModal
}) => {
    return (
        <>
            <Modal
                title={<span style={{ fontSize: 20, fontWeight: 'bold', color: '#1677ff' }}>Set Reminder</span>}
                open={showSetReminder}
                // onOk={handleOk} 
                onCancel={closeSetReminderModal}
            >
                <Divider />
                <span style={{ fontSize: 16 }}>Date & Time</span>
                <Form.Control
                    type={'datetime-local'}
                    id='datetime'
                />
                <Divider />
            </Modal>
        </>
    )
}

export default SetReminderModal;