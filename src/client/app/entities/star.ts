import * as THREE from 'three'
import { MathUtils } from 'three'
import { ATMOSPHERES_ENABLED, STAR_RADIUS_MAX, STAR_RADIUS_MIN, WIREFRAME } from '../constants'
import { getRandomMapValue } from '../utils/utils'
import { Entity, EntityType } from './entity'

import coronaFragmentShader from '../shaders/stars/corona_fragment_shader.glsl'
import surfaceFragmentShader from '../shaders/stars/surface_fragment_shader.glsl'
import vertexShader from '../shaders/vertex_shader.glsl'

export enum StarType {
    RedGiant = "RedGiant",
    Yellow = "Yellow",
    Dwarf = "Dwarf",
}

export class Star extends Entity {

    private _starType: StarType
    private _radius: number
    private _coronaScale: number
    private _rotationSpeed = 0.0
    private _starColor: THREE.Color = new THREE.Color(0xffffff)

    private starColors: Map<StarType, THREE.Color> = new Map([
        [StarType.RedGiant, new THREE.Color(0xe67f77)],
        [StarType.Yellow, new THREE.Color(0xf0ca48)],
        [StarType.Dwarf, new THREE.Color(0xfbbd59)],
    ])

    constructor() {
        super()
        this.type = EntityType.Star
        this._starType = this.selectStarType()

        // TODO: Move to a builder class
        this._radius = MathUtils.randInt(STAR_RADIUS_MIN, STAR_RADIUS_MAX)
        this._coronaScale = Math.random() + 1.5;
        this._rotationSpeed = Math.random() * 0.01
        this._starColor = getRandomMapValue(this.starColors)

        this.object = this.init();
    }

    init(): THREE.Object3D {
        const star = new THREE.Mesh()

        // Geometry
        star.geometry = new THREE.SphereGeometry(this._radius, 32, 16)

        // Surface
        star.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: surfaceFragmentShader,
            wireframe: WIREFRAME,
            uniforms: {
                r: { value: this._starColor.r },
                g: { value: this._starColor.g },
                b: { value: this._starColor.b },
            }
        })

        if (ATMOSPHERES_ENABLED) {
            const coronaMaterial = this.createCorona()
            const corona = new THREE.Mesh(star.geometry, coronaMaterial)
            corona.scale.set(this._coronaScale, this._coronaScale, this._coronaScale)
            star.add(corona)
        }

        return star
    }

    selectStarType(): StarType {
        return StarType.RedGiant
    }

    createCorona(): THREE.ShaderMaterial {
        const coronaMaterial = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: coronaFragmentShader,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            wireframe: WIREFRAME,
            uniforms: {
                r: { value: this._starColor.r },
                g: { value: this._starColor.g },
                b: { value: this._starColor.b },
            }
        })
        return coronaMaterial
    }

    createLight(): THREE.SpotLight {
        const light = new THREE.SpotLight(0xffffff, 1)
        light.position.set(0, 0, 0)
        return light
    }

    getRadius(): number {
        return this._radius * this._coronaScale
    }

    update(): void {
        this.object.rotation.y += this._rotationSpeed
    }

    public get radius(): number {
        return this._radius
    }

    public get coronaScale(): number {
        return this._coronaScale
    }
}
