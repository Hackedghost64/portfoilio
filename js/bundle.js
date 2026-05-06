/**
 * Portfolio Architecture Bundle
 * Zero-dependency, single-artifact compilation.
 * Bypasses CORS 'file://' restrictions and optimizes load performance.
 */

// --- Logger Class ---
class Logger {
    static levels = { INFO: 'INFO', WARN: 'WARN', ERROR: 'ERROR', TRACE: 'TRACE' };

    static log(level, message, context = '') {
        const timestamp = new Date().toISOString();
        const formattedMessage = `[${timestamp}] [${level}] ${context ? `[${context}] ` : ''}${message}`;
        switch (level) {
            case this.levels.ERROR: console.error(formattedMessage); break;
            case this.levels.WARN: console.warn(formattedMessage); break;
            default: console.log(formattedMessage);
        }
    }
    static info(message, context) { this.log(this.levels.INFO, message, context); }
    static warn(message, context) { this.log(this.levels.WARN, message, context); }
    static error(message, context) { this.log(this.levels.ERROR, message, context); }
    static trace(message, context) { this.log(this.levels.TRACE, message, context); }
}

// --- BaseComponent Class ---
class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._initialized = false;
    }
    connectedCallback() {
        if (!this._initialized) {
            try {
                this.render();
                this.afterRender();
                this._initialized = true;
                Logger.trace(`${this.tagName} initialized successfully.`, 'BaseComponent');
            } catch (err) {
                Logger.error(`Failed to initialize ${this.tagName}: ${err.message}`, 'BaseComponent');
            }
        }
    }
    template() { return ''; }
    render() {
        this.shadowRoot.innerHTML = `<style>${this.styles()}</style>${this.template()}`;
    }
    styles() { return ''; }
    afterRender() {}
    $(selector) { return this.shadowRoot.querySelector(selector); }
}

// --- Navbar Component ---
class NavbarComponent extends BaseComponent {
    styles() {
        return `
            :host { display: block; position: sticky; top: 0; z-index: 1000; background: rgba(11, 19, 38, 0.8); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(140, 144, 159, 0.1); }
            nav { max-width: var(--container-max, 1440px); margin: 0 auto; padding: 1rem var(--gutter, 24px); display: flex; justify-content: space-between; align-items: center; }
            .logo { font-family: var(--font-headline, sans-serif); font-weight: 700; font-size: 1.25rem; color: var(--primary, #adc6ff); text-decoration: none; }
            .nav-links { display: flex; gap: 2rem; }
            .nav-links a { text-decoration: none; color: var(--on-surface, #dae2fd); font-size: 0.9rem; font-weight: 500; transition: color 0.3s ease; opacity: 0.7; }
            .nav-links a:hover { opacity: 1; color: var(--primary, #adc6ff); }
            @media (max-width: 768px) { .nav-links { display: none; } }
        `;
    }
    template() {
        return `
            <nav>
                <a href="#" class="logo">DG // ARCHITECT</a>
                <div class="nav-links">
                    <a href="#about">Philosophy</a>
                    <a href="#projects">Engineering</a>
                    <a href="#tech">Stack</a>
                    <a href="https://github.com/Hackedghost64" target="_blank">GitHub</a>
                </div>
            </nav>
        `;
    }
}
customElements.define('portfolio-nav', NavbarComponent);

// --- Hero Component ---
class HeroComponent extends BaseComponent {
    styles() {
        return `
            :host { display: block; padding: var(--section-gap, 80px) 0; background: linear-gradient(to bottom, #0b1326, #131b2e); }
            .hero-content { text-align: center; max-width: 800px; margin: 0 auto; }
            h1 { font-size: clamp(2.5rem, 8vw, 4.5rem); color: var(--primary, #adc6ff); margin-bottom: 1rem; line-height: 1.1; font-family: var(--font-headline, sans-serif); }
            p { font-size: clamp(1.125rem, 2vw, 1.5rem); color: var(--on-surface, #dae2fd); opacity: 0.8; margin-bottom: 2.5rem; font-family: var(--font-body, sans-serif); }
            .btn-group { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
            .btn { padding: 12px 28px; border-radius: 8px; font-weight: 600; text-decoration: none; transition: all 0.3s ease; font-family: var(--font-headline, sans-serif); }
            .btn-primary { background: var(--primary, #adc6ff); color: var(--on-primary, #002e6a); }
            .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(173, 198, 255, 0.2); }
            .btn-outline { border: 1px solid var(--outline, #8c909f); color: var(--on-surface, #dae2fd); }
            .btn-outline:hover { background: rgba(218, 226, 253, 0.05); }
        `;
    }
    template() {
        return `
            <section class="hero-content">
                <h1>Divyam | Systems & Automation Developer</h1>
                <p>Engineering scalable, OOP-driven applications and mobile-first web architectures.</p>
                <div class="btn-group">
                    <a href="#projects" class="btn btn-primary">View Live Projects</a>
                    <a href="https://github.com/Hackedghost64" class="btn btn-outline" target="_blank">GitHub (@Hackedghost64)</a>
                </div>
            </section>
        `;
    }
}
customElements.define('portfolio-hero', HeroComponent);

// --- About Component ---
class AboutComponent extends BaseComponent {
    styles() {
        return `
            :host { display: block; min-height: 100vh; display: flex; align-items: center; padding: var(--section-gap, 80px) 0; background: var(--background, #0b1326); }
            .container { max-width: var(--container-max, 1440px); margin: 0 auto; padding: 0 var(--gutter, 24px); width: 100%; box-sizing: border-box; }
            .card { background: var(--surface, #171f33); border: 1px solid rgba(140, 144, 159, 0.2); border-radius: 16px; padding: 48px; position: relative; overflow: hidden; box-sizing: border-box; }
            .card::before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: var(--primary, #adc6ff); }
            h2 { color: var(--primary, #adc6ff); margin-bottom: 1.5rem; font-size: 2rem; font-family: var(--font-headline, sans-serif); }
            p { font-size: 1.25rem; line-height: 1.8; color: var(--on-surface, #dae2fd); opacity: 0.9; font-family: var(--font-body, sans-serif); }
        `;
    }
    template() {
        return `
            <div class="container">
                <div class="card">
                    <h2>Architectural Philosophy</h2>
                    <p>I do not build fragile scripts; I engineer robust systems. Every project I deploy strictly enforces Object-Oriented Programming (OOP), asynchronous logic, and Defensive Programming. From comprehensive Trace Debugging to mobile-first responsive UI, I build architectures designed to scale.</p>
                </div>
            </div>
        `;
    }
}
customElements.define('portfolio-about', AboutComponent);

// --- Projects Component ---
class ProjectsComponent extends BaseComponent {
    styles() {
        return `
            :host { display: block; min-height: 100vh; display: flex; align-items: center; padding: var(--section-gap, 80px) 0; background: #0f172a; }
            .container { max-width: var(--container-max, 1440px); margin: 0 auto; padding: 0 var(--gutter, 24px); width: 100%; box-sizing: border-box; }
            h2 { color: var(--primary, #adc6ff); margin-bottom: 3rem; font-size: 2.5rem; text-align: center; font-family: var(--font-headline, sans-serif); }
            .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 450px)); gap: 2rem; justify-content: center; }
            .card { background: var(--surface, #171f33); border: 1px solid rgba(140, 144, 159, 0.1); border-radius: 12px; padding: 32px; transition: transform 0.4s ease; display: flex; flex-direction: column; box-sizing: border-box; }
            .card:hover { transform: translateY(-8px); border-color: var(--primary, #adc6ff); }
            .stack { font-family: var(--font-headline, sans-serif); color: var(--primary, #adc6ff); font-size: 0.875rem; text-transform: uppercase; margin-bottom: 0.75rem; }
            h3 { font-size: 1.5rem; margin-bottom: 1rem; font-family: var(--font-headline, sans-serif); color: var(--on-surface, #dae2fd); }
            p { opacity: 0.8; margin-bottom: 2rem; flex-grow: 1; font-family: var(--font-body, sans-serif); color: var(--on-surface, #dae2fd); }
            .link { color: var(--primary, #adc6ff); text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 0.5rem; }
        `;
    }
    template() {
        const projects = [
            { title: "Flux Wave Ecosystem", stack: "Python, Full-Stack", logic: "Engineered an end-to-end automated scraping and streaming architecture with robust asynchronous data parsing and strict state mapping for video delivery.", link: "https://github.com/Hackedghost64/flux_wave_backed" },
            { title: "Scalable Lead-Gen Portal", stack: "Mobile-First Grid System", logic: "Developed a high-conversion, responsive portfolio framework designed for freelance lead generation, strictly refactored into modular UI classes.", link: "#" }
        ];
        return `
            <div class="container" id="projects">
                <h2>Featured Engineering</h2>
                <div class="grid">
                    ${projects.map(p => `<article class="card"><span class="stack">${p.stack}</span><h3>${p.title}</h3><p>${p.logic}</p><a href="${p.link}" class="link" target="_blank">View Repository →</a></article>`).join('')}
                </div>
            </div>
        `;
    }
}
customElements.define('portfolio-projects', ProjectsComponent);

// --- TechStack Component ---
class TechStackComponent extends BaseComponent {
    styles() {
        return `
            :host { display: block; padding: var(--section-gap, 80px) 0; }
            .container { max-width: var(--container-max, 1440px); margin: 0 auto; padding: 0 var(--gutter, 24px); }
            h2 { color: var(--primary, #adc6ff); margin-bottom: 3rem; font-size: 2.5rem; text-align: center; font-family: var(--font-headline, sans-serif); }
            .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1.5rem; }
            .tech-item { background: rgba(23, 31, 51, 0.5); border: 1px solid rgba(140, 144, 159, 0.1); border-radius: 8px; padding: 24px; text-align: center; transition: all 0.3s ease; box-sizing: border-box; }
            .tech-item:hover { background: var(--surface, #171f33); border-color: var(--primary, #adc6ff); transform: scale(1.05); }
            .icon { font-size: 3rem; margin-bottom: 1rem; display: block; color: var(--primary, #adc6ff); font-family: 'Material Symbols Outlined'; }
            span { font-family: var(--font-headline, sans-serif); font-weight: 500; color: var(--on-surface, #dae2fd); }
        `;
    }
    template() {
        const techs = [
            { name: "Python", icon: "terminal" }, { name: "Dart (Flutter)", icon: "flutter" },
            { name: "Firebase", icon: "database" }, { name: "Linux", icon: "computer" },
            { name: "Git", icon: "history" }, { name: "System Design", icon: "architecture" }
        ];
        return `
            <div class="container">
                <h2>Core Tech Stack</h2>
                <div class="grid">
                    ${techs.map(t => `<div class="tech-item"><span class="material-symbols-outlined icon">${t.icon}</span><span>${t.name}</span></div>`).join('')}
                </div>
            </div>
        `;
    }
}
customElements.define('portfolio-tech', TechStackComponent);

// --- Initialization Logic ---
document.addEventListener('DOMContentLoaded', () => {
    Logger.info('Portfolio system online (Bundled Artifact).', 'App');
    
    // Reveal-on-scroll logic
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('portfolio-hero, portfolio-about, portfolio-projects, portfolio-tech, section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});
