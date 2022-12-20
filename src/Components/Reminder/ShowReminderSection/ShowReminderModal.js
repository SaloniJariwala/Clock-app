import { Divider, Modal } from 'antd';
import React from 'react'

const ShowReminderModal = ({
    showReminder,
    closeReminderModal
}) => {
    return (
        <>
            <Modal
                title="Today's Reminders"
                open={showReminder}
                // onOk={handleOk} 
                onCancel={closeReminderModal}
            >
                <Divider />
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <Divider />
            </Modal>
        </>
    )
}

export default ShowReminderModal;