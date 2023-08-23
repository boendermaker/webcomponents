import {LitElement, html, css} from 'lit';

export class WebComponentDataTest extends LitElement {

    dataItemsTmplArray;

    static get properties() {
        return {
            title: { type: String, attribute: true },
            datasource: { 
                type: Array, 
                attribute: true,
                converter: (value) => JSON.parse(value) 
            }
        };
    }

    static styles = css`
        
    `;

    constructor() {
        super();
        //this.data = [];
        this.dataItemsTmplArray = [];
    }

    updated(changedProperties) {
        console.log(typeof this.datasource)
        //if(isArray(this.data) && this.data.length > 0) {
            //this.setDataItemsTmplArray();
        //}

        console.log('WEB CHANGED ', changedProperties);
        console.log('WEBC DATA ', JSON?.parse(this?.datasource ?? []) ?? '')
    }

    setDataItemsTmplArray() {
        
        //this.dataItemsTmplArray = this.datasource.map((dataItem) => {
            //return html `<div>${dataItem.name}</div>`
        //})
        
        console.log('DATA WEBC ', this.datasource)
    }

    render() {

        return html `
        <div style="width: 100%; border: 1px solid #999;">

        </div>

        `
    }


}

console.log('WEBCOMPONENT DataTest Imported');

customElements.define('webc-datatest', WebComponentDataTest);