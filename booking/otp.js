// login.js
function sendOTP() {
    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000); 
  
    // Display the OTP on the screen (replace 'otpDisplay' with your element's ID)
    document.getElementById('otpDisplay').innerText = `Your OTP is: ${otp}`; 
  
    // You can add logic here to enable the 'Verify OTP' button
    // document.getElementById('verifyOTPButton').disabled = false;
  }
  