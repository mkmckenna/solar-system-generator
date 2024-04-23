import * as THREE from 'three'
import { WIREFRAME } from '../constants'
import { MathUtils } from 'three'
import { Entity } from './entity'

import vertexShader from '../shaders/vertex_shader.glsl'
import coronaFragmentShader from '../shaders/stars/corona_fragment_shader.glsl'
import surfaceFragmentShader from '../shaders/stars/surface_fragment_shader.glsl'

export class Star extends Entity {

    public radius: number
    public coronaScale: number
    private rotationSpeed = 0.0

    constructor() {
        super()
        this.radius = MathUtils.randInt( 16, 32 )
        this.coronaScale = Math.random() + 1.5;
        this.rotationSpeed = Math.random() * 0.01

        this.object = this.init();
    }

    init(): THREE.Object3D {
        const starGeometry = new THREE.SphereGeometry( this.radius, 32, 16 )
        const starMaterial = new THREE.ShaderMaterial( {
            vertexShader: vertexShader,
            fragmentShader: surfaceFragmentShader,
            wireframe: WIREFRAME,
        } )
        
        const coronaGeometry = new THREE.SphereGeometry( this.radius, 32, 16 )
        const coronaMaterial = new THREE.ShaderMaterial( {
            vertexShader: vertexShader,
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

    update(): void {
        this.object.rotation.y += this.rotationSpeed
        console.log(this.object.rotation.y)
    }   
}
