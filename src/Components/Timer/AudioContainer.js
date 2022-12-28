import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { GrPause, GrPlay } from 'react-icons/gr';
import { BsThreeDots } from 'react-icons/bs';
import { audioData } from '../../Data/audioData';
import { Controller } from 'react-hook-form';

const AudioContainer = ({ methods }) => {

    const { control } = methods;

    const audioRef = useRef();

    const [audioPlay, setAudioPlay] = useState(true);
    const [audioName, setAudioName] = useState('selected');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setOptions(audioData);
        methods.setValue('sound', 'selected');
        // eslint-disable-next-line
    }, []);

    const play = () => {
        audioRef.current.play();
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
        methods.setValue('sound', event.target.value);
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
        <>
            <div style={{ display: "flex", width: "100%", marginBottom: "1em" }}>
                <div style={{ padding: "0 10px", width: '100%' }}>
                    <Form.Label>{t('sound')}</Form.Label>
                    <div style={{ display: 'flex' }}>
                        <Controller
                            name='sound'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <select
                                    className="form-select"
                                    id="sound"
                                    aria-label="Floating label select example"
                                    value={value}
                                    onChange={(event) => handleChange(event)}
                                >
                                    <option value={'selected'} disabled={true}>--{t('select_sound')}--</option>
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
                </div>
            </div>
        </>
    )
}

export default AudioContainer;