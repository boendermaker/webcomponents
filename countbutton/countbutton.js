import {LitElement, html, css} from './lit.min.js';

export class CountButton extends LitElement {

    static get properties() {
        return {
            title: { type: String },
            count: { type: Number }
        };
    }

    constructor() {
        super();
        this.count = 0;
    }

    countUp() {
        this.count++;
    }

    render() {
        return html `
            <button @click=${() => this.countUp()}>${this.count}</button>

        `
    }


}

window.customElements.define('costum-countbutton', CountButton);