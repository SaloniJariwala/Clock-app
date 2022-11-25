export const notifyUser = (notificationText = "Notification Enabled") => {
    if (!("Notification" in window)) {
        alert("Browser Not support notification");
    } else if (Notification.permission === "granted") {
        new Notification(notificationText);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                Notification(notificationText);
            }
        });
    }
}