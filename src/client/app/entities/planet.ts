import * as THREE from 'three'
import {
    ATMOSPHERES_ENABLED,
    PLANET_ORBIT_ENABLED, PLANET_ROTATION_ENABLED, WIREFRAME
} from '../constants'

// Shaders
import { app, textureLoader } from '../../app'
import atmosphereFragmentShader from '../shaders/planets/atmosphere_fragment_shader.glsl'
import vertexShader from '../shaders/vertex_shader.glsl'

import { planetProperties } from '../data/solar_system_properties'
import { getRandomArrayElement } from '../utils/utils'
import { Entity, EntityType } from './entity'

export enum PlanetType {
    Gas = "gas",
    Ice = "ice",
    Rock = "rock"
}

export class Planet extends Entity {

    public planetType: PlanetType = PlanetType.Rock
    public rotationSpeed = 0.0
    public orbitalVelocity = 0.0
    public angle = 0.0
    public radius = 0.0
    public atmosphereRadius = 0.0

    constructor() {
        super()
        this.type = EntityType.Planet
    }

    init(): THREE.Object3D {
        const surface = new THREE.Mesh()

        // Texture
        const texture = this.getTextureForPlanetType(this.planetType)
        // Geometry
        surface.geometry = new THREE.SphereGeometry(this.radius, 32, 16)
        // Surface
        surface.material = new THREE.MeshStandardMaterial({
            map: texture,
            wireframe: WIREFRAME
        })

        // Atmosphere
        if (ATMOSPHERES_ENABLED) {
            const atmosphereMaterial = this.createAtmosphere()
            const atmosphere = new THREE.Mesh(surface.geometry, atmosphereMaterial)
            this.atmosphereRadius = this.radius * 1.1
            atmosphere.geometry = new THREE.SphereGeometry(this.atmosphereRadius, 32, 16)
            surface.add(atmosphere)
        }

        // Is this just setting a random initial position (angle) from the sun?
        this.angle = Math.random() * Math.PI * 2

        return surface
    }

    update(): void {
        if (PLANET_ROTATION_ENABLED) {
            this.object.rotation.y += this.rotationSpeed
        }
        if (PLANET_ORBIT_ENABLED) {
            this.animateOrbit()
        }
    }

    /**
     * Animate the orbit of the planet around the sun.
     */
    animateOrbit(): void {
        // Assuming 'radius' and 'angle' are properties of 'this' that are already set
        let radius = Math.sqrt(this.position.x ** 2 + this.position.z ** 2) // Calculate radius if not set

        // Increment the angle
        this.angle += this.orbitalVelocity

        // Calculate new position
        let x = radius * Math.cos(this.angle) // Update x using cos
        let z = radius * Math.sin(this.angle) // Update z using sin

        let newPosition = new THREE.Vector3(x, this.position.y, z)
        this.positionDelta.copy(newPosition).sub(this.position)

        this.position = newPosition
    }

    createAtmosphere(): THREE.ShaderMaterial {
        const atmosphereMaterial = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: atmosphereFragmentShader,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            wireframe: WIREFRAME,
        })
        return atmosphereMaterial
    }

    getTextureForPlanetType(planetType: string): THREE.Texture {
        let textureName = getRandomArrayElement(planetProperties[planetType].textures)
        const texturePath = 'textures/planets/' + textureName
        let texture = textureLoader.load(texturePath)
        return texture
    }

    onClick(): void {
        if (app.focusedEntity !== this) {
            console.log(this)
            app.focusedEntity = this
            this.lookAt()
        }
    }

    onMouseOver(): void {
        if (this.object instanceof THREE.Mesh) {
            this.object.material.emissive.setHex(0x666666)
            this.object.material.emissiveIntensity = 0.1
        }
    }

    onMouseLeave(): void {
        if (this.object instanceof THREE.Mesh) {
            this.object.material.emissive.setHex(0x000000)
            this.object.material.emissiveIntensity = 0
        }
    }

    /**
     * This might be a bad way to handle position
     */
    public set position(position: THREE.Vector3) {
        if (!this.object) {
            throw new Error("Object3D not initialized for Planet")
        }
        this.object.position.copy(position)
    }

    public get position(): THREE.Vector3 {
        if (!this.object) {
            throw new Error("Object3D not initialized for Planet")
        }
        return this.object.position
    }

}

