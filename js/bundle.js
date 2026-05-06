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
            @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
            :host { display: block; position: sticky; top: 0; z-index: 1000; background: rgba(11, 19, 38, 0.8); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(140, 144, 159, 0.1); }
            nav { max-width: var(--container-max, 1440px); margin: 0 auto; padding: 1rem var(--gutter, 24px); display: flex; justify-content: space-between; align-items: center; }
            .logo { font-family: var(--font-headline, sans-serif); font-weight: 700; font-size: 1.25rem; color: var(--primary, #adc6ff); text-decoration: none; display: flex; align-items: center; gap: 0.5rem; }
            .nav-links { display: flex; gap: 2rem; }
            .nav-links a { text-decoration: none; color: var(--on-surface, #dae2fd); font-size: 0.9rem; font-weight: 500; transition: color 0.3s ease; opacity: 0.7; display: flex; align-items: center; gap: 0.4rem; }
            .nav-links a:hover { opacity: 1; color: var(--primary, #adc6ff); }
            .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 20px; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; -webkit-font-smoothing: antialiased; }
            @media (max-width: 768px) { 
                nav { flex-direction: column; gap: 1rem; }
                .nav-links { flex-wrap: wrap; justify-content: center; gap: 1rem; }
            }
        `;
    }
    template() {
        return `
            <nav>
                <a href="#" class="logo"><span class="material-symbols-outlined">architecture</span> DG // ARCHITECT</a>
                <div class="nav-links">
                    <a href="#about"><span class="material-symbols-outlined">lightbulb</span> Philosophy</a>
                    <a href="#projects"><span class="material-symbols-outlined">terminal</span> Engineering</a>
                    <a href="#tech"><span class="material-symbols-outlined">dns</span> Stack</a>
                    <a href="https://github.com/Hackedghost64" target="_blank"><span class="material-symbols-outlined">code</span> GitHub</a>
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
            @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
            :host { display: block; padding: var(--section-gap, 80px) 0; background: linear-gradient(to bottom, #0b1326, #131b2e); }
            .hero-content { text-align: center; max-width: 800px; margin: 0 auto; padding: 0 var(--gutter, 24px); }
            h1 { font-size: clamp(2.5rem, 8vw, 4.5rem); color: var(--primary, #adc6ff); margin-bottom: 1rem; line-height: 1.1; font-family: var(--font-headline, sans-serif); }
            p { font-size: clamp(1.125rem, 2vw, 1.5rem); color: var(--on-surface, #dae2fd); opacity: 0.8; margin-bottom: 2.5rem; font-family: var(--font-body, sans-serif); }
            .btn-group { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
            .btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 12px 28px; border-radius: 8px; font-weight: 600; text-decoration: none; transition: all 0.3s ease; font-family: var(--font-headline, sans-serif); }
            .btn-primary { background: var(--primary, #adc6ff); color: var(--on-primary, #002e6a); }
            .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(173, 198, 255, 0.2); }
            .btn-outline { border: 1px solid var(--outline, #8c909f); color: var(--on-surface, #dae2fd); }
            .btn-outline:hover { background: rgba(218, 226, 253, 0.05); }
            .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; -webkit-font-smoothing: antialiased; }
        `;
    }
    template() {
        return `
            <section class="hero-content">
                <h1>Divyam | Systems & Automation Developer</h1>
                <p>Engineering scalable, OOP-driven applications and mobile-first web architectures.</p>
                <div class="btn-group">
                    <a href="#projects" class="btn btn-primary"><span class="material-symbols-outlined">rocket_launch</span> View Live Projects</a>
                    <a href="https://github.com/Hackedghost64" class="btn btn-outline" target="_blank"><span class="material-symbols-outlined">code_blocks</span> GitHub (@Hackedghost64)</a>
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
            .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 350px), 1fr)); gap: 2rem; justify-content: center; }
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
            :host { display: block; padding: var(--section-gap, 80px) 0; background: var(--background, #0b1326); }
            .container { max-width: var(--container-max, 1440px); margin: 0 auto; padding: 0 var(--gutter, 24px); width: 100%; box-sizing: border-box; }
            h2 { color: var(--primary, #adc6ff); margin-bottom: 3rem; font-size: clamp(2rem, 5vw, 2.5rem); text-align: center; font-family: var(--font-headline, sans-serif); }
            .grid { 
                display: grid; 
                grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); 
                gap: 1.5rem; 
                justify-content: center;
            }
            .tech-item { 
                background: rgba(23, 31, 51, 0.8); 
                border: 1px solid rgba(140, 144, 159, 0.2); 
                border-radius: 12px; 
                padding: 24px; 
                text-align: center; 
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                gap: 12px;
            }
            .tech-item:hover { 
                background: var(--surface, #171f33); 
                border-color: var(--primary, #adc6ff); 
                transform: translateY(-5px); 
            }
            .icon-svg { 
                width: 48px; 
                height: 48px; 
                fill: var(--primary, #adc6ff); 
                transition: fill 0.3s ease;
            }
            .tech-item:hover .icon-svg { fill: #fff; }
            span { 
                font-family: var(--font-headline, sans-serif); 
                font-weight: 600; 
                color: var(--on-surface, #dae2fd); 
                font-size: 0.9rem; 
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            @media (max-width: 480px) {
                .grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
                .tech-item { padding: 16px; }
                .icon-svg { width: 32px; height: 32px; }
            }
        `;
    }
    template() {
        const icons = {
            python: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M14.25.18l.9.2.73.26.59.33.45.38.34.44.25.51.16.57.08.62.03.66v.7h-6V3.6h4.57l.15.01.14.03.1.05.07.08.03.11v.83l-.02.13-.05.11-.08.07-.11.04-.13.02H11.5v2h3.5l.3-.01.28-.05.24-.09.2-.13.15-.17.1-.21.05-.24.01-.26v-1.1h1.22l.14.02.13.04.1.08.07.11.03.14v3.13l-.03.43-.08.4-.13.36-.18.32-.23.28-.27.24-.32.2-.35.15-.39.1-.42.06H14.5v2h-1.5v1.43l-.01.44-.05.42-.09.39-.14.36-.19.32-.24.28-.28.24-.32.2-.36.15-.39.11-.42.07H6.5l-.42-.07-.39-.11-.36-.15-.32-.2-.28-.24-.24-.28-.19-.32-.14-.36-.09-.39-.05-.42-.01-.44V15h1.5v-2H5.08l-.42-.06-.39-.1-.35-.15-.32-.2-.27-.24-.23-.28-.18-.32-.13-.36-.08-.4-.03-.43V7.93l.03-.14.07-.11.1-.08.13-.04.14-.02h1.22v1.1l.01.26.05.24.1.21.15.17.2.13.24.09.28.05.3.01H11.5v-2H8.57l-.13-.02-.11-.04-.08-.07-.05-.11-.02-.13v-.83l.03-.11.07-.08.1-.05.14-.03.15-.01H13.4V3.88l-.03-.66-.08-.62-.16-.57-.25-.51-.34-.44-.45-.38-.59-.33-.73-.26-.9-.2-.96-.07-.96.07-.9.2-.73.26-.59.33-.45.38-.34.44-.25.51-.16.57-.08.62-.03.66v2h2v-1h4v1h-2v1h2l.06.01.05.02.04.03.02.04.01.05v.44l-.01.05-.02.04-.04.03-.05.02-.06.01H8.5l-.3-.01-.28-.05-.24-.09-.2-.13-.15-.17-.1-.21-.05-.24-.01-.26V5.3l-.03-.66-.08-.62-.16-.57-.25-.51-.34-.44-.45-.38-.59-.33-.73-.26-.9-.2-.96-.07-.96.07-.9.2-.73.26-.59.33-.45.38-.34.44-.25.51-.16.57-.08.62-.03.66v.7h6v.7H4.43l-.15-.01-.14-.03-.1-.05-.07-.08-.03-.11v-.83l.02-.13.05-.11.08-.07.11-.04.13-.02H7.5v-2h-3.5l-.3.01-.28.05-.24.09-.2.13-.15.17-.1.21-.05.24-.01.26v1.1H2.07l-.14-.02-.13-.04-.1-.08-.07-.11-.03-.14V4.8l.03-.43.08-.4.13-.36.18-.32.23-.28.27-.24.32-.2.35-.15.39-.1.42-.06H4.5v-2h1.5V1.43l.01-.44.05-.42.09-.39.14-.36.19-.32.24-.28.28-.24.32-.2.36-.15.39-.11.42-.07h6l.42.07.39.11.36.15.32.2.28.24.24.28.19.32.14.36.09.39.05.42.01.44V3h-1.5v2h3.92l.42.06.39.1.35.15.32.2.27.24.23.28.18.32.13.36.08.4.03.43v3.13l-.03.14-.07.11-.1.08-.13.04-.14.02h-1.22v-1.1l-.01-.26-.05-.24-.1-.21-.15-.17-.2-.13-.24-.09-.28-.05-.3-.01H7.5v2h3l.13.02.11.04.08.07.05.11.02.13v.83l-.03.11-.07.08-.1.05-.14.03-.15.01H5.6v-.7h-2v.66l.03.62.08.57.16.51.25.44.34.38.45.33.59.26.73.2.9.07.96-.07.96.07.9-.2.73-.26.59-.33.45-.38.34-.44.25-.51.16-.57.08-.62.03-.66v-2h-2v1h-4v-1h2v-1h-2l-.06-.01-.05-.02-.04-.03-.02-.04-.01-.05v-.44l.01-.05.02-.04.04-.03.05-.02.06-.01h3.5l.3.01.28.05.24.09.2.13.15.17.1.21.05.24.01.26v1.1l.03.66.08.62.16.57.25.51.34.44.45.38.59.33.73.26.9.2.96.07.96-.07.9-.2.73-.26.59-.33.45-.38.34-.44.25-.51.16-.57.08-.62.03-.66v-.7z"/></svg>`,
            flutter: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M13.51 0L4.31 9.21l1.41 1.41L14.92 1.41zM20.25 10.65l-2.83-2.83-9.21 9.21 1.41 1.41zM20.25 15.11l-4.41-4.41-1.41 1.41 4.41 4.41-4.41 4.41 1.41 1.41 5.82-5.82z"/></svg>`,
            firebase: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M3.89 15.67L5.26 6.95l.13-.13a.5.5 0 01.7 0L8.62 9.4l4.16-7.91a.5.5 0 01.9 0l2.12 4.02 3.1 5.86 1.23 8.16a.5.5 0 01-.78.53L3.11 16.2a.5.5 0 01.78-.53zM14.5 10.5l-2.12-4.02-4.16 7.91 3.5 1.87a.5.5 0 010 .88L8.22 18.8l7.24 4.07a.5.5 0 00.74-.44l-1.7-11.93z"/></svg>`,
            linux: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 2c-.93 0-1.77.16-2.5.47-.73.31-1.34.73-1.83 1.25-.49.52-.85 1.13-1.07 1.83-.22.7-.33 1.44-.33 2.22s.11 1.52.33 2.22c.22.7.58 1.31 1.07 1.83.49.52 1.1 1.04 1.83 1.56.73.52 1.57 1.04 2.5 1.56l.5.28c1.33.74 2.54 1.48 3.63 2.22 1.09.74 1.98 1.48 2.67 2.22.69.74 1.17 1.48 1.44 2.22.27.74.41 1.48.41 2.22s-.14 1.48-.41 2.22c-.27.74-.75 1.48-1.44 2.22-.69.74-1.58 1.48-2.67 2.22-1.09.74-2.3 1.48-3.63 2.22-.93 0-1.77-.16-2.5-.47-.73-.31-1.34-.73-1.83-1.25-.49-.52-.85-1.13-1.07-1.83-.22-.7-.33-1.44-.33-2.22s.11-1.52.33-2.22c.22-.7.58-1.31 1.07-1.83.49-.52 1.1-1.04 1.83-1.56.73-.52 1.57-1.04 2.5-1.56l.5-.28c1.33-.74 2.54-1.48 3.63-2.22 1.09-.74 1.98-1.48 2.67-2.22.69-.74 1.17-1.48 1.44-2.22.27-.74.41-1.48.41-2.22s-.14-1.48-.41-2.22c-.27-.74-.75-1.48-1.44-2.22-.69-.74-1.58-1.48-2.67-2.22-1.09-.74-2.3-.74-3.63-.74z"/></svg>`,
            git: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.187 0L8.708 2.624l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72 1.002 1.764.739 2.676-.263.911-1.003 1.583-1.914 1.846-.912.264-1.956-.017-2.677-.738-.519-.52-.663-1.267-.435-1.91l-2.62-2.62v6.524c.22.115.414.288.56.5.721.72 1.002 1.764.739 2.676-.263.911-1.003 1.583-1.914 1.846-.912.264-1.956-.017-2.677-.738-.721-.72-1.002-1.764-.739-2.676.263-.911 1.003-1.583 1.914-1.846.216-.063.438-.096.658-.096.24 0 .475.04.7.12V8.95c-.225-.115-.42-.29-.567-.504-.515-.516-.658-1.258-.438-1.9L8.41 3.882.452 11.84c-.603.604-.603 1.582 0 2.187l10.48 10.48c.604.603 1.582.603 2.187 0l10.427-10.427c.603-.604.603-1.582 0-2.187z"/></svg>`,
            architecture: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M4 2v20h16V2H4zm14 18H6V4h12v16zM8 6h8v2H8V6zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"/></svg>`
        };

        const techs = [
            { name: "Python", icon: icons.python },
            { name: "Flutter", icon: icons.flutter },
            { name: "Firebase", icon: icons.firebase },
            { name: "Linux", icon: icons.linux },
            { name: "Git", icon: icons.git },
            { name: "System Design", icon: icons.architecture }
        ];

        return `
            <div class="container">
                <h2>Core Tech Stack</h2>
                <div class="grid">
                    ${techs.map(t => `
                        <div class="tech-item">
                            ${t.icon}
                            <span>${t.name}</span>
                        </div>
                    `).join('')}
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
