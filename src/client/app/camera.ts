import * as THREE from 'three'

export const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
)

camera.position.set(0, 400, 1)
camera.position.z = 400;