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

    const form = document.getElementById('doctorForm');
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

    // File size validation
    function validateFileSize(input) {
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (input.files[0].size > maxSize) {
            input.setCustomValidity('File size should be less than 5MB');
        } else {
            input.setCustomValidity('');
        }
    }

    document.querySelectorAll('input[type="file"]').forEach(input => {
        input.addEventListener('change', function() {
            validateFileSize(this);
        });
    });

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
            alert('Registration submitted successfully! Our team will verify your documents within 48 hours. You will receive an email once your account is activated.');
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Registration';
        }, 2000);
    });

    // Add rating system for verified doctors
    function createRatingSystem() {
        const ratingContainer = document.createElement('div');
        ratingContainer.className = 'doctor-rating';
        ratingContainer.innerHTML = `
            <h3>Doctor Rating & Reviews</h3>
            <div class="rating-summary">
                <div class="average-rating">
                    <span class="stars">★★★★★</span>
                    <span class="rating-value">4.8</span>
                </div>
                <div class="total-reviews">Based on 120 reviews</div>
            </div>
            <div class="reviews-container">
                <!-- Reviews will be dynamically added here -->
            </div>
        `;
        return ratingContainer;
    }

    // Add review form
    function createReviewForm() {
        const reviewForm = document.createElement('form');
        reviewForm.className = 'review-form';
        reviewForm.innerHTML = `
            <h4>Write a Review</h4>
            <div class="rating-input">
                <label>Rating:</label>
                <div class="star-rating">
                    <span class="star" data-rating="1">★</span>
                    <span class="star" data-rating="2">★</span>
                    <span class="star" data-rating="3">★</span>
                    <span class="star" data-rating="4">★</span>
                    <span class="star" data-rating="5">★</span>
                </div>
            </div>
            <div class="form-group">
                <label for="reviewText">Your Review:</label>
                <textarea id="reviewText" required></textarea>
            </div>
            <button type="submit" class="btn">Submit Review</button>
        `;

        // Add star rating functionality
        const stars = reviewForm.querySelectorAll('.star');
        let selectedRating = 0;

        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.dataset.rating);
                selectedRating = rating;
                stars.forEach((s, index) => {
                    s.style.color = index < rating ? '#ffd700' : '#ddd';
                });
            });
        });

        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const reviewText = document.getElementById('reviewText').value;
            
            if (selectedRating === 0) {
                alert('Please select a rating');
                return;
            }

            // Here you would typically send the review to your backend
            alert('Thank you for your review!');
            this.reset();
            stars.forEach(star => star.style.color = '#ddd');
        });

        return reviewForm;
    }

    // Add rating and review system to the page
    const ratingSystem = createRatingSystem();
    const reviewForm = createReviewForm();
    document.querySelector('.verification-process').after(ratingSystem);
    ratingSystem.appendChild(reviewForm);

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
}); 