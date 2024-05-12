import { LitElement, css, html } from 'lit-element';
import { customElement } from 'lit-element/decorators.js';

@customElement('context-window')
export class ContextWindow extends LitElement {

    static styles = css`
        :host {
            position: fixed;
            top: 25%;
            left: 0;
            width: 500px;
            min-width: 200px;
            max-width: 100%;
            height: 300px;
            min-height: 100px;
            max-height: 100%;
            border-radius: 4px;
            border: 3px solid rgba(255, 255, 255, 0.4);
            background-color: rgba(50, 50, 75, 0.9);
            color: white;
        }
        .header {
            position: relative;
            background-color: rgba(15, 15, 25, 0.9);
            border-bottom: 3px solid rgba(255, 255, 255, 0.4);
            padding: 5px;
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

    // @property({ type: String })
    title = 'Title Test';
    contextWindow: HTMLElement | undefined | null = null;

    private dragging = false;
    private startX = 0;
    private startY = 0;
    private currentX = 0;
    private currentY = 0;

    private onDragStart(e: MouseEvent) {
        this.dragging = true;
        this.startX = e.clientX - this.currentX;
        this.startY = e.clientY - this.currentY;
        console.log('drag start');
        window.addEventListener('mousemove', this.onDragging.bind(this));
        window.addEventListener('mouseup', this.onDragEnd.bind(this));
    }

    private onDragging(e: MouseEvent) {
        if (!this.dragging) return;
        this.currentX = e.clientX - this.startX;
        this.currentY = e.clientY - this.startY;
        console.log("currentX: ", this.currentX, "currentY: ", this.currentY);
        this.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
    }

    private onDragEnd() {
        this.dragging = false;
        window.removeEventListener('mousemove', this.onDragging.bind(this));
        window.removeEventListener('mouseup', this.onDragEnd.bind(this));
    }

    render() {
        return html`
            <div class="context-window">
                <div class="header"
                    @mousedown="${this.onDragStart}">
                    <p class="header-title">${this.title}</p>
                    <button class="close"
                    @mousedown=${this.close}>X</button>
                </div>
                <div class="body">
                    <slot></slot>
                </div>
            </div>
        `;
    }

    close() {
        this.remove();
    }
}