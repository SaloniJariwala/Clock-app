import React from 'react'
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { GrPlay, GrPause } from "react-icons/gr";
import { BsThreeDots } from "react-icons/bs";
import { audioData } from '../../../Data/audioData';
import { useRef } from 'react';
import { Slider } from 'antd';
import { t } from 'i18next';

const AudioContainer = ({
    settingAlarmAudio,
    setAlarmDetails
}) => {

    const audioRef = useRef();


    const [audioPlay, setAudioPlay] = useState(true);
    const [audioName, setAudioName] = useState('selected');
    const [volume, setVolume] = useState(50);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setOptions(audioData);
    }, []);

    const play = () => {
        audioRef.current.play();
        audioRef.current.volume = volume / 100;
        audioRef.current.loop = true;
    }

    const pause = () => {
        audioRef.current.pause();
    };

    const handleButtonClick = () => {
        if (audioName === 'selected') {
            alert('Please Select Sound first');
        } else {
            setAudioPlay(!audioPlay);
            if (audioPlay) {
                play();
            } else {
                pause();
            }
        }
    };

    const handleChange = (event) => {
        setAudioName(event.target.value);
        setAlarmDetails(event.target.value, 'tune');
        settingAlarmAudio(event.target.value, 'local');
    };

    const handleFileChange = (event) => {
        const audio = URL.createObjectURL(event.target.files[0]);
        const newAudio = {
            audioTitle: event.target.files[0].name,
            track: audio
        }
        const array = options;
        array.push(newAudio);
        setOptions(array);
        setAudioName(audio);
        settingAlarmAudio(event.target.files[0], 'browse');
    };

    const handleVolumeChange = (value) => {
        pause();
        setVolume(value);
        play();
        setAlarmDetails(value, 'volume');
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <span>{t('sound')}</span>
            <div style={{ display: "flex" }}>
                <select
                    className="form-select"
                    id="sound"
                    aria-label="Floating label select example"
                    value={audioName}
                    onChange={handleChange}
                >
                    <option value={'selected'}>--{t('select_sound')}--</option>
                    {audioData?.map((item, index) => (
                        <option
                            key={index}
                            value={item.track}
                        >
                            {item.audioTitle}
                        </option>
                    ))}
                </select>
                <audio src={audioName} ref={audioRef} />
                <Button
                    className="btn"
                    style={{ marginLeft: 10, backgroundColor: 'white', border: '1px solid #ced4da' }}
                    onClick={handleButtonClick}
                >
                    {!audioPlay ? <GrPause /> : <GrPlay />}
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
            <div style={{ width: '100%' }}>
                <span>{t('volume')}</span>
                <Slider defaultValue={50} onChange={handleVolumeChange} />
            </div>
        </div>
    )
};

export default AudioContainer;