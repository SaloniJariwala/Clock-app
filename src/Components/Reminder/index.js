import React, { useState, useRef, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons/lib/icons";
import { v4 as uuidv4 } from "uuid";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ListSection from "./ListSection";
import SetReminderModal from "./SetReminderModal/index";
import ShowReminderSection from "./ShowReminderSection";
import { notifyUser } from "../../Utils/Notification";
import DisplayReminder from "./DisplayReminder";
import defaultSound from "../../Assets/audios/alarm.mp3";

const Reminder = () => {

    const audioRef = useRef();
    const methods = useForm();

    const [showSetReminder, setshowSetReminder] = useState(false);
    const [showDisplayReminder, setshowDisplayReminder] = useState(false);
    const [reminderAudio, setReminderAudio] = useState(defaultSound);
    const [currentReminder, setCurrentReminder] = useState();
    const [categoryWiseData, setCategoryWiseData] = useState();
    const [selectedReminder, setSelectedReminders] = useState();
    const [newReminders, setNewReminders] = useState();
    const [activePanel, setActivePanel] = useState(false);
    const [stored, setStored] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        fetchReminders();
    }, []);

    const fetchReminders = () => {
        const allReminders = JSON.parse(localStorage.getItem("Reminders")) || [];
        setNewReminders(allReminders);
        const reminders = {
            workReminders: allReminders.filter((item) => item.category === "1"),
            personalReminders: allReminders.filter((item) => item.category === "2"),
            birthdayReminders: allReminders.filter((item) => item.category === "3"),
            festivalReminders: allReminders.filter((item) => item.category === "4"),
            otherReminders: allReminders.filter((item) => item.category === "5"),
        };
        setCategoryWiseData(reminders);
        setActivePanel(allReminders[allReminders?.length - 1]?.category);
    };

    const resetForm = () => {
        methods.setValue("dateTime", new Date());
        methods.setValue("sound", "selected");
        methods.setValue("title", "");
        methods.setValue("category", "selected");
        methods.setValue("note", "");
    };

    const closeSetReminderModal = () => {
        setshowSetReminder(false);
    };

    const closeDisplayReminderModal = () => {
        setshowDisplayReminder(false);
    };

    const play = () => {
        audioRef.current.play();
        audioRef.current.loop = true;
    };

    const pause = () => {
        audioRef.current.pause();
    };

    const handleDeleteReminder = (id) => {
        const allReminders = JSON.parse(localStorage.getItem("Reminders")) || [];
        const reminderToBeDeleted = allReminders.find(
            (item) => item.reminderId === id
        );
        clearTimeout(reminderToBeDeleted.timeoutId);
        const remainingReminders = allReminders.filter(
            (item) => item.reminderId !== id
        );
        localStorage.setItem("Reminders", JSON.stringify(remainingReminders));
        fetchReminders();
        setStored(!stored);
    };

    const storeReminder = (payload) => {
        const allReminders = JSON.parse(localStorage.getItem("Reminders")) || [];
        let newReminder;
        newReminder = {
            reminderId: uuidv4(),
            timestamp: new Date(payload.dateTime).getTime(),
            sound: payload.sound,
            title: payload.title,
            category: payload.category,
            note: payload.note,
        };
        allReminders.push(newReminder);
        localStorage.setItem("Reminders", JSON.stringify(allReminders));
        setStored(!stored);
        fetchReminders();
    };

    const callToReminder = () => {
        const allReminders = JSON.parse(localStorage.getItem("Reminders")) || [];
        const currentTimestamp = Date.now();
        let newList = allReminders.filter(
            (item) => item.timestamp > currentTimestamp
        );
        let nearestReminder;
        if (newList.length > 1) {
            for (let i = 0; i < newList.length; i++) {
                for (let j = 0; j <= i; j++) {
                    if (newList[j].timestamp >= newList[i].timestamp) {
                        nearestReminder = newList[j];
                    }
                }
            }
        } else {
            nearestReminder = newList[0];
        }
        const currTimestamp = Date.now();
        let diff;
        diff = nearestReminder?.timestamp - currTimestamp;
        if (diff >= 0) {
            const id = setTimeout(() => {
                setCurrentReminder(nearestReminder);
                setReminderAudio(nearestReminder?.sound);
                play();
                notifyUser(nearestReminder?.title, nearestReminder?.note);
                setshowDisplayReminder(true);
            }, diff);
            const allReminders = JSON.parse(localStorage.getItem("Reminders"));
            allReminders.forEach((item) => {
                if (item.timestamp === nearestReminder.timestamp) {
                    item.timeoutId = id;
                }
            });
            localStorage.setItem("Reminders", JSON.stringify(allReminders));
        }
    };

    const handleEdit = (id) => {
        setIsEdit(true);
        const allReminders = JSON.parse(localStorage.getItem("Reminders")) || [];
        const oldReminders = allReminders.filter((item) => item.reminderId === id);
        setSelectedReminders(oldReminders[0]);
        methods.reset({ dateTime: new Date(oldReminders[0].timestamp).toISOString() });
        methods.setValue("sound", oldReminders[0].sound);
        methods.setValue("title", oldReminders[0].title);
        methods.setValue("note", oldReminders[0].note);
        methods.setValue("category", oldReminders[0].category);
        setshowDisplayReminder(false);
        setshowSetReminder(true);
    };

    const editReminder = (reminderDetails) => {
        const allReminders = JSON.parse(localStorage.getItem("Reminders")) || [];
        const oldReminders = allReminders.filter(
            (item) => item.reminderId !== selectedReminder.reminderId
        );
        const editedReminder = {
            reminderId: selectedReminder.reminderId,
            timestamp: new Date(reminderDetails.dateTime).getTime(),
            sound: reminderDetails.sound,
            title: reminderDetails.title,
            category: reminderDetails.category,
            note: reminderDetails.note,
        };
        oldReminders.push(editedReminder);
        localStorage.setItem("Reminders", JSON.stringify(oldReminders));
        closeSetReminderModal();
        setIsEdit(false);
        setStored(!stored);
        fetchReminders();
    };

    return (
        <div>
            <ShowReminderSection
                stored={stored}
                handleDeleteReminder={handleDeleteReminder}
                handleEdit={handleEdit}
                editReminder={editReminder}
                isEdit={isEdit}
                allReminder={newReminders}
            />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "30px 0",
                }}
            >
                <Button
                    variant="success"
                    onClick={() => setshowSetReminder(true)}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <PlusOutlined style={{ marginRight: 5 }} />
                    <span>Add New Reminder</span>
                </Button>
            </div>
            <ListSection
                allReminder={categoryWiseData}
                activePanel={activePanel}
                handleDeleteReminder={handleDeleteReminder}
                handleEdit={handleEdit}
            />
            <audio id="reminderAudio" src={reminderAudio} ref={audioRef} />
            <SetReminderModal
                showSetReminder={showSetReminder}
                closeSetReminderModal={closeSetReminderModal}
                methods={methods}
                storeReminder={storeReminder}
                resetForm={resetForm}
                callToReminder={callToReminder}
                isEdit={isEdit}
                editReminder={editReminder}
            />
            <DisplayReminder
                closeDisplayReminderModal={closeDisplayReminderModal}
                showDisplayReminder={showDisplayReminder}
                pause={pause}
                currentReminder={currentReminder}
            />
        </div>
    );
};

export default Reminder;
