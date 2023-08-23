import {LitElement, html, css} from 'lit';

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
        <div>tester
            <button @click=${() => this.countUp()}>${this.count}</button>
        </div>

        `
    }


}

console.log('WEBCOMPONENT CountButton Imported');

customElements.define('costum-countbutton', CountButton);