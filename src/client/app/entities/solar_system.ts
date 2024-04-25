import { Skybox } from './skybox'
import { Planet, PlanetBuilder } from './planet'
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

export class SolarSystemBuilder {
    buildRandomSolarSystem(): SolarSystem {
        const solarSystem = new SolarSystem()

        // Star
        if( STAR_ENABLED ) {
            solarSystem.star = new Star()
        }

        // Skybox
        if ( SKYBOX_ENABLED ) {
            solarSystem.skybox = new Skybox()
        }

        // Planets
        const planetBuilder = new PlanetBuilder()
        const planets: Planet[] = []
        const planetCount = MathUtils.randInt(MIN_PLANET_COUNT, MAX_PLANET_COUNT)
        for (let i = 0; i < planetCount; i++) {
            let planet = planetBuilder.buildRandomPlanet(solarSystem)
            planets.push(planet)
        }
        solarSystem.planets = planets

        console.log({ solarSystem })

        return solarSystem
    }
}