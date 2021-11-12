import * as THREE from 'three'
import { WIREFRAME } from '../constants'
import { MathUtils } from 'three'
import { Entity } from './entity'

// Vertex shader provides the position of the point
const starVertexShader = `
varying vec3 vertexNormal;

void main() {
    vertexNormal = normalize( normalMatrix * normal );
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
// Fragment shader provides the color of the point
const starFragmentShader = `
varying vec3 vertexNormal;

void main() {
    float intensity = 2.3 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = vec3(0.9, 0.7, 0) * pow(intensity, 1.5);

    gl_FragColor = vec4(atmosphere, 1.0);
}
`

// Vertex shader provides the position of the point
const coronaVertexShader = `
varying vec3 vertexNormal;

void main() {
    vertexNormal = normalize( normalMatrix * normal );
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
// Fragment shader provides the color of the point
const coronaFragmentShader = `
varying vec3 vertexNormal;

void main() {
    float intensity = pow(0.7 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 1.5);
    gl_FragColor = vec4(0.9, 0.7, 0, 0.7) * intensity;
}
`
export class Star extends Entity {

    public radius: number
    public coronaScale: number

    constructor() {
        super()
        this.radius = MathUtils.randInt( 16, 32 )
        this.coronaScale = Math.random() + 1.5;

        this.object = this.init();
    }

    init(): THREE.Object3D {
        const starGeometry = new THREE.SphereGeometry( this.radius, 32, 16 )
        const starMaterial = new THREE.ShaderMaterial( {
            vertexShader: starVertexShader,
            fragmentShader: starFragmentShader,
            wireframe: WIREFRAME,
        } )
        
        const coronaGeometry = new THREE.SphereGeometry( this.radius, 32, 16 )
        const coronaMaterial = new THREE.ShaderMaterial( {
            vertexShader: coronaVertexShader,
            fragmentShader: coronaFragmentShader,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            wireframe: WIREFRAME,
        } )

        const star = new THREE.Mesh( starGeometry, starMaterial )
        
        const corona = new THREE.Mesh( coronaGeometry, coronaMaterial )
        corona.scale.set( this.coronaScale, this.coronaScale, this.coronaScale )
        
        star.add( corona )

        return star
    }

    getRadius() {
        return this.radius * this.coronaScale
    }    
}
