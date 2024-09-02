// script.js

function goHome() {
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('cageDetails').style.display = 'none';
    document.getElementById('pregnancyDetails').style.display = 'none';
    document.getElementById('headerTitle').innerHTML = '<strong>RABBIT CAGE </strong>'; // Reset header title
}

function showCageDetails(cageNumber) {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('cageDetails').style.display = 'block';
    loadData(cageNumber);
    // Store the current cage number
    document.getElementById('rabbitForm').dataset.cageNumber = cageNumber;
    // Update the header title to show the cage number
    document.getElementById('headerTitle').innerHTML = `<strong>CAGE ${cageNumber}</strong>`;
}

function togglePregnancyDetails(show) {
    document.getElementById('pregnancyDetails').style.display = show ? 'block' : 'none';
    // Ensure the header title remains unaffected
    let currentTitle = document.getElementById('headerTitle').innerHTML;
    console.log("Current Header Title:", currentTitle);
}

function saveData(event) {
    event.preventDefault();
    const form = document.getElementById('rabbitForm');
    const cageNumber = form.dataset.cageNumber;
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => {
        obj[key] = value;
    });
    localStorage.setItem(`rabbitData${cageNumber}`, JSON.stringify(obj));  // Save using consistent key
    alert('Data saved successfully!');
    goHome();
}

function loadData(cageNumber) {
    let data = JSON.parse(localStorage.getItem(`rabbitData${cageNumber}`)) || {};  // Load using consistent key
    document.getElementById('breed').value = data.breed || '';
    document.getElementById('family').value = data.family || '';
    document.getElementById('birthDate').value = data.birthDate || '';
    document.getElementById('weight').value = data.weight || '';
    if (data.pregnant === "yes") {
        document.querySelector('input[name="pregnant"][value="yes"]').checked = true;
        togglePregnancyDetails(true);
        document.getElementById('matedRabbit').value = data.matedRabbit || '';
        document.getElementById('pregnancyStart').value = data.pregnancyStart || '';
        document.getElementById('dueDate').value = data.dueDate || '';
    } else {
        document.querySelector('input[name="pregnant"][value="no"]').checked = true;
        togglePregnancyDetails(false);
    }
    if (data.foodIntake === "normal") {
        document.querySelector('input[name="foodIntake"][value="normal"]').checked = true;
    } else {
        document.querySelector('input[name="foodIntake"][value="irregular"]').checked = true;
    }
    if (data.mating === "yes") {
        document.querySelector('input[name="mating"][value="yes"]').checked = true;
    } else {
        document.querySelector('input[name="mating"][value="no"]').checked = true;
    }
    document.getElementById('note').value = data.note || '';
}

// Function to handle navigation
function goToIndex() {
    const params = new URLSearchParams(window.location.search);
    const cageNumber = params.get('cage') || 1;
    window.location.href = `index.html?cage=${cageNumber}`;
}

function goToRabbitProfile() {
    const params = new URLSearchParams(window.location.search);
    const cageNumber = params.get('cage') || 1;
    window.location.href = `rabbitinfo.html?cage=${cageNumber}`;
}
