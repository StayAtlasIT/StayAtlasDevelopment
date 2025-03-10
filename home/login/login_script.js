/*=============== SHOW HIDE PASSWORD LOGIN ===============*/
const passwordAccess = (loginPass, loginEye) =>{
    const input = document.getElementById(loginPass),
          iconEye = document.getElementById(loginEye)
 
    iconEye.addEventListener('click', () =>{
       // Change password to text
       input.type === 'password' ? input.type = 'text'
                                       : input.type = 'password'
 
       // Icon change
       iconEye.classList.toggle('ri-eye-fill')
       iconEye.classList.toggle('ri-eye-off-fill')
    })
 }
 passwordAccess('password','loginPassword')
 
 /*=============== SHOW HIDE PASSWORD CREATE ACCOUNT ===============*/
 const passwordRegister = (loginPass, loginEye) =>{
    const input = document.getElementById(loginPass),
          iconEye = document.getElementById(loginEye)
 
    iconEye.addEventListener('click', () =>{
       // Change password to text
       input.type === 'password' ? input.type = 'text'
                                       : input.type = 'password'
 
       // Icon change
       iconEye.classList.toggle('ri-eye-fill')
       iconEye.classList.toggle('ri-eye-off-fill')
    })
 }
 passwordRegister('passwordCreate','loginPasswordCreate')
 
 /*=============== SHOW HIDE LOGIN & CREATE ACCOUNT ===============*/
 const loginAcessRegister = document.getElementById('loginAccessRegister'),
       buttonRegister = document.getElementById('loginButtonRegister'),
       buttonAccess = document.getElementById('loginButtonAccess')
 
 buttonRegister.addEventListener('click', () => {
    loginAcessRegister.classList.add('active')
 })
 
 buttonAccess.addEventListener('click', () => {
    loginAcessRegister.classList.remove('active')
 })

 document.getElementById('requestOtp').addEventListener('click', function() {
   const email = document.getElementById('email').value;
   const phone = document.getElementById('phone').value; // If using phone numbers

   if (!email && !phone) {
       alert("Please enter your email or phone number to receive OTP.");
       return;
   }

   fetch('/send-otp/', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email: email, phone: phone })
   })
   .then(response => response.json())
   .then(data => {
       if (data.success) {
           alert("OTP sent successfully! Check your email, SMS, or WhatsApp.");
       } else {
           alert("Failed to send OTP. Try again.");
       }
   })
   .catch(error => console.error('Error:', error));
});

/*
document.getElementById('requestOtp').addEventListener('click', function() {
   const email = document.getElementById('email').value;

   if (!email) {
       alert("Please enter your email to receive OTP.");
       return;
   }

   fetch('/send-otp/', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email: email })
   })
   .then(response => response.json())
   .then(data => {
       if (data.success) {
           alert("OTP sent successfully! Check your email, SMS, or WhatsApp.");
       } else {
           alert("Failed to send OTP. Try again.");
       }
   })
   .catch(error => console.error('Error:', error));
});
*/
document.querySelector('.login__form').addEventListener('submit', function(event) {
   event.preventDefault();

   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;
   const otp = document.getElementById('otp').value;

   if (!email || !password || !otp) {
       alert("Please enter all details.");
       return;
   }

   fetch('/verify-otp/', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email: email, password: password, otp: otp })
   })
   .then(response => response.json())
   .then(data => {
       if (data.success) {
           alert("Login successful!");
           window.location.href = '/dashboard';
       } else {
           alert("Invalid OTP. Try again.");
       }
   })
   .catch(error => console.error('Error:', error));
});
