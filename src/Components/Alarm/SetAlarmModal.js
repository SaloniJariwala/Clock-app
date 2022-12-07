import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../App.css";
import { AlarmTitleWrapper } from "../style";
import HourContainer from "./SetAlarmForm/HourContainer";
import MinutesContainer from "./SetAlarmForm/MinutesContainer";
import SecondsContainer from "./SetAlarmForm/SecondsContainer";
import CountryContainer from "./SetAlarmForm/CountryContainer";
import moment from "moment";
import AudioContainer from "./SetAlarmForm/AudioContainer";
import Form from 'react-bootstrap/Form';
import { Switch, Radio } from 'antd';
import VolumeContainer from "./SetAlarmForm/VolumeContainer";
import defaultAlarmTune from "../../Assets/audios/alarm.mp3";
import { useDispatch, useSelector } from "react-redux";
import { setAllAlarmDetails } from "../../Redux/Actions/SetAlarmModalActions";

const SetAlarmModal = ({
    closeModal,
    play,
    pause,
    callAlarms,
    callToAlarm,
    storeAlarm,
    settingAlarmAudio,
    audioData,
    setSnoozeTiming,
    setAlarmAudioTone,
    settingVolume,
    setSnoozeModal,
}) => {

    const date = new Date();

    const dispatch = useDispatch();
    const { showModal } = useSelector((state) => state.setAlarmModalReducer);

    const [hour, setHour] = useState(date.getHours());
    const [minute, setMinute] = useState(date.getMinutes());
    const [second, setSecond] = useState(date.getSeconds());
    const [country, setCountry] = useState("India");
    const [alarmTitle, setAlarmTitle] = useState('Test Title');
    const [alarmNote, setAlarmNote] = useState('Test Note');
    const [snoozeTime, setSnoozeTime] = useState(300000);
    const [alarmTune, setAlarmTune] = useState(defaultAlarmTune);
    const [alarmVolume, setAlarmVolume] = useState(50);
    const [isSnooze, setIsSnooze] = useState(false);

    const setAlarmDetails = (value, name) => {
        if (name === 'country') {
            setCountry(value);
        } else if (name === 'hour') {
            setHour(value);
        } else if (name === 'minute') {
            setMinute(value);
        } else if (name === 'second') {
            setSecond(value);
        } else if (name === 'title') {
            setAlarmTitle(value);
        } else if (name === 'note') {
            setAlarmNote(value);
        } else if (name === 'snooze') {
            setSnoozeTime(value);
        } else if (name === 'tune') {
            setAlarmTune(value);
        } else if (name === 'volume') {
            setAlarmVolume(value);
        }
    }

    useEffect(() => {
        callToAlarm();
        callAlarms();
    }, []);

    const countryWiseSetAlarm = (
        action,
        diffHours = 0,
        diffMins = 0,
    ) => {

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
        debugger
        const orgDate = fDate.toDate();
        debugger
        let payload = {
            country: country,
            alarmDate: orgDate,
            alarmTitle: alarmTitle,
            alarmNote: alarmNote,
            alarmTune: alarmTune,
            alarmVolume: alarmVolume
        };
        debugger
        if (isSnooze) {
            payload = { ...payload, snoozTime: snoozeTime };
        }
        debugger
        dispatch(setAllAlarmDetails(payload));
        debugger
        storeAlarm();
        callToAlarm();
    };

    const onTest = () => {
        setSnoozeModal(true)
        callToAlarm();
        callAlarms();
        play();
    }

    const checkCountry = () => {
        switch (country) {
            case "India":
                countryWiseSetAlarm("india", 0, 0);
                break;

            case "USA":
                countryWiseSetAlarm("back", 10, 30);
                break;

            case "Japan":
                countryWiseSetAlarm("ahead", 3, 30);
                break;

            case "Canada":
                countryWiseSetAlarm("back", 10, 30);
                break;

            case "Australia":
                countryWiseSetAlarm("ahead", 5, 30);
                break;

            case "London":
                countryWiseSetAlarm("back", 5, 30);
                break;

            default:
                console.log("Invalid Choice");
        }
    };

    const handleSwitch = (event) => {
        if (event) {
            setIsSnooze(true);
        } else {
            setIsSnooze(false);
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
                    <CountryContainer setAlarmDetails={setAlarmDetails} />
                </div>
                <div style={{ display: "flex", width: "100%", marginBottom: "1em" }}>
                    <div style={{ width: "33%", padding: "0 10px" }}>
                        <HourContainer setAlarmDetails={setAlarmDetails} />
                    </div>
                    <div style={{ width: "33%", padding: "0 10px" }}>
                        <MinutesContainer setAlarmDetails={setAlarmDetails} />
                    </div>
                    <div style={{ width: "33%", padding: "0 10px" }}>
                        <SecondsContainer setAlarmDetails={setAlarmDetails} />
                    </div>
                </div>
                <div style={{ display: "flex", padding: "0 10px", width: "100%", marginBottom: "1em" }}>
                    <AudioContainer
                        options={audioData}
                        settingAlarmAudio={settingAlarmAudio}
                        play={play}
                        pause={pause}
                        setAlarmAudioTone={setAlarmAudioTone}
                        setAlarmDetails={setAlarmDetails}
                    />
                </div>
                <div style={{ display: "flex", padding: "0 10px", width: "100%", marginBottom: "1em" }}>
                    <VolumeContainer settingVolume={settingVolume} setAlarmDetails={setAlarmDetails} />
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
                            {isSnooze && (
                                <>
                                    <Radio.Group
                                        name="radiogroup"
                                        defaultValue={300000}
                                        onChange={(event) => setSnoozeTiming(event.target.value, 'snooze')}
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