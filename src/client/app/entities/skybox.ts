import * as THREE from 'three';
import { Entity } from './entity';

export class Skybox extends Entity {

    constructor() {
        super()
        this.object = this.init()
    }

    init(): THREE.Object3D {
        const skyboxGeometry = new THREE.BufferGeometry();
        const skyboxMaterial = new THREE.PointsMaterial({
            color: 0x888888,
        });

        const starVertices = []

        for (let i = 0; i < 10000; i++) {
            const x = (Math.random() - 0.5) * 10000
            const y = (Math.random() - 0.5) * 10000
            const z = (Math.random() - 0.5) * 10000
            starVertices.push(x, y, z)
        }

        skyboxGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))

        return new THREE.Points(skyboxGeometry, skyboxMaterial)
    }

}

