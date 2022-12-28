import React from 'react';
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';

function DateTimeContainer({ methods }) {
    const { control } = methods;
    return (
        <>
            <div style={{ display: "flex", width: "100%", marginBottom: "1em" }}>
                <div style={{ width: "100%", padding: "0 10px" }}>
                    <Form.Label>Date & Time</Form.Label>
                    <Controller
                        name='dateTime'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Form.Control
                                type={'datetime-local'}
                                id='datetime'
                                onChange={onChange}
                                value={value ?? new Date()}
                            />
                        )}
                    />

                </div>
            </div>
        </>
    )
}

export default DateTimeContainer