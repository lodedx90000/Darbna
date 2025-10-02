// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Form submission
document.querySelector('.search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    alert(`Searching for rides from ${formData.get('from')} to ${formData.get('to')} on ${formData.get('date')} for ${formData.get('passengers')} passenger(s).`);
});

// Animations on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .step, .feature-card, .testimonial').forEach(el => {
    observer.observe(el);
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.style.background = window.pageYOffset > 100 ? 'rgba(253,253,253,0.98)' : 'rgba(253,253,253,0.95)';
});

// Button click animation
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => this.style.transform = '', 150);
    });
});

// Dynamic year
document.querySelector('.footer-bottom p').innerHTML =
    document.querySelector('.footer-bottom p').innerHTML.replace('2024', new Date().getFullYear());