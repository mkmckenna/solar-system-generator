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

    private entities: Entity[] = []

    private skybox = new Skybox()
    private star = new Star()
    private planets: Planet[] = []

    constructor() {
        this.planets = this.generatePlanets()

        if( SKYBOX_ENABLED ) {
            this.entities.push(this.skybox)
        }
        
        if( STAR_ENABLED ) {
            this.entities.push(this.star)
        }
        
        this.entities.push(...this.planets)
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

    public getPlanets(): Planet[] {
        return this.planets
    }

    public getStar(): Star {
        return this.star
    }

    public getEntities(): Entity[] {
        return this.entities
    }
}