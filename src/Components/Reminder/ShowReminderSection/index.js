import { t } from 'i18next';
import React, { useState } from 'react';
import { DisplayButton } from '../style';
import ShowReminderModal from './ShowReminderModal';

const ShowReminderSection = () => {

    const [showReminer, setShowReminder] = useState(false);

    const closeReminderModal = () => {
        setShowReminder(false);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
                <div style={{ margin: 10 }}>
                    <DisplayButton
                        variant="outline-primary"
                        onClick={() => setShowReminder(true)}
                    >
                        {t('todays_reminders')}
                    </DisplayButton>
                </div>
                <div style={{ margin: 10 }}>
                    <DisplayButton
                        variant="outline-warning"
                        onClick={() => setShowReminder(true)}
                    >
                        {t('scheduled_reminders')}
                    </DisplayButton>
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ margin: 10 }}>
                    <DisplayButton
                        variant="outline-secondary"
                        onClick={() => setShowReminder(true)}
                    >
                        {t('all_reminders')}
                    </DisplayButton>
                </div>
                <div style={{ margin: 10 }}>
                    <DisplayButton
                        variant="outline-info"
                        onClick={() => setShowReminder(true)}
                    >
                        {t('completed')}
                    </DisplayButton>
                </div>
            </div>
            <ShowReminderModal
                showReminder={showReminer}
                closeReminderModal={closeReminderModal}
            />
        </div>
    )
}

export default ShowReminderSection;