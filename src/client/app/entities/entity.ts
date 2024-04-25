import * as THREE from 'three';

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

    abstract init(): THREE.Object3D;

    /**
     * The update method is called on all entities on each frame.
     * render. It should be used to update the state of the entity,
     * perform animations, etc.
     */
    update(): void {}

    /**
     * The object property is the THREE.Object3D instance that
     * represents the entity in the scene.
     */
    set object( object: THREE.Object3D ) {
        object.userData = {
            entity: this
        }
        this._object = object;
    }

    get object(): THREE.Object3D {
        return this._object;
    }

}