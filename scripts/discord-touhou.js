document.addEventListener("DOMContentLoaded", () => {
    const userId = "961063229168164864";
    const elementId = "discord-touhou";
    const fallbackQuotes = [
        "You, clothed in red and white! Don't cause problems in my study.",
        "Are you the kind of person I can eat?",
        "When you lose your way, you can blame the fairies.",
        "I'll cryo-freeze you together with some English beef!",
        "Do any creatures outside of humans even have 10 fingers?",
        "Come back two hours earlier.",
        "Your time is mine...",
        "The moon tonight is red. You will know death.",
        "That was a pointless encounter with a pointless person.",
        "Unfortunately, I'm pretty good at dodging.",
        "Oh, is that so..."
    ];

    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
        document.getElementById(elementId).innerText = fallbackQuotes[randomIndex];
    }

    async function fetchDiscordStatus() {
        try {
            const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
            if (!response.ok) throw new Error("Failed to fetch status");

            const data = await response.json();
            const activities = data?.data?.activities || [];
            const customStatus = activities.find(activity => activity.type === 4)?.state;

            // Update the element with the custom status or keep the fallback quote
            if (customStatus) {
                document.getElementById(elementId).innerText = customStatus;
            }
        } catch (error) {
            console.error("Error fetching Discord custom status:", error);
        }
    }

    // Set a placeholder quote immediately
    displayRandomQuote();

    // Fetch the actual status and update it if available
    fetchDiscordStatus();

    // Refresh every 5 minutes
    setInterval(fetchDiscordStatus, 5 * 60 * 1000);
});
