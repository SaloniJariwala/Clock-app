import React from 'react'
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { GrPlay, GrPause } from "react-icons/gr";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setIsAudioPause, setIsAudioPlay } from '../../../Redux/Actions/AudioActions';

const AudioContainer = ({
    options,
    settingAlarmAudio,
    pause,
    play,
    setAlarmAudioTone,
    setAlarmDetails
}) => {

    const { isAudioPlay } = useSelector((state) => state.audioReducer);

    const dispatch = useDispatch();
    const [audioPlay, setAudioPlay] = useState(false);
    const [audioName, setAudioName] = useState('');

    const handleButtonClick = () => {
        setAudioPlay(!audioPlay);
    };

    const handleChange = (event) => {
        setAudioName(event.target.value);
        setAlarmDetails(event.target.value, 'tune');
        settingAlarmAudio(event.target.value, 'local');
    };

    useEffect(() => {
        if (isAudioPlay) {
            play();
        } else {
            pause();
        }
    }, [isAudioPlay]);

    const handleAudioPlay = () => {
        dispatch(setIsAudioPlay());
    }

    const handleAudioPause = () => {
        dispatch(setIsAudioPause());
    }

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
                    {!audioPlay ? <GrPlay onClick={handleAudioPlay} /> : <GrPause onClick={handleAudioPause} />}
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