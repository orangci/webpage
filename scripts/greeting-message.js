function updateGreeting() {
    const element = document.getElementById("greetingMessage");
    if (element) {
        const now = new Date();
        const hours = now.getHours();

        let greeting;
        if (hours < 12) {
            greeting = "Good morning";
        } else if (hours < 18) {
            greeting = "Good afternoon";
        } else {
            greeting = "Good evening";
        }

        // Update the text content
        element.textContent = greeting;
    }
}

// Update immediately on load
updateGreeting();

// Re-evaluate the greeting every 15 minutes to ensure accuracy
setInterval(updateGreeting, 15 * 60 * 1000);
