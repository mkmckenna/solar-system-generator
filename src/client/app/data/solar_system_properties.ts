import { PlanetType } from '../entities/planet'
import { StarType } from '../entities/star'
import * as solarSystemPropertiesData from './solar_system_properties.json'

export interface SolarSystemProperties {
    stars: {
        [starType: string]: StarProperties
    }
    planets: {
        [planetType: string]: PlanetProperties
    }
}

export interface StarProperties {
    type: StarType
    textures: string[]
    size: {
        min: number
        max: number
    }
    probability: number
}

export interface PlanetProperties {
    type: PlanetType
    textures: string[]
    size: {
        min: number
        max: number
    }
    probability: number
}

export const solarSystemProperties = getSolarSystemProperties(solarSystemPropertiesData)
export const planetProperties = solarSystemProperties.planets
export const starProperties = solarSystemProperties.stars

function getSolarSystemProperties(data: any): SolarSystemProperties {
    return data as SolarSystemProperties
}
