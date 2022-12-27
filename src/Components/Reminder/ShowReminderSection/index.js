import { t } from "i18next";
import React, { useState } from "react";
import { useEffect } from "react";
import { DisplayButton } from "../style";
import ShowReminderModal from "./ShowReminderModal";

const ShowReminderSection = ({
  stored,
  handleDeleteReminder,
  handleEdit,
  isEdit,
  editReminder,
  allReminder
}) => {
  const [showReminer, setShowReminder] = useState(false);
  const [reminderData, setReminderData] = useState([]);
  const [todayReminders, setTodayReminders] = useState([]);
  const [scheduledReminders, setScheduledReminders] = useState([]);
  const [allReminders, setAllReminders] = useState([]);
  const [completedReminders, setCompletedReminders] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (isEdit) {
      setShowReminder(false);
    }
  }, [isEdit]);

  const closeReminderModal = () => {
    setShowReminder(false);
  };

  const getAndSetReminders = () => {
    setTodayReminders(
      allReminder?.filter(
        (item) => new Date(item.timestamp).getDate() === new Date().getDate()
      )
    );
    setScheduledReminders(
      allReminder?.filter((item) => item.timestamp > Date.now())
    );
    setAllReminders(allReminder);
    setCompletedReminders(
      allReminder?.filter((item) => item.timestamp < Date.now())
    );
  };

  useEffect(() => {
    getAndSetReminders();
    // eslint-disable-next-line
  }, [allReminder]);

  const handleClick = (name) => {
    getAndSetReminders();
    switch (name) {
      case "Today":
        setTitle(name);
        setReminderData(todayReminders);
        break;

      case "Scheduled":
        setTitle(name);
        setReminderData(scheduledReminders);
        break;

      case "All":
        setTitle(name);
        setReminderData(allReminders);
        break;

      case "Completed":
        setTitle(name);
        setReminderData(completedReminders);
        break;

      default:
        console.log("Invalid Choice");
    }
    setShowReminder(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <div style={{ margin: 10 }}>
          <DisplayButton
            variant="outline-primary"
            onClick={() => handleClick("Today")}
          >
            {t("todays_reminders")}
          </DisplayButton>
        </div>
        <div style={{ margin: 10 }}>
          <DisplayButton
            variant="outline-warning"
            onClick={() => handleClick("Scheduled")}
          >
            {t("scheduled_reminders")}
          </DisplayButton>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ margin: 10 }}>
          <DisplayButton
            variant="outline-secondary"
            onClick={() => handleClick("All")}
          >
            {t("all_reminders")}
          </DisplayButton>
        </div>
        <div style={{ margin: 10 }}>
          <DisplayButton
            variant="outline-info"
            onClick={() => handleClick("Completed")}
          >
            {t("completed")}
          </DisplayButton>
        </div>
      </div>
      <ShowReminderModal
        title={title}
        showReminder={showReminer}
        closeReminderModal={closeReminderModal}
        reminderData={reminderData}
        handleDeleteReminder={handleDeleteReminder}
        handleEdit={handleEdit}
        editReminder={editReminder}
      />
    </div>
  );
};

export default ShowReminderSection;
