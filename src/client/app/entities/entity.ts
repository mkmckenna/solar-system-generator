import * as THREE from 'three';
import { app } from '../../app';

export enum EntityType {
    Star = "Star",
    Planet = "Planet",
    Moon = "Moon",
}

/**
 * Based class for all entities in the solar system.
 */
export abstract class Entity {
    public type!: EntityType; // Could be readonly. EntityType should never change
    private _object!: THREE.Object3D;

    /**
     * Stores the delta position of the entity between render cycles
     */
    readonly positionDelta = new THREE.Vector3();

    abstract init(): THREE.Object3D;

    /**
     * The update method is called on all entities on each frame.
     * render. It should be used to update the state of the entity,
     * perform animations, etc.
     */
    update(): void { }

    /**
     * The onClick, onMouseOver, and onMouseLeave methods are called
     * when the user interacts with the entity in the scene.
     */
    onClick(): void { }
    onMouseOver(): void { }
    onMouseLeave(): void { }

    /**
     * Get the debug UI for the entity. This can be used to adjust the 
     * entities properties in real-time.
     */
    getDebugUI(): dat.GUI | null {
        return null;
    }

    /**
     * Set the camera to look at the entity
     */
    lookAt(): void {
        // Bounding box of the object
        const box = new THREE.Box3().setFromObject(this.object);

        const center = new THREE.Vector3();
        box.getCenter(center);

        const size = new THREE.Vector3();
        box.getSize(size);

        const maxDim = Math.max(size.x, size.y, size.z);

        let cameraPosition = new THREE.Vector3(center.x, center.y, center.z + maxDim)
        app.camera.position.copy(cameraPosition)
        app.controls.target.copy(this.object.position)
    }

    /**
     * Call to update the focus of the camera on the current entity
     */
    updateFocus() {
        app.controls.target.copy(this.object.position)
        app.camera.position.add(this.positionDelta)
    }

    /**
     * The object property is the THREE.Object3D instance that
     * represents the entity in the scene.
     */
    set object(object: THREE.Object3D) {
        object.userData = {
            entity: this
        }
        this._object = object;
    }

    get object(): THREE.Object3D {
        return this._object;
    }

}