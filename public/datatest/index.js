import {LitElement, html, css} from 'lit';

export class WebComponentDataTest extends LitElement {

    dataItemsTmplArray;

    static get properties() {
        return {
            title: { type: String, attribute: true },
            data: { type: Array, attribute: true }
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
        //if(this.data.length > 0) {
            this.setDataItemsTmplArray();
        //}
        console.log(this.data)
    }

    setDataItemsTmplArray() {
        
        this.dataItemsTmplArray = this.data.map((dataItem) => {
            return html `<div>${dataItem.name}</div>`
        })
        
        console.log('WEBC DATATEST DataItemsTmplArray', this.dataItemsTmplArray)
    }

    render() {

        return html `
        <div style="width: 100%; border: 1px solid #999;">
            ${this.dataItemsTmplArray.map(tmplItem => tmplItem)}
        </div>

        `
    }


}

console.log('WEBCOMPONENT DataTest Imported');

customElements.define('webc-datatest', WebComponentDataTest);