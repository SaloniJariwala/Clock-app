import React from 'react';
import { Form } from 'react-bootstrap';
import { t } from 'i18next';

const TimeContainer = ({ setTimerDetails }) => {
    return (
        <>
            <div style={{ display: "flex", width: "100%", marginBottom: "1em" }}>
                <div style={{ width: "33%", padding: "0 10px" }}>
                    <Form.Label>{t('hour')}</Form.Label>
                    <Form.Control
                        type="number"
                        defaultValue={10}
                        min={0}
                        max={23}
                        onChange={(event) => setTimerDetails(event.target.value, 'hour')}
                    />
                </div>
                <div style={{ width: "33%", padding: "0 10px" }}>
                    <Form.Label>{t('minute')}</Form.Label>
                    <Form.Control
                        type="number"
                        defaultValue={10}
                        min={0}
                        max={59}
                        onChange={(event) => setTimerDetails(event.target.value, 'minute')}
                    />
                </div>
                <div style={{ width: "33%", padding: "0 10px" }}>
                    <Form.Label>{t('second')}</Form.Label>
                    <Form.Control
                        type="number"
                        defaultValue={10}
                        min={0}
                        max={59}
                        onChange={(event) => setTimerDetails(event.target.value, 'second')}
                    />
                </div>
            </div>
        </>
    )
}

export default TimeContainer;