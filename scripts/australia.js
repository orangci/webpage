// australia.js

// Function to check if the user is in Australia
async function checkIfAustralian() {
    try {
        // Fetch the geolocation data
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        // Check if the country code is 'AU' (Australia)
        if (data.country === 'AU') {
            // Add classes to the HTML element
            document.documentElement.classList.add('transform', 'rotate-180');

            // Update the URL to include the query parameter
            const url = new URL(window.location);
            url.searchParams.set('australia-is-upside-down', 'true');
            window.history.replaceState({}, '', url);
        }
    } catch (error) {
        console.error('Error fetching geolocation data:', error);
    }
}

// Run the function on page load
checkIfAustralian();
