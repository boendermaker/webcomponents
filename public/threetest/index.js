import {LitElement, html, css} from 'lit';
import * as THREE from 'three';

export class WebComponentThreeTest extends LitElement {

    static styles = css`

        :host {
            position: relative;
        }

    `;

    scene;
    camera;
    geometry;
    material;
    cube;
    renderer;

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
            isloading: {
                type: Boolean, 
                attribute: true
            }
        };
    }

    constructor() {
        super();
        this.scene;
        this.camera;
        this.geometry;
        this.material;
        this.cube;
        this.renderer;
        this.isloading = false;
        this.datasource = [];

        this.initScene();

    }

    initScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        this.cube = new THREE.Mesh(this.geometry, this.material);
  
        this.scene.add(this.cube);
        this.camera.position.z = 100;
    
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(300, 300);

    }

    rotateCube() {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
    }

    render() {
        this.rotateCube();
        this.renderer.render(scene, camera);
    }

    firstUpdated () {
        let box = this.shadowRoot.getElementById('box');
        box.appendChild(this.renderer.domElement);
        requestAnimationFrame(this.render);
    }

    updated(changedProperties) {
        try {
            this.datasource = JSON.parse(this.datasource);
            this.setTableRowsHtmlArray();
        }
        catch {
        }
    }

    render() {
        return html `
            <div id="box"></div>
        `
    }


}

console.log('WEBCOMPONENT ThreeTest Imported');

customElements.define('webc-threetest', WebComponentThreeTest);