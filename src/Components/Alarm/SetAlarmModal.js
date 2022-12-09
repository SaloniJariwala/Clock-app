import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Switch, Radio, Checkbox } from "antd";
import moment from "moment";
import "../../App.css";
import { AlarmTitleWrapper } from "../style";
import HourContainer from "./SetAlarmForm/HourContainer";
import MinutesContainer from "./SetAlarmForm/MinutesContainer";
import SecondsContainer from "./SetAlarmForm/SecondsContainer";
import CountryContainer from "./SetAlarmForm/CountryContainer";
import AudioContainer from "./SetAlarmForm/AudioContainer";
import defaultAlarmTune from "../../Assets/audios/alarm.mp3";
import TestModal from "./TestModal";

const SetAlarmModal = ({
  showModal,
  closeModal,
  play,
  pause,
  getAlarms,
  callToAlarm,
  storeAlarm,
  settingAlarmAudio,
}) => {
  const date = new Date();

  const [hour, setHour] = useState(date.getHours());
  const [minute, setMinute] = useState(date.getMinutes());
  const [second, setSecond] = useState(date.getSeconds());
  const [country, setCountry] = useState("India");
  const [alarmTitle, setAlarmTitle] = useState("Test Title");
  const [alarmNote, setAlarmNote] = useState("Test Note");
  const [snoozeTime, setSnoozeTime] = useState(300000);
  const [alarmTune, setAlarmTune] = useState(defaultAlarmTune);
  const [alarmVolume, setAlarmVolume] = useState(50);
  const [isSnooze, setIsSnooze] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [testAlarm, setTestAlarm] = useState();
  const [alarmRepeatValue, setAlarmRepeatValue] = useState();
  const [isRepeatAlarm, setIsRepertAlarm] = useState(false);

  const setAlarmDetails = (value, name) => {
    switch (name) {
      case 'country':
        setCountry(value);
        break;

      case 'hour':
        setHour(value);
        break;

      case 'minute':
        setMinute(value);
        break;

      case 'second':
        setSecond(value);
        break;

      case 'title':
        setAlarmTitle(value);
        break;

      case 'note':
        setAlarmNote(value);
        break;

      case 'snooze':
        setSnoozeTime(value);
        break;

      case 'tune':
        setAlarmTune(value);
        break;

      case 'volume':
        setAlarmVolume(value);
        break;

      case 'repeat':
        setAlarmRepeatValue(value);
        break;

      default:
        console.log('Invalid Name');
    }
  };

  useEffect(() => {
    callToAlarm();
    getAlarms();
  }, []);

  const countryWiseSetAlarm = (
    action,
    diffHours = 0,
    diffMins = 0,
    test = ""
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
    const orgDate = fDate.toDate();
    let payload = {
      country: country,
      alarmDate: orgDate,
      originalAlarm: orgDate,
      alarmTitle: alarmTitle,
      alarmNote: alarmNote,
      alarmTune: alarmTune,
      alarmVolume: alarmVolume,
    };
    if (isSnooze) {
      payload = { ...payload, snoozeTime: snoozeTime };
    }
    if (isRepeatAlarm) {
      payload = { ...payload, alarmRepeat: alarmRepeatValue };
    }
    if (test === "isTest") {
      setTestAlarm(payload);
    } else {
      storeAlarm(payload);
      callToAlarm();
    }
  };

  const onTest = () => {
    checkCountry("isTest");
    setShowTestModal(true);
    play();
  };

  const checkCountry = (test = "") => {
    if (alarmTune === 'selected') {
      alert('Please fill all data');
    } else {
      if (test !== 'isTest') {
        setIsSnooze(false);
        setIsRepertAlarm(false);
      }
      switch (country) {
        case "India":
          countryWiseSetAlarm("india", 0, 0, test);
          break;

        case "USA":
          countryWiseSetAlarm("back", 10, 30, test);
          break;

        case "Japan":
          countryWiseSetAlarm("ahead", 3, 30, test);
          break;

        case "Canada":
          countryWiseSetAlarm("back", 10, 30, test);
          break;

        case "Australia":
          countryWiseSetAlarm("ahead", 5, 30, test);
          break;

        case "London":
          countryWiseSetAlarm("back", 5, 30, test);
          break;

        default:
          console.log("Invalid Choice");
      }
    }
  };

  const handleSwitch = (event) => {
    if (event) {
      setIsSnooze(true);
    } else {
      setIsSnooze(false);
    }
  };

  const closeTestModal = () => {
    pause();
    setShowTestModal();
  };

  const onCancel = () => {
    setIsRepertAlarm(false);
    setIsSnooze(false);
    pause();
    closeModal();
  };

  const onRepertAlarm = (e) => {
    if (e.target.checked) {
      setIsRepertAlarm(true);
    } else {
      setIsRepertAlarm(false);
    }
  };

  return (
    <>
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
          <div
            style={{
              display: "flex",
              padding: "0 10px",
              width: "100%",
              marginBottom: "1em",
            }}
          >
            <AudioContainer
              settingAlarmAudio={settingAlarmAudio}
              play={play}
              pause={pause}
              setAlarmDetails={setAlarmDetails}
            />
          </div>
          <div style={{ padding: "0 10px", marginBottom: "1em" }}>
            <label htmlFor="alarm-title">Alarm Title</label>
            <input
              id="alarm-title"
              className="form-control"
              placeholder="Enter Alarm Title"
              onChange={(event) => setAlarmDetails(event.target.value, "title")}
            />
          </div>
          <div style={{ padding: "0 10px", marginBottom: "1em" }}>
            <label htmlFor="alarm-note">Alarm Note</label>
            <textarea
              id="alarm-note"
              className="form-control"
              placeholder="Enter Alarm Note"
              onChange={(event) => setAlarmDetails(event.target.value, "note")}
            ></textarea>
          </div>
          <div style={{ padding: "0 10px", marginBottom: "1em" }}>
            <Form style={{ display: "flex", flexDirection: "column" }}>
              <label> Set Snooze </label>
              <div style={{ display: "flex" }}>
                <Switch
                  onChange={handleSwitch}
                  style={{ width: "10%", marginTop: 3 }}
                />
                {isSnooze && (
                  <>
                    <Radio.Group
                      name="radiogroup"
                      defaultValue={300000}
                      onChange={(event) =>
                        setAlarmDetails(event.target.value, "snooze")
                      }
                      style={{
                        marginLeft: 20,
                        marginTop: 3,
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
          <div style={{ padding: "0 10px", marginBottom: "1em" }}>
            <Checkbox onChange={onRepertAlarm}>Repert Alarm</Checkbox>
            {isRepeatAlarm && (
              <>
                <Radio.Group
                  name="radiogroup"
                  defaultValue={"never"}
                  onChange={(event) =>
                    setAlarmDetails(event.target.value, "repeat")
                  }
                  style={{
                    marginLeft: 20,
                    marginTop: 3,
                  }}
                >
                  <Radio value={"never"}>Never</Radio>
                  <Radio value={"daily"}>Daily</Radio>
                  <Radio value={"weekdays"}>Weekdays</Radio>
                  <Radio value={"weekends"}>Weekends</Radio>
                </Radio.Group>
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <AlarmTitleWrapper>
            <div className="footer-row">
              <Button
                variant="outline-secondary"
                style={{ width: 100 }}
                onClick={onTest}
              >
                Test
              </Button>
              <div>
                <Button
                  variant="outline-danger"
                  style={{ width: 100 }}
                  onClick={onCancel}
                >
                  Cancel
                </Button>
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
      <TestModal
        showTestModal={showTestModal}
        closeTestModal={closeTestModal}
        alarm={testAlarm}
      />
    </>
  );
};

export default SetAlarmModal;
