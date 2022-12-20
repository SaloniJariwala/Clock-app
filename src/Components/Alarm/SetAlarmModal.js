import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Divider } from "antd";
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
import { t } from "i18next";
import AlarmTitleContainer from "./SetAlarmForm/AlarmTitleContainer";
import AlarmNoteContainer from "./SetAlarmForm/AlarmNoteContainer";
import SnoozeContainer from "./SetAlarmForm/SnoozeContainer";
import { FormProvider } from "react-hook-form";
import RepeatContainer from "./SetAlarmForm/RepeatContainer";

const SetAlarmModal = ({
  methods,
  showModal,
  closeModal,
  play,
  pause,
  getAlarms,
  callToAlarm,
  storeAlarm,
  isEdit,
  selectedAlarm,
  resetForm,
  handleEditAlarm
}) => {

  const [snoozeFlag, setSnoozeFlag] = useState(false);
  const [repeatFlag, setRepeatFlag] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [testAlarm, setTestAlarm] = useState();

  useEffect(() => {
    callToAlarm();
    getAlarms();
    // eslint-disable-next-line
  }, []);

  const countryWiseSetAlarm = (
    action,
    diffHours = 0,
    diffMins = 0,
    test = "",
    formData
  ) => {
    const newDate = new Date();
    newDate.setHours(Number(formData.hour));
    newDate.setMinutes(Number(formData.minute));
    newDate.setSeconds(Number(formData.second));
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
      country: formData.country,
      alarmDate: orgDate,
      originalAlarm: orgDate,
      alarmTitle: formData.alarmTitle,
      alarmNote: formData.alarmNote,
      alarmTune: formData.sound || defaultAlarmTune,
      alarmVolume: formData.volume,
    };
    if (formData.isSnooze) {
      payload = { ...payload, snoozeTime: formData.snoozeTime };
    }
    if (formData.isRepeat) {
      payload = { ...payload, alarmRepeat: formData.repeat };
    }
    if (test === "isTest") {
      setTestAlarm(payload);
    } else {
      if (isEdit) {
        handleEditAlarm(payload);
      } else {
        storeAlarm(payload);
      }
      callToAlarm();
    }
  };

  const onTest = () => {
    checkCountry("isTest");
    setShowTestModal(true);
    play();
  };

  const checkCountry = (formData, test = "") => {
    switch (formData.country) {
      case "India":
        countryWiseSetAlarm("india", 0, 0, test, formData);
        break;

      case "USA":
        countryWiseSetAlarm("back", 10, 30, test, formData);
        break;

      case "Japan":
        countryWiseSetAlarm("ahead", 3, 30, test, formData);
        break;

      case "Canada":
        countryWiseSetAlarm("back", 10, 30, test, formData);
        break;

      case "Australia":
        countryWiseSetAlarm("ahead", 5, 30, test, formData);
        break;

      case "London":
        countryWiseSetAlarm("back", 5, 30, test, formData);
        break;

      default:
        console.log("Invalid Choice");
    }
  };

  const closeTestModal = () => {
    pause();
    setShowTestModal();
  };

  const onCancel = () => {
    closeModal();
    resetForm();
    setRepeatFlag(true);
    setSnoozeFlag(true);
    pause();
  };

  const handleSubmit = (formData) => {
    closeModal();
    checkCountry(formData);
  }

  return (
    <>
      <Modal centered show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <span className="alarm-modal-title">{isEdit ? t('edit_alarm') : t('set_alarm')}</span>
        </Modal.Header>
        <Modal.Body>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <div style={{ padding: "0 10px", marginBottom: "1em" }}>
                <CountryContainer methods={methods} isEdit={isEdit} />
              </div>
              <div style={{ display: "flex", width: "100%", marginBottom: "1em" }}>
                <div style={{ width: "33%", padding: "0 10px" }}>
                  <HourContainer methods={methods} isEdit={isEdit} />
                </div>
                <div style={{ width: "33%", padding: "0 10px" }}>
                  <MinutesContainer methods={methods} isEdit={isEdit} />
                </div>
                <div style={{ width: "33%", padding: "0 10px" }}>
                  <SecondsContainer methods={methods} isEdit={isEdit} />
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
                <AudioContainer methods={methods} isEdit={isEdit} selectedAlarm={selectedAlarm} />
              </div>
              <div style={{ padding: "0 10px", marginBottom: "1em" }}>
                <AlarmTitleContainer methods={methods} isEdit={isEdit} />
              </div>
              <div style={{ padding: "0 10px", marginBottom: "1em" }}>
                <AlarmNoteContainer methods={methods} isEdit={isEdit} />
              </div>
              <div style={{ padding: "0 10px", marginBottom: "1em" }}>
                <SnoozeContainer snoozeFlag={snoozeFlag} methods={methods} isEdit={isEdit} selectedAlarm={selectedAlarm} />
              </div>
              <div style={{ padding: "0 10px", marginBottom: "1em" }}>
                <RepeatContainer repeatFlag={repeatFlag} methods={methods} isEdit={isEdit} selectedAlarm={selectedAlarm} />
              </div>
              <Divider />
              <AlarmTitleWrapper>
                <div className="footer-row">
                  <Button
                    variant="outline-secondary"
                    style={{ width: 100 }}
                    onClick={onTest}
                  >
                    {t('test')}
                  </Button>
                  <div>
                    <Button
                      variant="outline-danger"
                      style={{ width: 100 }}
                      onClick={onCancel}
                    >
                      {t('cancel')}
                    </Button>
                    <Button
                      variant="outline-primary"
                      // onClick={checkCountry}
                      type="submit"
                      style={{ marginLeft: 10, width: 100 }}
                    >
                      {isEdit ? t('update') : t('start')}
                    </Button>
                  </div>
                </div>
              </AlarmTitleWrapper>
            </form>
          </FormProvider>
        </Modal.Body>
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
