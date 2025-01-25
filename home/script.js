document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
    const sidebarCloseBtn = document.getElementById('sidebar-closebtn');
    const propertyBtn = document.getElementById('property-btn');
    const sidebarPropertyBtn = document.getElementById('sidebar-property-btn');
    const propertyFormContainer = document.getElementById('property-form-container');
    const propertyCancelIcon = document.getElementById('property-cancel-icon');
    const loginBtn = document.getElementById('login-btn');
    const sidebarLoginBtn = document.getElementById('sidebar-login-btn');
    const loginFormContainer = document.getElementById('login-form-container');
    const loginCancelIcon = document.getElementById('login-cancel-icon');
    
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

    // Show Login Form
    const openLoginForm = () => {
        loginFormContainer.classList.add('visible');
    };

    loginBtn.addEventListener('click', openLoginForm);
    sidebarLoginBtn.addEventListener('click', openLoginForm);

    // Close Login Form
    loginCancelIcon.addEventListener('click', function () {
        loginFormContainer.classList.remove('visible');
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

    // Modal functionality
    function showModal(message) {
        document.getElementById('modal-message').innerText = message;
        document.getElementById('modal').style.display = 'block';
    }

    // Login form functions
    function sendOTP() {
        showModal('OTP sent to your phone number!');
    }

    function verifyOTP() {
        const otpInput = document.getElementById('otp').value;
        if (otpInput) {
            document.getElementById('verificationMessage').style.display = 'block';
            showModal('✅ OTP Verified!');
        } else {
            showModal('Please enter a valid OTP.');
        }
    }

    function signInWithGoogle() {
        showModal('Redirecting to Google sign-in...');
    }

    function refreshCaptcha() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let captcha = '';
        for (let i = 0; i < 8; i++) {
            captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        document.getElementById('captcha').innerText = captcha;
    }

    window.onload = refreshCaptcha;
});
