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
        console.log('🚀 Portfolio Bootstrapping...');
        const status = document.createElement('div');
        status.style.cssText = 'position:fixed;top:0;left:0;background:red;color:white;padding:5px;z-index:9999;font-size:10px;display:none;';
        status.id = 'system-status';
        status.innerText = 'JS LOADED';
        document.body.appendChild(status);

        initRevealOnScroll();
        console.log('✅ Bootstrap Complete.');
    } catch (err) {
        console.error('❌ Bootstrap Failed:', err);
    }
});

/**
 * Robust reveal-on-scroll using IntersectionObserver.
 * Elements start with CSS-controlled opacity, not JS-forced 0.
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

    // Select all major sections and components
    const revealables = document.querySelectorAll('portfolio-hero, portfolio-about, portfolio-projects, portfolio-tech, section');
    revealables.forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });
}
