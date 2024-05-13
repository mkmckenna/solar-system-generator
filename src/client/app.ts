import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GRID } from './app/constants'
import { Cursor } from './app/cursor'
import { SolarSystemBuilder } from './app/entities/builders/solar_system_builder'
import { Entity } from './app/entities/entity'
import { SolarSystem } from './app/entities/solar_system'
import { SolarSystemInfo } from './app/ui/info'

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
    public controls: OrbitControls
    public cursor: Cursor

    /**
     * The entity the camera is currently focused on within the scene.
     */
    private _focusedEntity: Entity | null = null

    public solarSystem: SolarSystem

    constructor() {
        // Scene
        this.scene = this.createScene()
        // Renderer
        this.renderer = this.createRenderer()
        // Camera
        this.camera = this.createCamera()
        // Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        // Cursor
        this.cursor = new Cursor()

        // Lighting
        this.scene.add(this.createAmbientLighting())

        // Build the solar system
        this.solarSystem = new SolarSystemBuilder().buildRandomSolarSystem()

        this.solarSystem.entities.forEach(entity => {
            this.scene.add(entity.object);
        })

        // Info UI
        SolarSystemInfo.renderSolarSystemInfo(this.solarSystem)

        // Bind the render method to this instance (need to understand this better)
        this.render = this.render.bind(this)
        this.render()
    }

    /**
     * Creates an ambient light source to light the scene. This is to make
     * sure the scene is not just lit from the star. Although this would be
     * more realistic, it would make it hard to see the planets.
     */
    createAmbientLighting(): THREE.AmbientLight {
        return new THREE.AmbientLight(0xffffff, 0.4)
    }

    createSpotlight(): THREE.SpotLight {
        const spotlight = new THREE.SpotLight(0xffffff, 1, 6, Math.PI / 4, 0)
        spotlight.position.set(0, 0, 0)
        return spotlight
    }

    createPointLight(): THREE.PointLight {
        const pointLight = new THREE.PointLight(0xffffff, 1, 0, 2)
        pointLight.position.set(0, 0, 0)
        return pointLight
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
        camera.position.set(1000, 1000, 1000)
        return camera
    }

    /**
     * Useful for testing lighting and positioning of objects.
     */
    createDebugCube(): THREE.Mesh {
        const debugCube = new THREE.Mesh(
            new THREE.BoxGeometry(30, 30, 30),
            new THREE.MeshPhongMaterial({ color: 0x666666 }))
        debugCube.position.set(0, 0, 30)
        return debugCube
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
        // Update camera
        // REFACTOR: This should be handled by the cursor class as
        // we are moving the camera based on the state of the system
        this.focusedEntity?.updateFocus()

        // Update the camera controls
        this.controls.update()
    }

    get focusedEntity(): Entity | null {
        return this._focusedEntity
    }

    set focusedEntity(entity: Entity | null) {
        this._focusedEntity = entity
    }
}

export const app = new App()