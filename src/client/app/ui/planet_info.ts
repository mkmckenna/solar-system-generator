import { CSSResult, css, html } from 'lit-element';
import { customElement } from 'lit-element/decorators.js';
import { Planet } from '../entities/planet';
import { sceneUnitsToKilometersString } from '../utils/utils';
import { UIElement } from './ui_element';

@customElement('planet-info')
export class PlanetInfo extends UIElement {

    static get styles(): CSSResult {
        return css`
            ${super.styles}
            table {
                width: 100%;
                border-spacing:0px 6px;
            }
            tr {
                padding: 10px 10px;
            }
        `;
    }

    title = 'Planet Information';
    public planet: Planet | null = null;

    public static create(planet: Planet) {
        const planetInfo = new PlanetInfo();
        planetInfo.planet = planet;
        this.addElementToScreen(planetInfo);
    }

    renderBody() {
        if (!this.planet) return html`<p>Error: Couldn't find planet</p>`

        return html`
            <table>
                <tr>
                    <td style="width:150px">Type</td>
                    <td>${this.planet?.getPlanetTypeString()}</td>
                </tr>
                <tr>
                    <td>Radius</td>
                    <td>${sceneUnitsToKilometersString(this.planet?.radius)}</td>
                </tr>
            </table>
        `;
    }
}