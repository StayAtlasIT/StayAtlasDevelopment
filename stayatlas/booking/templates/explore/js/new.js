// Show all photos modal functionality
const modal = document.getElementById('photoModal');
const showAllPhotosBtn = document.getElementById('showAllPhotos');
const closeModal = document.querySelector('.close-modal');

if (showAllPhotosBtn && modal && closeModal) {
    showAllPhotosBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Add event listeners for interactive elements
const checkButton = document.querySelector('.check-button');
if (checkButton) {
    checkButton.addEventListener('click', () => {
        alert('Checking availability...');
    });
}

const reportLink = document.querySelector('.report-link');
if (reportLink) {
    reportLink.addEventListener('click', () => {
        alert('Report form would open here');
    });
}

const shareButton = document.querySelector('.action-button:first-child');
if (shareButton) {
    shareButton.addEventListener('click', () => {
        const listingTitle = document.querySelector('.listing-title').textContent;
        const message = encodeURIComponent(`Check out this listing: ${listingTitle}`);
        const whatsappUrl = `https://wa.me/?text=${message}`;
        window.open(whatsappUrl, '_blank');
    });
}

const saveButton = document.querySelector('.action-button:nth-child(2)');
if (saveButton) {
    saveButton.addEventListener('click', () => {
        const icon = saveButton.querySelector('i');
        if (icon) {
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                alert('Property saved to your wishlist!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                alert('Property removed from your wishlist!');
            }
        }
    });
}

// Guest selection functionality
const guestDropdown = document.querySelector('.guest-dropdown');
const guestInput = document.getElementById('guestInput');

if (guestInput) {
    guestInput.addEventListener('click', () => guestDropdown.classList.toggle('active'));
}

document.querySelectorAll('.plus').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        const countSpan = document.getElementById(target + 'Count');
        let count = parseInt(countSpan.textContent);
        count++;
        countSpan.textContent = count;
        updateGuestInput();
    });
});

document.querySelectorAll('.minus').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        const countSpan = document.getElementById(target + 'Count');
        let count = parseInt(countSpan.textContent);
        if (target === 'adults' && count > 1) count--; // Min 1 adult
        if (target === 'kids' && count > 0) count--; // Min 0 kids
        countSpan.textContent = count;
        updateGuestInput();
    });
});

function updateGuestInput() {
    const adults = parseInt(document.getElementById('adultCount').textContent);
    const kids = parseInt(document.getElementById('kidCount').textContent);
    guestInput.value = (adults + kids) + ' Guests';
}

// Responsive header adjustment
const resizeHeader = () => {
    const searchBar = document.querySelector('.search-bar');
    if (searchBar) {
        if (window.innerWidth < 768) {
            searchBar.innerHTML = `
                <div class="mobile-search">
                    <i class="fas fa-search"></i>
                    <span>Where are you going?</span>
                    <div class="search-button">
                        <i class="fas fa-search"></i>
                    </div>
                </div>`;
        } else {
            searchBar.innerHTML = `
                <input type="text" placeholder="Where are you going?" class="input-field">
                <button class="search-button">
                    <i class="fas fa-search"></i>
                </button>`;
        }
    }
};

// Call on load and on resize
window.addEventListener('load', resizeHeader);
window.addEventListener('resize', resizeHeader);


// Call on load and on resize
resizeHeader();
window.addEventListener('resize', resizeHeader);


// Initialize Flatpickr for Check-In and Check-Out inputs
document.addEventListener('DOMContentLoaded', function () {
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');

    // Check-In Calendar
    flatpickr(checkInInput, {
        minDate: "today",
        dateFormat: "Y-m-d",
        onChange: function (selectedDates, dateStr) {
            // Update the minimum date for check-out
            checkOutInput.flatpickr.set('minDate', dateStr);
        }
    });

    // Check-Out Calendar
    flatpickr(checkOutInput, {
        minDate: "today",
        dateFormat: "Y-m-d"
    });
});
  // Map control buttons
  document.getElementById('zoomIn').addEventListener('click', function() {
    alert('Zoom in functionality would be implemented here');
});

document.getElementById('zoomOut').addEventListener('click', function() {
    alert('Zoom out functionality would be implemented here');
});

document.getElementById('fullscreen').addEventListener('click', function() {
    alert('Fullscreen functionality would be implemented here');
});

// Show more buttons
document.getElementById('showMoreLocation').addEventListener('click', function() {
    const locationText = document.querySelector('.location-text p');
    locationText.style.maxHeight = 'none';
    this.style.display = 'none';
    alert('Would show full location description');
});

document.getElementById('showMoreHost').addEventListener('click', function() {
    const hostBio = document.querySelector('.host-bio p');
    hostBio.style.maxHeight = 'none';
    this.style.display = 'none';
    alert('Would show full host bio');
});

document.getElementById('showMoreRules').addEventListener('click', function() {
    alert('Would show more house rules');
});

document.getElementById('showMoreSafety').addEventListener('click', function() {
    alert('Would show more safety information');
});

document.getElementById('addDates').addEventListener('click', function() {
    alert('Would open date picker to add trip dates');
});

// Message host button
document.querySelector('.message-button').addEventListener('click', function() {
    alert('Would open messaging interface to contact the host');
});

// Make map pin pulse
const pinCircle = document.querySelector('.pin-circle');
function pulsatePin() {
    pinCircle.animate([
        { transform: 'scale(1)', opacity: 0.2 },
        { transform: 'scale(1.2)', opacity: 0.1 },
        { transform: 'scale(1)', opacity: 0.2 }
    ], {
        duration: 2000,
        iterations: Infinity
    });
}
pulsatePin();

// Responsive map tooltip
function adjustTooltip() {
    const mapContainer = document.querySelector('.map-container');
    const tooltip = document.querySelector('.map-tooltip');
    if (window.innerWidth < 768) {
        tooltip.style.top = '30%';
    } else {
        tooltip.style.top = '40%';
    }
}

window.addEventListener('resize', adjustTooltip);
adjustTooltip();

// Simulate map loading
window.addEventListener('load', function() {
    const mapImage = document.querySelector('.map-image');
    setTimeout(function() {
        mapImage.style.opacity = '1';
    }, 500);
});
