import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import Stats from 'three/examples/jsm/libs/stats.module'

import { camera } from './app/camera'
import { scene } from './app/scene'
import { renderer } from './app/renderer'

import { Entity } from './app/entities/entity'
import { SolarSystem } from './app/entities/solar_system'

const controls = new OrbitControls( camera, renderer.domElement );
const solarSystem: SolarSystem = new SolarSystem()

const animate = function () {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

solarSystem.getEntitys().forEach( entity => {
    scene.add( entity.object );
} )

animate();