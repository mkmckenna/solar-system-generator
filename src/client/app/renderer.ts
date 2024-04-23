import * as THREE from 'three'

export const renderer = new THREE.WebGLRenderer();

// Set the size of the renderer to the size of the window
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );