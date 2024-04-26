import * as THREE from 'three'
import { MathUtils } from 'three'
import { MAX_DISTANCE_MULTIPLIER_FROM_STAR, MAX_ORBITAL_VELOCITY, MIN_DISTANCE_MULTIPLIER_FROM_STAR, MIN_ORBITAL_VELOCITY } from '../../constants'
import { SolarSystemProperties, planetProperties, solarSystemProperties } from '../../data/solar_system_properties'
import { randomItemBasedOnProbability, randomNegative } from '../../utils/utils'
import { Planet, PlanetType } from '../planet'
import { SolarSystem } from '../solar_system'


export class PlanetBuilder {
    buildPlanet(planetType: PlanetType,
        position: THREE.Vector3,
        rotationSpeed: number,
        orbitalVelocity: number,
        radius: number): Planet {

        const planet = new Planet()

        planet.planetType = planetType
        planet.rotationSpeed = rotationSpeed
        planet.orbitalVelocity = orbitalVelocity
        planet.radius = radius

        planet.object = planet.init()
        planet.position = position

        return planet
    }

    /**
     * Builds a random planet based on the properties defined in solar_system_properties.json
     */
    buildRandomPlanet(solarSystem: SolarSystem): Planet {
        const planet = new Planet()

        planet.planetType = this.getRandomPlanetType(solarSystemProperties)
        planet.rotationSpeed = Math.random() * 0.01
        planet.orbitalVelocity = MathUtils.randFloat(MIN_ORBITAL_VELOCITY, MAX_ORBITAL_VELOCITY)
        planet.radius = this.getRandomPlanetSize(planet.planetType)

        planet.object = planet.init()
        planet.position = this.createRandomPlanetPlacement(planet, solarSystem)

        return planet
    }

    /**
     * Gets a random planet type based on the probabilities defined in solar_system_properties.json.
     * If no probabilities are defined, a random planet type is returned.
     */
    private getRandomPlanetType(solarSystemProperties?: SolarSystemProperties): PlanetType {
        const planetTypes = Object.keys(PlanetType);

        let selectedPlanetTypeString: string = ""
        // If planet properties are defined, use the probabilities to determine the planet type
        if (solarSystemProperties) {
            let probabilities: number[] = []
            let types: string[] = []

            // Iterate over each planet type and add the type and frequency to the arrays
            Object.keys(solarSystemProperties.planets).forEach(planetType => {
                let planet = solarSystemProperties.planets[planetType]
                types.push(planet.type)
                probabilities.push(planet.probability)
            });

            selectedPlanetTypeString = randomItemBasedOnProbability(types, probabilities)
        } else {
            // If no probabilities are defined, select a random planet type
            selectedPlanetTypeString = planetTypes[Math.floor(Math.random() * planetTypes.length)]
        }

        switch (selectedPlanetTypeString) {
            case "Gas": return PlanetType.Gas
            case "Ice": return PlanetType.Ice
            case "Rock": return PlanetType.Rock
            default: return PlanetType.Rock
        }
    }

    /**
     * Generates a random Vec3 position for a planet so that it is not too close 
     * to the star, not too far away, and not too close to other planets.
     */
    private createRandomPlanetPlacement(planet: Planet, solarSystem: SolarSystem): THREE.Vector3 {
        const starRadius = solarSystem.star.radius

        let x = MathUtils.randInt(starRadius * MIN_DISTANCE_MULTIPLIER_FROM_STAR, starRadius * MAX_DISTANCE_MULTIPLIER_FROM_STAR)

        // Check if the planet overlaps with another planet
        for (let p of solarSystem.planets) {
            if (p.position.distanceTo(new THREE.Vector3(x, 0, 0)) < p.radius + planet.radius) {
                return this.createRandomPlanetPlacement(planet, solarSystem)
            }
        }

        // x *= randomNegative()
        let y = randomNegative() * Math.random() * 100
        let z = randomNegative() * MathUtils.randInt(starRadius * MIN_DISTANCE_MULTIPLIER_FROM_STAR,
            starRadius * MAX_DISTANCE_MULTIPLIER_FROM_STAR)

        let position = new THREE.Vector3(x, 0, 0)

        // Check if planet is too close to star
        if (position.length() < starRadius * 2) {
            return this.createRandomPlanetPlacement(planet, solarSystem)
        }

        return position
    }

    private getRandomPlanetSize(planetType: string): number {
        let size = MathUtils.randInt(planetProperties[planetType].size.min, planetProperties[planetType].size.max)
        return size
    }
}