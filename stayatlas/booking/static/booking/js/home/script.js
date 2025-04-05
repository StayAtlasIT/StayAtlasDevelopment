document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
    const sidebarCloseBtn = document.getElementById('sidebar-closebtn');
    const propertyBtn = document.getElementById('property-btn');
    const sidebarPropertyBtn = document.getElementById('sidebar-property-btn');
    const propertyFormContainer = document.getElementById('property-form-container');
    const propertyCancelIcon = document.getElementById('property-cancel-icon');
    const roomsSelect = document.getElementById('rooms');
    const customRoomsInput = document.getElementById('customRooms');
    const locationSelect = document.getElementById('location');
    const manualLocationInput = document.getElementById('manualLocation');
    
    // Open Sidebar
    menuIcon.addEventListener('click', function () {
        sidebar.style.width = '250px';
    });

    // Close Sidebar
    sidebarCloseBtn.addEventListener('click', function () {
        sidebar.style.width = '0';
    });

    // Show Property Form
    const openPropertyForm = () => {
        propertyFormContainer.classList.add('visible');
    };

    propertyBtn.addEventListener('click', openPropertyForm);
    sidebarPropertyBtn.addEventListener('click', openPropertyForm);

    // Close Property Form
    propertyCancelIcon.addEventListener('click', function () {
        propertyFormContainer.classList.remove('visible');
    });

    // Update manual location field based on selection
    locationSelect.addEventListener('change', function () {
        if (this.value === "other") {
            manualLocationInput.style.display = 'block';
            manualLocationInput.setAttribute("required", "required");
            manualLocationInput.value = "";  // Ensure input is empty for user entry
        } else {
            manualLocationInput.style.display = 'none';
            manualLocationInput.removeAttribute("required");
            manualLocationInput.value = "";  // Clear input when not needed
        }
    });

    // Show custom rooms input field when "5+" is selected
    roomsSelect.addEventListener('change', function () {
        if (this.value === '5+') {
            customRoomsInput.style.display = 'block';
            customRoomsInput.setAttribute('required', 'required');
        } else {
            customRoomsInput.style.display = 'none';
            customRoomsInput.removeAttribute('required');
        }
    });    

    // Slideshow functionality
    let currentIndex = 0;

    function showSlides() {
        const slides = document.querySelector('.slides');
        const totalSlides = document.querySelectorAll('.slide').length;

        currentIndex++;
        if (currentIndex >= totalSlides) {
            currentIndex = 0;
        }

        const slideWidth = document.querySelector('.slide').clientWidth;
        slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    setInterval(showSlides, 3000);
    showSlides();

    // Automatic scrolling for villas
    const villaContainer = document.getElementById('villaContainer');
    let scrollInterval;

    window.onload = () => {
        scrollInterval = setInterval(() => {
            villaContainer.scrollLeft += 1;
            if (villaContainer.scrollLeft >= villaContainer.scrollWidth - villaContainer.clientWidth) {
                villaContainer.scrollLeft = 0;
            }
        }, 20);
    };

    villaContainer.addEventListener('mouseenter', () => {
        clearInterval(scrollInterval);
    });

    villaContainer.addEventListener('mouseleave', () => {
        scrollInterval = setInterval(() => {
            villaContainer.scrollLeft += 1;
            if (villaContainer.scrollLeft >= villaContainer.scrollWidth - villaContainer.clientWidth) {
                villaContainer.scrollLeft = 0;
            }
        }, 20);
    });

    const scrollLeftButton = document.getElementById('scrollLeft');
    const scrollRightButton = document.getElementById('scrollRight');

    scrollLeftButton.addEventListener('click', () => {
        villaContainer.scrollLeft -= 300;
    });

    scrollRightButton.addEventListener('click', () => {
        villaContainer.scrollLeft += 300;
    });

    // Swipe functionality
    let startX, endX;

    villaContainer.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
        clearInterval(scrollInterval); // Pause auto-scrolling on touch
    });

    villaContainer.addEventListener('touchmove', (event) => {
        endX = event.touches[0].clientX;
    });

    villaContainer.addEventListener('touchend', () => {
        if (startX > endX + 50) {
            // Swipe left
            villaContainer.scrollLeft += 300; // Adjust scroll amount as needed
        } else if (startX < endX - 50) {
            // Swipe right
            villaContainer.scrollLeft -= 300; // Adjust scroll amount as needed
        }
        // Restart auto-scrolling
        scrollInterval = setInterval(() => {
            villaContainer.scrollLeft += 1;
            if (villaContainer.scrollLeft >= villaContainer.scrollWidth - villaContainer.clientWidth) {
                villaContainer.scrollLeft = 0;
            }
        }, 20);
    });
});



