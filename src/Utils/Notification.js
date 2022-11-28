export const notifyUser = (notificationText = "Notification Enabled") => {
    if (!("Notification" in window)) {
        alert("Browser Not support notification");
    } else if (Notification.permission === "granted") {
        const notification = new Notification(notificationText);
        notification.onclick = (event) => {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            window.open('http://www.mozilla.org', '_blank');
        }
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                const notification = new Notification(notificationText);
                notification.onclick = (event) => {
                    event.preventDefault(); // prevent the browser from focusing the Notification's tab
                    window.open('http://www.mozilla.org', '_blank');
                }
            }
        });
    }
}