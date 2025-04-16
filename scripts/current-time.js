function updateCurrentTime() {
    const element = document.getElementById("myCurrentTime");
    if (element) {
        const now = new Date();
        const offset = 3; // UTC+3
        const utc3 = new Date(now.getTime() + offset * 60 * 60 * 1000);
        const formattedTime = utc3.toISOString().slice(11, 16); // HH:mm format
        element.textContent = formattedTime;
        element.setAttribute("datetime", utc3.toISOString());
    }
}

updateCurrentTime();

const now = new Date();
const delay = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
setTimeout(() => {
    updateCurrentTime();
    setInterval(updateCurrentTime, 60 * 1000);
}, delay);
