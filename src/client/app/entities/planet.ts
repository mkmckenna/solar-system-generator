import * as THREE from 'three'
import { WIREFRAME } from '../constants'
import { Box3, BufferGeometry, MathUtils, SrcColorFactor } from 'three'

// Shaders
import vertexShader from '../shaders/vertex_shader.glsl'
import atmosphereFragmentShader from '../shaders/planets/atmosphere_fragment_shader.glsl'
import planetFragmentShader from '../shaders/planets/surface_fragment_shader.glsl'
import { modelLoader, textureLoader } from '../../client'

import { getRandomArrayElement } from '../utils/utils'
import { Planets, planetsData } from '../data/planets_data'
import { Entity } from './entity'
import { SolarSystem } from './solar_system'

export enum PlanetType {
    Gas = "gas",
    Ice = "ice",
    Rock = "rock"  
}

export class Planet extends Entity {

    private planetType: PlanetType
    private position: THREE.Vector3
    private rotationSpeed = 0.0

    constructor( system: SolarSystem ) {
        super()
        this.position = this.getRandomPlanetPlacement( system )
        this.planetType = this.getRandomPlanetType()
        this.rotationSpeed = Math.random() * 0.01

        this.object = this.init();
    }

    init(): THREE.Object3D {
        // Texture
        const texturePath = 'textures/planets/' + this.getRandomPlanetTexture( this.planetType )
        const texture = textureLoader.load( texturePath )

        // Surface
        const planetGeometry = new THREE.SphereGeometry( 15, 32, 16 )
        const planetMaterial = new THREE.MeshBasicMaterial( { map: texture } )
        
        // Atmosphere
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

    update(): void {
        this.object.rotation.y += this.rotationSpeed
    }

    getRandomPlanetType(): PlanetType {
        const values = Object.keys(PlanetType);
        const key = values[Math.floor(Math.random() * values.length)];
        switch (key) {
            case "Gas": return PlanetType.Gas
            case "Ice": return PlanetType.Ice
            case "Rock": return PlanetType.Rock
            default: return PlanetType.Rock
        }
    }

    getRandomPlanetPlacement( system: SolarSystem ): THREE.Vector3 {
        const starRadius = system.getStar().getRadius()

        let x = ( Math.random() - 0.5 ) * MathUtils.randInt( starRadius, 500 )
        let y = ( Math.random() - 0.5 ) * Math.random() * 100
        let z = ( Math.random() - 0.5 ) * MathUtils.randInt( starRadius, 500 )

        let position = new THREE.Vector3( x, y, z )

        // Check if planet is too close to star
        if ( position.length() < starRadius * 2 ) {
            this.getRandomPlanetPlacement( system )
        }

        return position
    }

    getRandomPlanetTexture( planetType: string ): string {
        let texture = getRandomArrayElement(planetsData[planetType].textures)
        return texture
    }


    
}

