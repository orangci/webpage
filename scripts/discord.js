document.addEventListener("DOMContentLoaded", () => {
    const userId = "961063229168164864";

    async function fetchAndUpdateDiscord() {
        try {
            const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
            const data = await res.json();

            if (!data.success || !data.data) return;

            const status = data.data.discord_status;
            const activities = data.data.activities || [];

            // Update status badge
            const statusEl = document.getElementById("discord-status");
            if (status !== "offline" && statusEl) {
                statusEl.classList.remove("hidden", "status-success", "status-warning", "status-error");

                let titleText = "orangc is online";
                if (status === "idle") {
                    statusEl.classList.add("status-warning");
                    titleText = "orangc is idle";
                } else {
                    statusEl.classList.add("status-success");
                }
                statusEl.setAttribute("title", titleText);
            }

            // Update custom status
            const customStatus = activities.find(activity => activity.type === 4)?.state;
            const statusTextEl = document.getElementById("discord");
            if (customStatus && statusTextEl) {
                statusTextEl.innerText = customStatus;
            }
        } catch (e) {
            console.error("Failed to fetch Discord status:", e);
        }
    }

    fetchAndUpdateDiscord();
    setInterval(fetchAndUpdateDiscord, 5 * 60 * 1000);
});