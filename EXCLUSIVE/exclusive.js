document.addEventListener("DOMContentLoaded", function () {

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

const priceOptions = ['All', 'Price Low to High', 'Price High to Low'];
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
    let propertiesPerPage = 16; // Default value
    let currentPage = 1;
    const propertyGrid = document.querySelector(".property-grid");
    const allProperties = Array.from(propertyGrid.children);
    const paginationContainer = document.querySelector(".pagination");
    
    function renderPagination() {
        paginationContainer.innerHTML = "";
        let totalPages = Math.ceil(allProperties.length / propertiesPerPage);

        let prevButton = document.createElement("div");
        prevButton.classList.add("page-item", "page-nav");
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevButton.addEventListener("click", () => changePage(currentPage - 1));
        paginationContainer.appendChild(prevButton);

        for (let i = 1; i <= totalPages; i++) {
            let pageButton = document.createElement("div");
            pageButton.classList.add("page-item");
            pageButton.textContent = i;
            pageButton.addEventListener("click", () => changePage(i));
            if (i === currentPage) pageButton.classList.add("active");
            paginationContainer.appendChild(pageButton);
        }

        let nextButton = document.createElement("div");
        nextButton.classList.add("page-item", "page-nav");
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextButton.addEventListener("click", () => changePage(currentPage + 1));
        paginationContainer.appendChild(nextButton);
    }

    function changePage(pageNumber) {
        let totalPages = Math.ceil(allProperties.length / propertiesPerPage);
        if (pageNumber < 1 || pageNumber > totalPages) return;
        currentPage = pageNumber;
        updatePropertiesDisplay();
        renderPagination();
    }

    function updatePropertiesDisplay() {
        allProperties.forEach((property, index) => {
            property.style.display = (index >= (currentPage - 1) * propertiesPerPage && index < currentPage * propertiesPerPage) ? "block" : "none";
        });
    }

    // Initial render
    updatePropertiesDisplay();
    renderPagination();

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
    const loginBtn = document.getElementById("login-btn");
    const loginPopup = document.getElementById("login-popup");
    const closePopup = document.getElementById("close-popup");
    const body = document.body;

    loginBtn.addEventListener("click", () => {
        loginPopup.style.display = "flex";
    });

    closePopup.addEventListener("click", () => {
        loginPopup.style.display = "none";
    });

    // Close popup when clicking outside
    loginPopup.addEventListener("click", (event) => {
        if (event.target === loginPopup) {
            loginPopup.style.display = "none";
        }
    });
});
