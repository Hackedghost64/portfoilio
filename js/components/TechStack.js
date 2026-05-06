import BaseComponent from '../core/BaseComponent.js';

class TechStackComponent extends BaseComponent {
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
            h2 {
                color: var(--primary);
                margin-bottom: 3rem;
                font-size: 2.5rem;
                text-align: center;
            }
            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                gap: 1.5rem;
            }
            .tech-item {
                background: rgba(23, 31, 51, 0.5);
                border: 1px solid rgba(140, 144, 159, 0.1);
                border-radius: 8px;
                padding: 24px;
                text-align: center;
                transition: all 0.3s ease;
            }
            .tech-item:hover {
                background: var(--surface);
                border-color: var(--primary);
                transform: scale(1.05);
            }
            .icon {
                font-size: 3rem;
                margin-bottom: 1rem;
                display: block;
                color: var(--primary);
            }
            span {
                font-family: var(--font-headline);
                font-weight: 500;
            }
        `;
    }

    template() {
        const techs = [
            { name: "Python", icon: "terminal" },
            { name: "Dart (Flutter)", icon: "flutter" },
            { name: "Firebase", icon: "database" },
            { name: "Linux", icon: "computer" },
            { name: "Git", icon: "history" },
            { name: "System Design", icon: "architecture" }
        ];

        return `
            <div class="container">
                <h2>Core Tech Stack</h2>
                <div class="grid">
                    ${techs.map(t => `
                        <div class="tech-item">
                            <span class="icon">${t.icon}</span>
                            <span>${t.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

customElements.define('portfolio-tech', TechStackComponent);
export default TechStackComponent;
ents.define('portfolio-tech', TechStackComponent);
export default TechStackComponent;
