document.addEventListener("DOMContentLoaded", function () {
    const favoritesList = document.getElementById("favoritesList");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Delay content appearance for animation effect
    setTimeout(() => {
        document.querySelector(".fade-in").style.opacity = "1";
    }, 1000);

    if (favorites.length === 0) {
        favoritesList.innerHTML = "<p class='no-favorites'>No favorites added yet.</p>";
        return;
    }

    favorites.forEach(villa => {
        const propertyCard = document.createElement("div");
        propertyCard.classList.add("property-card");
        propertyCard.innerHTML = `
            <img src="${villa.image}" alt="${villa.title}" class="property-image">
            <button class="favorite-button">
                <i class="fas fa-heart" style="color: red;"></i>
            </button>
            <div class="property-details">
                <div class="property-title">${villa.title}</div>
                <div class="property-price">
                    <span class="price-amount">${villa.price}</span> per night
                </div>
                <button class="cta-button remove-favorite" data-title="${villa.title}">Remove from Favorites</button>
            </div>
        `;
        favoritesList.appendChild(propertyCard);
    });

    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-favorite")) {
            const titleToRemove = e.target.getAttribute("data-title");
            let updatedFavorites = favorites.filter(villa => villa.title !== titleToRemove);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            e.target.closest(".property-card").remove();
        }
    });
});
