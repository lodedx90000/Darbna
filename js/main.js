/* ============================================
   DARBNA LANDING PAGE JAVASCRIPT
   Interactive Functionality & Event Handling
   ============================================ */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    initMobileMenu();
    initSearchForm();
    initSmoothScrolling();
    initAnimations();
    initTransportationCards();
    initRouteCards();
    initFormValidation();
    initNavbarScroll();
    initProfileDropdown();
    initAuthForms();
    console.log('Darbna Landing Page Initialized Successfully');
}

/* ============================================
   MOBILE NAVIGATION
   ============================================ */

function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            toggleMobileMenu(navMenu, mobileMenuToggle);
        });
        
        // Close mobile menu when clicking on nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu(navMenu, mobileMenuToggle);
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                closeMobileMenu(navMenu, mobileMenuToggle);
            }
        });
    }
}

function toggleMobileMenu(navMenu, toggleButton) {
    const isOpen = navMenu.classList.contains('mobile-menu-open');
    
    if (isOpen) {
        closeMobileMenu(navMenu, toggleButton);
    } else {
        openMobileMenu(navMenu, toggleButton);
    }
}

function openMobileMenu(navMenu, toggleButton) {
    navMenu.classList.add('mobile-menu-open');
    toggleButton.innerHTML = '<i class="fas fa-times"></i>';
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu(navMenu, toggleButton) {
    navMenu.classList.remove('mobile-menu-open');
    toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = '';
}

/* ============================================
   SEARCH FORM FUNCTIONALITY
   ============================================ */

function initSearchForm() {
    const searchForm = document.getElementById('search-form');
    
    if (searchForm) {
        // Set default date to tomorrow
        setDefaultDate();
        
        // Handle form submission
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSearchSubmission();
        });
        
        // Add input event listeners for real-time validation
        const inputs = searchForm.querySelectorAll('.search-input');
        inputs.forEach(input => {
            input.addEventListener('input', validateInput);
            input.addEventListener('focus', handleInputFocus);
            input.addEventListener('blur', handleInputBlur);
        });
    }
}

function setDefaultDate() {
    const dateInput = document.getElementById('date-input');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
    }
}

function handleSearchSubmission() {
    const formData = getSearchFormData();
    
    if (validateSearchForm(formData)) {
        // Show loading state
        showSearchLoading();
        
        // Simulate API call
        setTimeout(() => {
            hideSearchLoading();
            showSearchResults(formData);
        }, 1500);
    }
}

function getSearchFormData() {
    return {
        from: document.getElementById('from-input')?.value.trim() || '',
        to: document.getElementById('to-input')?.value.trim() || '',
        date: document.getElementById('date-input')?.value || '',
        passengers: document.getElementById('passengers-input')?.value || '1'
    };
}

function validateSearchForm(formData) {
    let isValid = true;
    const errors = [];
    
    // Validate 'from' field
    if (!formData.from) {
        errors.push('Please enter departure location');
        markFieldError('from-input');
        isValid = false;
    } else {
        markFieldSuccess('from-input');
    }
    
    // Validate 'to' field
    if (!formData.to) {
        errors.push('Please enter destination');
        markFieldError('to-input');
        isValid = false;
    } else {
        markFieldSuccess('to-input');
    }
    
    // Validate date
    if (!formData.date) {
        errors.push('Please select travel date');
        markFieldError('date-input');
        isValid = false;
    } else {
        const selectedDate = new Date(formData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            errors.push('Travel date cannot be in the past');
            markFieldError('date-input');
            isValid = false;
        } else {
            markFieldSuccess('date-input');
        }
    }
    
    if (!isValid) {
        showErrors(errors);
    }
    
    return isValid;
}

function markFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('error');
        field.classList.remove('success');
    }
}

function markFieldSuccess(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('success');
        field.classList.remove('error');
    }
}

function showErrors(errors) {
    // Create or update error message display
    let errorContainer = document.querySelector('.search-errors');
    
    if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.className = 'search-errors';
        const searchWidget = document.querySelector('.hero-search-widget');
        searchWidget.appendChild(errorContainer);
    }
    
    errorContainer.innerHTML = errors.map(error => 
        `<div class="error-message"><i class="fas fa-exclamation-circle"></i> ${error}</div>`
    ).join('');
    
    // Remove errors after 5 seconds
    setTimeout(() => {
        if (errorContainer) {
            errorContainer.remove();
        }
    }, 5000);
}

function showSearchLoading() {
    const searchButton = document.querySelector('.btn-search');
    if (searchButton) {
        searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
        searchButton.disabled = true;
    }
}

function hideSearchLoading() {
    const searchButton = document.querySelector('.btn-search');
    if (searchButton) {
        searchButton.innerHTML = '<i class="fas fa-search"></i> Search rides';
        searchButton.disabled = false;
    }
}

function showSearchResults(formData) {
    // Create mock results notification
    const notification = createNotification(
        'success',
        `Found 12 rides from ${formData.from} to ${formData.to} on ${formatDate(formData.date)}`,
        5000
    );
    
    document.body.appendChild(notification);
    
    // Log search data for demo purposes
    console.log('Search performed:', formData);
}

/* ============================================
   SMOOTH SCROLLING
   ============================================ */

function initSmoothScrolling() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   ANIMATIONS & SCROLL EFFECTS
   ============================================ */

function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.transport-card, .value-card, .route-card, .section-title, .hero-search-widget'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

let navbarScrollInitialized = false;

function initNavbarScroll() {
  if (navbarScrollInitialized) return; // prevent duplicate listeners
  navbarScrollInitialized = true;

  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScrollTop = 0;
  let ticking = false;

  const updateNavbar = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.classList.add('navbar-hidden');
    } else {
      navbar.classList.remove('navbar-hidden');
    }

    if (scrollTop > 10) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }

    lastScrollTop = Math.max(scrollTop, 0);
    ticking = false;
  };

  // Use requestAnimationFrame instead of throttling for smoother results
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  });
}

/* ============================================
   TRANSPORTATION CARDS
   ============================================ */

function initTransportationCards() {
    const transportCards = document.querySelectorAll('.transport-card');
    
    transportCards.forEach(card => {
        card.addEventListener('click', function() {
            const type = this.dataset.type;
            handleTransportationSelection(type, this);
        });
        
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
        });
    });
}

function handleTransportationSelection(type, cardElement) {
    // Remove active state from all cards
    document.querySelectorAll('.transport-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active state to selected card
    cardElement.classList.add('active');
    
    // Show notification
    const message = type === 'carpool' 
        ? 'Carpool selected! Redirecting to carpool search...'
        : 'Bus travel selected! Redirecting to bus routes...';
    
    const notification = createNotification('info', message, 3000);
    document.body.appendChild(notification);
    
    // Simulate redirection
    setTimeout(() => {
        console.log(`Redirecting to ${type} page...`);
    }, 1000);
}

/* ============================================
   ROUTE CARDS
   ============================================ */

function initRouteCards() {
    const routeCards = document.querySelectorAll('.route-card');
    
    routeCards.forEach(card => {
        card.addEventListener('click', function() {
            handleRouteSelection(this);
        });
    });
}

function handleRouteSelection(routeCard) {
    const fromCity = routeCard.querySelector('.route-from').textContent;
    const toCity = routeCard.querySelector('.route-to').textContent;
    const price = routeCard.querySelector('.route-price').textContent;
    
    // Pre-fill search form with route data
    const fromInput = document.getElementById('from-input');
    const toInput = document.getElementById('to-input');
    
    if (fromInput && toInput) {
        fromInput.value = fromCity;
        toInput.value = toCity;
        
        // Scroll to search widget
        const searchWidget = document.querySelector('.hero-search-widget');
        if (searchWidget) {
            searchWidget.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Show notification
        const notification = createNotification(
            'success',
            `Route ${fromCity} → ${toCity} selected (${price})`,
            3000
        );
        document.body.appendChild(notification);
    }
}

/* ============================================
   FORM VALIDATION
   ============================================ */

function initFormValidation() {
    // Add CSS classes for validation states
    const style = document.createElement('style');
    style.textContent = `
        .search-input.error {
            border-color: #ef4444;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
        
        .search-input.success {
            border-color: var(--color-success);
            box-shadow: 0 0 0 3px rgba(141, 181, 150, 0.1);
        }
        
        .search-errors {
            margin-top: 1rem;
        }
        
        .error-message {
            color: #ef4444;
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .navbar-hidden {
            transform: translateY(-100%);
        }
        
        .navbar-scrolled {
            box-shadow: var(--shadow-md);
        }
        
        .navbar {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .transport-card.active {
            border-color: var(--color-primary-orange);
            background-color: rgba(255, 107, 53, 0.05);
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-md);
            color: white;
            font-weight: 500;
            z-index: 1001;
            animation: slideInRight 0.3s ease-out;
            max-width: 400px;
            box-shadow: var(--shadow-lg);
        }
        
        .notification.success {
            background-color: var(--color-success);
        }
        
        .notification.error {
            background-color: #ef4444;
        }
        
        .notification.info {
            background-color: var(--color-primary-blue);
        }
        
        .notification.warning {
            background-color: var(--color-warning);
            color: var(--color-text-gray);
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .notification-close {
            background: none;
            border: none;
            color: inherit;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: 1rem;
            opacity: 0.7;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        /* Mobile menu styles */
        .nav-menu.mobile-menu-open {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background-color: var(--color-white);
            padding: 2rem;
            box-shadow: var(--shadow-lg);
            z-index: 999;
            gap: 1.5rem;
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
}

function validateInput(event) {
    const input = event.target;
    const value = input.value.trim();
    
    // Remove existing validation classes
    input.classList.remove('error', 'success');
    
    // Basic validation
    if (value.length > 0) {
        if (input.type === 'date') {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate >= today) {
                input.classList.add('success');
            } else {
                input.classList.add('error');
            }
        } else {
            input.classList.add('success');
        }
    }
}

function handleInputFocus(event) {
    const inputGroup = event.target.closest('.input-group');
    if (inputGroup) {
        inputGroup.classList.add('focused');
    }
}

function handleInputBlur(event) {
    const inputGroup = event.target.closest('.input-group');
    if (inputGroup) {
        inputGroup.classList.remove('focused');
    }
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

function createNotification(type, message, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close" aria-label="Close notification">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto-remove after duration
    setTimeout(() => {
        removeNotification(notification);
    }, duration);
    
    return notification;
}

function removeNotification(notification) {
    if (notification && notification.parentNode) {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ============================================
   PROFILE DROPDOWN FUNCTIONALITY
   ============================================ */

function initProfileDropdown() {
    const profileDropdown = document.getElementById('profile-dropdown');
    const profileIconBtn = document.getElementById('profile-icon-btn');
    const profileDropdownMenu = document.getElementById('profile-dropdown-menu');
    
    if (profileDropdown && profileIconBtn && profileDropdownMenu) {
        // Toggle dropdown on icon click
        profileIconBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleProfileDropdown();
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!profileDropdown.contains(e.target)) {
                closeProfileDropdown();
            }
        });
        
        // Close dropdown on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeProfileDropdown();
            }
        });
        
        // Prevent dropdown menu clicks from bubbling
        profileDropdownMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

function toggleProfileDropdown() {
    const profileDropdown = document.getElementById('profile-dropdown');
    if (profileDropdown) {
        profileDropdown.classList.toggle('active');
    }
}

function closeProfileDropdown() {
    const profileDropdown = document.getElementById('profile-dropdown');
    if (profileDropdown) {
        profileDropdown.classList.remove('active');
    }
}

/* ============================================
   AUTHENTICATION FORMS FUNCTIONALITY
   ============================================ */

function initAuthForms() {
    // Initialize login form
    initLoginForm();
    
    // Initialize signup form
    initSignupForm();
    
    // Initialize password toggles
    initPasswordToggles();
    
    // Initialize form validation
    initAuthFormValidation();
}

function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLoginSubmit(this);
        });
    }
}

function initSignupForm() {
    const signupForm = document.getElementById('signup-form');
    const termsCheckbox = document.getElementById('terms-checkbox');
    const submitBtn = document.getElementById('signup-submit-btn');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignupSubmit(this);
        });
        
        // Enable/disable submit button based on terms acceptance
        if (termsCheckbox && submitBtn) {
            termsCheckbox.addEventListener('change', function() {
                submitBtn.disabled = !this.checked;
            });
        }
        
        // Initialize password strength indicator
        const passwordInput = document.getElementById('signup-password');
        if (passwordInput) {
            passwordInput.addEventListener('input', updatePasswordStrength);
        }
    }
}

function initPasswordToggles() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.parentElement.querySelector('input[type="password"], input[type="text"]');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
                this.setAttribute('aria-label', 'Hide password');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
                this.setAttribute('aria-label', 'Show password');
            }
        });
    });
}

function initAuthFormValidation() {
    const authInputs = document.querySelectorAll('.auth-form input');
    
    authInputs.forEach(input => {
        input.addEventListener('blur', validateAuthInput);
        input.addEventListener('input', clearAuthInputError);
    });
}

function validateAuthInput(event) {
    const input = event.target;
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error state
    input.classList.remove('error');
    removeFieldError(input);
    
    if (!value && input.required) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (value) {
        switch (input.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'tel':
                const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
                if (!phoneRegex.test(value) || value.length < 8) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
                break;
            case 'password':
                if (value.length < 8) {
                    isValid = false;
                    errorMessage = 'Password must be at least 8 characters long';
                }
                break;
        }
    }
    
    if (!isValid) {
        input.classList.add('error');
        showFieldError(input, errorMessage);
    }
    
    return isValid;
}

function clearAuthInputError(event) {
    const input = event.target;
    input.classList.remove('error');
    removeFieldError(input);
}

function showFieldError(input, message) {
    let errorElement = input.parentElement.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: #e74c3c;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
        `;
        input.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function removeFieldError(input) {
    const errorElement = input.parentElement.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function updatePasswordStrength() {
    const password = this.value;
    const strengthIndicator = document.getElementById('password-strength');
    
    if (!strengthIndicator) return;
    
    const strengthFill = strengthIndicator.querySelector('.strength-fill');
    const strengthText = strengthIndicator.querySelector('.strength-text');
    
    let strength = 0;
    let strengthLabel = '';
    
    // Calculate password strength
    if (password.length >= 8) strength += 1;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
    
    // Remove existing strength classes
    strengthFill.classList.remove('weak', 'medium', 'strong');
    
    if (password.length === 0) {
        strengthFill.style.width = '0%';
        strengthText.textContent = 'Password strength';
        return;
    }
    
    switch (strength) {
        case 1:
            strengthFill.classList.add('weak');
            strengthLabel = 'Weak';
            break;
        case 2:
        case 3:
            strengthFill.classList.add('medium');
            strengthLabel = 'Medium';
            break;
        case 4:
            strengthFill.classList.add('strong');
            strengthLabel = 'Strong';
            break;
        default:
            strengthLabel = 'Very Weak';
    }
    
    strengthText.textContent = `${strengthLabel} password`;
}

function handleLoginSubmit(form) {
    const formData = new FormData(form);
    const loginData = {
        emailOrMobile: formData.get('email-mobile'),
        password: formData.get('password')
    };
    
    // Validate form
    let isValid = true;
    const inputs = form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        if (!validateAuthInput({ target: input })) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('error', 'Please fix the errors before submitting');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message (in real app, this would handle actual authentication)
        showNotification('success', 'Login functionality will be implemented with backend integration');
        console.log('Login attempt:', loginData);
    }, 2000);
}

function handleSignupSubmit(form) {
    const formData = new FormData(form);
    const signupData = {
        fullName: formData.get('full-name'),
        countryCode: document.getElementById('country-code').value,
        mobileNumber: formData.get('mobile-number'),
        email: formData.get('email'),
        password: formData.get('password'),
        termsAccepted: formData.get('terms') === 'on'
    };
    
    // Validate form
    let isValid = true;
    const inputs = form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        if (!validateAuthInput({ target: input })) {
            isValid = false;
        }
    });
    
    if (!signupData.termsAccepted) {
        showNotification('error', 'Please accept the Terms & Conditions to continue');
        isValid = false;
    }
    
    if (!isValid) {
        showNotification('error', 'Please fix the errors before submitting');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message (in real app, this would handle actual registration)
        showNotification('success', 'Account creation functionality will be implemented with backend integration');
        console.log('Signup attempt:', { ...signupData, password: '[HIDDEN]' });
    }, 2000);
}

function showNotification(type, message, duration = 5000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.auth-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `auth-notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideInRight 0.3s ease-out;
    `;
    
    if (type === 'success') {
        notification.style.backgroundColor = '#8DB596';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#e74c3c';
    }
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, duration);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

/* ============================================
   ERROR HANDLING
   ============================================ */

window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // Show user-friendly error notification in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const notification = createNotification(
            'error',
            'A JavaScript error occurred. Check the console for details.',
            5000
        );
        document.body.appendChild(notification);
    }
});

// Expose useful functions to global scope for debugging
window.DarbnaApp = {
    createNotification,
    formatDate,
    validateSearchForm: (formData) => validateSearchForm(formData),
    version: '1.0.0'
};

console.log('Darbna Landing Page JavaScript Loaded Successfully!');

/* ============================================
   NEW PAGES FUNCTIONALITY
   ============================================ */

// Initialize new page functionality
document.addEventListener('DOMContentLoaded', function() {
    initNewPagesFunctionality();
});

function initNewPagesFunctionality() {
    // Initialize functionality based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'how-it-works.html':
            initFAQAccordion();
            break;
        case 'offer-ride.html':
            initOfferRideForm();
            break;
        case 'find-ride.html':
            initFindRidePage();
            break;
        case 'about.html':
            // About page doesn't need special initialization
            break;
        default:
            // Default initialization for index and other pages
            break;
    }
    
    console.log(`Initialized functionality for: ${currentPage}`);
}

/* ============================================
   FAQ ACCORDION FUNCTIONALITY
   ============================================ */

function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQ items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    otherQuestion.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current FAQ item
            this.setAttribute('aria-expanded', !isExpanded);
        });
    });
}

/* ============================================
   OFFER RIDE FORM FUNCTIONALITY
   ============================================ */

function initOfferRideForm() {
    const form = document.getElementById('offer-ride-form');
    const progressSteps = document.querySelectorAll('.progress-step');
    const formSteps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    
    let currentStep = 1;
    
    // Next step buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextStep = parseInt(this.dataset.next);
            if (validateCurrentStep(currentStep)) {
                goToStep(nextStep);
            }
        });
    });
    
    // Previous step buttons
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = parseInt(this.dataset.prev);
            goToStep(prevStep);
        });
    });
    
    // Price per seat input handler
    const priceInput = document.getElementById('price-per-seat');
    const availableSeatsSelect = document.getElementById('available-seats');
    
    if (priceInput && availableSeatsSelect) {
        priceInput.addEventListener('input', updateTripSummary);
        availableSeatsSelect.addEventListener('change', updateTripSummary);
    }
    
    // Form inputs change handlers
    const formInputs = form.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('change', updateTripSummary);
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateCurrentStep(3)) {
            handleOfferRideSubmission();
        }
    });
    
    function goToStep(step) {
        // Update progress bar
        progressSteps.forEach((progressStep, index) => {
            if (index + 1 <= step) {
                progressStep.classList.add('active');
            } else {
                progressStep.classList.remove('active');
            }
        });
        
        // Update form steps
        formSteps.forEach((formStep, index) => {
            if (index + 1 === step) {
                formStep.classList.add('active');
            } else {
                formStep.classList.remove('active');
            }
        });
        
        currentStep = step;
        updateTripSummary();
    }
    
    function validateCurrentStep(step) {
        const currentFormStep = document.getElementById(`step-${step}`);
        const requiredInputs = currentFormStep.querySelectorAll('input[required], select[required]');
        
        let isValid = true;
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#FF6B35';
                isValid = false;
            } else {
                input.style.borderColor = '#E5E5E5';
            }
        });
        
        return isValid;
    }
    
    function updateTripSummary() {
        const departureCity = document.getElementById('departure-city')?.value || '';
        const destinationCity = document.getElementById('destination-city')?.value || '';
        const departureDate = document.getElementById('departure-date')?.value || '';
        const departureTime = document.getElementById('departure-time')?.value || '';
        const availableSeats = document.getElementById('available-seats')?.value || '';
        const vehicleType = document.getElementById('vehicle-type')?.value || '';
        const pricePerSeat = document.getElementById('price-per-seat')?.value || '0';
        
        // Update summary elements
        document.getElementById('summary-route').textContent = 
            departureCity && destinationCity ? `${departureCity} → ${destinationCity}` : '-';
        
        document.getElementById('summary-datetime').textContent = 
            departureDate && departureTime ? `${departureDate} at ${departureTime}` : '-';
        
        document.getElementById('summary-seats').textContent = 
            availableSeats ? `${availableSeats} seat${availableSeats > 1 ? 's' : ''}` : '-';
        
        document.getElementById('summary-vehicle').textContent = 
            vehicleType ? vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1) : '-';
        
        document.getElementById('summary-price').textContent = 
            pricePerSeat ? `${pricePerSeat} SAR` : '-';
        
        // Calculate total earnings
        const totalEarnings = availableSeats && pricePerSeat ? 
            (parseInt(availableSeats) * parseFloat(pricePerSeat)) : 0;
        
        document.getElementById('summary-total').textContent = 
            totalEarnings ? `${totalEarnings} SAR` : '-';
    }
    
    function handleOfferRideSubmission() {
        // Show loading state
        const submitButton = document.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publishing...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Published Successfully!';
            submitButton.style.backgroundColor = '#8DB596';
            
            // Show success notification
            const notification = createNotification(
                'success',
                'Your ride has been published successfully! Passengers can now book seats.',
                5000
            );
            document.body.appendChild(notification);
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                goToStep(1);
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.backgroundColor = '';
            }, 3000);
        }, 2000);
    }
}

/* ============================================
   FIND RIDE PAGE FUNCTIONALITY
   ============================================ */

function initFindRidePage() {
    initStickySearchBar();
    initFilters();
    initViewToggle();
    initRideCards();
    initPriceSlider();
}

function initStickySearchBar() {
    const searchForm = document.getElementById('ride-search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRideSearch();
        });
    }
    
    // Set default date to today
    const travelDateInput = document.getElementById('travel-date');
    if (travelDateInput) {
        const today = new Date().toISOString().split('T')[0];
        travelDateInput.value = today;
    }
}

function initFilters() {
    const filterInputs = document.querySelectorAll('.filter-option input[type="checkbox"]');
    const clearFiltersBtn = document.getElementById('clear-filters');
    
    filterInputs.forEach(input => {
        input.addEventListener('change', handleFilterChange);
    });
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            filterInputs.forEach(input => {
                input.checked = false;
            });
            handleFilterChange();
        });
    }
}

function initViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const listView = document.getElementById('results-list');
    const mapView = document.getElementById('map-view');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const view = this.dataset.view;
            
            // Update active button
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Toggle views
            if (view === 'map') {
                listView.style.display = 'none';
                mapView.style.display = 'block';
            } else {
                listView.style.display = 'block';
                mapView.style.display = 'none';
            }
        });
    });
}

function initRideCards() {
    const rideCards = document.querySelectorAll('.ride-card');
    
    rideCards.forEach(card => {
        const viewDetailsBtn = card.querySelector('.view-details');
        const bookRideBtn = card.querySelector('.book-ride');
        
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', function() {
                const rideId = this.dataset.rideId;
                handleViewDetails(rideId);
            });
        }
        
        if (bookRideBtn) {
            bookRideBtn.addEventListener('click', function() {
                const rideId = this.dataset.rideId;
                handleBookRide(rideId);
            });
        }
    });
    
    // Load more button
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', handleLoadMore);
    }
}

function initPriceSlider() {
    const priceSlider = document.getElementById('price-slider');
    const priceValue = document.getElementById('price-value');
    
    if (priceSlider && priceValue) {
        priceSlider.addEventListener('input', function() {
            priceValue.textContent = this.value;
            handleFilterChange();
        });
    }
}

function handleRideSearch() {
    const formData = new FormData(document.getElementById('ride-search-form'));
    const searchData = Object.fromEntries(formData);
    
    console.log('Searching for rides:', searchData);
    
    // Show loading state
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.textContent = 'Searching...';
    }
    
    // Simulate API call
    setTimeout(() => {
        if (resultsCount) {
            resultsCount.textContent = Math.floor(Math.random() * 20) + 5;
        }
        
        // Show notification
        const notification = createNotification(
            'info',
            `Found rides from ${searchData.from} to ${searchData.to}`,
            3000
        );
        document.body.appendChild(notification);
    }, 1000);
}

function handleFilterChange() {
    console.log('Filters changed');
    // In a real app, this would filter the results
    
    // Show brief loading indication
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        const currentCount = resultsCount.textContent;
        resultsCount.textContent = 'Filtering...';
        
        setTimeout(() => {
            resultsCount.textContent = currentCount;
        }, 500);
    }
}

function handleViewDetails(rideId) {
    console.log('View details for ride:', rideId);
    
    const notification = createNotification(
        'info',
        'Ride details would open in a modal or new page',
        3000
    );
    document.body.appendChild(notification);
}

function handleBookRide(rideId) {
    console.log('Book ride:', rideId);
    
    const notification = createNotification(
        'success',
        'Booking functionality would redirect to payment page',
        4000
    );
    document.body.appendChild(notification);
}

function handleLoadMore() {
    const loadMoreBtn = document.getElementById('load-more');
    
    // Show loading state
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    loadMoreBtn.disabled = true;
    
    // Simulate loading more results
    setTimeout(() => {
        loadMoreBtn.innerHTML = 'Load More Rides';
        loadMoreBtn.disabled = false;
        
        const notification = createNotification(
            'info',
            'More rides loaded successfully',
            3000
        );
        document.body.appendChild(notification);
    }, 1500);
}

console.log('New pages functionality initialized successfully!');

/* =======================================================
   AUTH & DASHBOARD SYSTEM (Additive version)
   Unified login for admin and users — keeps old code intact
   ======================================================= */

document.addEventListener("DOMContentLoaded", () => {

  // Hash for password safety
  const simpleHash = str => [...str].reduce((a, c) => ((a << 5) - a) + c.charCodeAt(0) | 0, 0).toString();

  // Default admin account
  const admin = { email: "admin@darbna.sa", password: simpleHash("admin123"), role: "admin" };
const storedAdmin = JSON.parse(localStorage.getItem("adminAccount"));

if (!storedAdmin || storedAdmin.password === "admin123") {
  // Recreate admin account if old format or missing
  localStorage.setItem("adminAccount", JSON.stringify(admin));
}

  // ============ SIGNUP ============
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", e => {
      e.preventDefault();
      const fullName = document.getElementById("full-name").value.trim();
      const email = document.getElementById("email").value.trim();
      const mobile = document.getElementById("mobile-number").value.trim();
      const password = document.getElementById("signup-password").value.trim();

      if (!fullName || !email || !mobile || !password) {
        alert("Please fill all fields");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.some(u => u.email === email)) {
        alert("This email is already registered");
        return;
      }

      users.push({ fullName, email, mobile, password, role: "user" });
      localStorage.setItem("users", JSON.stringify(users));

      alert("Signup successful! You can now log in.");
      window.location.href = "login.html";
    });
  }

  // ============ LOGIN ============
// ============ UNIFIED LOGIN (Admin + User) ============
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const input = document.getElementById("email-mobile").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    const adminData = JSON.parse(localStorage.getItem("adminAccount"));
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // --- Admin Login ---
    if (input === adminData.email && simpleHash(password) === adminData.password) {
      localStorage.setItem("loggedInUser", JSON.stringify({
        ...adminData,
        fullName: "Administrator"
      }));
      alert("Welcome Admin!");
      window.location.href = "admin-dashboard.html";
      return;
    }
    // Admin login (for admin-login.html)
const adminLoginForm = document.getElementById("admin-login-form");
if (adminLoginForm) {
  adminLoginForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("admin-email").value.trim().toLowerCase();
    const password = document.getElementById("admin-password").value.trim();
    const adminData = JSON.parse(localStorage.getItem("adminAccount"));

    if (email === adminData.email && simpleHash(password) === adminData.password) {
      localStorage.setItem("loggedInUser", JSON.stringify(adminData));
      alert("Welcome Admin!");
      window.location.href = "admin-dashboard.html";
    } else {
      alert("Invalid admin credentials.");
    }
  });
}

    // --- User Login ---
    const user = users.find(u =>
      (u.email.toLowerCase() === input || u.mobile === input) && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert(`Welcome ${user.fullName}!`);
      window.location.href = "user-dashboard.html";
    } else {
      alert("Invalid credentials. Please try again.");
    }
  });
}

  // ============ DASHBOARDS ============
  const path = window.location.pathname;

  // Admin dashboard
  if (path.includes("admin-dashboard.html")) {
    const logged = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!logged || logged.role !== "admin") {
      alert("Admins only!");
      window.location.href = "login.html";
      return;
    }
    document.querySelector(".page-title").textContent = `Welcome, ${logged.email}`;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    document.getElementById("total-users").textContent = users.length;
  }

  // User dashboard
  if (path.includes("user-dashboard.html")) {
    const logged = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!logged || logged.role !== "user") {
      alert("Users only!");
      window.location.href = "login.html";
      return;
    }
    const welcome = document.querySelector(".welcome-text");
    if (welcome) welcome.textContent = `Hello, ${logged.fullName}!`;
  }

  // Logout
  const logout = document.querySelector(".logout-btn, .btn-secondary");
  if (logout) {
    logout.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "login.html";
    });
  }

});