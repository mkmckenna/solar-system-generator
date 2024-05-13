import { LitElement, PropertyValueMap, css, html } from 'lit-element';
import { UIElementDragController } from './ui_element_drag_controller';
import { UIElementResizeController } from './ui_element_resize_controller';

/**
 * Base class for all UI elements.
 */
export abstract class UIElement extends LitElement {
    static styles = css`
        :host {
            position: fixed;
            top: 20px;
            left: 20px;

            min-width: 400px;
            max-width: 100%;
            min-height: 100px;
            max-height: 100%;
            
            border-radius: 2px;
            border: 2px solid rgba(255, 255, 255, 0.4);
            background-color: rgba(50, 50, 75, 0.9);

            color: white;
            font-size: 12px;
            font-family: Arial, sans-serif;

            resize: both; /* This CSS property can allow resizing but does not work perfectly with all layouts */
            box-sizing: border-box;
        }
        .header {
            position: relative;
            background-color: rgba(15, 15, 25, 0.9);
            border-bottom: 2px solid rgba(255, 255, 255, 0.4);
            padding: 5px;
            font-size: 14px;
        }
        .header-title {
            margin: 0;
            padding: 0;
        }
        .close {
            position: absolute;
            top: 0;
            right: 0;
            margin: 0;
            padding: 0;
            background-color: transparent;
            color: white;
            border: none;
            border-left: 2px solid rgba(255, 255, 255, 0.4);
            height: 100%;
            padding-left: 12px;
            padding-right: 12px;
        }
        .body {
            padding: 5px;
        }
    `;

    title = '';
    contextWindow: HTMLElement | undefined | null = null;
    uiElementDragController: UIElementDragController | undefined | null = null;
    uiElementResizeController: UIElementResizeController | undefined | null = null;

    abstract renderBody(): string | object | undefined | null;

    protected static addElementToScreen(element: HTMLElement) {
        document.body.appendChild(element);
    }

    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        this.uiElementDragController = new UIElementDragController(this);
        this.uiElementResizeController = new UIElementResizeController(this);
        this.uiElementResizeController.onConnected();
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.uiElementResizeController?.onDisconnected();
    }

    render() {
        return html`
            <div class="header">
                <p class="header-title">${this.title}</p>
                <button class="close" @mousedown=${this.close}>X</button>
            </div>
            <div class="body">
                ${this.renderBody()}
            </div>
        `;
    }

    close() {
        this.remove();
    }
}