import {LitElement, html, css} from 'lit';

export class WebComponentDataTest extends LitElement {

    static get properties() {
        return {
            title: { type: String },
            data: { attribute: true },
            dataItemsTmplArray: {type: Array}
        };
    }

    static styles = css`
        
    `;

    constructor() {
        super();
        this.data = [];
        this.dataItemsTmplArray = [];
    }

    updated(changedProperties) {
        console.log(changedProperties); // logs previous values
        console.log(this.data); // logs current value
        if(this.data.length > 0) {
            this.setDataItemsTmplArray();
        }
    }

    setDataItemsTmplArray() {
        this.dataItemsTmplArray = this.data.map((dataItem) => {
            return html `<div>${dataItem.name}</div>`
        })
    }

    render() {
        return html `
        <div style="width: 100%; border: 1px solid #999;">
            ${this.dataItemsTmplArray}
        </div>

        `
    }


}

console.log('WEBCOMPONENT DataTest Imported');

customElements.define('webc-datatest', WebComponentDataTest);