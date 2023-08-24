import {LitElement, html, css} from 'lit';
import * as THREE from 'three';
//import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
//import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.155.0/three.module.js';


export class WebComponentThreeTest extends LitElement {

    static styles = css`

        :host {
            position: relative;
            display: inline-block;
        }

    `;

    scene;
    camera;
    geometry;
    material;
    cube;
    renderer;
    cubePosX;
    cubePosY;
    cubePosZ;
    positionToggle;
    angle;
    angleSpeed;
    rotationSpeed;
    radius;

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
            cuberadius: {
                type: Number,
                attribute: true
            },
            cuberotationspeed: {
                type: Number,
                attribute: true
            },
            cubeanglespeed: {
                type: Number,
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
        this.positionToggle = true;
        this.angle = 0;
        this.radius = 5;
        this.rotationSpeed = 0.01;
        this.angleSpeed = 0.05;

        this.initScene();        
    }

    getHostConstraints() {
        console.log(this.shadowRoot);
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 2000);
        //this.geometry = new THREE.BoxGeometry(3, 3, 3);
        this.geometry = new THREE.IcosahedronGeometry(15.0, 0);
        this.material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        this.light = new THREE.PointLight( 0xffffff, 100, 100 );
        this.light.position.z = 10;
        
        this.scene.add(this.cube);
        this.scene.add(this.light);

        this.initCamera();
        this.initRenderer();
     
        requestAnimationFrame(this.renderCycle.bind(this));
    }

    initCamera() {
        this.camera.position.z = 10;
        this.camera.updateProjectionMatrix();
        this.camera.aspect = 2;
        this.camera.updateProjectionMatrix();
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({alpha: true});
        this.renderer.setSize(800, 400);
    }

    rotateCube() {
        this.cube.rotation.x += this.rotationSpeed;
        this.cube.rotation.y += this.rotationSpeed;
    }

    moveCube() {
        this.cube.position.y >= 3 ? this.positionToggle = false : null;
        this.cube.position.y <= 0 ? this.positionToggle = true : null;     

        this.angle += this.angleSpeed;

        const zPos = Math.cos(this.angle) * this.radius;
        const xPos = Math.sin(this.angle) * this.radius;

        this.cube.position.x = xPos;
        this.cube.position.z = zPos;
    }

    renderCycle() {
        this.rotateCube();
        this.moveCube();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.renderCycle.bind(this));
    }

    firstUpdated () {
        super.firstUpdated();
        this.getHostConstraints();
        let box = this.shadowRoot.getElementById('box');
        box.appendChild(this.renderer.domElement);
    }

    updated(changedProperties) {
        try {
            if(this.cubeanglespeed && this.cuberotationspeed && this.cuberadius) {
                this.angleSpeed = this.cubeanglespeed;
                this.rotationSpeed = this.cuberotationspeed;
                this.radius = this.cuberadius;
            }
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