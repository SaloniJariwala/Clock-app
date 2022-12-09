import React from "react";
import { StopWatchWrapper } from "../style";
import { Button } from "react-bootstrap";

const Stopwatch = (props) => {
    return (
        <StopWatchWrapper>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                {props.status === 0 && (
                    <>
                        <Button variant="danger" onClick={props.start}>
                            Start
                        </Button>
                        <Button
                            variant="primary"
                            onClick={props.resetHistory}
                            style={{ marginLeft: 10 }}
                        >
                            Reset Histrory
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
                            Stop
                        </Button>
                        <Button
                            variant="success"
                            style={{ marginLeft: 10 }}
                            onClick={props.lap}
                        >
                            Lap
                        </Button>
                        <Button
                            variant="primary"
                            style={{ marginLeft: 10 }}
                            onClick={props.reset}
                        >
                            Reset
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
                            Resume
                        </Button>
                        <Button
                            variant="success"
                            style={{ marginLeft: 10 }}
                            onClick={props.reset}
                        >
                            Reset
                        </Button>
                    </div>
                )}
            </div>
        </StopWatchWrapper>
    );
};

export default Stopwatch;
