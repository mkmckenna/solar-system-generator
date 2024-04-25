import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { camera } from './app/camera'
import { scene } from './app/scene'
import { renderer } from './app/renderer'

import { SolarSystem } from './app/entities/solar_system'
import { renderSolarSystemInfo } from './app/info'
import * as cursor from '../client/app/cursor'

export const modelLoader = new GLTFLoader()
export const textureLoader = new THREE.TextureLoader()


// RENDER LOOP
const render = function () {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
    solarSystem.entities.forEach( entity => {
        entity.update()
    } )
}

// BUILD SOLAR SYSTEM
const solarSystem: SolarSystem = new SolarSystem()
solarSystem.entities.forEach( entity => {
    scene.add( entity.object );
} )

// LIGHTS
const light = new THREE.AmbientLight( 0xffffff, 1 );
light.position.set( 0, 1, 0 );
scene.add( light );

const controls = new OrbitControls( camera, renderer.domElement );
render();

cursor.init()
renderSolarSystemInfo( solarSystem )




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