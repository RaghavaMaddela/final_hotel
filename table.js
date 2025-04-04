// Get the modal and close button
const modal = document.getElementById("reservationModal");
const closeBtn = document.querySelector(".close-btn");
const reservationForm = document.getElementById("reservationForm");
const detailsForm = document.getElementById("detailsForm");
const confirmationMessage = document.getElementById("confirmationMessage");
const confirmationDetails = document.getElementById("confirmationDetails");

// Get all reserve buttons
const reserveButtons = document.querySelectorAll(".reserveBtn");
let selectedTable = null;

// Event listener for reserve button
reserveButtons.forEach(button => {
    button.addEventListener("click", function() {
        const row = this.closest('tr');
        const tableId = row.dataset.tableId;
        const status = row.querySelector('.status');
        
        if (status.textContent === 'Available') {
            // Reset previous selection
            if (selectedTable) {
                document.querySelector(`tr[data-table-id="${selectedTable}"] .reserveBtn`).disabled = false;
            }
            
            // Update current selection
            selectedTable = tableId;
            this.disabled = true;
            status.textContent = 'Selected';
            status.classList.remove('available');
            status.classList.add('reserved');
        }
    });
});

// Handle reservation form submission
detailsForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    if (!selectedTable) {
        alert('Please select a table first!');
        return;
    }

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const people = document.getElementById('people').value;
    const tableRow = document.querySelector(`tr[data-table-id="${selectedTable}"]`);
    const seats = tableRow.querySelector('td:nth-child(2)').textContent;

    if (parseInt(people) > parseInt(seats)) {
        alert(`This table only seats ${seats} people. Please select a different table or adjust the number of people.`);
        return;
    }

    // Update table status
    tableRow.querySelector('.status').textContent = 'Reserved';
    tableRow.querySelector('.reserveBtn').disabled = true;

    // Show confirmation message
    confirmationDetails.innerHTML = `
        <strong>Reservation Details:</strong><br>
        Name: ${name}<br>
        Date: ${date}<br>
        Time: ${time}<br>
        Number of People: ${people}<br>
        Table Number: ${selectedTable}
    `;
    confirmationMessage.style.display = 'block';

    // Reset form
    detailsForm.reset();
    selectedTable = null;
});

// Add date validation
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;

// Add time validation
const timeInput = document.getElementById('time');
timeInput.addEventListener('change', function() {
    const selectedDate = dateInput.value;
    const selectedTime = this.value;
    
    if (selectedDate === today) {
        const now = new Date();
        const currentTime = now.getHours().toString().padStart(2, '0') + ':' + 
                          now.getMinutes().toString().padStart(2, '0');
        
        if (selectedTime < currentTime) {
            alert('Please select a future time for today\'s reservations.');
            this.value = '';
        }
    }
});
