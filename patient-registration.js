// Theme Switcher
function initTheme() {
    // Check for saved theme preference, otherwise default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// Initialize theme immediately
initTheme();

document.addEventListener('DOMContentLoaded', function() {
    // Set up theme toggle
    setupThemeToggle();

    const form = document.getElementById('patientForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    // Password validation
    function validatePassword() {
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity("Passwords don't match");
        } else {
            confirmPassword.setCustomValidity('');
        }
    }

    password.addEventListener('change', validatePassword);
    confirmPassword.addEventListener('keyup', validatePassword);

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Create FormData object
        const formData = new FormData(form);

        // Show loading state
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        // Simulate API call (replace with actual API endpoint)
        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Show success message
            alert('Registration submitted successfully! You will receive a confirmation email shortly.');
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Registration';
        }, 2000);
    });

    // Modal functionality
    const modal = document.getElementById('userTypeModal');
    const getStartedBtn = document.querySelector('.get-started-btn');
    const closeModal = document.querySelector('.close-modal');
    const userTypeCards = document.querySelectorAll('.user-type-card');

    // Open modal when Get Started button is clicked
    getStartedBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });

    // Close modal when X is clicked
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Handle user type selection
    userTypeCards.forEach(card => {
        card.addEventListener('click', () => {
            const userType = card.getAttribute('data-type');
            // Redirect to appropriate registration page
            switch(userType) {
                case 'patient':
                    window.location.href = 'patient-registration.html';
                    break;
                case 'doctor':
                    window.location.href = 'doctor-registration.html';
                    break;
                case 'chemist':
                    window.location.href = 'chemist-registration.html';
                    break;
            }
        });
    });

    // Phone number validation
    const phoneInput = document.getElementById('phone');
    const emergencyPhoneInput = document.getElementById('emergencyPhone');
    
    function validatePhoneNumber(input) {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(input.value)) {
            input.setCustomValidity('Please enter a valid 10-digit phone number');
        } else {
            input.setCustomValidity('');
        }
    }

    phoneInput.addEventListener('input', () => validatePhoneNumber(phoneInput));
    emergencyPhoneInput.addEventListener('input', () => validatePhoneNumber(emergencyPhoneInput));

    // Email validation
    const emailInput = document.getElementById('email');
    
    emailInput.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.setCustomValidity('Please enter a valid email address');
        } else {
            emailInput.setCustomValidity('');
        }
    });
}); 