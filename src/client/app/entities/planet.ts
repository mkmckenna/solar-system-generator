import * as THREE from 'three'
import { WIREFRAME } from '../constants'
import { Box3, BufferGeometry, MathUtils, SrcColorFactor } from 'three'
import { Entity } from './entity'
import { SolarSystem } from './solar_system'

// Shaders
import vertexShader from '../shaders/vertex_shader.glsl'
import atmosphereFragmentShader from '../shaders/planets/atmosphere_fragment_shader.glsl'
import planetFragmentShader from '../shaders/planets/surface_fragment_shader.glsl'

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
            vertexShader: vertexShader,
            fragmentShader: planetFragmentShader,
            wireframe: WIREFRAME,
        } )
        
        const atmosphereGeometry = new THREE.SphereGeometry( 15, 32, 16 )
        const atmosphereMaterial = new THREE.ShaderMaterial( {
            vertexShader: vertexShader,
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

