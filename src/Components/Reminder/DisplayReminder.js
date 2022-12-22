import { Button, Modal } from 'antd';
import React from 'react'

const DisplayReminder = ({
    showDisplayReminder,
    closeDisplayReminderModal,
    pause,
    currentReminder
}) => {

    const handleOkay = () => {
        pause();
        closeDisplayReminderModal();
    }

    return (
        <Modal
            title={<span style={{ fontSize: 20, fontWeight: 'bold', color: '#1677ff' }}>Display Reminder</span>}
            open={showDisplayReminder}
            onCancel={closeDisplayReminderModal}
            footer={null}
        >
            <div>
                <h1>{currentReminder?.title}</h1>
                <Button onClick={handleOkay}>Okay</Button>
            </div>
        </Modal>
    )
}

export default DisplayReminder;