import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../App.css";
import { AlarmTitleWrapper } from "../style";
import HourContainer from "./SetAlarmForm/HourContainer";
import MinutesContainer from "./SetAlarmForm/MinutesContainer";
import SecondsContainer from "./SetAlarmForm/SecondsContainer";
import CountryContainer from "./SetAlarmForm/CountryContainer";
import { countryData } from "../../Data/countryData";
import moment from "moment";
import AudioContainer from "./SetAlarmForm/AudioContainer";
import Form from 'react-bootstrap/Form';
import { Switch, Radio } from 'antd';
import VolumeContainer from "./SetAlarmForm/VolumeContainer";

const SetAlarmModal = ({
    showModal,
    closeModal,
    hourOptions,
    minuteOptions,
    play,
    pause,
    displayAlarm,
    callAlarms,
    callToAlarm,
    storeAlarm,
    setAlarmDetails,
    settingCountryName,
    settingAlarmAudio,
    audioData,
    previewAudio,
    setSnoozeTiming,
    settingSnooze,
    setAlarmAudioTone,
    alarmAudio,
    settingVolume
}) => {
    const date = new Date();

    const [hour, setHour] = useState(date.getHours());
    const [minute, setMinute] = useState(date.getMinutes());
    const [second, setSecond] = useState(date.getSeconds());
    const [country, setCountry] = useState("India");
    const [snoozeSwitch, setSnoozeSwitch] = useState(false)

    const setTime = (value, name) => {
        if (name === "hour") {
            setHour(value);
        } else if (name === "minute") {
            setMinute(value);
        } else {
            setSecond(value);
        }
    };

    useEffect(() => {
        callToAlarm();
        callAlarms();
    }, []);

    const setCountryName = (value) => {
        setCountry(value);
        settingCountryName(value);
    };

    const countryWiseSetAlarm = (
        action,
        diffHours = 0,
        diffMins = 0,
        country,
        gmt
    ) => {
        displayAlarm(hour, minute, second, country, gmt);
        const newDate = new Date();
        newDate.setHours(Number(hour));
        newDate.setMinutes(Number(minute));
        newDate.setSeconds(Number(second));
        let fDate;
        if (action === "back") {
            fDate = moment(newDate).add({ hours: diffHours, minutes: diffMins });
        } else if (action === "ahead") {
            fDate = moment(newDate).subtract({ hours: diffHours, minutes: diffMins });
        } else {
            fDate = moment(newDate);
        }
        storeAlarm(fDate);
        callToAlarm();
    };

    const onTest=()=>{
        console.log("hi");
    }

    const checkCountry = () => {
        switch (country) {
            case "India":
                countryWiseSetAlarm("india", 0, 0, "GMT+5.30");
                break;

            case "USA":
                countryWiseSetAlarm("back", 10, 30, "USA", "GMT-5");
                break;

            case "Japan":
                countryWiseSetAlarm("ahead", 3, 30, "Japan", "GMT+9");
                break;

            case "Canada":
                countryWiseSetAlarm("back", 10, 30, "Canada", "GMT-5");
                break;

            case "Australia":
                countryWiseSetAlarm("ahead", 5, 30, "Australia", "GMT+11");
                break;

            case "London":
                countryWiseSetAlarm("back", 5, 30, "London", "GMT");
                break;

            default:
                console.log("Invalid Choice");
        }
    };

    const handleSwitch = (event) => {
        settingSnooze(event);
        if (event) {
            setSnoozeSwitch(true)
        } else {
            setSnoozeSwitch(false)
        }
    }

    const onCancel = () => {
        pause();
        closeModal();
    }

    return (
        <Modal centered show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <span className="alarm-modal-title">Set Alarm</span>
            </Modal.Header>
            <Modal.Body>
                <div style={{ padding: "0 10px", marginBottom: "1em" }}>
                    <CountryContainer
                        options={countryData}
                        setCountryName={setCountryName}
                    />
                </div>
                <div style={{ display: "flex", width: "100%", marginBottom: "1em" }}>
                    <div style={{ width: "33%", padding: "0 10px" }}>
                        <HourContainer options={hourOptions} setTime={setTime} />
                    </div>
                    <div style={{ width: "33%", padding: "0 10px" }}>
                        <MinutesContainer options={minuteOptions} setTime={setTime} />
                    </div>
                    <div style={{ width: "33%", padding: "0 10px" }}>
                        <SecondsContainer options={minuteOptions} setTime={setTime} />
                    </div>
                </div>
                <div style={{ display: "flex", padding: "0 10px", width: "100%", marginBottom: "1em" }}>
                    <AudioContainer
                        options={audioData}
                        settingAlarmAudio={settingAlarmAudio}
                        play={play}
                        pause={pause}
                        previewAudio={previewAudio}
                        alarmAudio={alarmAudio}
                        setAlarmAudioTone={setAlarmAudioTone}
                    />
                </div>
                <div style={{ display: "flex", padding: "0 10px", width: "100%", marginBottom: "1em" }}>
                    <VolumeContainer settingVolume={settingVolume} />
                </div>
                <div style={{ padding: "0 10px", marginBottom: "1em" }}>
                    <label htmlFor="alarm-title">Alarm Title</label>
                    <input
                        id="alarm-title"
                        className="form-control"
                        placeholder="Enter Alarm Title"
                        onChange={(event) => setAlarmDetails(event.target.value, 'title')}
                    />
                </div>
                <div style={{ padding: "0 10px", marginBottom: "1em" }}>
                    <label htmlFor="alarm-note">Alarm Note</label>
                    <textarea
                        id="alarm-note"
                        className="form-control"
                        placeholder="Enter Alarm Note"
                        onChange={(event) => setAlarmDetails(event.target.value, 'note')}
                    ></textarea>
                </div>
                <div style={{ padding: "0 10px", marginBottom: "1em" }}>
                    <Form style={{ display: 'flex', flexDirection: 'column' }}>
                        <label> Set Snooze </label>
                        <div style={{ display: 'flex' }}>
                            <Switch onChange={handleSwitch} style={{ width: '10%', marginTop: 3 }} />
                            {snoozeSwitch && (
                                <>
                                    <Radio.Group
                                        name="radiogroup"
                                        defaultValue={300000}
                                        onChange={(event) => setSnoozeTiming(event.target.value)}
                                        style={{
                                            marginLeft: 20,
                                            marginTop: 3
                                        }}
                                    >
                                        <Radio value={300000}>5 Minute</Radio>
                                        <Radio value={600000}>10 Minute</Radio>
                                        <Radio value={900000}>15 Minute</Radio>
                                    </Radio.Group>
                                </>
                            )}
                        </div>
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <AlarmTitleWrapper>
                    <div className="footer-row">
                        <Button variant="outline-secondary" style={{ width: 100 }} onClick={onTest}>Test</Button>
                        <div>
                            <Button variant="outline-danger" style={{ width: 100 }} onClick={onCancel}>Cancel</Button>
                            <Button
                                variant="outline-primary"
                                onClick={checkCountry}
                                style={{ marginLeft: 10, width: 100 }}
                            >
                                Start
                            </Button>
                        </div>
                    </div>
                </AlarmTitleWrapper>
            </Modal.Footer>
        </Modal>
    );
};

export default SetAlarmModal;
