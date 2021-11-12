export abstract class Entity {
    public object!: THREE.Object3D;
    abstract init(): THREE.Object3D;
}