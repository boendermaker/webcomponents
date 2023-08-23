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
                attribute: true,
                reflect: true
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

    updated(changedProperties) {
        console.log(typeof this.datasource)

        console.log('WEB CHANGED ', changedProperties);
        try {
            this.datasource = JSON.parse(this.datasource);
            this.setDataItemsTmplArray();
        }
        catch {
        }
        console.log('WEBC DATA ', this.datasource);
    }

    /*attributeChangedCallback(name, oldval, newval) {
        console.log('attribute change: ', name, newval);
        super.attributeChangedCallback(name, oldval, newval);
    }*/

    setDataItemsTmplArray() {
        
        this.dataItemsTmplArray = this.datasource.map((dataItem) => {
            return html `<div>${dataItem.name}</div>`
        });

        console.log('tmpls ', this.dataItemsTmplArray);

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