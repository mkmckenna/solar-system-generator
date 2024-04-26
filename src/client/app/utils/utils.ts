export function getRandomMapKey( map: Map<any, any> ): any {
    const values = Array.from(map.keys())
    return values[Math.floor(Math.random() * values.length)]
}

export function getRandomMapValue( map: Map<any, any> ): any {
    const values = Array.from(map.values())
    return values[Math.floor(Math.random() * values.length)]
}

export function getRandomArrayElement( array: any[] ): any {
    return array[Math.floor(Math.random() * array.length)]
}

export function getRandomNumber( min: number, max: number ): number {
    return Math.random() * (max - min) + min
}

export function randomNegative(): number {
    return Math.random() < 0.5 ? -1 : 1
}

export function randomItemBasedOnProbability<T>( items: T[], probabilities: number[] ): T {
    if( items.length !== probabilities.length ) {
        throw new Error("Items and probabilities arrays must be the same length")
    }

    const sum = probabilities.reduce((a, b) => a + b, 0)
    const normalizedProbabilities = probabilities.map(p => p / sum)

    let index = 0
    let r = Math.random()
    while( r > 0 ) {
        r -= normalizedProbabilities[index]
        index++
    }

    return items[index - 1]
    
}