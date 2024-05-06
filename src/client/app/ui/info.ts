import { SolarSystem } from '../entities/solar_system';

export class SolarSystemInfo {
    public starRadius: number = 0
    public planetCount: number = 0

    static renderSolarSystemInfo(solarSystem: SolarSystem): void {
        let infoContainer = document.getElementById('solar-system-info')

        let starRadius = document.getElementById('star-radius')
        if (starRadius !== null) {
            starRadius.innerText = solarSystem.star.radius.toString()
        }

        let planetCount = document.getElementById('planet-count')
        if (planetCount !== null) {
            planetCount.innerText = solarSystem.planets.length.toString()
        }
    }
}
