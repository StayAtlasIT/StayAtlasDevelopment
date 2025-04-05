// Gallery Images Data
const galleryImages = [
    { src: "vmages/outsitv.jpg", caption: "Outside sitting area" },
    { src: "vmages/bdroom.jpg", caption: "Second Bedroom" },
    { src: "vmages/hallv.jpeg", caption: "Swimming Pool" },
    { src: "vmages/bdroom.jpg", caption: "Master Bedroom" },
    { src: "vmages/kitchenv.jpg", caption: "Kitchen" },
    { src: "vmages/hallv.jpeg", caption: "Living Room" },
    { src: "vmages/bathroomv.jpeg", caption: "Bathroom" },
    { src: "vmages/outsitv.jpg", caption: "Garden View" },
    { src: "vmages/dinningv.jpg", caption: "Dining Area" },
    { src: "vmages/poolv.jpeg", caption: "Balcony" },
    { src: "vmages/hallv.jpeg", caption: "Living Room" },
    { src: "vmages/bathroomv.jpeg", caption: "Bathroom" },
    { src: "vmages/outsitv.jpg", caption: "Garden View" },
    { src: "vmages/dinningv.jpg", caption: "Dining Area" },
    // Repeat for 30 images total
    { src: "vmages/poolv3.jpg", caption: "Mountain View" },
    { src: "vmages/bdroom3.jpg", caption: "Second Bedroom" },
    { src: "vmages/mroomv.jpg", caption: "Third Bedroom" },
    { src: "vmages/mroomv2.jpg", caption: "Guest Bathroom" },
    { src: "vmages/roomv2.jpg", caption: "Entrance" },
    { src: "vmages/roomv2.jpg", caption: "Patio" },
    { src: "vmages/roomv2.jpg", caption: "Lake View" },
    { src: "vmages/roomv2.jpg", caption: "Study Room" },
    { src: "vmages/roomv2.jpg", caption: "Entertainment Area" },
    { src: "vmages/roomv2.jpg", caption: "Side View" },
    { src: "vmages/roomv2.jpg", caption: "Rear View" },
    { src: "vmages/roomv2.jpg", caption: "Poolside Lounge" },
    { src: "vmages/roomv2.jpg", caption: "Gym" },
    { src: "vmages/roomv2.jpg", caption: "Spa Area" },
    { src: "vmages/roomv2.jpg", caption: "Game Room" },
    { src: "vmages/roomv2.jpg", caption: "Home Theater" },
    { src: "vmages/roomv2.jpg", caption: "Bar Area" },
    { src: "vmages/roomv2.jpg", caption: "Exterior Night View" }
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