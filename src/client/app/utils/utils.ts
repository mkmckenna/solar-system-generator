export function getRandomMapKey( map: Map<any, any> ): any {
    const values = Array.from(map.keys())
    return values[Math.floor(Math.random() * values.length)]
}

export function getRandomMapValue( map: Map<any, any> ): any {
    const values = Array.from(map.values())
    return values[Math.floor(Math.random() * values.length)]
}