import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../App.css";
import { AlarmTitleWrapper } from "./style";
import HourContainer from "./SetAlarmForm/HourContainer";
import MinutesContainer from "./SetAlarmForm/MinutesContainer";
import SecondsContainer from "./SetAlarmForm/SecondsContainer";
import { notifyUser } from "../Utils/Notification";
import CountryContainer from "./SetAlarmForm/CountryContainer";
import { countryData } from "../Data/countryData";
import moment from "moment";

const SetAlarmModal = ({
    showModal,
    closeModal,
    hourOptions,
    minuteOptions,
    play,
    displayAlarm,
    callAlarms,

}) => {

    const date = new Date();
    let id = undefined;
    const [hour, setHour] = useState(date.getHours());
    const [minute, setMinute] = useState(date.getMinutes());
    const [second, setSecond] = useState(date.getSeconds());
    const [country, setCountry] = useState('India');
    const [alarmName, setAlarmName] = useState('');
    const [alarmNote, setAlarmNote] = useState('');


    // useEffect(() => {
    //     const allAlarms = JSON.parse(localStorage.getItem('Alarms')) || [];
    //     const currentTimestamp = Date.now();
    //     let newList = allAlarms.filter((item) => item.alarmTimestamp > currentTimestamp);
    //     let nearestAlarm;
    //     if (newList.length > 1) {
    //         for (let i = 0; i < newList.length; i++) {
    //             for (let j = 0; j <= i; j++) {
    //                 debugger
    //                 if (newList[j].alarmTimestamp < newList[i].alarmTimestamp) {
    //                     debugger
    //                     nearestAlarm = newList[j];
    //                     debugger
    //                 }
    //             }
    //         }
    //     } else {
    //         debugger
    //         nearestAlarm = newList[0];
    //         debugger
    //     }
    //     callToAlarm(nearestAlarm?.alarmTimestamp);
    // }, [])

    const setTime = (value, name) => {
        if (name === 'hour') {
            setHour(value);
        } else if (name === 'minute') {
            setMinute(value);
        } else {
            setSecond(value);
        }
    }

    const setCountryName = (name) => {
        setCountry(name);
    }

    const callToAlarm = () => {
        const allAlarms = JSON.parse(localStorage.getItem('Alarms')) || [];
        const currentTimestamp = Date.now();
        let newList = allAlarms.filter((item) => item.alarmTimestamp > currentTimestamp);
        let nearestAlarm;
        if (newList.length > 1) {
            for (let i = 0; i < newList.length; i++) {
                for (let j = 0; j <= i; j++) {
                    debugger
                    if (newList[j].alarmTimestamp >= newList[i].alarmTimestamp) {
                        debugger
                        nearestAlarm = newList[j];
                        debugger
                    }
                }
            }
        } else {
            debugger
            nearestAlarm = newList[0];
            debugger
        }
        const currTimestamp = Date.now();
        let diff;
        diff = nearestAlarm?.alarmTimestamp - currTimestamp;
        debugger

        if (diff >= 0) {
            debugger
            id = setTimeout(() => {
                debugger
                console.log(id, "id");
                debugger
                notifyUser(alarmName, alarmNote);
                play();
                callAlarms();
            }, diff);

        }
    }

    // const ringAlarm = () => {
    //     const allAlarms = JSON.parse(localStorage.getItem('Alarms')) || [];
    //     debugger
    //     const currentTimestamp = Date.now();
    //     let newList = allAlarms.filter((item) => item.alarmTimestamp > currentTimestamp);
    //     let nearestAlarm;
    //     debugger
    //     if (newList.length > 1) {
    //         for (let i = 0; i < newList.length; i++) {
    //             debugger
    //             for (let j = 0; j <= i; j++) {
    //                 debugger
    //                 if (newList[j].alarmTimestamp < newList[i].alarmTimestamp) {
    //                     debugger
    //                     nearestAlarm = newList[j];
    //                     debugger
    //                 }
    //             }
    //         }
    //     } else {
    //         debugger
    //         nearestAlarm = newList[0];
    //         debugger
    //     }
    //     debugger
    //     const difference = nearestAlarm.alarmTimestamp - Date.now();
    //     debugger
    //     callToAlarm(difference, nearestAlarm.title, nearestAlarm.note);
    // }

    const storeAlarm = (alarm) => {
        debugger
        const allAlarms = JSON.parse(localStorage.getItem('Alarms')) || [];
        debugger
        const date = alarm.toDate();
        debugger
        const alarmTimestamp = date.getTime();
        debugger
        let newAlarms = allAlarms;
        debugger

        const newAlarm = {
            timeoutId: id,
            alarmTimestamp: alarmTimestamp,
            title: alarmName,
            note: alarmNote,
            country: country
        };
        debugger
        newAlarms.push(newAlarm);
        debugger
        localStorage.setItem('Alarms', JSON.stringify(newAlarms));
        closeModal();
        debugger
        callAlarms();
    }


    // const setAlarm = () => {
    //     debugger
    //     displayAlarm(hour, minute, second, 'India', 'GMT+5.30');
    //     const alarm = new Date();
    //     alarm.setHours(Number(hour));
    //     alarm.setMinutes(Number(minute));
    //     alarm.setSeconds(Number(second));
    //     debugger
    //     storeAlarm(alarm);
    //     debugger
    //     ringAlarm();
    // }

    const countryWiseSetAlarm = (action, diffHours = 0, diffMins = 0, country, gmt) => {
        displayAlarm(hour, minute, second, country, gmt);
        debugger
        let fDate;
        const newDate = new Date();
        newDate.setHours(Number(hour));
        newDate.setMinutes(Number(minute));
        newDate.setSeconds(Number(second));
        debugger
        if (action === 'back') {
            debugger
            fDate = moment(newDate).add({ hours: diffHours, minutes: diffMins });
        } else if (action === 'ahead') {
            debugger
            fDate = moment(newDate).subtract({ hours: diffHours, minutes: diffMins });
        } else {
            fDate = moment(newDate);
        }
        debugger
        storeAlarm(fDate);
        debugger
        callToAlarm();
        // const forDate = fDate.toDate();
        // debugger
        // const timestamp = forDate.getTime();
        // callToAlarm(timestamp);
    }

    const checkCountry = () => {
        switch (country) {
            case 'India':
                // setAlarm();
                countryWiseSetAlarm('india', 0, 0, 'GMT+5.30')
                break;

            case 'USA':
                countryWiseSetAlarm('back', 10, 30, 'USA', 'GMT-5');
                break;

            case 'Japan':
                countryWiseSetAlarm('ahead', 3, 30, 'Japan', 'GMT+9');
                break;

            case 'Canada':
                countryWiseSetAlarm('back', 10, 30, 'Canada', 'GMT-5');
                break;

            case 'Australia':
                countryWiseSetAlarm('ahead', 5, 30, 'Australia', 'GMT+11');
                break;

            case 'London':
                countryWiseSetAlarm('back', 5, 30, 'London', 'GMT');
                break;

            default:
                console.log('Invalid Choice');
        }
    }

    return (
        <Modal
            centered
            show={showModal}
            onHide={closeModal}
        >
            <Modal.Header closeButton>
                <span className="alarm-modal-title">Set Alarm</span>
            </Modal.Header>
            <Modal.Body>
                <div style={{ padding: '0 10px', marginBottom: '1em' }}>
                    <CountryContainer options={countryData} setCountryName={setCountryName} />
                </div>
                <div style={{ display: 'flex', width: '100%', marginBottom: '1em' }}>
                    <div style={{ width: '33%', padding: '0 10px' }}>
                        <HourContainer options={hourOptions} setTime={setTime} />
                    </div>
                    <div style={{ width: '33%', padding: '0 10px' }}>
                        <MinutesContainer options={minuteOptions} setTime={setTime} />
                    </div>
                    <div style={{ width: '33%', padding: '0 10px' }}>
                        <SecondsContainer options={minuteOptions} setTime={setTime} />
                    </div>
                </div>
                <div style={{ padding: '0 10px', marginBottom: '1em' }}>
                    <label htmlFor="alarm-title">Alarm Title</label>
                    <input
                        id="alarm-title"
                        className="form-control"
                        placeholder="Enter Alarm Title"
                        onChange={(event) => setAlarmName(event.target.value)}
                    />
                </div>
                <div style={{ padding: '0 10px', marginBottom: '1em' }}>
                    <label htmlFor="alarm-note">Alarm Note</label>
                    <textarea
                        id="alarm-note"
                        className="form-control"
                        placeholder="Enter Alarm Note"
                        onChange={(event) => setAlarmNote(event.target.value)}
                    ></textarea>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <AlarmTitleWrapper>
                    <div className="footer-row">
                        <Button onClick={play}>Test</Button>
                        <div>
                            <Button onClick={closeModal}>Cancel</Button>
                            <Button style={{ background: 'rebeccapurple', color: 'white' }} onClick={checkCountry}>Start</Button>
                        </div>
                    </div>
                </AlarmTitleWrapper>
            </Modal.Footer>
        </Modal >
    );
};

export default SetAlarmModal;