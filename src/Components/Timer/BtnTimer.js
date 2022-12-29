import React from "react";
import { Button } from "react-bootstrap";
import { t } from "i18next";
import { StopWatchWrapper } from "../style";

const BtnTimer = (props) => {
    return (
        <StopWatchWrapper>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                {props.status === 0 ? (
                    <Button
                        variant="outline-success"
                        onClick={() => props.setShowModal(true)}
                        style={{ margin: "40px 0" }}
                    >
                        set Timer
                    </Button>
                ) : (
                    <Button
                        variant="primary"
                        style={{ marginLeft: 10 }}
                        onClick={props.Reset}
                    >
                        {t("reset")}
                    </Button>
                )}

                {props.status === 1 && (
                    <>
                        <Button
                            variant="warning"
                            style={{ marginLeft: 10 }}
                            onClick={props.stop}
                        >
                            stop
                        </Button>
                    </>
                )}

                {props.status === 2 && (
                    <div>
                        <Button
                            variant="danger"
                            style={{ marginLeft: 10 }}
                            onClick={props.resume}
                        >
                            {t("resume")}
                        </Button>
                    </div>
                )}
            </div>
        </StopWatchWrapper>
    );
};

export default BtnTimer;
