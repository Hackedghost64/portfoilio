import Logger from './Logger.js';

/**
 * BaseComponent.js
 * Abstract base class for all Web Components.
 * Enforces defensive programming and standardized rendering.
 */
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

    /**
     * Abstract method to be implemented by child components.
     * Should return the HTML template string.
     */
    template() {
        return '';
    }

    /**
     * Default render logic.
     */
    render() {
        const styles = this.styles();
        const content = this.template();
        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            ${content}
        `;
    }

    /**
     * Abstract method for component-specific styles.
     */
    styles() {
        return '';
    }

    /**
     * Hook called after the first render.
     */
    afterRender() {}

    /**
     * Defensive query selector within Shadow DOM.
     */
    $(selector) {
        const el = this.shadowRoot.querySelector(selector);
        if (!el) {
            Logger.warn(`Element not found: ${selector}`, this.tagName);
        }
        return el;
    }
}

export default BaseComponent;
