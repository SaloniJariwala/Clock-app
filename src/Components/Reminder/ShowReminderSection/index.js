import { t } from 'i18next';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { DisplayButton } from '../style';
import ShowReminderModal from './ShowReminderModal';

const ShowReminderSection = ({ stored }) => {

    const [showReminer, setShowReminder] = useState(false);
    const [reminderData, setReminderData] = useState([]);
    const [todayReminders, setTodayReminders] = useState([]);
    const [scheduledReminders, setScheduledReminders] = useState([]);
    const [allReminders, setAllReminders] = useState([]);
    const [completedReminders, setCompletedReminders] = useState([]);

    const closeReminderModal = () => {
        setShowReminder(false);
    }

    const getAndSetReminders = () => {
        const allReminder = JSON.parse(localStorage.getItem('Reminders')) || [];
        setTodayReminders(allReminder.filter((item) => new Date(item.timestamp).getDate() === new Date().getDate()));
        setScheduledReminders(allReminder.filter((item) => item.timestamp > Date.now()));
        setAllReminders(allReminder);
        setCompletedReminders(allReminder.filter((item) => item.timestamp < Date.now()));
    }

    useEffect(() => {
        getAndSetReminders();
    }, [stored]);

    const handleClick = (name) => {
        getAndSetReminders();
        switch (name) {
            case 'today':
                setReminderData(todayReminders);
                break;

            case 'scheduled':
                setReminderData(scheduledReminders);
                break;

            case 'all':
                setReminderData(allReminders);
                break;

            case 'completed':
                setReminderData(completedReminders);
                break;

            default:
                console.log('Invalid Choice');
        }
        setShowReminder(true);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
                <div style={{ margin: 10 }}>
                    <DisplayButton
                        variant="outline-primary"
                        onClick={() => handleClick('today')}
                    >
                        {t('todays_reminders')}
                    </DisplayButton>
                </div>
                <div style={{ margin: 10 }}>
                    <DisplayButton
                        variant="outline-warning"
                        onClick={() => handleClick('scheduled')}
                    >
                        {t('scheduled_reminders')}
                    </DisplayButton>
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ margin: 10 }}>
                    <DisplayButton
                        variant="outline-secondary"
                        onClick={() => handleClick('all')}
                    >
                        {t('all_reminders')}
                    </DisplayButton>
                </div>
                <div style={{ margin: 10 }}>
                    <DisplayButton
                        variant="outline-info"
                        onClick={() => handleClick('completed')}
                    >
                        {t('completed')}
                    </DisplayButton>
                </div>
            </div>
            <ShowReminderModal
                showReminder={showReminer}
                closeReminderModal={closeReminderModal}
                reminderData={reminderData}
            />
        </div>
    )
}

export default ShowReminderSection;