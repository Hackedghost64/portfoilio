import BaseComponent from '../core/BaseComponent.js';

class ProjectsComponent extends BaseComponent {
    styles() {
        return `
            :host {
                display: block;
                min-height: 100vh;
                display: flex;
                align-items: center;
                padding: var(--section-gap) 0;
                background: #0f172a;
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
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
            }
            .card {
                background: var(--surface);
                border: 1px solid rgba(140, 144, 159, 0.1);
                border-radius: 12px;
                padding: 32px;
                transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease;
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            .card:hover {
                transform: translateY(-8px);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                border-color: var(--primary);
            }
            .stack {
                font-family: var(--font-headline);
                color: var(--primary);
                font-size: 0.875rem;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                margin-bottom: 0.75rem;
            }
            h3 {
                font-size: 1.5rem;
                margin-bottom: 1rem;
            }
            p {
                opacity: 0.8;
                margin-bottom: 2rem;
                flex-grow: 1;
            }
            .link {
                color: var(--primary);
                text-decoration: none;
                font-weight: 600;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
            }
            @media (max-width: 480px) {
                .grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
    }

    template() {
        const projects = [
            {
                title: "Flux Wave Ecosystem",
                stack: "Python, Full-Stack",
                logic: "Engineered an end-to-end automated scraping and streaming architecture with robust asynchronous data parsing and strict state mapping for video delivery.",
                link: "https://github.com/Hackedghost64/flux_wave_backed"
            },
            {
                title: "Scalable Lead-Gen Portal",
                stack: "Mobile-First Grid System",
                logic: "Developed a high-conversion, responsive portfolio framework designed for freelance lead generation, strictly refactored into modular UI classes.",
                link: "#"
            }
        ];

        return `
            <div class="container" id="projects">
                <h2>Featured Engineering</h2>
                <div class="grid">
                    ${projects.map(p => `
                        <article class="card">
                            <span class="stack">${p.stack}</span>
                            <h3>${p.title}</h3>
                            <p>${p.logic}</p>
                            <a href="${p.link}" class="link" target="_blank">View Repository →</a>
                        </article>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

customElements.define('portfolio-projects', ProjectsComponent);
export default ProjectsComponent;
