import Logger from './core/Logger.js';
import './components/Navbar.js';
import './components/Hero.js';
import './components/About.js';
import './components/Projects.js';
import './components/TechStack.js';

/**
 * app.js
 * Application entry point.
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        Logger.info('Portfolio bootstrapping...', 'App');
        initRevealOnScroll();
        Logger.info('Bootstrap complete.', 'App');
    } catch (err) {
        Logger.error(`Bootstrap failed: ${err.message}`, 'App');
    }
});

/**
 * Robust reveal-on-scroll using IntersectionObserver.
 */
function initRevealOnScroll() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealables = document.querySelectorAll('portfolio-hero, portfolio-about, portfolio-projects, portfolio-tech, section');
    revealables.forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });
}
