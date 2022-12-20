import { Radio, Switch } from 'antd';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';

const RepeatContainer = ({
    repeatFlag,
    methods,
    isEdit,
    selectedAlarm
}) => {

    const { control } = methods;
    const [isRepeat, setIsRepeat] = useState(false);

    useEffect(() => {
        if (!isEdit) {
            methods.setValue('repeat', 'never');
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (repeatFlag) {
            setIsRepeat(false);
        }
    }, [repeatFlag]);

    useEffect(() => {
        if (isEdit) {
            if (selectedAlarm?.alarmRepeat) {
                setIsRepeat(true);
            }
        }
    }, []);

    const handleSwitch = (value) => {
        if (value) {
            methods.setValue('isRepeat', true);
            setIsRepeat(true);
        } else {
            methods.setValue('isRepeat', false);
            setIsRepeat(false);
        }
    };

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>{t('repeat')}</span>
                <div style={{ display: 'flex' }}>
                    <Controller
                        control={control}
                        name="isRepeat"
                        render={({ field: { value } }) => (
                            <Switch
                                onChange={handleSwitch}
                                checked={value}
                                style={{ width: "10%", marginTop: 3 }}
                            />
                        )}
                    />
                    {isRepeat && (
                        <div>
                            <Controller
                                control={control}
                                name="repeat"
                                render={({ field: { onChange, value } }) => (
                                    <Radio.Group
                                        name="radiogroup"
                                        onChange={onChange}
                                        value={value}
                                        style={{
                                            marginLeft: 20,
                                            marginTop: 3,
                                        }}
                                    >
                                        <Radio value={"never"}>{t('never')}</Radio>
                                        <Radio value={"daily"}>{t('daily')}</Radio>
                                        <Radio value={"weekdays"}>{t('weekdays')}</Radio>
                                        <Radio value={"weekends"}>{t('weekends')}</Radio>
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

export default RepeatContainer;