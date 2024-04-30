import { MathUtils } from 'three';
import { SolarSystemProperties, solarSystemProperties } from '../../data/solar_system_properties';
import { randomItemBasedOnProbability } from '../../utils/utils';
import { Star, StarType } from '../star';

export class StarBuilder {

    buildRandomStar(): Star {
        const star = new Star()
        star.starType = this.getRandomStarType(solarSystemProperties)

        star.radius = this.getRandomStarSize(star.starType)
        star.rotationSpeed = Math.random() * 0.01

        star.object = star.init()
        return star
    }

    /**
     * Get a random star type based on the probabilities defined in the solar system properties.
     * If no probabilities are defined, a random star type is selected with equal probability.
     */
    getRandomStarType(solarSystemProperties?: SolarSystemProperties): StarType {
        const starTypes = Object.keys(StarType);

        let selectedStarTypeString: string = ""
        // If star properties are defined, use the probabilities to determine the star type
        if (solarSystemProperties) {
            let probabilities: number[] = []
            let types: string[] = []

            // Iterate over each star type and add the type and frequency to the arrays
            Object.keys(solarSystemProperties.stars).forEach(starType => {
                let star = solarSystemProperties.stars[starType]
                types.push(star.type)
                probabilities.push(star.probability)
            });

            selectedStarTypeString = randomItemBasedOnProbability(types, probabilities)
        } else {
            // If no probabilities are defined, select a random planet type
            selectedStarTypeString = starTypes[Math.floor(Math.random() * starTypes.length)]
        }

        switch (selectedStarTypeString) {
            case "red_giant": return StarType.RedGiant
            case "yellow": return StarType.Yellow
            case "dwarf": return StarType.Dwarf
            default: return StarType.Yellow
        }
    }

    /**
     * Get a random star size based on the star size property bounds defined in 
     * the solar system properties.
     */
    getRandomStarSize(starType: StarType): number {
        const star = solarSystemProperties.stars[starType]
        return MathUtils.randInt(star.size.min, star.size.max)
    }

}