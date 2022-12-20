import { PlusOutlined } from '@ant-design/icons/lib/icons';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ListSection from './ListSection';
import SetReminderModal from './SetReminderModal/SetReminderModal';
import ShowReminderSection from './ShowReminderSection';

const Reminder = () => {

    const [showSetReminder, setshowSetReminder] = useState(false);

    const closeSetReminderModal = () => {
        setshowSetReminder(false);
    }

    return (
        <div>
            <ShowReminderSection />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '30px 0'
                }}
            >
                <Button
                    variant="success"
                    onClick={() => setshowSetReminder(true)}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <PlusOutlined style={{ marginRight: 5 }} /><span>Add New Reminder</span>
                </Button>
            </div>
            <ListSection />
            <SetReminderModal
                showSetReminder={showSetReminder}
                closeSetReminderModal={closeSetReminderModal}
            />
        </div>
    )
}

export default Reminder;