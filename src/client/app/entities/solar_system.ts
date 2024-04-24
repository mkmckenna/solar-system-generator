import { Skybox } from './skybox'
import { Planet } from './planet'
import { Star } from './star'
import { Entity } from './entity';
import { MathUtils } from 'three';

/**
 * Holds all sort of entities that make up a solar system
 */
export class SolarSystem {

    private skybox = new Skybox()
    private star = new Star()
    private planets: Planet[] = []

    constructor() {
        this.generatePlanets()
    }

    private generatePlanets() {
        const planetCount = MathUtils.randInt(3, 8)
        for (let i = 0; i < planetCount; i++) {
            this.planets.push(new Planet( this ))
        }
    }

    public getPlanets(): Planet[] {
        return this.planets
    }

    public getStar(): Star {
        return this.star
    }

    public getEntities(): Entity[] {
        return [this.skybox, this.star, ...this.planets]
    }
}