document.addEventListener('DOMContentLoaded', function () {
    const expandedSearch = document.getElementById('expandedSearch');
    const mobileSearchIcon = document.getElementById('mobileSearchIcon');
    const mainSearchBar = document.getElementById('mainSearchBar');
    const userControls = document.querySelector('.user-controls');
    const guestsBtn = document.getElementById('guestsBtn');
    const guestSelection = document.getElementById('guestSelection');

    // Toggle expanded search visibility
    function toggleExpandedSearch() {
        expandedSearch.classList.toggle('show');
    }

    // Toggle guest selection visibility
    function toggleGuestSelection() {
        guestSelection.classList.toggle('show');
    }

    // Event listener for mobile search icon
    if (mobileSearchIcon) {
        mobileSearchIcon.addEventListener('click', toggleExpandedSearch);
    }

    // Event listener for search container
    if (mainSearchBar) {
        mainSearchBar.addEventListener('click', toggleExpandedSearch);
    }

    // Event listener for user controls
    if (userControls) {
        userControls.addEventListener('click');
    }

    // Event listener for guests button
    if (guestsBtn) {
        guestsBtn.addEventListener('click', toggleGuestSelection);
    }

    // Initialize Flatpickr for check-in and check-out inputs
    flatpickr("#checkIn", {
        dateFormat: "Y-m-d",
        minDate: "today",
        onChange: function(selectedDates, dateStr, instance) {
            console.log("Check-in date selected:", dateStr);
        }
    });

    flatpickr("#checkOut", {
        dateFormat: "Y-m-d",
        minDate: "today",
        onChange: function(selectedDates, dateStr, instance) {
            console.log("Check-out date selected:", dateStr);
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const guestInput = document.getElementById('guestInput');
    const guestPopup = document.getElementById('guestPopup');

    guestInput.addEventListener('click', function () {
        guestPopup.style.display = guestPopup.style.display === 'none' ? 'block' : 'none';
    });

    window.addEventListener('click', function (event) {
        if (!guestInput.contains(event.target) && !guestPopup.contains(event.target)) {
            guestPopup.style.display = 'none';
        }
    });
});

function clearGuestDetails() {
    document.getElementById('adultsCount').value = 2;
    document.getElementById('childrenCount').value = 0;
    document.getElementById('roomsCount').value = 1;
}

function applyAndSearch() {
    const adults = document.getElementById('adultsCount').value;
    const children = document.getElementById('childrenCount').value;
    const rooms = document.getElementById('roomsCount').value;
    // Implement the search logic here using the selected values
    guestPopup.style.display = 'none';
    alert(`Searching for ${adults} adults, ${children} children, in ${rooms} rooms.`);
} 
