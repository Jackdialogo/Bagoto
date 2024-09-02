// script.js

window.onload = function() {
    // Extract cage number from URL
    const params = new URLSearchParams(window.location.search);
    const cageNumber = params.get('cage') || 1;

    // Load rabbit data from localStorage
    const data = JSON.parse(localStorage.getItem(`rabbitData${cageNumber}`)) || {};

    // Update profile details
    document.getElementById('breed').innerText = data.breed || 'Unknown';
    document.getElementById('cage-no').innerText = cageNumber;
    document.getElementById('age').innerText = calculateAge(data.birthDate) || 'Unknown';
    document.getElementById('weight').innerText = data.weight || 'Unknown';
    document.getElementById('gender').innerText = data.pregnant === "yes" ? "Female" : "Male";

    // Update edit link dynamically to point to the correct cage number
    document.getElementById('edit-link').href = `index.html?cage=${cageNumber}`;
}

// Function to calculate age from birth date
function calculateAge(birthDate) {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    // If age is less than 1 year, calculate months
    if (age < 1) {
        const months = (today.getFullYear() - birth.getFullYear()) * 12 + today.getMonth() - birth.getMonth();
        return months + (months > 1 ? ' months' : ' month');
    }

    return age + (age > 1 ? ' years' : ' year');
}
