import React from 'react'
import { StopWatchWrapper } from '../style'

const DisplayStopWatch = (props) => {
   
    return (
        <StopWatchWrapper>
            <div style={{fontSize:"42px",fontFamily:"serif"}}>
                <span style={{ margin: "5px" }}>{(props.time.minute >= 10) ? props.time.minute : "0" + props.time.minute}:</span>
                <span style={{ margin: "5px" }}>{(props.time.second >= 10) ? props.time.second : "0" + props.time.second}:</span>
                <span style={{ margin: "5px" }}>{(props.time.milisecond >= 10) ? props.time.milisecond : "0" + props.time.milisecond}</span>
            </div>
            </StopWatchWrapper>
    )
}

export default DisplayStopWatch