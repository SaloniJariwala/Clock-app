import React, { useEffect } from "react";
import { Divider, Modal, Button } from "antd";
import { useForm, FormProvider } from "react-hook-form";

const TimerModal = ({ showTimerModal, pause }) => {
    const methods = useForm();
    const getTime = JSON.parse(localStorage?.getItem("timer"));
    useEffect(() => { }, [getTime]);
    return (
        <Modal
            title={<div className="alarm-modal-title">Timer Modal</div>}
            open={showTimerModal}
            footer={null}
        >
            <Divider />
            <FormProvider {...methods}>
                <form>
                    <div style={{ padding: "0 10px", marginBottom: "1em" }}>
                        <label htmlFor="title">
                            {getTime?.title ? getTime?.title : "Test Title"}
                        </label>
                    </div>
                    <Divider />
                    <Button type="default" onClick={pause}>
                        OK
                    </Button>
                </form>
            </FormProvider>
        </Modal>
    );
};

export default TimerModal;
