import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as cursor from '../client/app/cursor'
import { GRID } from './app/constants'
import { SolarSystemBuilder } from './app/entities/builders/solar_system_builder'
import { SolarSystem } from './app/entities/solar_system'

export const modelLoader = new GLTFLoader()
export const textureLoader = new THREE.TextureLoader()

/**
 * The App class is the main class of the application. It is responsible
 * for setting up the scene, camera, renderer, and lighting.
 */
export class App {

    public renderer: THREE.WebGLRenderer
    public scene: THREE.Scene
    public camera: THREE.PerspectiveCamera

    public solarSystem: SolarSystem

    constructor() {
        // Scene
        this.scene = this.createScene()
        // Renderer
        this.renderer = this.createRenderer()
        // Camera
        this.camera = this.createCamera()
        // Lighting
        this.scene.add(this.createLighting())
        // Controls
        new OrbitControls(this.camera, this.renderer.domElement)

        // Build the solar system
        this.solarSystem = new SolarSystemBuilder().buildRandomSolarSystem()

        this.solarSystem.entities.forEach(entity => {
            this.scene.add(entity.object);
        })

        // Bind the render method to this instance (need to understand this better)
        this.render = this.render.bind(this)
        this.render()
    }

    createLighting(): THREE.Light {
        const light = new THREE.AmbientLight(0xffffff, 1);
        light.position.set(0, 1, 0);
        return light
    }

    createScene(): THREE.Scene {
        const scene = new THREE.Scene()

        // Axis helper
        const axesHelper = new THREE.AxesHelper(5)
        scene.add(axesHelper)

        // Grid
        if (GRID) {
            const gridHelper = new THREE.GridHelper(1000, 10)
            scene.add(gridHelper)
        }

        return scene
    }

    createRenderer(): THREE.WebGLRenderer {
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(renderer.domElement)
        return renderer
    }

    createCamera(): THREE.PerspectiveCamera {
        const camera = new THREE.PerspectiveCamera(
            90,
            window.innerWidth / window.innerHeight,
            0.1,
            10000)
        camera.position.set(0, 3000, 0)
        return camera
    }

    /**
     * Main render loop. 
     * This method is called on each frame to render.
     */
    render() {
        requestAnimationFrame(this.render)
        this.renderer.render(this.scene, this.camera)
        // Update entities
        this.solarSystem.entities.forEach(entity => {
            entity.update()
        })
    }
}

export const app = new App()

cursor.init()