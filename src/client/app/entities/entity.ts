import * as THREE from 'three';
export abstract class Entity {
    public object!: THREE.Object3D;
    abstract init(): THREE.Object3D;

    /**
     * Update the entity state on each frame render
     */
    update(): void {

    }
}