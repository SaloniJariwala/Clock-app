import { Radio, Switch } from 'antd';
import { t } from 'i18next';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';

const SnoozeContainer = ({
    snoozeFlag,
    methods,
    isEdit,
    selectedAlarm
}) => {

    const { control } = methods;
    const [isSnooze, setIsSnooze] = useState(false);

    useEffect(() => {
        if (!isEdit) {
            methods.setValue('snoozeTime', 300000);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (isEdit) {
            if (selectedAlarm?.snoozeTime) {
                setIsSnooze(true);
            }
        }
    }, []);

    useEffect(() => {
        if (snoozeFlag) {
            setIsSnooze(false);
        }
    }, [snoozeFlag]);

    const handleSwitch = (value) => {
        if (value) {
            methods.setValue('isSnooze', true);
            setIsSnooze(true);
        } else {
            methods.setValue('isSnooze', false);
            setIsSnooze(false);
        }
    };

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>{t('set_snooze')}</span>
                <div style={{ display: 'flex' }}>
                    <Controller
                        control={control}
                        name="isSnooze"
                        render={({ field: { value } }) => (
                            <Switch
                                onChange={handleSwitch}
                                checked={value}
                                style={{ width: "10%", marginTop: 3 }}
                            />
                        )}
                    />
                    {isSnooze && (
                        <div>
                            <Controller
                                control={control}
                                name="snoozeTime"
                                render={({ field: { onChange, value } }) => (
                                    <Radio.Group
                                        name="radiogroup"
                                        value={value}
                                        onChange={onChange}
                                        style={{
                                            marginLeft: 20,
                                            marginTop: 3,
                                        }}
                                    >
                                        <Radio value={300000}>{t('5_minute')}</Radio>
                                        <Radio value={600000}>{t('10_minute')}</Radio>
                                        <Radio value={900000}>{t('15_minute')}</Radio>
                                    </Radio.Group>
                                )}
                            />

                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default SnoozeContainer;