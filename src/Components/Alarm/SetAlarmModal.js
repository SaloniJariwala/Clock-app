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
import timezoneData from "../../Data/timezones.json";

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
  handleEditAlarm,
}) => {


  const [showTestModal, setShowTestModal] = useState(false);
  const [snoozeFlag, setSnoozeFlag] = useState(false);
  const [repeatFlag, setRepeatFlag] = useState(false);

  useEffect(() => {
    callToAlarm();
    getAlarms();
    // eslint-disable-next-line
  }, []);

  const calculateTime = (offset) => {
    const date = new Date();
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const result = new Date(utc + (3600000 * offset));
    return result;
  }

  const getTimezoneOffsetInUtc = () => {
    const date = new Date();
    const dateArr = date.toString().split(' ');
    const gmt = dateArr[5];
    let offset;
    if (gmt.includes('+')) {
      const charArr = gmt.split('+');
      offset = `+${charArr[1]}`;
    } else if (gmt.includes('-')) {
      const charArr = gmt.split('-');
      offset = `-${charArr[1]}`;
    }
    return offset;
  }

  const countryWiseSetAlarm = (payload) => {
    const newDate = new Date();
    newDate.setHours(Number(payload.hour));
    newDate.setMinutes(Number(payload.minute));
    newDate.setSeconds(Number(payload.second));

    const localCountry = timezoneData[Intl.DateTimeFormat().resolvedOptions().timeZone];
    const flag = getTimezoneOffsetInUtc() > (payload.country.timezoneOffset * 100) ? localCountry : payload.country.value;
    let fDate;
    if (localCountry === payload.country.value) {
      fDate = moment(newDate);
    } else {
      if (flag === localCountry) {
        const diffHours = new Date().getHours() - calculateTime(payload.country.timezoneOffset).getHours();
        const diffMins = new Date().getMinutes() - calculateTime(payload.country.timezoneOffset).getMinutes();
        fDate = moment(newDate).add({ hours: diffHours, minutes: diffMins });
      } else {
        const diffHours = calculateTime(payload.country.timezoneOffset).getHours() - new Date().getHours();
        const diffMins = calculateTime(payload.country.timezoneOffset).getMinutes() - new Date().getMinutes();
        fDate = moment(newDate).subtract({ hours: diffHours, minutes: diffMins });
      }
    }
    const orgDate = fDate.toDate();
    let newPayload = {
      country: payload.country,
      alarmDate: orgDate,
      originalAlarm: orgDate,
      alarmTitle: payload.alarmTitle,
      alarmNote: payload.alarmNote,
      alarmTune: payload.sound || defaultAlarmTune,
      alarmVolume: payload.volume,
    };
    if (payload.isSnooze) {
      newPayload = { ...newPayload, snoozeTime: payload.snoozeTime };
    }
    if (payload.isRepeat) {
      newPayload = { ...newPayload, alarmRepeat: payload.repeat };
    }
    if (isEdit) {
      handleEditAlarm(newPayload);
    } else {
      storeAlarm(newPayload);
    }
    callToAlarm();
  };

  const onTest = () => {
    setShowTestModal(true);
    play();
  };

  const closeTestModal = () => {
    pause();
    setShowTestModal();
  };

  const onCancel = () => {
    closeModal();
    setRepeatFlag(false);
    setSnoozeFlag(false);
    pause();
  };

  const handleSubmit = (formData) => {
    closeModal();
    const payload = { ...formData, country: JSON.parse(formData.country) };
    countryWiseSetAlarm(payload);
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
        methods={methods}
      />
    </>
  );
};

export default SetAlarmModal;
