import React from 'react'
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { GrPlay, GrPause } from "react-icons/gr";

const AudioContainer = ({
    options,
    settingAlarmAudio,
    previewAudio,
    pause
}) => {

    const [audioPlay, setAudioPlay] = useState(false);

    const handleButtonClick = () => {
        setAudioPlay(!audioPlay);
    }

    const handleChange = (event) => {
        settingAlarmAudio(event.target.value);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>Sound</span>
            <div style={{ display: "flex" }}>
                <select
                    className="form-select"
                    id="sound"
                    aria-label="Floating label select example"
                    defaultValue="alarm"
                    // value={country}
                    onChange={handleChange}
                >
                    {options.map((item, index) => (
                        <option
                            key={index}
                            value={item.audioId}
                        >
                            {item.audioTitle}
                        </option>
                    ))}
                </select>
                <Button
                    className="btn"
                    style={{ marginLeft: 10, backgroundColor: 'white', border: '1px solid #ced4da' }}
                    onClick={handleButtonClick}
                >
                    {!audioPlay ? <GrPlay onClick={previewAudio} /> : <GrPause onClick={pause} />}
                </Button>
            </div>
        </div>
    )
}

export default AudioContainer;