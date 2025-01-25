// Villa data with correct image paths and constant prices
const villas = [
    {
        id: 1,
        name: 'Exclusive Villa 1',
        location: 'Maharashtra',
        image: 'media/VILLA1.jpg',
        price: 30000,
        rating: 4.5,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 25,
        rooms: 5,
        baths: 5
    },
    {
        id: 2,
        name: 'Exclusive Villa 2',
        location: 'Maharashtra',
        image: 'media/VILLA2.jpg',
        price: 30000,
        rating: 4.2,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 3,
        name: 'Exclusive Villa 3',
        location: 'Maharashtra',
        image: 'media/VILLA3.jpg',
        price: 30000,
        rating: 4.0,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 4,
        name: 'Exclusive Villa 4',
        location: 'Maharashtra',
        image: 'media/VILLA4.jpg',
        price: 30000,
        rating: 4.3,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 5,
        name: 'Exclusive Villa 5',
        location: 'Maharashtra',
        image: 'media/VILLA5.jpeg',
        price: 30000,
        rating: 4.1,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 6,
        name: 'Exclusive Villa 6',
        location: 'Maharashtra',
        image: 'media/VILLA6.jpg',
        price: 30000,
        rating: 4.4,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 7,
        name: 'Exclusive Villa 7',
        location: 'Maharashtra',
        image: 'media/VILLA7.jpg',
        price: 30000,
        rating: 4.6,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 8,
        name: 'Exclusive Villa 8',
        location: 'Maharashtra',
        image: 'media/VILLA8.jpg',
        price: 30000,
        rating: 4.2,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 9,
        name: 'Exclusive Villa 9',
        location: 'Maharashtra',
        image: 'media/VILLA9.jpg',
        price: 30000,
        rating: 4.3,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 10,
        name: 'Exclusive Villa 10',
        location: 'Maharashtra',
        image: 'media/VILLA10.jpg',
        price: 30000,
        rating: 4.1,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 11,
        name: 'Exclusive Villa 11',
        location: 'Maharashtra',
        image: 'media/VILLA11.jpg',
        price: 30000,
        rating: 4.0,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 12,
        name: 'Exclusive Villa 12',
        location: 'Maharashtra',
        image: 'media/VILLA12.jpg',
        price: 30000,
        rating: 4.5,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 13,
        name: 'Exclusive Villa 13',
        location: 'Maharashtra',
        image: 'media/VILLA13.jpg',
        price: 30000,
        rating: 4.2,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 14,
        name: 'Exclusive Villa 14',
        location: 'Maharashtra',
        image: 'media/VILLA14.jpg',
        price: 30000,
        rating: 4.3,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 15,
        name: 'Exclusive Villa 15',
        location: 'Maharashtra',
        image: 'media/VILLA15.jpg',
        price: 30000,
        rating: 4.1,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 16,
        name: 'Exclusive Villa 16',
        location: 'Maharashtra',
        image: 'media/VILLA16.jpeg',
        price: 30000,
        rating: 4.0,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 17,
        name: 'Exclusive Villa 17',
        location: 'Maharashtra',
        image: 'media/VILLA17.jpg',
        price: 30000,
        rating: 4.6,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 18,
        name: 'Exclusive Villa 18',
        location: 'Maharashtra',
        image: 'media/VILLA18.jpg',
        price: 30000,
        rating: 4.2,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 19,
        name: 'Exclusive Villa 19',
        location: 'Maharashtra',
        image: 'media/VILLA19.jpg',
        price: 30000,
        rating: 4.3,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 20,
        name: 'Exclusive Villa 20',
        location: 'Maharashtra',
        image: 'media/VILLA20.jpg',
        price: 30000,
        rating: 4.1,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 21,
        name: 'Exclusive Villa 21',
        location: 'Maharashtra',
        image: 'media/VILLA21.jpg',
        price: 30000,
        rating: 4.0,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 22,
        name: 'Exclusive Villa 22',
        location: 'Maharashtra',
        image: 'media/VILLA22.jpg',
        price: 30000,
        rating: 4.5,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 23,
        name: 'Exclusive Villa 23',
        location: 'Maharashtra',
        image: 'media/VILLA23.jpg',
        price: 30000,
        rating: 4.2,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 24,
        name: 'Exclusive Villa 24',
        location: 'Maharashtra',
        image: 'media/VILLA24.jpg',
        price: 30000,
        rating: 4.3,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    },
    {
        id: 25,
        name: 'Exclusive Villa 25',
        location: 'Maharashtra',
        image: 'media/VILLA25.jpg',
        price: 30000,
        rating: 4.1,
        amenities: ['Heated', 'Lawn', 'Meals', 'WiFi', 'Bar'],
        guests: 20,
        rooms: 4,
        baths: 4
    }
];

function openSubPage(villaId) {
    if (villaId === 1) { // Ensure this ID matches "Exclusive Villa 1"
        window.location.href = '../booking/sub.html';
    }
}

// Render villas
function renderVillas() {
    const container = document.getElementById('villaContainer');
    container.innerHTML = villas.map(villa => `
        <div class="villa-card">
            <img src="${villa.image}" alt="${villa.name}" class="villa-image" onclick="openSubPage(${villa.id})">
            <div class="villa-details">
                <div class="villa-title">
                    <span>${villa.name}</span>
                    <div class="rating">
                        ★ ${villa.rating}
                    </div>
                </div>
                <p class="villa-location">${villa.location}</p>
                <div class="villa-capacity">
                    <div class="villa-capacity-item">
                        <i class="fas fa-users"></i> Upto ${villa.guests} Guests
                    </div>
                    <div class="villa-capacity-item">
                        <i class="fas fa-bed"></i> ${villa.rooms} Rooms
                    </div>
                    <div class="villa-capacity-item">
                        <i class="fas fa-bath"></i> ${villa.baths} Baths
                    </div>
                </div>
                <div class="villa-amenities">
                    ${villa.amenities.map(amenity => `
                        <span class="amenity-icon">
                            <i class="fas fa-check"></i>
                            ${amenity}
                        </span>
                    `).join('')}
                </div>
            </div>
            <div class="villa-price">
                <div class="price-amount">₹${villa.price}</div>
                <button class="view-button" onclick="window.location.href='../booking/sub.html'">View</button>
            </div>
        </div>
    `).join('');
}

// Initialize
renderVillas();
