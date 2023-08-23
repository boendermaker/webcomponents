import {LitElement, html, css} from 'lit';

export class WebComponentDataTest extends LitElement {

    dataItemsTmplArray;
    dataArray;

    static get properties() {
        return {
            title: { type: String, attribute: true },
            data: { type: Array }
        };
    }

    static styles = css`
        
    `;

    constructor() {
        super();
        //this.data = [];
        this.dataItemsTmplArray = [];
        this.dataArray = [];
    }

    updated(changedProperties) {
        console.log(typeof this.data)
        //if(isArray(this.data) && this.data.length > 0) {
            //this.setDataItemsTmplArray();
        //}

        //this.data = JSON?.parse(this?.data);

        this.data = this._data;

        console.log('WEB CHANGED ', changedProperties);
        console.log('WEBC DATA ', this.data)
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
        </div>
        `
    }


}

console.log('WEBCOMPONENT DataTest Imported');

customElements.define('webc-datatest', WebComponentDataTest);