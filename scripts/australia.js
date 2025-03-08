async function checkIfAustralian() {
    try {
        // Check if the URL contains the parameter
        const urlParams = new URLSearchParams(window.location.search);
        const isUpsideDown = urlParams.get('australia-is-upside-down') === 'true';

        // If the parameter is set to true, add the upside-down classes
        if (isUpsideDown) {
            document.documentElement.classList.add('transform', 'rotate-180');
        } else {
            // Remove upside-down classes if the parameter is false or not present
            document.documentElement.classList.remove('transform', 'rotate-180');
        }

        // Fetch the geolocation data only if the parameter is not set
        if (!urlParams.has('australia-is-upside-down')) {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();

            // Check if the country code is 'AU' (Australia)
            if (data.country === 'AU') {
                // Add classes to the HTML element
                document.documentElement.classList.add('transform', 'rotate-180');

                // Update the URL to include the query parameter
                urlParams.set('australia-is-upside-down', 'true');
                window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
            }
        }
    } catch (error) {
        console.error('Error fetching geolocation data:', error);
    }
}

// Run the function on page load
checkIfAustralian();
