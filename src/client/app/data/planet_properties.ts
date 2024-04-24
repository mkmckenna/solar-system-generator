import * as planetData from './planets.json'

export interface Planets {
    [key: string]: {
        textures: string[]
        size: {
            min: number
            max: number
        }
    }
}

export function getPlanetProperties( data: any ): Planets {
    return data as Planets
}

export const planetProperties = getPlanetProperties( planetData )