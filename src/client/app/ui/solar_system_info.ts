import { LitElement, css, html } from 'lit-element';
import { customElement } from 'lit-element/decorators.js';
import { SolarSystem } from '../entities/solar_system';


@customElement('solar-system-info')
export class SolarSystemInfo extends LitElement {

    static styles = css`
        :host {
            position: fixed;
            top: 40px;
            left: 40px;

            color: #eee;
        }
        #solar-system-name {
            font-weight: 900;  
            margin: 0;
            margin-bottom: 10px;
        }
        p {
            margin: 6px 0px;
        }
        span.key {
        }
        span.value {
        }
    `


    public starRadius: number = 0
    public planetCount: number = 0
    private solarSystem: SolarSystem | null = null

    public static create(solarSystem: SolarSystem) {
        const solarSystemInfo = new SolarSystemInfo();
        solarSystemInfo.solarSystem = solarSystem;
        document.body.appendChild(solarSystemInfo);
    }

    render() {
        return html`
            <div id="solar-system-info">
                <h1 id="solar-system-name">${this.solarSystem?.name}</h1>
                <p>
                    <span class="key">Star:</span> 
                    <span id="value star-radius">${this.solarSystem?.star.getStarTypeString()}</span>
                </p>
                <p>
                    <span class="key">Planets:</span> 
                    <span id="value star-radius">${this.solarSystem?.planets.length}</span>
                </p>
            </div>
        `
    }
}