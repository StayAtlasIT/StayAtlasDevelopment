document.addEventListener("DOMContentLoaded", function () {
    const applyButton = document.querySelector(".apply-btn");
    const datePicker = document.querySelector("#datePicker");
    const totalAmountElement = document.querySelector(".total-amount");

    let guestsSelected = false;
    let datesSelected = false;

    // Initialize Flatpickr for date selection
    flatpickr("#datePicker", {
        mode: "range",
        minDate: "today",
        dateFormat: "Y-m-d",
        disableMobile: true,
        onClose: function (selectedDates) {
            if (selectedDates.length === 2) {
                datesSelected = true;
                checkConditionsAndCalculatePrice();
            }
        }
    });

    // Guest Selector Logic
    const guestField = document.getElementById("guestField");
    const guestSelector = document.getElementById("guestSelector");
    const guestDisplay = document.getElementById("guestDisplay");
    const counterDisplays = document.querySelectorAll(".counter-display");
    const counterBtns = document.querySelectorAll(".counter-btn");

    guestField.addEventListener("click", function (event) {
        event.stopPropagation();
        guestSelector.style.display = guestSelector.style.display === "block" ? "none" : "block";
    });

    function updateCounter(counterDisplay, increment) {
        let currentValue = parseInt(counterDisplay.textContent);
        currentValue = increment ? currentValue + 1 : Math.max(0, currentValue - 1);
        counterDisplay.textContent = currentValue;
    }

    counterBtns.forEach((btn, index) => {
        btn.addEventListener("click", function (event) {
            event.stopPropagation();
            const isIncrement = btn.textContent === "+";
            const counterDisplay = counterDisplays[Math.floor(index / 2)];
            updateCounter(counterDisplay, isIncrement);
        });
    });

    applyButton.addEventListener("click", function (event) {
        event.stopPropagation();
        const adults = parseInt(counterDisplays[0].textContent);
        const pets = parseInt(counterDisplays[1].textContent);
        const children = parseInt(counterDisplays[2].textContent);

        if (adults === 0) {
            alert("At least one adult must be selected.");
            return;
        }

        guestDisplay.textContent = `${adults} Adults, ${pets} Pets, ${children} Children`;
        guestSelector.style.display = "none";
        guestsSelected = true;
        checkConditionsAndCalculatePrice();
    });

    window.addEventListener("click", function (event) {
        if (guestSelector.style.display === "block") {
            guestSelector.style.display = "none";
        }
    });

    function checkConditionsAndCalculatePrice() {
        if (guestsSelected && datesSelected) {
            calculateTotalAmount();
            totalAmountElement.style.display = "block";
        } else {
            totalAmountElement.style.display = "none";
        }
    }

    function calculateTotalAmount() {
        let basePrice = 23000;
        let nights = calculateNights(datePicker.value);
        let guests = parseInt(counterDisplays[0].textContent) || 1;
        let children = parseInt(counterDisplays[2].textContent) || 0;
        let pets = parseInt(counterDisplays[1].textContent) || 0;

        let totalPrice = basePrice * guests * nights;
        let discount = totalPrice * 0.26;
        let petCharge = pets * 1000 * nights;
        let finalAmount = totalPrice - discount + petCharge;

        totalAmountElement.textContent = `Total Amount: ₹${finalAmount.toFixed(2)}`;
    }

    function calculateNights(dateRange) {
        let dates = dateRange.split(" to ");
        if (dates.length !== 2) return 1;

        let checkinDate = new Date(dates[0]);
        let checkoutDate = new Date(dates[1]);
        let diffTime = checkoutDate - checkinDate;
        return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const guestDisplay = document.getElementById("guestDisplay");
    const guestSelector = document.getElementById("guestSelector");
    const applyButton = document.querySelector(".apply-btn");
    const viewOffersBtn = document.querySelector(".book-btn");
    const totalAmountElement = document.querySelector(".total-amount");
    const tariffElement = document.getElementById("tariff");
    const perNightElement = document.getElementById("perNight");
    const discountElement = document.getElementById("discount");
    const gstElement = document.getElementById("gst");
    const totalAmountFinal = document.getElementById("totalAmount");
    const datePicker = document.getElementById("datePicker");
    
    const baseTariff = 5000; // Base tariff per room
    const perNightCharge = 20000; // Fixed per-night charge
    const extraGuestCharge = 1500; // Charge per extra guest per night
    const discountRate = 0.10; // 10% discount
    const gstRate = 0.18; // 18% GST
    let totalGuests = 2; // Default guests
    let nights = 1; // Default nights
    
    function updateGuestDisplay() {
        guestDisplay.textContent = `${totalGuests} Guest${totalGuests > 1 ? 's' : ''}`;
    }
    
    function calculateNights(dateRange) {
        let dates = dateRange.split(" to ");
        if (dates.length !== 2) return 1;

        let checkinDate = new Date(dates[0]);
        let checkoutDate = new Date(dates[1]);
        let diffTime = checkoutDate - checkinDate;
        return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }

    applyButton.addEventListener("click", function () {
        let guests = parseInt(document.querySelector(".counter-display").textContent) || 2;
        totalGuests = guests;
        updateGuestDisplay();
        guestSelector.style.display = "none";
    });

    function calculatePrice() {
        nights = calculateNights(datePicker.value);
        let extraGuests = Math.max(0, totalGuests - 2);
        let extraGuestCost = extraGuests * extraGuestCharge * nights;

        let totalTariff = (baseTariff * nights) + extraGuestCost;
        let totalBeforeDiscount = totalTariff + (perNightCharge * nights);
        let discountAmount = totalBeforeDiscount * discountRate;
        let discountedTotal = totalBeforeDiscount - discountAmount;
        let gstAmount = discountedTotal * gstRate;
        let finalTotal = discountedTotal + gstAmount;

        tariffElement.textContent = `₹${totalTariff}`;
        perNightElement.textContent = `₹${perNightCharge * nights}`;
        discountElement.textContent = `-₹${discountAmount.toFixed(2)}`;
        gstElement.textContent = `+₹${gstAmount.toFixed(2)}`;
        totalAmountFinal.textContent = `₹${finalTotal.toFixed(2)}`;
    }

    viewOffersBtn.addEventListener("click", function () {
        calculatePrice();
        totalAmountElement.style.display = "block";
    });

    datePicker.addEventListener("change", function () {
        calculatePrice();
    });
    
    updateGuestDisplay(); // Set initial guest display
});
document.addEventListener("DOMContentLoaded", function () {
    const guestDisplay = document.getElementById("guestDisplay");
    const guestSelector = document.getElementById("guestSelector");
    const applyButton = document.querySelector(".apply-btn");
    const viewOffersBtn = document.querySelector(".book-btn");
    const totalAmountElement = document.getElementById("priceDetails");
    const tariffElement = document.getElementById("tariff");
    const perNightElement = document.getElementById("perNight");
    const discountElement = document.getElementById("discount");
    const gstElement = document.getElementById("gst");
    const totalAmountFinal = document.getElementById("totalAmount");
    const datePicker = document.getElementById("datePicker");
    
    const baseTariff = 5000; // Base tariff per room
    const perNightCharge = 20000; // Fixed per-night charge
    const extraGuestCharge = 1500; // Charge per extra guest per night
    const discountRate = 0.10; // 10% discount
    const gstRate = 0.18; // 18% GST
    let totalGuests = 2; // Default guests
    let nights = 1; // Default nights
    
    function updateGuestDisplay() {
        guestDisplay.textContent = `${totalGuests} Guest${totalGuests > 1 ? 's' : ''}`;
    }
    
    function calculateNights(dateRange) {
        let dates = dateRange.split(" to ");
        if (dates.length !== 2) return 1;

        let checkinDate = new Date(dates[0]);
        let checkoutDate = new Date(dates[1]);
        let diffTime = checkoutDate - checkinDate;
        return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }

    applyButton.addEventListener("click", function () {
        let guests = parseInt(document.querySelector(".counter-display").textContent) || 2;
        totalGuests = guests;
        updateGuestDisplay();
        guestSelector.style.display = "none";
    });

    function calculatePrice() {
        nights = calculateNights(datePicker.value);
        let extraGuests = Math.max(0, totalGuests - 2);
        let extraGuestCost = extraGuests * extraGuestCharge * nights;

        let totalTariff = (baseTariff * nights) + extraGuestCost;
        let totalBeforeDiscount = totalTariff + (perNightCharge * nights);
        let discountAmount = totalBeforeDiscount * discountRate;
        let discountedTotal = totalBeforeDiscount - discountAmount;
        let gstAmount = discountedTotal * gstRate;
        let finalTotal = discountedTotal + gstAmount;

        tariffElement.textContent = `₹${totalTariff}`;
        perNightElement.textContent = `₹${perNightCharge * nights}`;
        discountElement.textContent = `-₹${discountAmount.toFixed(2)}`;
        gstElement.textContent = `+₹${gstAmount.toFixed(2)}`;
        totalAmountFinal.textContent = `₹${finalTotal.toFixed(2)}`;
    }

    viewOffersBtn.addEventListener("click", function () {
        calculatePrice();
        totalAmountElement.style.display = "block";
    });

    datePicker.addEventListener("change", function () {
        calculatePrice();
    });
    
    updateGuestDisplay(); // Set initial guest display
});
// Gallery Images Data
const galleryImages = [
    { src: "../Media/outsitv.jpg", caption: "Outside sitting area" },
    { src: "../Media/bdroom.jpg", caption: "Second Bedroom" },
    { src: "../Media/hallv.jpeg", caption: "Swimming Pool" },
    { src: "../Media/bdroom.jpg", caption: "Master Bedroom" },
    { src: "../Media/kitchenv.jpg", caption: "Kitchen" },
    { src: "../Media/hallv.jpeg", caption: "Living Room" },
    { src: "../Media/bathroomv.jpeg", caption: "Bathroom" },
    { src: "../Media/outsitv.jpg", caption: "Garden View" },
    { src: "../Media/dinningv.jpg", caption: "Dining Area" },
    { src: "../Media/poolv.jpeg", caption: "Balcony" },
    { src: "../Media/hallv.jpeg", caption: "Living Room" },
    { src: "../Media/bathroomv.jpeg", caption: "Bathroom" },
    { src: "../Media/outsitv.jpg", caption: "Garden View" },
    { src: "../Media/dinningv.jpg", caption: "Dining Area" },
    // Repeat for 30 images total
    { src: "../Media/poolv3.jpg", caption: "Mountain View" },
    { src: "../Media/bdroom3.jpg", caption: "Second Bedroom" },
    { src: "../Media/mroomv.jpg", caption: "Third Bedroom" },
    { src: "../Media/mroomv2.jpg", caption: "Guest Bathroom" },
    { src: "../Media/roomv2.jpg", caption: "Entrance" },
    { src: "../Media/roomv2.jpg", caption: "Patio" },
    { src: "../Media/roomv2.jpg", caption: "Lake View" },
    { src: "../Media/roomv2.jpg", caption: "Study Room" },
    { src: "../Media/roomv2.jpg", caption: "Entertainment Area" },
    { src: "../Media/roomv2.jpg", caption: "Side View" },
    { src: "../Media/roomv2.jpg", caption: "Rear View" },
    { src: "../Media/roomv2.jpg", caption: "Poolside Lounge" },
    { src: "../Media/roomv2.jpg", caption: "Gym" },
    { src: "../Media/roomv2.jpg", caption: "Spa Area" },
    { src: "../Media/roomv2.jpg", caption: "Game Room" },
    { src: "../Media/roomv2.jpg", caption: "Home Theater" },
    { src: "../Media/roomv2.jpg", caption: "Bar Area" },
    { src: "../Media/roomv2.jpg", caption: "Exterior Night View" }
];

// Set total photos count
document.getElementById('totalPhotos').textContent = galleryImages.length;

// DOM Elements
const photoModal = document.getElementById('photoModal');
const modalImage = document.getElementById('modalImage');
const imageCaption = document.getElementById('imageCaption');
const currentPhotoEl = document.getElementById('currentPhoto');
const viewPhotosBtn = document.getElementById('viewPhotosBtn');
const closeModalBtn = document.getElementById('closeModal');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shareBtn = document.getElementById('shareBtn');
const shareDialog = document.getElementById('shareDialog');
const closeShareDialog = document.getElementById('closeShareDialog');
const overlay = document.getElementById('overlay');
const saveBtn = document.getElementById('saveBtn');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const dropdowns = document.querySelectorAll('.dropdown');

// Current photo index
let currentIndex = 0;

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('show');
});

// Mobile dropdown toggle
if (window.innerWidth <= 768) {
    dropdowns.forEach(dropdown => {
        const dropBtn = dropdown.querySelector('.dropbtn');
        dropBtn.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('active');
            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
        });
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.main-header') && navLinks.classList.contains('show')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('show');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Resize event handler
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('show')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('show');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Open Photo Modal
viewPhotosBtn.addEventListener('click', () => {
    openPhotoModal(0);
});

// Open individual photos when clicked
document.querySelectorAll('.gallery-image').forEach((img, index) => {
    img.addEventListener('click', () => {
        openPhotoModal(index);
    });
});

function openPhotoModal(index) {
    currentIndex = index;
    updateModalImage();
    photoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close Photo Modal
closeModalBtn.addEventListener('click', () => {
    photoModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Navigation buttons
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateModalImage();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateModalImage();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (photoModal.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            updateModalImage();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            updateModalImage();
        } else if (e.key === 'Escape') {
            photoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});

// Touch swipe for mobile
let touchStartX = 0;
let touchEndX = 0;

photoModal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

photoModal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX) {
        // Swipe left - next image
        currentIndex = (currentIndex + 1) % galleryImages.length;
        updateModalImage();
    } else if (touchEndX > touchStartX) {
        // Swipe right - previous image
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        updateModalImage();
    }
}

// Update modal image and caption
function updateModalImage() {
    modalImage.src = galleryImages[currentIndex].src;
    imageCaption.textContent = galleryImages[currentIndex].caption;
    currentPhotoEl.textContent = currentIndex + 1;
}

// Share Button
shareBtn.addEventListener('click', () => {
    shareDialog.style.display = 'block';
    overlay.style.display = 'block';
});

// Close Share Dialog
closeShareDialog.addEventListener('click', () => {
    shareDialog.style.display = 'none';
    overlay.style.display = 'none';
});

overlay.addEventListener('click', () => {
    shareDialog.style.display = 'none';
    overlay.style.display = 'none';
});

// Share options functionality
document.getElementById('copyLink').addEventListener('click', () => {
    // Copy URL to clipboard
    navigator.clipboard.writeText(window.location.href)
        .then(() => {
            alert('Link copied to clipboard!');
            shareDialog.style.display = 'none';
            overlay.style.display = 'none';
        });
});

document.getElementById('shareEmail').addEventListener('click', () => {
    window.location.href = `mailto:?subject=Check out this Villa&body=I found this amazing villa on EKOSTAY: ${window.location.href}`;
});

document.getElementById('shareWhatsApp').addEventListener('click', () => {
    window.open(`https://wa.me/?text=Check out this amazing villa on EKOSTAY: ${window.location.href}`);
});

document.getElementById('shareFacebook').addEventListener('click', () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`);
});

document.getElementById('shareTwitter').addEventListener('click', () => {
    window.open(`https://twitter.com/intent/tweet?text=Check out this amazing villa on EKOSTAY&url=${encodeURIComponent(window.location.href)}`);
});

document.getElementById('shareMessenger').addEventListener('click', () => {
    window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(window.location.href)}&app_id=123456789`);
});

document.getElementById('shareMessages').addEventListener('click', () => {
    window.location.href = `sms:?&body=Check out this amazing villa on EKOSTAY: ${window.location.href}`;
});

// Toggle save button
saveBtn.addEventListener('click', () => {
    if (saveBtn.innerHTML.includes('far')) {
        saveBtn.innerHTML = '<i class="fas fa-heart"></i> Saved';
    } else {
        saveBtn.innerHTML = '<i class="far fa-heart"></i> Save';
    }
});

// Modal share button functionality
document.querySelector('.modal-actions .action-btn').addEventListener('click', () => {
    shareDialog.style.display = 'block';
    overlay.style.display = 'block';
});

// Modal save button functionality
document.querySelectorAll('.modal-actions .action-btn')[1].addEventListener('click', () => {
    const icon = document.querySelectorAll('.modal-actions .action-btn')[1].querySelector('i');
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
    }
});

    // Open modal when clicking LOGIN
    document.getElementById("openLoginModal").addEventListener("click", function() {
        document.getElementById("loginModal").style.display = "block";
    });

    // Close modal when clicking X button
    document.querySelector(".close").addEventListener("click", function() {
        document.getElementById("loginModal").style.display = "none";
    });

    // Close modal when clicking outside
    window.onclick = function(event) {
        let modal = document.getElementById("loginModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
    


