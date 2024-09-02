function goToRabbitProfile() {
    // Extract the current cage number from the URL parameters
    const params = new URLSearchParams(window.location.search);
    const cageNumber = params.get('cage') || 1;

    // Redirect to the rabbit profile page with the cage number as a query parameter
    window.location.href = `rabbitinfo.html?cage=${cageNumber}`;
}
