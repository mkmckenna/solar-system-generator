import * as planetData from '../data/planets.json'

export interface Planets {
    [key: string]: {
        textures: string[]
    }
}

export function getPlanetsData( data: any ): Planets {
    return data as Planets
}

export const planetsData = getPlanetsData( planetData )