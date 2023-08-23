import {LitElement, html, css} from 'lit';

export class WebComponentDataTest extends LitElement {

    static get properties() {
        return {
            title: { type: String },
            data: { type: Array }
        };
    }

    static styles = css`
        
    `;

    constructor() {
        super();
        this.data = [];
    }

    updated(changedProperties) {
        console.log(changedProperties); // logs previous values
        console.log(this.data); // logs current value
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

customElements.define('webc-datatest', WebComponentDataTest);