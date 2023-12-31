import {LitElement, html, css} from 'lit';
import * as THREE from 'three';
//import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
//import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.155.0/three.module.js';


export class WebComponentThreeTest extends LitElement {

    static styles = css`

        :host {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
        }

        html, body {
            width: 100%;
            height: 100%;
            maring: 0;
        }

    `;

    scene;
    camera;
    geometry;
    material;
    mesh;
    renderer;
    meshPosX;
    meshPosY;
    meshPosZ;
    positionToggle;
    angle;
    angleSpeed;
    rotationSpeed;
    radius;
    renderWidth;
    renderHeight;

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
            meshradius: {
                type: Number,
                attribute: true
            },
            meshrotationspeed: {
                type: Number,
                attribute: true
            },
            meshanglespeed: {
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
        this.mesh;
        this.renderer;
        this.isloading = false;
        this.datasource = [];
        this.positionToggle = true;
        this.angle = 0;
        this.radius = 3;
        this.rotationSpeed = 0.01;
        this.angleSpeed = 0.01;
        this.renderwidth = 300;
        this.renderheight = 150;

        this.initScene();
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 2000);
        //this.geometry = new THREE.BoxGeometry(3, 3, 3);
        this.geometry = new THREE.IcosahedronGeometry(1.0, 0);
        this.material = new THREE.MeshStandardMaterial({ color: 0x336699 });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.light = new THREE.PointLight( 0xffffff, 1000, 1000 );
        this.light.position.z = 15;
        
        this.scene.add(this.mesh);
        this.scene.add(this.mesh);
        this.scene.add(this.mesh);
        this.scene.add(this.light);

        this.initCamera();
        this.initRenderer();
     
        requestAnimationFrame(this.worldLoop.bind(this));
    }

    initCamera() {
        this.camera.position.z = 10;
        this.camera.updateProjectionMatrix();
        this.camera.aspect = 2;
        this.camera.updateProjectionMatrix();
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({alpha: true});
        this.renderer.setSize(1000, 400);
    }

    handleRenderResize() {
        const resizeObserver = new ResizeObserver((entry) => {
            console.log(entry);
        });

        this.resizeObserver.observer(this.document.getElementById('box'));

    }

    rotateMesh() {
        this.mesh.rotation.x += this.rotationSpeed;
        this.mesh.rotation.y += this.rotationSpeed;
    }

    moveLight() {
        this.light.position.x = this.mesh.position.x;
        this.light.position.z = this.mesh.position.z + 10;
    }

    moveMesh() {
        this.mesh.position.y >= 3 ? this.positionToggle = false : null;
        this.mesh.position.y <= 0 ? this.positionToggle = true : null;     

        this.angle += this.angleSpeed;

        const zPos = Math.cos(this.angle) * this.radius;
        const xPos = Math.sin(this.angle) * this.radius;

        this.mesh.position.x = xPos;
        this.mesh.position.z = zPos;
    }

    handleWindowResize() {
        window.addEventListener('resize', () => {
            this.updateRendererSize();
        })
    }

    updateRendererSize() {
        const boxRect = this.shadowRoot.getElementById('box').getBoundingClientRect();
        this.camera.aspect = boxRect.width / boxRect.height;
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(boxRect.width, boxRect.height);
    }

    worldLoop() {
        this.rotateMesh();
        this.moveMesh();
        this.moveLight();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.worldLoop.bind(this));
    }

    firstUpdated () {
        super.firstUpdated();
        let box = this.shadowRoot.getElementById('box');
        box.appendChild(this.renderer.domElement);
        this.handleWindowResize();
        this.updateRendererSize();
    }

    updated(changedProperties) {
        try {
            if(this.meshanglespeed && this.meshrotationspeed && this.meshradius) {
                this.angleSpeed = this.meshanglespeed;
                this.rotationSpeed = this.meshrotationspeed;
                this.radius = this.meshradius;
            }
        }
        catch {

        }
    }

    render() {
        return html `
            <div id="box" style="width: 100%; height: 100%;"></div>
        `
    }


}

console.log('WEBCOMPONENT ThreeTest Imported');

customElements.define('webc-threetest', WebComponentThreeTest);