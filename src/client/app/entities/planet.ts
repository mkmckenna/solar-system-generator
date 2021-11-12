import * as THREE from 'three'
import { WIREFRAME } from '../constants'
import { Box3, BufferGeometry, MathUtils, SrcColorFactor } from 'three'
import { Entity } from './entity'
import { SolarSystem } from './solar_system'

// Vertex shader provides the position of the point
const planetVertexShader = `
varying vec3 vertexNormal;

void main() {
    vertexNormal = normalize( normalMatrix * normal );
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
// Fragment shader provides the color of the point
const planetFragmentShader = `
varying vec3 vertexNormal;

void main() {
    float intensity = 1.5 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);

    gl_FragColor = vec4(atmosphere, 1.0);
}
`

// Vertex shader provides the position of the point
const atmosphereVertexShader = `
varying vec3 vertexNormal;

void main() {
    vertexNormal = normalize( normalMatrix * normal );
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
// Fragment shader provides the color of the point
const atmosphereFragmentShader = `
varying vec3 vertexNormal;

void main() {
    float intensity = pow(0.6 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
}
`
export enum PlanetType {
    Gas = "Gas",
    Ice = "Ice",
    Rock = "Rock"  
}

export class Planet extends Entity {

    private planetType: PlanetType;
    private position: THREE.Vector3;

    constructor( system: SolarSystem ) {
        super()
        this.position = new THREE.Vector3(0, 0, 0)
        this.setRandomPlanetPlacement( system )
        this.setRandomPlanetType()
        this.planetType = PlanetType.Rock

        this.object = this.init();
    }

    setRandomPlanetType() {
        const values = Object.keys(PlanetType);
        const key = values[Math.floor(Math.random() * values.length)];
        switch (key) {
            case "Gas": this.planetType = PlanetType.Gas
            case "Ice": this.planetType = PlanetType.Ice
            case "Rock": this.planetType = PlanetType.Rock
        }
    }

    setRandomPlanetPlacement( system: SolarSystem ) {
        const starRadius = system.getStar().getRadius()

        this.position.x = ( Math.random() - 0.5 ) * MathUtils.randInt( starRadius, 500 )
        this.position.y = ( Math.random() - 0.5 ) * Math.random() * 100
        this.position.z = ( Math.random() - 0.5 ) * MathUtils.randInt( starRadius, 500 )

        // Check if planet is too close to star
        if ( this.position.length() < starRadius * 2 ) {
            this.setRandomPlanetPlacement( system )
        }

        // system.getPlanets().forEach( planet => {
        //     planet.object.
        // });
    }

    init(): THREE.Object3D {
        const planetGeometry = new THREE.SphereGeometry( 15, 32, 16 )
        const planetMaterial = new THREE.ShaderMaterial( {
            vertexShader: planetVertexShader,
            fragmentShader: planetFragmentShader,
            wireframe: WIREFRAME,
        } )
        
        const atmosphereGeometry = new THREE.SphereGeometry( 15, 32, 16 )
        const atmosphereMaterial = new THREE.ShaderMaterial( {
            vertexShader: atmosphereVertexShader,
            fragmentShader: atmosphereFragmentShader,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            wireframe: WIREFRAME,
        } )
        
        const planet = new THREE.Mesh( planetGeometry, planetMaterial )
        
        const atmosphere = new THREE.Mesh( atmosphereGeometry, atmosphereMaterial )
        atmosphere.scale.set( 1.2, 1.2, 1.2 )
        
        planet.add( atmosphere )

        planet.position.copy(this.position)

        return planet
    }
}

