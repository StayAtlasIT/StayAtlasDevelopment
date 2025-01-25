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
