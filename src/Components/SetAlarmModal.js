import { useDebugValue, useState } from "react";
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
    displayAlarm
}) => {

    const date = new Date();

    const [hour, setHour] = useState(date.getHours());
    const [minute, setMinute] = useState(date.getMinutes());
    const [second, setSecond] = useState(date.getSeconds());
    const [country, setCountry] = useState('India');
    const [gmt, setGmt] = useState();

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

    const setGmtTime = (GMT) => {
        setGmt(GMT);
    }

    const callToAlarm = (difference) => {
        if (difference >= 0) {
            setTimeout(() => {
                notifyUser("It's time now...!!!");
                play();
            }, difference);
        }
    }

    const setAlarm = () => {
        displayAlarm(hour, minute, second, 'India', 'GMT+5.30');
        const curr = new Date();
        curr.setHours(Number(hour));
        curr.setMinutes(Number(minute));
        curr.setSeconds(Number(second));
        const newD = new Date();
        const diff = curr - newD;
        closeModal();
        callToAlarm(diff);
    }

    const countryWiseSetAlarm = (action, diffHours = 0, diffMins = 0, country, gmt) => {
        displayAlarm(hour, minute, second, country, gmt);
        let fDate;
        const newDate = new Date();
        if (action === 'back') {
            newDate.setHours(Number(hour));
            newDate.setMinutes(Number(minute));
            newDate.setSeconds(Number(second));
            fDate = moment(newDate).add({ hours: diffHours, minutes: diffMins });
        } else {
            newDate.setHours(Number(hour));
            newDate.setMinutes(Number(minute));
            newDate.setSeconds(Number(second));
            fDate = moment(newDate).subtract({ hours: diffHours, minutes: diffMins });
        }
        const date = new Date();
        let diff;
        if (action === 'back') {
            diff = fDate - date;
        } else {
            diff = fDate - date;
        }
        closeModal();
        callToAlarm(diff);
    }

    const checkCountry = () => {
        switch (country) {
            case 'India':
                setAlarm();
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
                    <CountryContainer options={countryData} setCountryName={setCountryName} setGmtTime={setGmtTime} />
                </div>
                <div style={{ display: 'flex', width: '100%' }}>
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