import React from 'react';
import { Divider, Modal, Button } from 'antd';
import { t } from 'i18next';
import AudioContainer from './AudioContainer';
import TimeContainer from './TimeContainer';
import { Controller, FormProvider } from "react-hook-form";

const SetTimerModal = ({
    showModal,
    closeModal,
    setTimer,
    methods
}) => {


    const { control } = methods;

    return (
        <Modal
            title={<div className='alarm-modal-title'>Set Timer</div>}
            open={showModal}
            footer={null}
        >
            <Divider />
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(setTimer)}>
                    <TimeContainer methods={methods} />
                    <AudioContainer methods={methods} />
                    <div style={{ padding: "0 10px", marginBottom: "1em" }}>
                        <label htmlFor="title">Title</label>
                        <Controller
                            name='title'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <input
                                    id="title"
                                    className="form-control"
                                    placeholder={t('enter_timer_title')}
                                    onChange={onChange}
                                    value={value ?? ''}
                                />
                            )}
                        />
                    </div>
                    <Divider />
                    <Button type='default' onClick={closeModal}>Cancel</Button>
                    <Button
                        type='primary'
                        htmlType={'submit'}
                    >
                        {t('start')}
                    </Button>
                </form>
            </FormProvider>
        </Modal>
    );
}

export default SetTimerModal;