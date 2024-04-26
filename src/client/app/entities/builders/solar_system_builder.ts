import { MathUtils } from 'three';
import { MAX_PLANET_COUNT, MIN_PLANET_COUNT, SKYBOX_ENABLED, STAR_ENABLED } from '../../constants';
import { Planet } from '../planet';
import { Skybox } from '../skybox';
import { SolarSystem } from '../solar_system';
import { Star } from '../star';
import { PlanetBuilder } from './planet_builder';

export class SolarSystemBuilder {
    buildRandomSolarSystem(): SolarSystem {
        const solarSystem = new SolarSystem()

        // Star
        if (STAR_ENABLED) {
            solarSystem.star = new Star()
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
}