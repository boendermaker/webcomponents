import {LitElement, html, css} from 'lit';

export class WebComponentDataTest extends LitElement {

    static styles = css`
        .table-container {
            width: 100%;
            height: 500px;
            overflow: auto;
        }
        table {
            width: 100%;
            border-collapse: collapse; 
        }

        tr {
            border-bottom: 1px solid #999;
        }

        td {
            padding: 10px;
        }

    `;

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

    constructor() {
        super();
        this.datasource = [];
        this.dataItemsTmplArray = [];
    }

    setDataItemsTmplArray() {
        this.dataItemsTmplArray = this.datasource.map((dataItem, index) => {
            return html `
            <tr>
                <td>${index}</td>
                <td>${dataItem?.first_name}</td>
                <td>${dataItem?.last_name}</td>
                <td>${dataItem?.username}</td>
                <td>${dataItem?.password}</td>
                <td>${dataItem?.adress?.country}</td>
                <td>${dataItem?.adress?.state}</td>
            </tr>`
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
            <div class="table-container">
                <table>
                    ${this.dataItemsTmplArray}
                </table>
            </div>
        `
    }


}

console.log('WEBCOMPONENT DataTest Imported');

customElements.define('webc-datatest', WebComponentDataTest);