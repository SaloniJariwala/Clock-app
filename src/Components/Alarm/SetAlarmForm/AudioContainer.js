import React from 'react'
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { GrPlay, GrPause } from "react-icons/gr";
import { BsThreeDots } from "react-icons/bs";
import { audioData } from '../../../Data/audioData';
import { useRef } from 'react';
import { Slider } from 'antd';
import { t } from 'i18next';
import { Controller } from 'react-hook-form';

const AudioContainer = ({
    methods,
    isEdit,
    selectedAlarm
}) => {

    const audioRef = useRef();
    const { control } = methods;

    const [audioPlay, setAudioPlay] = useState(true);
    const [audioName, setAudioName] = useState('selected');
    const [volume, setVolume] = useState(50);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setOptions(audioData);
        if (!isEdit) {
            methods.setValue('volume', 50);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (isEdit) {
            setAudioName(selectedAlarm?.alarmTune);
            setVolume(selectedAlarm?.alarmVolume);
        }
    }, [isEdit, selectedAlarm?.alarmTune, selectedAlarm?.alarmVolume]);

    const play = () => {
        audioRef.current.play();
        audioRef.current.volume = parseFloat(volume / 100);
        audioRef.current.loop = true;
    }

    const pause = () => {
        audioRef.current.pause();
    };

    const handleChange = (event) => {
        setAudioName(event.target.value);
        methods.setValue('sound', event.target.value);
        // onChange();
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

    const handleFileChange = (event) => {
        const audio = URL.createObjectURL(event.target.files[0]);
        const newAudio = {
            audioTitle: event.target.files[0].name,
            track: audio
        }
        const array = options;
        array.push(newAudio);
        setOptions(array);
        methods.setValue('sound', audio);
        setAudioName(audio);
    };

    // const handleVolumeChange = (onChange) => {
    //     onChange();
    //     const vol = methods.getValues('volume');
    //     setVolume(vol);
    // }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <span>{t('sound')}</span>
            <div style={{ display: "flex" }}>
                <Controller
                    control={control}
                    name="sound"
                    render={({ field: { onChange, value } }) => (
                        <select
                            className="form-select"
                            id="sound"
                            aria-label="Floating label select example"
                            value={value}
                            onChange={(event) => handleChange(event)}
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
                    )}
                />
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
                <Controller
                    control={control}
                    name="volume"
                    render={({ field: { onChange, value } }) => (
                        <Slider
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
            </div>
        </div>
    )
};

export default AudioContainer;