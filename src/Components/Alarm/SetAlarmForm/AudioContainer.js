import React from 'react'
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { GrPlay, GrPause } from "react-icons/gr";
import { BsThreeDots } from "react-icons/bs";

const AudioContainer = ({
    options,
    settingAlarmAudio,
    previewAudio,
    pause,
    setAlarmAudioTone,
    alarmAudio
}) => {

    const [audioPlay, setAudioPlay] = useState(false);
    const [audioName, setAudioName] = useState(alarmAudio);

    const handleButtonClick = () => {
        setAudioPlay(!audioPlay);
    };

    const handleChange = (event) => {
        setAudioName(event.target.value);
        settingAlarmAudio(event.target.value, 'local');
    };

    const handleFileChange = (event) => {
        setAudioName(event.target.files[0].name);
        setAlarmAudioTone(event.target.files[0].name);
        settingAlarmAudio(event.target.files[0], 'browse')
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>Sound</span>
            <div style={{ display: "flex" }}>
                <select
                    className="form-select"
                    id="sound"
                    aria-label="Floating label select example"
                    value={audioName}
                    onChange={handleChange}
                >
                    {options.map((item, index) => (
                        <option
                            key={index}
                            value={item.track}
                        >
                            {item.audioTitle}
                        </option>
                    ))}
                    {audioName && (
                        <option value={audioName}>{audioName}</option>
                    )}
                </select>
                <Button
                    className="btn"
                    style={{ marginLeft: 10, backgroundColor: 'white', border: '1px solid #ced4da' }}
                    onClick={handleButtonClick}
                >
                    {!audioPlay ? <GrPlay onClick={previewAudio} /> : <GrPause onClick={pause} />}
                </Button>
                <Button
                    className="btn"
                    style={{
                        marginLeft: 10,
                        backgroundColor: 'white',
                        border: '1px solid #ced4da',
                        display: 'flex',
                        alignItems: 'center',
                        color: 'black',
                        position: 'relative',
                        overflow: 'hidden',
                        fontSize: 25,
                        cursor: 'pointer'
                    }}
                >
                    <BsThreeDots />
                    <input
                        type={"file"}
                        accept={"audio/*"}
                        onChange={(event) => handleFileChange(event)}
                        style={{
                            cursor: 'pointer',
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            opacity: 0
                        }}
                    />
                </Button>
            </div>
        </div>
    )
};

export default AudioContainer;