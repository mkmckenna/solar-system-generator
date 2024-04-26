import { Entity } from './entity';
import { Planet } from './planet';
import { Skybox } from './skybox';
import { Star } from './star';

/**
 * Holds all sort of entities that make up a solar system
 */
export class SolarSystem {

    private _entities: Entity[] = []

    private _skybox = new Skybox()
    private _star = new Star()
    private _planets: Planet[] = []

    public get planets(): Planet[] {
        return this._planets
    }

    public set planets(planets: Planet[]) {
        this._entities.push(...planets)
        this._planets = planets
    }

    public get star(): Star {
        return this._star
    }

    public set star(star: Star) {
        this._entities.push(star)
        this._star = star
    }

    public get skybox(): Skybox {
        return this._skybox
    }

    public set skybox(skybox: Skybox) {
        this._entities.push(skybox)
        this._skybox = skybox
    }

    public get entities(): Entity[] {
        return this._entities
    }
}