import React from 'react';
import { t } from 'i18next';
import { Controller } from 'react-hook-form';

const AlarmTitleContainer = ({ methods }) => {

    const { control } = methods;

    return (
        <div>
            <span>{t('alarm_title')}</span>
            <Controller
                control={control}
                name="alarmTitle"
                render={({ field: { onChange, value } }) => (
                    <input
                        id="alarm-title"
                        className="form-control"
                        placeholder={t('enter_alarm_title')}
                        value={value || ''}
                        onChange={onChange}
                    />
                )}
            />
        </div>
    )
}

export default AlarmTitleContainer;