import * as THREE from 'three'
import { ATMOSPHERES_ENABLED, STAR_RADIUS_MAX, STAR_RADIUS_MIN, WIREFRAME } from '../constants'
import { MathUtils } from 'three'
import { Entity } from './entity'
import { getRandomMapValue } from '../utils/utils'

import vertexShader from '../shaders/vertex_shader.glsl'
import coronaFragmentShader from '../shaders/stars/corona_fragment_shader.glsl'
import surfaceFragmentShader from '../shaders/stars/surface_fragment_shader.glsl'

export enum StarType {
    BlueWhite = "BlueWhite",
    White = "White",
    Yellow = "Yellow",
    Orange = "Orange",
    Red = "Red",
}

export class Star extends Entity {

    public radius: number
    public coronaScale: number
    private rotationSpeed = 0.0
    private starColor: THREE.Color = new THREE.Color( 0xffffff )

    private starColors: Map<StarType, THREE.Color> = new Map([
        [StarType.BlueWhite, new THREE.Color( 0xbcd8f3 )],
        [StarType.White, new THREE.Color( 0xf9f9f9 )],
        [StarType.Yellow, new THREE.Color( 0xf0ca48 )],
        [StarType.Orange, new THREE.Color( 0xfbbd59 )],
        [StarType.Red, new THREE.Color( 0xe67f77 )],
    ])

    constructor() {
        super()
        this.radius = MathUtils.randInt( STAR_RADIUS_MIN, STAR_RADIUS_MAX )
        this.coronaScale = Math.random() + 1.5;
        this.rotationSpeed = Math.random() * 0.01
        this.starColor = getRandomMapValue( this.starColors )

        this.object = this.init();
    }

    init(): THREE.Object3D {
        // Geometry
        const starGeometry = new THREE.SphereGeometry( this.radius, 32, 16 )
        
        // Surface
        const starMaterial = new THREE.ShaderMaterial( {
            vertexShader: vertexShader,
            fragmentShader: surfaceFragmentShader,
            wireframe: WIREFRAME,
            uniforms: {
                r: { value: this.starColor.r },
                g: { value: this.starColor.g },
                b: { value: this.starColor.b },
            }
        } )
        const star = new THREE.Mesh( starGeometry, starMaterial )
        
        if( ATMOSPHERES_ENABLED ) {
            const coronaMaterial = this.createCorona()
            const corona = new THREE.Mesh( starGeometry, coronaMaterial )
            corona.scale.set( this.coronaScale, this.coronaScale, this.coronaScale )
            star.add( corona )
        }

        return star
    }

    createCorona(): THREE.ShaderMaterial {
        const coronaMaterial = new THREE.ShaderMaterial( {
            vertexShader: vertexShader,
            fragmentShader: coronaFragmentShader,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            wireframe: WIREFRAME,
            uniforms: {
                r: { value: this.starColor.r },
                g: { value: this.starColor.g },
                b: { value: this.starColor.b },
            }
        } )
        return coronaMaterial
    }

    getRadius(): number {
        return this.radius * this.coronaScale
    } 

    update(): void {
        this.object.rotation.y += this.rotationSpeed
    }   
}
