document.addEventListener("DOMContentLoaded", () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Apply fade-up to key elements
    const animateElements = document.querySelectorAll(
        '.what-text, .stats-grid, .pipeline-step, .property-card, ' +
        '.tech-text, .tech-stack, .investor-card, .service-card, .contact-form-wrapper'
    );

    animateElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease-out ${i * 0.05}s, transform 0.6s ease-out ${i * 0.05}s`;
        observer.observe(el);
    });
});
