document.addEventListener('DOMContentLoaded', function() {
    // Registration Form Submission
    var registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission

            // Get form values
            var username = document.getElementById('username').value;
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            var confirmPassword = document.getElementById('confirm-password').value;

            // Password validation
            var passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
            if (!passwordRegex.test(password)) {
                var message = document.getElementById('message');
                message.textContent = 'Password must contain at least one number, one uppercase letter, and be at least 6 characters long.';
                message.style.color = 'red';
                return;
            }

            // Confirm password
            if (password !== confirmPassword) {
                var message = document.getElementById('message');
                message.textContent = 'Passwords do not match. Please re-enter.';
                message.style.color = 'red';
                return;
            }

            // Save registration data to local storage
            var userData = {
                username: username,
                email: email,
                password: password
            };
            localStorage.setItem('userData', JSON.stringify(userData));

            // Redirect to login page
            window.location.href = 'login.html';
        });
    }

    // Login Form Submission
    var loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission

            // Get form values
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;

            // Retrieve stored user data from local storage
            var storedData = JSON.parse(localStorage.getItem('userData'));

            // Check if login credentials match stored data
            if (storedData && email === storedData.email && password === storedData.password) {
                // Redirect to main page
                window.location.href = 'main.html';
            } else {
                // Display login error message
                var loginMessage = document.getElementById('login-message');
                loginMessage.textContent = 'Invalid email or password. Please try again.';
                loginMessage.style.color = 'red';
            }
        });
    }
});