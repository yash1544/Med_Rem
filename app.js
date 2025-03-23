// app.js
document.getElementById('setReminderBtn').addEventListener('click', function() {
    const medicineName = document.getElementById('medicineName').value;
    const reminderTime = document.getElementById('reminderTime').value;
    const reminderMessage = document.getElementById('reminderMessage');

    if (medicineName && reminderTime) {
        reminderMessage.textContent = `Reminder set for ${medicineName} at ${reminderTime}.`;
        
        // Request notification permission from the user
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }

        // Start the reminder check
        setInterval(function() {
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            if (currentTime === reminderTime) {
                sendNotification(medicineName);
            }
        }, 60000);  // Check every minute
    } else {
        alert('Please enter both medicine name and time.');
    }
});

// Function to send notification
function sendNotification(medicineName) {
    if (Notification.permission === "granted") {
        new Notification(`Time to take your medicine: ${medicineName}`);
    }
}
