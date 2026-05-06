import Logger from './core/Logger.js';
import './components/Hero.js';
import './components/About.js';
import './components/Projects.js';
import './components/TechStack.js';

/**
 * app.js
 * Application entry point.
 * Bootstraps the modular Web Component architecture.
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        Logger.info('Portfolio application bootstrapping...', 'App');
        
        // Additional sleek logic could go here (e.g., scroll observers)
        initScrollAnimations();
        
        Logger.info('Bootstrap complete.', 'App');
    } catch (err) {
        Logger.error(`Bootstrap failed: ${err.message}`, 'App');
    }
});

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe sections for scroll-in animations
    document.querySelectorAll('section, portfolio-about, portfolio-projects, portfolio-tech').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}
