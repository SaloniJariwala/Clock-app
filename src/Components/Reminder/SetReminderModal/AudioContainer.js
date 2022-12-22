import React from 'react'
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { GrPlay, GrPause } from "react-icons/gr";
import { BsThreeDots } from "react-icons/bs";
import { audioData } from '../../../Data/audioData';
import { useRef } from 'react';
import { t } from 'i18next';
import { Controller } from 'react-hook-form';

const AudioContainer = ({
    methods,
    isEdit = false,
    selectedAlarm = {}
}) => {

    const innerAudioRef = useRef();
    const { control } = methods;

    const [audioPlay, setAudioPlay] = useState(true);
    const [audioName, setAudioName] = useState('selected');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setOptions(audioData);
        methods.setValue('sound', 'selected');
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (isEdit) {
            setAudioName(selectedAlarm?.alarmTune);
        }
    }, [isEdit, selectedAlarm?.alarmTune]);

    const play = () => {
        innerAudioRef.current.play();
        innerAudioRef.current.loop = true;
    }

    const pause = () => {
        innerAudioRef.current.pause();
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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <span style={{ fontSize: 16 }}>{t('sound')}</span>
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
                            <option value={'selected'} disabled>--{t('select_sound')}--</option>
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
                <audio src={audioName} ref={innerAudioRef} />
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
        </div>
    )
};

export default AudioContainer;