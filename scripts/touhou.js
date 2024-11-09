document.addEventListener("DOMContentLoaded", () => {
    const quotes = [
        "You, clothed in red and white! Don't cause problems in my study.",
        "Are you the kind of person I can eat?",
        "When you lose your way, you can blame the fairies.",
        "I'll cryo-freeze you together with some English beef!",
        "Do any creatures outside of humans even have 10 fingers?",
        "Come back two hours earlier.",
        "Your time is mine...",
        "The moon tonight is red. You will know death."
    ];
    
    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        document.getElementById("quote").innerText = quotes[randomIndex];
    }

    displayRandomQuote();
});
