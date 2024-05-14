import { MathUtils } from 'three';
import { MAX_PLANET_COUNT, MIN_PLANET_COUNT, SKYBOX_ENABLED, STAR_ENABLED } from '../../constants';
import { solarSystemNames } from '../../data/solar_system_properties';
import { Planet } from '../planet';
import { Skybox } from '../skybox';
import { SolarSystem } from '../solar_system';
import { PlanetBuilder } from './planet_builder';
import { StarBuilder } from './star_builder';

/**
 * The SolarSystemBuilder class is responsible for building 
 * an entire solar system.
 */
export class SolarSystemBuilder {
    buildRandomSolarSystem(): SolarSystem {
        const solarSystem = new SolarSystem()

        solarSystem.name = this.getRandomSolarSystemName()

        // Star
        if (STAR_ENABLED) {
            let starBuilder = new StarBuilder()
            solarSystem.star = starBuilder.buildRandomStar()
        }

        // Skybox
        if (SKYBOX_ENABLED) {
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

    /**
     * Get random solar system name
     */
    private getRandomSolarSystemName(): string {
        const randomIndex = Math.floor(Math.random() * solarSystemNames.solar_system_names.length)
        console.log({ randomIndex })
        return solarSystemNames.solar_system_names[randomIndex]
    }
}