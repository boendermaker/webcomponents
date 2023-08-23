import {LitElement, html, css} from 'lit';

export class WebComponentDataTest extends LitElement {

    dataItemsTmplArray;

    static get properties() {
        return {
            title: { 
                type: String, 
                attribute: true 
            },
            datasource: {
                type: String, 
                attribute: true
            }
        };
    }

    static styles = css`
        
    `;

    constructor() {
        super();
        this.datasource = [];
        this.dataItemsTmplArray = [];
    }

    setDataItemsTmplArray() {
        this.dataItemsTmplArray = this.datasource.map((dataItem) => {
            return html `<div>${dataItem.name}</div>`
        });
    }

    /*attributeChangedCallback(name, oldval, newval) {
        console.log('attribute change: ', name, newval);
        super.attributeChangedCallback(name, oldval, newval);
    }*/

    updated(changedProperties) {
        try {
            this.datasource = JSON.parse(this.datasource);
            this.setDataItemsTmplArray();
        }
        catch {
        }
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