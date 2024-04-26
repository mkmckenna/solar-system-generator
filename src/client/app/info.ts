import { SolarSystem } from './entities/solar_system';

export function renderSolarSystemInfo(solarSystem: SolarSystem): void {
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