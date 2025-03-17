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

    // // Automatic scrolling for villas
    // const villaContainer = document.getElementById('villaContainer');
    // let scrollInterval;

    // window.onload = () => {
    //     scrollInterval = setInterval(() => {
    //         villaContainer.scrollLeft += 1;
    //         if (villaContainer.scrollLeft >= villaContainer.scrollWidth - villaContainer.clientWidth) {
    //             villaContainer.scrollLeft = 0;
    //         }
    //     }, 20);
    // };

    // villaContainer.addEventListener('mouseenter', () => {
    //     clearInterval(scrollInterval);
    // });

    // villaContainer.addEventListener('mouseleave', () => {
    //     scrollInterval = setInterval(() => {
    //         villaContainer.scrollLeft += 1;
    //         if (villaContainer.scrollLeft >= villaContainer.scrollWidth - villaContainer.clientWidth) {
    //             villaContainer.scrollLeft = 0;
    //         }
    //     }, 20);
    // });

    const scrollLeftButton = document.getElementById('scrollLeft');
    const scrollRightButton = document.getElementById('scrollRight');

    // scrollLeftButton.addEventListener('click', () => {
    //     villaContainer.scrollLeft -= 300;
    // });

    scrollRightButton.addEventListener('click', () => {
        villaContainer.scrollLeft += 300;
    });

    // Swipe functionality
    let startX, endX;

    villaContainer.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
        // clearInterval(scrollInterval); // Pause auto-scrolling on touch
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
        // scrollInterval = setInterval(() => {
        //     villaContainer.scrollLeft += 1;
        //     if (villaContainer.scrollLeft >= villaContainer.scrollWidth - villaContainer.clientWidth) {
        //         villaContainer.scrollLeft = 0;
        //     }
        // }, 20);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const guestInput = document.querySelector(".search-input input[readonly]");
    guestInput.addEventListener("click", function () {
    
    });

    // Set Min Date for Check-in & Check-out
    let today = new Date().toISOString().split('T')[0];
    document.getElementById("checkin").setAttribute("min", today);
    document.getElementById("checkout").setAttribute("min", today);

    // Apply Guest Selection
    window.applyGuests = function () {
        let adults = document.getElementById("adults").value;
        let children = document.getElementById("children").value;
        let rooms = document.getElementById("rooms").value;
        document.getElementById("guests").value = `${adults} Adults, ${children} Children, ${rooms} Rooms`;
    };

    const checkinInput = document.getElementById("checkin");
    const checkoutInput = document.getElementById("checkout");

    // Event listener for check-in date selection
    checkinInput.addEventListener("change", function () {
        let selectedDate = new Date(checkinInput.value);
        selectedDate.setDate(selectedDate.getDate() + 1); // Move to next day for checkout

        let minCheckoutDate = selectedDate.toISOString().split('T')[0];
        checkoutInput.setAttribute("min", minCheckoutDate);
        checkoutInput.value = ""; // Reset checkout date to force user to select a new one
    });

    // Search Button Functionality (Top Option Priority)
    document.querySelector(".search-btn").addEventListener("click", function () {
        let selectedLocation = document.getElementById("location").value;
        if (!selectedLocation) {
            alert("Please select a location to continue.");
            return;
        }

        alert(`Searching top options in ${selectedLocation}...`);
        // Implement actual search functionality here (fetch data, redirect, etc.)
    });

    // Smooth Dropdown Animation
    document.getElementById("location").addEventListener("focus", function () {
        this.style.background = "rgba(255, 255, 255, 0.9)";
    });

    document.getElementById("location").addEventListener("blur", function () {
        this.style.background = "rgba(255, 255, 255, 0.6)";
    });

    // ---------- NEW CODE ADDED FOR GUEST DROPDOWN ---------- //

    // Open & Close the Guest Dropdown
    function toggleGuestDropdown() {
        document.querySelector(".guest-dropdown-content").classList.toggle("show");
    }

    document.getElementById("guests").addEventListener("click", toggleGuestDropdown);

    // Close Dropdown When Clicking Outside
    document.addEventListener("click", function (event) {
        let dropdown = document.querySelector(".guest-dropdown-content");
        let inputField = document.getElementById("guests");

        if (dropdown && !dropdown.contains(event.target) && event.target !== inputField) {
            dropdown.classList.remove("show");
        }
    });

    // Update Guest Count
    function updateGuestCount(type, change) {
        let countElement = document.getElementById(`${type}-count`);
        let currentValue = parseInt(countElement.textContent);

        if (type === "adults" && currentValue + change < 1) return;
        if (type === "children" && currentValue + change < 0) return;
        if (type === "rooms" && currentValue + change < 1) return;

        countElement.textContent = currentValue + change;
    }

    // Apply Guest Selection
    window.applyGuests = function () {
        let adults = document.getElementById("adults-count").textContent;
        let children = document.getElementById("children-count").textContent;
        let rooms = document.getElementById("rooms-count").textContent;

        document.getElementById("guests").value = `${adults} Adults, ${children} Children, ${rooms} Rooms`;
        
        // Hide dropdown after selection
        document.querySelector(".guest-dropdown-content").classList.remove("show");
    };

    // Attach event listeners to buttons
    document.querySelectorAll(".guest-option button").forEach(button => {
        button.addEventListener("click", function () {
            let type = this.parentNode.querySelector("label").textContent.toLowerCase();
            let change = this.textContent === "+" ? 1 : -1;
            updateGuestCount(type, change);
        });
    });

    // Apply button functionality
    document.querySelector(".apply-btn").addEventListener("click", applyGuests);
});
document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
    const sidebarCloseBtn = document.getElementById('sidebar-closebtn');
    const propertyBtn = document.getElementById('property-btn');
    const sidebarPropertyBtn = document.getElementById('sidebar-property-btn');
    const propertyFormContainer = document.getElementById('property-form-container');
    const propertyCancelIcon = document.getElementById('property-cancel-icon');
    
    menuIcon.addEventListener('click', function () {
        sidebar.style.width = '250px';
    });

    sidebarCloseBtn.addEventListener('click', function () {
        sidebar.style.width = '0';
    });

    propertyBtn.addEventListener('click', () => propertyFormContainer.classList.add('visible'));
    sidebarPropertyBtn.addEventListener('click', () => propertyFormContainer.classList.add('visible'));

    propertyCancelIcon.addEventListener('click', function () {
        propertyFormContainer.classList.remove('visible');
    });

    // Smooth Scrolling for Trending Villas
    const villaContainer = document.getElementById('villaContainer');
    villaContainer.style.scrollBehavior = 'smooth';
    
    let isDragging = false;
    let startX, scrollLeft;

    villaContainer.addEventListener('mousedown', (event) => {
        isDragging = true;
        startX = event.pageX - villaContainer.offsetLeft;
        scrollLeft = villaContainer.scrollLeft;
        villaContainer.style.cursor = 'grabbing';
    });

    villaContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        villaContainer.style.cursor = 'grab';
    });

    villaContainer.addEventListener('mouseup', () => {
        isDragging = false;
        villaContainer.style.cursor = 'grab';
    });

    villaContainer.addEventListener('mousemove', (event) => {
        if (!isDragging) return;
        event.preventDefault();
        const x = event.pageX - villaContainer.offsetLeft;
        const walk = (x - startX) * 2;
        villaContainer.scrollLeft = scrollLeft - walk;
    });

    // Swipe functionality for touch devices
    villaContainer.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
    });

    villaContainer.addEventListener('touchmove', (event) => {
        let moveX = event.touches[0].clientX;
        let diffX = startX - moveX;
        villaContainer.scrollLeft += diffX * 0.7;
        startX = moveX;
    });

    const scrollLeftButton = document.getElementById('scrollLeft');
    const scrollRightButton = document.getElementById('scrollRight');

    scrollLeftButton.addEventListener('click', () => villaContainer.scrollLeft -= 500);
    scrollRightButton.addEventListener('click', () => villaContainer.scrollLeft += 500);
});

