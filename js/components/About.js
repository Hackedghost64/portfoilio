import BaseComponent from '../core/BaseComponent.js';

class AboutComponent extends BaseComponent {
    styles() {
        return `
            :host {
                display: block;
                padding: var(--section-gap) 0;
            }
            .container {
                max-width: var(--container-max);
                margin: 0 auto;
                padding: 0 var(--gutter);
            }
            .card {
                background: var(--surface);
                border: 1px solid rgba(140, 144, 159, 0.2);
                border-radius: 16px;
                padding: 48px;
                position: relative;
                overflow: hidden;
            }
            .card::before {
                content: '';
                position: absolute;
                top: 0; left: 0;
                width: 4px; height: 100%;
                background: var(--primary);
            }
            h2 {
                color: var(--primary);
                margin-bottom: 1.5rem;
                font-size: 2rem;
            }
            p {
                font-size: 1.25rem;
                line-height: 1.8;
                color: var(--on-surface);
                opacity: 0.9;
            }
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
export default AboutComponent;
