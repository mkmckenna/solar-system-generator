import { Skybox } from './skybox'
import { Planet } from './planet'
import { Star } from './star'
import { Entity } from './entity';
import { MathUtils } from 'three';
import { MAX_PLANET_COUNT, MIN_PLANET_COUNT, SKYBOX_ENABLED, STAR_ENABLED } from '../constants';

/**
 * Holds all sort of entities that make up a solar system
 */
export class SolarSystem {

    private _entities: Entity[] = []

    private _skybox = new Skybox()
    private _star = new Star()
    private _planets: Planet[] = []

    constructor() {
        this._planets = this.generatePlanets()

        if( SKYBOX_ENABLED ) {
            this._entities.push(this._skybox)
        }
        
        if( STAR_ENABLED ) {
            this._entities.push(this._star)
        }
        
        this._entities.push(...this._planets)
    }

    private generatePlanets(): Planet[] {
        const planets: Planet[] = []
        const planetCount = MathUtils.randInt(MIN_PLANET_COUNT, MAX_PLANET_COUNT)
        for (let i = 0; i < planetCount; i++) {
            let planet = new Planet(this)
            planets.push(planet)
        }
        return planets
    }

    public get planets() {
        return this._planets
    }
    
    public get star() {
        return this._star
    }

    public get entities() {
        return this._entities
    }
}