import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { camera } from './app/camera'
import { scene } from './app/scene'
import { renderer } from './app/renderer'

import { SolarSystem } from './app/entities/solar_system'
import { renderSolarSystemInfo } from './app/info'

export const modelLoader = new GLTFLoader()
export const textureLoader = new THREE.TextureLoader()

const controls = new OrbitControls( camera, renderer.domElement );
const solarSystem: SolarSystem = new SolarSystem()

const animate = function () {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    solarSystem.getEntities().forEach( entity => {
        entity.update()
    } )
}

solarSystem.getEntities().forEach( entity => {
    scene.add( entity.object );
} )

// modelLoader.load( 
//     '/models/weird_planet.gltf', 
//     function ( gltf ) {
//         let planet = gltf.scene
//         planet.position.set( 0, 0, 0 )
//         planet.scale.set( 1, 1, 1 )
//         scene.add( planet );
//     }, 
//     undefined, 
//     function ( error ) {
//         console.log( 'An error happened' )
//         console.error( error );
//     } 
// );

// Scene add light
const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 20, 20, 20 );
scene.add( light );

animate();

renderSolarSystemInfo( solarSystem )