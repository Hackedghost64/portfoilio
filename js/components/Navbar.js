import BaseComponent from '../core/BaseComponent.js';

class NavbarComponent extends BaseComponent {
    styles() {
        return `
            :host {
                display: block;
                position: sticky;
                top: 0;
                z-index: 1000;
                background: rgba(11, 19, 38, 0.8);
                backdrop-filter: blur(12px);
                border-bottom: 1px solid rgba(140, 144, 159, 0.1);
            }
            nav {
                max-width: var(--container-max);
                margin: 0 auto;
                padding: 1rem var(--gutter);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .logo {
                font-family: var(--font-headline);
                font-weight: 700;
                font-size: 1.25rem;
                color: var(--primary);
                text-decoration: none;
            }
            .nav-links {
                display: flex;
                gap: 2rem;
            }
            .nav-links a {
                text-decoration: none;
                color: var(--on-surface);
                font-size: 0.9rem;
                font-weight: 500;
                transition: color 0.3s ease;
                opacity: 0.7;
            }
            .nav-links a:hover {
                opacity: 1;
                color: var(--primary);
            }
            @media (max-width: 768px) {
                .nav-links {
                    display: none; /* Mobile menu could be added here */
                }
            }
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
export default NavbarComponent;
