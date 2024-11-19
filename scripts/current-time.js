function updateCurrentTime() {
    const element = document.getElementById("myCurrentTime");
    if (element) {
        const now = new Date();

        // Convert to UTC+3 by adding 3 hours to UTC
        const offset = 3; // UTC+3
        const utc3 = new Date(now.getTime() + offset * 60 * 60 * 1000);

        // Format the time in HH:mm
        const formattedTime = utc3.toISOString().slice(11, 16); // HH:mm format

        // Update text content
        element.textContent = formattedTime;

        // Set the datetime attribute
        element.setAttribute("datetime", utc3.toISOString());
    }
}

// Update immediately on load
updateCurrentTime();

// Schedule updates at the start of each minute
const now = new Date();
const delay = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
setTimeout(() => {
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000); // Update every minute
}, delay);
