import React from 'react';
import { t } from 'i18next';
import { Controller } from 'react-hook-form';

const AlarmNoteContainer = ({ methods }) => {

    const { control } = methods;

    return (
        <div>
            <span>{t('alarm_note')}</span>
            <Controller
                control={control}
                name="alarmNote"
                render={({ field: { onChange, value } }) => (
                    <textarea
                        id="alarm-note"
                        className="form-control"
                        placeholder={t('enter_alarm_note')}
                        onChange={onChange}
                        value={value}
                    ></textarea>
                )}
            />
        </div>
    )
}

export default AlarmNoteContainer;