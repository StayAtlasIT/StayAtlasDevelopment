const pricePerNight = 5000; 
const villaPrice = 20000; 
const taxRate = 0.18; 

document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkInDate').setAttribute('value', today);
    document.getElementById('checkInDate').setAttribute('min', today);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('checkOutDate').setAttribute('value', tomorrow.toISOString().split('T')[0]);
    document.getElementById('checkOutDate').setAttribute('min', tomorrow.toISOString().split('T')[0]);

    updateCheckOutMinDate(); 
    updateTotalPrice(); 
});

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

    let totalPrice = villaPrice;
    
    let finalTotalPrice = (pricePerNight * nights * guestCount) + ((pricePerNight * nights * guestCount) + totalPrice) * taxRate + totalPrice

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
    let totalBeforeTax = (pricePerNight * nights * guestCount) + villaPrice;

    const taxAmount = totalBeforeTax * taxRate;
    const finalTotal = totalBeforeTax + taxAmount;

    document.getElementById('basePrice').innerText = pricePerNight;
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
