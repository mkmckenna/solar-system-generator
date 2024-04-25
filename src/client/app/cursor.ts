import * as THREE from 'three';
import { camera } from './camera';
import { scene } from './scene';
import { Entity, EntityType } from './entities/entity';

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const selectedEntity: Entity | null = null;

function onPointerMove( event: MouseEvent ) {
	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( scene.children, true );
    
    if ( intersects.length > 0 ) {
        if(intersects[ 0 ].object.userData !== null) {
            console.log(intersects[ 0 ].object.userData)
        }
    }
}

export function init() {
    window.addEventListener( 'pointermove', onPointerMove );
}

