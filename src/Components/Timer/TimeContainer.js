import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { t } from 'i18next';
import { Controller } from 'react-hook-form';

const TimeContainer = ({ methods }) => {

    const { control } = methods;

    useEffect(() => {
        methods.setValue('hour', 0);
        methods.setValue('minute', 0);
        methods.setValue('second', 0);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div style={{ display: "flex", width: "100%", marginBottom: "1em" }}>
                <div style={{ width: "33%", padding: "0 10px" }}>
                    <Form.Label>{t('hour')}</Form.Label>
                    <Controller
                        name='hour'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Form.Control
                                type="number"
                                min={0}
                                max={23}
                                value={value ?? 0}
                                onChange={onChange}
                            />
                        )}
                    />

                </div>
                <div style={{ width: "33%", padding: "0 10px" }}>
                    <Form.Label>{t('minute')}</Form.Label>
                    <Controller
                        name='minute'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Form.Control
                                type="number"
                                value={value ?? 0}
                                min={0}
                                max={59}
                                onChange={onChange}
                            />
                        )}
                    />

                </div>
                <div style={{ width: "33%", padding: "0 10px" }}>
                    <Form.Label>{t('second')}</Form.Label>
                    <Controller
                        name='second'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Form.Control
                                type="number"
                                value={value ?? 0}
                                min={0}
                                max={59}
                                onChange={onChange}
                            />
                        )}
                    />

                </div>
            </div>
        </>
    );
};

export default TimeContainer;