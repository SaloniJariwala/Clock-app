import { Button, Divider, Modal } from 'antd';
import React from 'react'
import { Form } from 'react-bootstrap';
import { Controller, FormProvider } from 'react-hook-form';
import AudioContainer from "./AudioContainer";
import CategoryContainer from './CategoryContainer';

const SetReminderModal = ({
    showSetReminder,
    closeSetReminderModal,
    methods,
    storeReminder,
    resetForm,
    callToReminder
}) => {

    const { control, handleSubmit } = methods;

    const handleFormSubmit = (formData) => {
        storeReminder(formData);
        callToReminder();
        closeSetReminderModal();
        resetForm();
    }

    return (
        <>
            <Modal
                title={<span style={{ fontSize: 20, fontWeight: 'bold', color: '#1677ff' }}>Set Reminder</span>}
                open={showSetReminder}
                onCancel={closeSetReminderModal}
                footer={null}
            >
                <Divider />
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div style={{ marginBottom: '1em' }}>
                            <span style={{ fontSize: 16 }}>Date & Time</span>
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
                        <div style={{ marginBottom: '1em' }}>
                            <AudioContainer methods={methods} />
                        </div>
                        <div style={{ display: 'flex', marginBottom: '1em', width: '100%' }}>
                            <div style={{ width: '70%', marginRight: 10 }}>
                                <span style={{ fontSize: 16 }}>Reminder Title</span>
                                <Controller
                                    control={control}
                                    name="title"
                                    render={({ field: { onChange, value } }) => (
                                        <input
                                            id="reminder-title"
                                            className="form-control"
                                            placeholder="Enter Reminder Title"
                                            value={value || ''}
                                            onChange={onChange}
                                        />
                                    )}
                                />
                            </div>
                            <CategoryContainer methods={methods} />
                        </div>
                        <div style={{ marginBottom: '1em' }}>
                            <span style={{ fontSize: 16 }}>Reminder Note</span>
                            <Controller
                                control={control}
                                name="note"
                                render={({ field: { onChange, value } }) => (
                                    <textarea
                                        id="reminder-note"
                                        className="form-control"
                                        placeholder="Enter Reminder Note"
                                        onChange={onChange}
                                        value={value}
                                    ></textarea>
                                )}
                            />
                        </div>
                        <Divider />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                type='default'
                                htmlType='cancel'
                                onClick={closeSetReminderModal}
                            >
                                Cancel
                            </Button>
                            <Button
                                type='primary'
                                htmlType='submit'
                                style={{ marginLeft: 10, color: 'white' }}
                            >
                                Set
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </Modal>
        </>
    )
}

export default SetReminderModal;