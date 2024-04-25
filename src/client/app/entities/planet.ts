import * as THREE from 'three'
import { ATMOSPHERES_ENABLED, MAX_ORBITAL_VELOCITY, MIN_DISTANCE_MULTIPLIER_FROM_STAR, MIN_ORBITAL_VELOCITY, WIREFRAME } from '../constants'
import { MathUtils } from 'three'

// Shaders
import vertexShader from '../shaders/vertex_shader.glsl'
import atmosphereFragmentShader from '../shaders/planets/atmosphere_fragment_shader.glsl'
import { textureLoader } from '../../client'

import { MAX_DISTANCE_MULTIPLIER_FROM_STAR } from '../constants'
import { getRandomArrayElement } from '../utils/utils'
import { planetProperties } from '../data/planet_properties'
import { EntityType, Entity } from './entity'
import { SolarSystem } from './solar_system'

export enum PlanetType {
    Gas = "gas",
    Ice = "ice",
    Rock = "rock"  
}

export class Planet extends Entity {

    private _planetType: PlanetType
    private _position: THREE.Vector3
    private _rotationSpeed = 0.0
    private _orbitalVelocity = 0.0
    private _angle = 0.0
    private _radius = 0.0

    constructor( system: SolarSystem ) {
        super()
        this._position = this.getRandomPlanetPlacement( system )
        this._planetType = this.getRandomPlanetType()
        this._rotationSpeed = Math.random() * 0.01
        this._orbitalVelocity = MathUtils.randFloat( MIN_ORBITAL_VELOCITY, MAX_ORBITAL_VELOCITY )
        this._radius = this.getRandomPlanetSize( this._planetType )

        this.object = this.init();
    }

    init(): THREE.Object3D {
        const planet = new THREE.Mesh()
        planet.name = EntityType.Planet
        
        // Texture
        const texture = this.getRandomPlanetTexture( this._planetType )
        // Geometry
        planet.geometry = new THREE.SphereGeometry( this._radius, 32, 16 )
        // Surface
        planet.material = new THREE.MeshPhongMaterial( { map: texture } )

        // Atmosphere
        if( ATMOSPHERES_ENABLED ) {
            const atmosphereMaterial = this.createAtmosphere()
            const atmosphere = new THREE.Mesh( planet.geometry, atmosphereMaterial )
            atmosphere.scale.set( 1.2, 1.2, 1.2 )
            planet.add( atmosphere )
        }

        planet.position.copy(this._position)

        return planet
    }

    update(): void {
        this.object.rotation.y += this._rotationSpeed
        this.animateOrbit()
    }

    animateOrbit(): void {
        // Assuming 'radius' and 'angle' are properties of 'this' that are already set
        let radius = Math.sqrt(this.object.position.x ** 2 + this.object.position.z ** 2); // Calculate radius if not set

        this._angle += this._orbitalVelocity; // Increment the angle

        // Calculate new position
        this.object.position.x = radius * Math.cos(this._angle); // Update x using cos
        this.object.position.z = radius * Math.sin(this._angle); // Update z using sin
    }

    createAtmosphere(): THREE.ShaderMaterial {
        const atmosphereMaterial = new THREE.ShaderMaterial( {
            vertexShader: vertexShader,
            fragmentShader: atmosphereFragmentShader,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            wireframe: WIREFRAME,
        } )
        return atmosphereMaterial
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
        const starRadius = system.star.getRadius()

        let x = ( Math.random() - 0.5 ) * MathUtils.randInt( starRadius * MIN_DISTANCE_MULTIPLIER_FROM_STAR, 
            starRadius * MAX_DISTANCE_MULTIPLIER_FROM_STAR)
        let y = ( Math.random() - 0.5 ) * Math.random() * 100
        let z = ( Math.random() - 0.5 ) * MathUtils.randInt( starRadius * MIN_DISTANCE_MULTIPLIER_FROM_STAR, 
            starRadius * MAX_DISTANCE_MULTIPLIER_FROM_STAR)

        let position = new THREE.Vector3( x, y, z )

        // Check if planet is too close to star
        if ( position.length() < starRadius * 2 ) {
            this.getRandomPlanetPlacement( system )
        }

        return position
    }

    getRandomPlanetTexture( planetType: string ): THREE.Texture {
        let textureName = getRandomArrayElement(planetProperties[planetType].textures)
        const texturePath = 'textures/planets/' + textureName
        let texture = textureLoader.load(texturePath)
        return texture
    }

    getRandomPlanetSize( planetType: string ): number {
        let size = MathUtils.randInt( planetProperties[planetType].size.min, planetProperties[planetType].size.max )
        return size
    }
    
}

