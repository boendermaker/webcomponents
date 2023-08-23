import {LitElement, html, css} from 'lit';

export class WebComponentDataTest extends LitElement {

    static styles = css`
        table {

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

            const userDataTableRow = (userItems) => {
                html `<tr>`
                for(const userItem in userItems) {
                    html `<td>${dataItem[userItem]}</td>`;
                }
                html `</tr>`
            }

            return html `
                ${userDataTableRow()}
            `
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
            <table style="width: 100%; border: 1px solid #999;">
                ${this.dataItemsTmplArray}
            </table>
        `
    }


}

console.log('WEBCOMPONENT DataTest Imported');

customElements.define('webc-datatest', WebComponentDataTest);