import BaseComponent from '../core/BaseComponent.js';

class HeroComponent extends BaseComponent {
    styles() {
        return `
            :host {
                display: block;
                padding: var(--section-gap) 0;
                background: linear-gradient(to bottom, #0b1326, #131b2e);
            }
            .hero-content {
                text-align: center;
                max-width: 800px;
                margin: 0 auto;
                animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            h1 {
                font-size: clamp(2.5rem, 8vw, 4.5rem);
                color: var(--primary);
                margin-bottom: 1rem;
                line-height: 1.1;
            }
            p {
                font-size: clamp(1.125rem, 2vw, 1.5rem);
                color: var(--on-surface);
                opacity: 0.8;
                margin-bottom: 2.5rem;
            }
            .btn-group {
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
            }
            .btn {
                padding: 12px 28px;
                border-radius: 8px;
                font-weight: 600;
                text-decoration: none;
                transition: all 0.3s ease;
                font-family: var(--font-headline);
            }
            .btn-primary {
                background: var(--primary);
                color: var(--on-primary);
            }
            .btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(173, 198, 255, 0.2);
            }
            .btn-outline {
                border: 1px solid var(--outline);
                color: var(--on-surface);
            }
            .btn-outline:hover {
                background: rgba(218, 226, 253, 0.05);
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
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
export default HeroComponent;
