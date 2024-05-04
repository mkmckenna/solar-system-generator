import * as THREE from 'three';
import { app } from '../app';
import { Entity } from './entities/entity';

export class Cursor {
    private raycaster
    private pointer

    constructor() {
        this.raycaster = new THREE.Raycaster()
        this.pointer = new THREE.Vector2()

        // TODO: Better understand this bind stuff
        this.onPointerMove = this.onPointerMove.bind(this)
        this.onClick = this.onClick.bind(this)

        window.addEventListener('pointermove', this.onPointerMove);
        window.addEventListener('click', this.onClick);
    }

    private intersectedEntity: Entity | null = null;

    private onPointerMove(event: MouseEvent) {
        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.pointer, app.camera);
        const intersects = this.raycaster.intersectObjects(app.scene.children, true);

        if (intersects.length > 0) {
            let isEntity = intersects[0].object.userData.entity !== undefined;

            if (isEntity && this.intersectedEntity != intersects[0].object.userData.entity) {
                if (this.intersectedEntity !== null) {
                    this.intersectedEntity.onMouseLeave();
                }

                this.intersectedEntity = intersects[0].object.userData.entity;
                if (this.intersectedEntity !== null) {
                    this.intersectedEntity.onMouseOver();
                }
            }
        } else {
            if (this.intersectedEntity !== null) {
                this.intersectedEntity.onMouseLeave();
                this.intersectedEntity = null;
            }
        }
    }

    private onClick(event: MouseEvent) {
        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.pointer, app.camera);
        const intersects = this.raycaster.intersectObjects(app.scene.children, true);

        let intersectedEntity: Entity | null = null;

        if (intersects.length > 0) {
            let isEntity = intersects[0].object.userData.entity !== undefined;

            if (isEntity && intersectedEntity != intersects[0].object.userData.entity) {
                intersects[0].object.userData.entity.onClick();
            }
        } else {
            // if( intersectedEntity !== null ) {
            //     intersectedEntity.onMouseLeave();
            //     intersectedEntity = null;
            // }
        }
    }
}







