import {LitElement, html, css} from 'lit';

export class WebComponentDataTest extends LitElement {

    static styles = css`

        :host {
            position: relative;
        }

        .table-container {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: auto;
        }

        table {
            width: 100%;
            border-collapse: separate
        }
        
        th {
            padding: 10px;
            text-align: start;
            color: black;
            position: sticky;
            top: 0;
            border-bottom: 2px solid black;
            background: white;
        }

        tr {
            border-bottom: 1px solid #CCC;
        }

        td {
            padding: 10px;
        }

        .loader-container {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 999;
            pointer-events: none;
        }

        .loader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(10);
            pointer-events: none;
        }

        .show {
            display: block;
        }

        .hide {
            display: none;
        }
    `;

    tableHeaderHtmlArray
    tableRowsHtmlArray;

    static get properties() {
        return {
            title: { 
                type: String, 
                attribute: true 
            },
            datasource: {
                type: String, 
                attribute: true
            },
            datacolumns: {
                type: String,
                attribute: true
            },
            isloading: {
                type: Boolean, 
                attribute: true
            }
        };
    }

    constructor() {
        super();
        this.isloading = false;
        this.datasource = [];
        this.datacolumns = [];
        this.tableHeaderHtmlArray = [];
        this.tableRowsHtmlArray = [];
    }

    getLoadingPumpingHtml() {
        return html`
        <div class="loader-container">
            <div class="loader ${this.isloading ? 'show' : 'hide'}">
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_mHwL{animation:spinner_OeFQ .75s cubic-bezier(0.56,.52,.17,.98) infinite}.spinner_ote2{animation:spinner_ZEPt .75s cubic-bezier(0.56,.52,.17,.98) infinite}@keyframes spinner_OeFQ{0%{cx:4px;r:3px}50%{cx:9px;r:8px}}@keyframes spinner_ZEPt{0%{cx:15px;r:8px}50%{cx:20px;r:3px}}</style><defs><filter id="spinner-gF00"><feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="y"/><feColorMatrix in="y" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="z"/><feBlend in="SourceGraphic" in2="z"/></filter></defs><g filter="url(#spinner-gF00)"><circle class="spinner_mHwL" cx="4" cy="12" r="3"/><circle class="spinner_ote2" cx="15" cy="12" r="8"/></g></svg>
            </div>
        </div>
        `
    }

    getLoadingSpinnerHtml() {
        return html `
        <div class="loader-container">
            <div class="loader ${this.isloading ? 'show' : 'hide'}">
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg>
            </div>
        </div>
        `
    }

    setTableHeaderHtmlArray() {

        const tableHeaderHtmlArray = [];

        tableHeaderHtmlArray.push(html `
            <tr>
                ${this.datacolumns.map((column) => html `<th>${column.label}</th>`)}
            </tr>
        `)

        this.tableHeaderHtmlArray = tableHeaderHtmlArray;

    }

    setTableRowsHtmlArray() {

        const tableRowHtmlArray = [];

            this.datasource.forEach((dataItem, index) => {
                tableRowHtmlArray.push( html `
                    <tr>
                        ${this.datacolumns.map((column) => html `<td>${column.key == 'index' ? index : dataItem[column.key]}</td>`)}
                    </tr>
                `)
            });

            console.log(tableRowHtmlArray)

        this.tableRowsHtmlArray = tableRowHtmlArray;

    }

    /*attributeChangedCallback(name, oldval, newval) {
        console.log('attribute change: ', name, newval);
        super.attributeChangedCallback(name, oldval, newval);
    }*/

    updated(changedProperties) {
        try {
            if(changedProperties.has('datasource')) {
                this.datasource = JSON.parse(this.datasource);
            }
            if(changedProperties.has('datacolumns')) {
                this.datacolumns = JSON.parse(this.datacolumns);
            }
            if(Array.isArray(this.datacolumns)) {
                this.setTableHeaderHtmlArray();
            }
            if(Array.isArray(this.datasource)) {
                this.setTableRowsHtmlArray2();
            }
        }
        catch(error) {
            console.log(error);
        }
    }

    render() {
        return html `
            ${this.getLoadingSpinnerHtml()}
            <div class="table-container">
                <table>
                    ${this.tableHeaderHtmlArray}
                    ${this.tableRowsHtmlArray}
                </table>
            </div>
        `
    }


}

console.log('WEBCOMPONENT DataTest Imported');

customElements.define('webc-datatest', WebComponentDataTest);