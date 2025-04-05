document.addEventListener("DOMContentLoaded", function () {
    // Get all property images
    const propertyImages = document.querySelectorAll('.property-image');
    
    // Add click handler to each image
    propertyImages.forEach(image => {
        // Add pointer cursor
        image.style.cursor = 'pointer';
        
        // Add click event listener
        image.addEventListener('click', function() {
            // Get parent card element
            const card = image.closest('.property-card');
            
            // Extract property details
            const title = card.querySelector('.property-title').textContent;
            const location = card.querySelector('.property-location span').textContent;
            const price = card.querySelector('.price-amount').textContent;
            
            // Construct URL with property details
            const url = new URL('new.html', window.location.origin);
            url.searchParams.set('title', title);
            url.searchParams.set('location', location);
            url.searchParams.set('price', price);
            url.searchParams.set('image', image.src);
            
            // Open in new tab
            window.open(url.toString(), '_blank');
        });
    });
});
