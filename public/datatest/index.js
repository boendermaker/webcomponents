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

    getLoadingHtml() {
        return html`
        <div class="loader-container">
            <div class="loader ${this.isloading ? 'show' : 'hide'}">
                <svg width="24" height="24" viewBox="0 0 24 24 " xmlns="http://www.w3.org/2000/svg"><style>.spinner_mHwL{animation:spinner_OeFQ .75s cubic-bezier(0.56,.52,.17,.98) infinite}.spinner_ote2{animation:spinner_ZEPt .75s cubic-bezier(0.56,.52,.17,.98) infinite}@keyframes spinner_OeFQ{0%{cx:4px;r:3px}50%{cx:9px;r:8px}}@keyframes spinner_ZEPt{0%{cx:15px;r:8px}50%{cx:20px;r:3px}}</style><defs><filter id="spinner-gF00"><feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="y"/><feColorMatrix in="y" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="z"/><feBlend in="SourceGraphic" in2="z"/></filter></defs><g filter="url(#spinner-gF00)"><circle class="spinner_mHwL" cx="4" cy="12" r="3"/><circle class="spinner_ote2" cx="15" cy="12" r="8"/></g></svg>
            </div>
        </div>
        `
    }

    setTableHeaderHtmlArray() {

        const tableHeaderHtml = [] 

        tableHeaderHtml.push(html `<tr>`);
        this.datacolumns.forEach((column) => {
            tableHeaderHtml.push(html `<th>${column.label}</th>`)
        });
        tableHeaderHtml.push(html `</tr>`);

        this.tableHeaderHtmlArray = tableHeaderHtml;

    }

    setTableRowsHtmlArray() {

        const tableRowHtml = [];

        this.datasource.forEach((dataItem, index) => {
            tableRowHtml.push(html `<tr>`);
                this.datacolumns.forEach((column) => {
                    tableRowHtml.push(html `<td>${column.key == 'index' ? index : dataItem[column.key]}</td>`);
                })
            tableRowHtml.push(html `</tr>`);
        });

        this.tableRowsHtmlArray = tableRowHtml;

    }

    /*attributeChangedCallback(name, oldval, newval) {
        console.log('attribute change: ', name, newval);
        super.attributeChangedCallback(name, oldval, newval);
    }*/

    updated(changedProperties) {
        try {
            this.datasource = JSON.parse(this.datasource);
            this.datacolumns = JSON.parse(this.datacolumns);
            console.log(this.datacolumns);
            this.setTableHeaderHtmlArray();
            this.setTableRowsHtmlArray();
        }
        catch {
        }
    }

    render() {
        return html `
            ${this.getLoadingHtml()}
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