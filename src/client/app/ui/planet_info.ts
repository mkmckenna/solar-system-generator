import { customElement } from 'lit-element/decorators.js';
import { html } from 'lit-html';
import { Planet } from '../entities/planet';
import { UIElement } from './ui_element';

@customElement('planet-info')
export class PlanetInfo extends UIElement {

    title = 'Planet Information';
    public planet: Planet | null = null;

    public static create(planet: Planet) {
        const planetInfo = new PlanetInfo();
        planetInfo.planet = planet;
        this.addElementToScreen(planetInfo);
    }

    renderBody() {
        return html`
            <div>
                <h3>Planet Information</h3>
                <p>Planet Name: Earth</p>
                <p>Planet Type: Terrestrial</p>
                <p>Orbital Distance: 1 AU</p>
                <p>Orbital Velocity: 29.78 km/s</p>
                <p>Rotation Period: 24 hours</p>
                <p>Surface Temperature: 15°C</p>
            </div>
        `;
    }
}