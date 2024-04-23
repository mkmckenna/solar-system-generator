import * as THREE from 'three'

let cameraParams = {
    fov: 75,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 5000
}

export const camera = new THREE.PerspectiveCamera(  cameraParams.fov, 
                                                    cameraParams.aspect, 
                                                    cameraParams.near, 
                                                    cameraParams.far )

camera.position.set(0, 200, 1)
camera.position.z = 100;