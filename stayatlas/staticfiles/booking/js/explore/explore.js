document.addEventListener("DOMContentLoaded", function () {
    

    // Filter state
    const filters = {
        priceRange: [],
        amenities: [],
        sortBy: ''
    };


    // Property data
    const properties = Array.from(document.querySelectorAll('.property-card'));

    // Elements for the filter dropdown
    const filterBtn = document.getElementById("filterBtn");
    const filterDropdown = document.getElementById("filterDropdown");

filterBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    filterDropdown.style.display = filterDropdown.style.display === "none" ? "block" : "none";
});



    // Hide filter dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!filterBtn.contains(e.target) && !filterDropdown.contains(e.target)) {
            filterDropdown.style.display = "none";
        }
    });

const priceOptions = []; // Removed 'Price Low to High'

priceOptions.forEach(option => {
    const optionElement = document.createElement('div');
    optionElement.textContent = option;
    optionElement.addEventListener('click', () => {
        filters.sortBy = option === 'Price Low to High' ? 'priceLowFirst' : 'priceHighFirst';
        filterProperties();
    });
    filterDropdown.appendChild(optionElement);
});

// Filter functionality
const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
const filterRadios = document.querySelectorAll('.filter-radio');

    const applyFiltersBtn = document.getElementById('applyFilters');
    const clearFiltersBtn = document.getElementById('clearFilters');

    // Handle checkbox filter changes
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const filterType = e.target.id.includes('price') ? 'priceRange' : 'amenities';
            const filterValue = e.target.id;
            
            if (e.target.checked) {
                filters[filterType].push(filterValue);
            } else {
                filters[filterType] = filters[filterType].filter(item => item !== filterValue);
            }
        });
    });

    // Handle radio filter changes
    filterRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            filters.sortBy = e.target.id;
        });
    });

applyFiltersBtn.addEventListener('click', () => {
    filterProperties();
});



clearFiltersBtn.addEventListener('click', () => {
    filterCheckboxes.forEach(checkbox => checkbox.checked = false);
    filterRadios.forEach(radio => radio.checked = false);
    filters.priceRange = [];
    filters.amenities = [];
    filters.sortBy = '';
    filterProperties();
    filterDropdown.style.display = 'none';
    
    // Clear dropdown options
    filterDropdown.innerHTML = '';
    
    // Re-add price options
    priceOptions.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => {
            filters.sortBy = option === 'Price Low to High' ? 'priceLowFirst' : 'priceHighFirst';
            filterProperties();
        });
        filterDropdown.appendChild(optionElement);
    });
});


    // Filter properties based on active filters
    function filterProperties() {
        properties.forEach(property => {
            const price = parseInt(property.querySelector('.price-amount')?.textContent.replace(/[^0-9]/g, '') || 0);
            const amenities = Array.from(property.querySelectorAll('.property-amenities')).map(el => el.textContent.toLowerCase());

            const priceMatch = filters.priceRange.length === 0 || 
                (filters.priceRange.includes('priceLow') && price <= 10000) ||
                (filters.priceRange.includes('priceMid') && price > 10000 && price <= 20000) ||
                (filters.priceRange.includes('priceHigh') && price > 20000);

            const amenitiesMatch = filters.amenities.length === 0 ||
                filters.amenities.every(amenity => amenities.includes(amenity.toLowerCase()));

            if (priceMatch && amenitiesMatch) {
                property.style.display = 'block';
            } else {
                property.style.display = 'none';
            }
        });

        // Apply sorting
        if (filters.sortBy) {
            const sortedProperties = Array.from(properties).sort((a, b) => {
                const priceA = parseInt(a.querySelector('.price-amount')?.textContent.replace(/[^0-9]/g, '') || 0);
                const priceB = parseInt(b.querySelector('.price-amount')?.textContent.replace(/[^0-9]/g, '') || 0);
                
                if (filters.sortBy === 'priceLowFirst') {
                    return priceA - priceB;
                } else if (filters.sortBy === 'priceHighFirst') {
                    return priceB - priceA;
                } else if (filters.sortBy === 'newListings') {
                    // Implement new listings sorting logic if needed
                    return 0;
                }
                return 0;
            });

            const propertyGrid = document.querySelector('.property-grid');
            propertyGrid.innerHTML = '';
            sortedProperties.forEach(property => propertyGrid.appendChild(property));
        }
    }


    // Redirect when clicking "Enquire Now" or a property image
    document.querySelectorAll(".cta-button, .property-image").forEach(element => {
        element.addEventListener("click", () => {
            window.location.href = "property-details.html"; // Change this to the correct page
        });
    });

    // Favorite button animation
    document.querySelectorAll(".favorite-button").forEach(button => {
        button.addEventListener("click", function () {
            const icon = this.querySelector("i");
            if (icon.classList.contains("far")) {
                icon.classList.remove("far");
                icon.classList.add("fas");
                icon.style.color = "red";
            } else {
                icon.classList.remove("fas");
                icon.classList.add("far");
                icon.style.color = "black";
            }
        });
    });

    // Guest modal functionality
    const guestsBtn = document.getElementById("guestsBtn");
    const guestModal = document.getElementById("guestModal");
    const applyGuests = document.getElementById("applyGuests");

    guestsBtn.addEventListener("click", () => {
        guestModal.style.display = "flex";
    });

    applyGuests.addEventListener("click", () => {
        guestModal.style.display = "none";
    });

    // Update guest count
    function updateGuestCount() {
        let adultCount = parseInt(document.getElementById("adultCount").innerText);
        let childCount = parseInt(document.getElementById("childCount").innerText);
        let totalGuests = adultCount + childCount;
        document.querySelector("#guestsBtn div").innerText = totalGuests;
    }

    document.getElementById("adultPlus").addEventListener("click", () => {
        let count = document.getElementById("adultCount");
        count.innerText = parseInt(count.innerText) + 1;
        updateGuestCount();
    });

    document.getElementById("adultMinus").addEventListener("click", () => {
        let count = document.getElementById("adultCount");
        if (parseInt(count.innerText) > 0) count.innerText = parseInt(count.innerText) - 1;
        updateGuestCount();
    });

    document.getElementById("childPlus").addEventListener("click", () => {
        let count = document.getElementById("childCount");
        count.innerText = parseInt(count.innerText) + 1;
        updateGuestCount();
    });

    document.getElementById("childMinus").addEventListener("click", () => {
        let count = document.getElementById("childCount");
        if (parseInt(count.innerText) > 0) count.innerText = parseInt(count.innerText) - 1;
        updateGuestCount();
    });


});

document.addEventListener("DOMContentLoaded", function () {
    const favoriteButtons = document.querySelectorAll(".favorite-button");
    const favoriteContainer = document.getElementById("favoriteContainer");
    const favoriteDropdown = document.getElementById("favoriteDropdown");
    const favoriteIcon = document.getElementById("favoriteBtn");

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

   // Function to update favorites in the navbar
   function updateFavorites() {
    favoriteContainer.innerHTML = "";
    favorites.forEach((villa) => {
        const villaCard = document.createElement("div");
        villaCard.classList.add("favorite-item");
        villaCard.innerHTML = `
            <img src="${villa.image}" alt="${villa.title}" class="favorite-img">
            <div>
                <p>${villa.title}</p>
                <span>${villa.price}</span>
            </div>
            <button class="remove-favorite" data-title="${villa.title}">×</button>
        `;
        favoriteContainer.appendChild(villaCard);
    });

    // Save to local storage
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Function to handle favorite button click
favoriteButtons.forEach((button) => {
    button.addEventListener("click", function () {
        const propertyCard = this.closest(".property-card");
        const villaTitle = propertyCard.querySelector(".property-title").innerText;
        const villaImage = propertyCard.querySelector(".property-image").src;
        const villaPrice = propertyCard.querySelector(".price-amount").innerText;

        const villa = { title: villaTitle, image: villaImage, price: villaPrice };

        const index = favorites.findIndex((item) => item.title === villaTitle);
        if (index === -1) {
            favorites.push(villa);
            this.innerHTML = '<i class="fas fa-heart"></i>'; // Filled heart
        } else {
            favorites.splice(index, 1);
            this.innerHTML = '<i class="far fa-heart"></i>'; // Empty heart
        }

        updateFavorites();
    });
});

// Remove favorite item
favoriteContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-favorite")) {
        const titleToRemove = event.target.getAttribute("data-title");
        favorites = favorites.filter((item) => item.title !== titleToRemove);
        updateFavorites();
    }
});

// Show/Hide Favorite Dropdown
favoriteIcon.addEventListener("click", function () {
    favoriteDropdown.style.display =
        favoriteDropdown.style.display === "none" ? "block" : "none";
});

// Load favorites on page load
updateFavorites();
});
document.querySelectorAll(".filter-item").forEach(item => {
item.addEventListener("click", function() {
    const category = this.querySelector(".filter-name").textContent.trim();
    window.location.href = `filtered.html?category=${encodeURIComponent(category)}`;
});
});
document.addEventListener("DOMContentLoaded", function () {
const propertiesPerPage = 16; // 4x4 grid layout
const allProperties = document.querySelectorAll(".property-card");
const paginationItems = document.querySelectorAll(".page-item");

function showPage(pageNumber) {
    allProperties.forEach((property, index) => {
        if (index >= (pageNumber - 1) * propertiesPerPage && index < pageNumber * propertiesPerPage) {
            property.style.display = "block";
        } else {
            property.style.display = "none";
        }
    });

    // Update active page styling
    paginationItems.forEach((item) => item.classList.remove("active"));
    paginationItems[pageNumber].classList.add("active");
}

// Initialize Page 1 as default
showPage(1);

// Add event listeners to pagination buttons
paginationItems.forEach((item, index) => {
    if (index > 0 && index < paginationItems.length - 1) { // Exclude next/prev buttons
        item.addEventListener("click", () => showPage(index));
    }
});
});
document.addEventListener("DOMContentLoaded", function () {
const userIcon = document.getElementById("userIcon");
const userDropdown = document.getElementById("userDropdown");
const logoutBtn = document.getElementById("logoutBtn");

// Check if user is logged in and update user icon
let loggedInUser = localStorage.getItem("loggedInUser");
if (loggedInUser) {
    let userData = JSON.parse(loggedInUser);
    let initials = userData.name.charAt(0).toUpperCase();
    userIcon.innerHTML = `<div class="user-initials">${initials}</div>`;

    // Fill user details in dropdown
    document.getElementById("userName").textContent = userData.name;
    document.getElementById("userContact").textContent = userData.contact;
    document.getElementById("userEmail").textContent = userData.email;
    document.getElementById("userDob").textContent = userData.dob;
}

// Toggle dropdown on user icon click
userIcon.addEventListener("click", function () {
    if (loggedInUser) {
        userDropdown.style.display = userDropdown.style.display === "block" ? "none" : "block";
    } else {
        window.location.href = "login.html";
    }
});

// Logout functionality
logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
    window.location.reload(); // Reload to reset UI
});

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
    if (!userIcon.contains(event.target) && !userDropdown.contains(event.target)) {
        userDropdown.style.display = "none";
    }
});
});
document.addEventListener("DOMContentLoaded", function () {
const checkInBtn = document.getElementById("checkInBtn");
const checkOutBtn = document.getElementById("checkOutBtn");
const calendarModal = document.getElementById("calendarModal");
const closeCalendar = document.querySelector(".close-modal");
const applyDates = document.getElementById("applyDates");
const dateRangeInput = document.getElementById("dateRange");

// Open modal when Check-in or Check-out is clicked
checkInBtn.addEventListener("click", () => {
    calendarModal.style.display = "flex";
});

checkOutBtn.addEventListener("click", () => {
    calendarModal.style.display = "flex";
});

// Close modal
closeCalendar.addEventListener("click", () => {
    calendarModal.style.display = "none";
});

// Initialize flatpickr calendar
flatpickr("#dateRange", {
    mode: "range",
    dateFormat: "d-m-Y",
    minDate: "today",
    onClose: function(selectedDates) {
        if (selectedDates.length === 2) {
            checkInBtn.textContent = "Check-in: " + selectedDates[0].toLocaleDateString();
            checkOutBtn.textContent = "Check-out: " + selectedDates[1].toLocaleDateString();
        }
    }
});

// Apply Dates
applyDates.addEventListener("click", () => {
    calendarModal.style.display = "none";
});
});
document.addEventListener("DOMContentLoaded", function () {
const locationBtn = document.getElementById("locationBtn");
const locationDropdown = document.getElementById("locationDropdown");
const locationOptions = document.querySelectorAll(".location-option");

// Toggle dropdown
locationBtn.addEventListener("click", () => {
    locationDropdown.style.display = locationDropdown.style.display === "block" ? "none" : "block";
});

// Select location and update button text
locationOptions.forEach(option => {
    option.addEventListener("click", () => {
        locationBtn.textContent = option.textContent;
        locationDropdown.style.display = "none";
    });
});

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
    if (!locationBtn.contains(event.target) && !locationDropdown.contains(event.target)) {
        locationDropdown.style.display = "none";
    }
});
});
document.addEventListener("DOMContentLoaded", function () {
const favoriteButtons = document.querySelectorAll(".favorite-button");
const heartPopup = document.getElementById("heart-popup");
const favoriteIcon = document.querySelector(".favorites-link"); // Favorites page button
const favoriteBtn = document.getElementById("favoriteBtn"); // Opens favorites in new tab

// Load favorites from localStorage
function loadFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

// Save favorites to localStorage
function updateLocalStorage(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Function to show the heart popup animation
function showHeartPopup(x, y) {
    heartPopup.style.left = `${x}px`;
    heartPopup.style.top = `${y}px`;
    heartPopup.innerHTML = "❤️";
    heartPopup.style.opacity = "1";
    heartPopup.style.transform = "scale(1)";

    // Animate heart towards the Favorites icon
    setTimeout(() => {
        heartPopup.style.animation = "moveHeart 1s ease-in-out forwards";
    }, 200);

    // Reset animation after it finishes
    setTimeout(() => {
        heartPopup.style.opacity = "0";
        heartPopup.style.transform = "scale(0)";
        heartPopup.style.animation = "";
    }, 1000);
}

// Function to toggle favorite on click
function toggleFavorite(button) {
    const card = button.closest(".property-card");
    const villa = {
        title: card.querySelector(".property-title").innerText,
        image: card.querySelector(".property-image").src,
        price: card.querySelector(".price-amount").innerText
    };

    let favorites = loadFavorites();
    const index = favorites.findIndex(v => v.title === villa.title);

    if (index === -1) {
        // Add villa to favorites
        favorites.push(villa);
        button.innerHTML = '<i class="fas fa-heart" style="color: red;"></i>';

        // Show heart animation at button's location
        const rect = button.getBoundingClientRect();
        showHeartPopup(rect.left + window.scrollX, rect.top + window.scrollY);
    } else {
        // Remove villa from favorites
        favorites.splice(index, 1);
        button.innerHTML = '<i class="far fa-heart"></i>';
    }

    updateLocalStorage(favorites);
}

// Attach event listeners to all favorite buttons
favoriteButtons.forEach(button => {
    button.addEventListener("click", function () {
        toggleFavorite(this);
    });
});

// Open Liked Villas in New Tab
if (favoriteBtn) {
    favoriteBtn.addEventListener("click", () => {
        window.open("favorites.html", "_blank");
    });
}

// Attach function to window (to access in HTML buttons)
window.toggleFavorite = toggleFavorite;
});
// Toggle Search Container on Mobile
const searchToggle = document.getElementById("searchToggle");
const searchContainer = document.getElementById("searchContainer");

searchToggle.addEventListener("click", function () {
    searchContainer.style.display = searchContainer.style.display === "block" ? "none" : "block";
});

// Location Dropdown Logic
const locations = ["Benaulim, India", "Pawna Lake, India", "Siolim, India", "Arpora, India", "Lonavala, India"];
const locationInput = document.getElementById("locationInput");
const locationDropdown = document.getElementById("locationDropdown");

locationInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    locationDropdown.innerHTML = "";
    if (query) {
        const filtered = locations.filter(loc => loc.toLowerCase().startsWith(query));
        filtered.forEach(loc => {
            const div = document.createElement("div");
            div.textContent = loc;
            div.onclick = () => {
                locationInput.value = loc;
                locationDropdown.style.display = "none";
            };
            locationDropdown.appendChild(div);
        });
        locationDropdown.style.display = filtered.length ? "block" : "none";
    } else {
        locationDropdown.style.display = "none";
    }
});

// Flatpickr for Date Selection
flatpickr("#dateRange", {
    mode: "range",
    dateFormat: "d-m-Y",
    minDate: "today"
});
document.addEventListener("DOMContentLoaded", function () {
    const searchToggle = document.getElementById("searchToggle");
    const searchContainer = document.getElementById("searchContainer");

    function isMobile() {
        return window.innerWidth <= 768;
    }

    searchToggle.addEventListener("click", function () {
        if (isMobile()) {
            searchContainer.style.display = 
                searchContainer.style.display === "block" ? "none" : "block";
        }
    });

    // Close search when resizing to desktop
    window.addEventListener("resize", function () {
        if (!isMobile()) {
            searchContainer.style.display = "none";
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const searchToggle = document.getElementById("searchToggle");
    const searchContainer = document.getElementById("searchContainer");

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function isTabletOrDesktop() {
        return window.innerWidth >= 1024;
    }

    // Ensure search bar is always visible on 1024px and above
    function adjustSearchVisibility() {
        if (isTabletOrDesktop()) {
            searchContainer.style.display = "flex";
        } else {
            searchContainer.style.display = "none";
        }
    }

    searchToggle.addEventListener("click", function () {
        if (isMobile()) {
            searchContainer.style.display = 
                searchContainer.style.display === "block" ? "none" : "block";
        }
    });

    // Adjust search bar visibility on window resize
    window.addEventListener("resize", adjustSearchVisibility);
    adjustSearchVisibility(); // Ensure proper visibility on page load
});
document.addEventListener("DOMContentLoaded", function () {
    const locationInput = document.getElementById("locationInput");
    const locationDropdown = document.getElementById("locationDropdown");

    // Sample location data (can be replaced with API calls)
    const locations = ["Pawna Lake", "Siolim", "Arpora", "Benaulim", "Lonawala", "Miami", "Seattle"];

    locationInput.addEventListener("input", function () {
        const query = locationInput.value.toLowerCase();
        locationDropdown.innerHTML = ""; // Clear previous results

        if (query) {
            const filteredLocations = locations.filter(location =>
                location.toLowerCase().startsWith(query)
            );

            filteredLocations.forEach(location => {
                const div = document.createElement("div");
                div.textContent = location;
                div.addEventListener("click", function () {
                    locationInput.value = location;
                    locationDropdown.style.display = "none"; // Hide dropdown
                });
                locationDropdown.appendChild(div);
            });

            locationDropdown.style.display = filteredLocations.length ? "block" : "none";
        } else {
            locationDropdown.style.display = "none";
        }
    });

    // Hide dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!locationInput.contains(event.target) && !locationDropdown.contains(event.target)) {
            locationDropdown.style.display = "none";
        }
    });
});
