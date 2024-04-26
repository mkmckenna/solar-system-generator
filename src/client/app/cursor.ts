import * as THREE from 'three';
import { app } from '../client';
import { Entity } from './entities/entity';

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event: MouseEvent ) {
	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( pointer, app.camera );
    const intersects = raycaster.intersectObjects( app.scene.children, true );

    let intersectedEntity: Entity | null = null;

    if ( intersects.length > 0 ) {
        let isEntity = intersects[ 0 ].object.userData.entity !== undefined;
        
        if( isEntity && intersectedEntity != intersects[ 0 ].object.userData.entity ) {
            intersectedEntity = intersects[ 0 ].object.userData.entity;
            if( intersectedEntity !== null ){
                intersectedEntity.onMouseOver();
            }
        }
    } else {
        // if( intersectedEntity !== null ) {
        //     intersectedEntity.onMouseLeave();
        //     intersectedEntity = null;
        // }
    }
}

export function init() {
    window.addEventListener( 'pointermove', onPointerMove );
}

