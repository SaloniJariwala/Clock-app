import React from "react";
import { Button } from "react-bootstrap";
import {t} from "i18next"
import { StopWatchWrapper } from "../style";

const Stopwatch = (props) => {
    return (
        <StopWatchWrapper>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                {props.status === 0 && (
                    <>
                        <Button variant="danger" onClick={props.start}>
                           {t('start')}
                        </Button>
                        <Button
                            variant="primary"
                            onClick={props.resetHistory}
                            style={{ marginLeft: 10 }}
                        >
                           {t('reset_histrory')}
                        </Button>
                    </>
                )}

                {props.status === 1 && props.isRunning && (
                    <div>
                        <Button
                            variant="warning"
                            style={{ marginLeft: 10 }}
                            onClick={props.stop}
                        >
                              {t('stop')}
                        </Button>
                        <Button
                            variant="success"
                            style={{ marginLeft: 10 }}
                            onClick={props.lap}
                        >
                              {t('lap')}
                        </Button>
                    </div>
                )}

                {props.status === 2 && (
                    <div>
                        <Button
                            variant="danger"
                            style={{ marginLeft: 10 }}
                            onClick={props.resume}
                        >
                               {t('resume')}
                        </Button>
                        <Button
                            variant="primary"
                            style={{ marginLeft: 10 }}
                            onClick={props.reset}
                        >
                             {t('reset')}
                        </Button>
                    </div>
                )}
            </div>
        </StopWatchWrapper>
    );
};

export default Stopwatch;
