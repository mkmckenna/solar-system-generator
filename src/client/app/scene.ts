import * as THREE from 'three'
import { GRID } from './constants'

export const scene = new THREE.Scene()

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

if( GRID ) {
    const gridHelper = new THREE.GridHelper(1000, 10)
    scene.add(gridHelper) 
}