import React from "react";
import { Divider, Button } from "antd";
import { t } from "i18next";
import { FormProvider, Controller, useForm } from "react-hook-form";
import AudioContainer from "./AudioContainer";
import DateTimeContainer from "./DateTimeContainer";

function DateTimeTimer({ closeModal, setDateTime }) {
    const methods = useForm();
    const { control } = methods;
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(setDateTime)}>
                <DateTimeContainer methods={methods} />
                <AudioContainer methods={methods} />
                <div style={{ padding: "0 10px", marginBottom: "1em" }}>
                    <label htmlFor="title">Title</label>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <input
                                id="title"
                                className="form-control"
                                placeholder={t("enter_timer_title")}
                                onChange={onChange}
                                value={value ?? ""}
                            />
                        )}
                    />
                </div>
                <Divider />
                <Button type="default" onClick={closeModal}>
                    Cancel
                </Button>
                <Button type="primary" htmlType={"submit"}>
                    {t("start")}
                </Button>
            </form>
        </FormProvider>
    );
}

export default DateTimeTimer;
