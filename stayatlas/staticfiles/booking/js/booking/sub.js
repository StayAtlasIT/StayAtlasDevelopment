 
function initMap() {
    var location = { lat: -34.397, lng: 150.644 }; // Replace with your desired coordinates
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: location
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

document.getElementById('myButton').onclick = function() {
    window.location.href = 'https://api.whatsapp.com/send?text=Check%20out%20this%20amazing%20villa!%20[Your%20link%20here]" target="_blank';
};

function viewVideo() {
    const videoUrl = 'videoplayback.mp4';
    const videoWindow = window.open('', '_blank');
    videoWindow.document.write(`
        <html>
            <head>
                <title>Video</title>
            </head>
            <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
                <video width="100%" height="100%" controls autoplay>
                    <source src="${videoUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </body>
        </html>
    `);
    videoWindow.document.close();
}

function view360Degree() {
    const photoUrl = 'C:\\Users\\ADMIN\\Desktop\\staylesuire\\comp\\component\\villa3.jfif'; // Updated with the actual path
    const photoWindow = window.open('', '_blank');
    photoWindow.document.write(`
        <html>
            <head>
                <title>360 Degree View</title>
            </head>
            <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
                <img src="${photoUrl}" alt="360 Degree View" style="max-width: 100%; max-height: 100%;">
            </body>
        </html>
    `);
    photoWindow.document.close();
}

function viewPhotos() {
    const photoModal = document.getElementById('photoModal');
    photoModal.style.display = 'block'; // Show the modal
}

function togglePhotoModal() {
    const photoModal = document.getElementById('photoModal');
    photoModal.style.display = 'none'; // Hide the modal
}

function openBookingModal() {
    document.getElementById('bookingModal').style.display = 'block';
}

function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('bookingModal')) {
        closeBookingModal();
    }
}

function updateCheckOutMinDate() {
    const checkInDate = document.getElementById('checkInDate').value;
    document.getElementById('checkOutDate').setAttribute('min', checkInDate);
}

function updateTotalPrice() {
    const checkInDate = new Date(document.getElementById('checkInDate').value);
    const checkOutDate = new Date(document.getElementById('checkOutDate').value);
    const timeDifference = checkOutDate - checkInDate;
    const nights = Math.ceil(timeDifference / (1000 * 3600 * 24)); 
    const guestCount = parseInt(document.getElementById('guestCount').value);

    let totalPrice = 20000; // Example villa price
    
    let finalTotalPrice = (5000 * nights * guestCount) + ((5000 * nights * guestCount) + totalPrice) * 0.18 + totalPrice;

    document.getElementById('totalPrice').innerText = `₹${totalPrice.toFixed(2)}`; 
    document.getElementById('finalTotalPrice').innerText = `₹${finalTotalPrice.toFixed(2)}`;
}

function changeGuestCount(change) {
    const guestCountInput = document.getElementById('guestCount');
    let currentCount = parseInt(guestCountInput.value);
    currentCount += change;
    if (currentCount < 1) currentCount = 1; 
    guestCountInput.value = currentCount;
    updateTotalPrice(); 
}

document.getElementById('priceBreakdownBtn').onclick = function() {
    const nights = Math.ceil((new Date(document.getElementById('checkOutDate').value) - new Date(document.getElementById('checkInDate').value)) / (1000 * 3600 * 24));
    const guestCount = parseInt(document.getElementById('guestCount').value);
    let totalBeforeTax = (5000 * nights * guestCount) + 20000;

    const taxAmount = totalBeforeTax * 0.18;
    const finalTotal = totalBeforeTax + taxAmount;

    document.getElementById('basePrice').innerText = 5000;
    document.getElementById('nightsCount').innerText = nights;
    document.getElementById('totalBeforeTax').innerText = totalBeforeTax.toFixed(2);
    document.getElementById('taxAmount').innerText = taxAmount.toFixed(2);
    document.getElementById('finalTotal').innerText = finalTotal.toFixed(2);

    document.getElementById('priceBreakdownModal').style.display = "block";
}

function closeModal() {
    document.getElementById('priceBreakdownModal').style.display = "none";
}

window.onclick = function(event) {
    if (event.target == document.getElementById('priceBreakdownModal')) {
        closeModal();
    }
}

function toggleReviewForm() {
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm.style.display === 'none' || reviewForm.style.display === '') {
        reviewForm.style.display = 'block'; // Show the review form
    } else {
        reviewForm.style.display = 'none'; // Hide the review form
    }
}

function save() {
    alert("Save functionality not implemented yet.");
}

// Other existing functions remain unchanged...
