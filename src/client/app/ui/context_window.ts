import { LitElement, css, html } from 'lit-element';
import { customElement } from 'lit-element/decorators.js';

@customElement('context-window')
export class ContextWindow extends LitElement {

    static styles = css`
        .context-window {
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

    // drag = new DragController(this, {
    //     getContainerEl: () => this.shadowRoot.querySelector("#window"),
    //     getDraggableEl: () => this.getDraggableEl(),
    // });

    // async getDraggableEl() {
    //     await this.updateComplete;
    //     return this.shadowRoot.querySelector("#draggable");
    // }

    render() {
        return html`
            <div class="context-window">
                <div class="header"
                    @mousedown="${this.handleDragStart}">
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

    private initialX = 0;
    private initialY = 0;
    private dragOffsetX = 0;
    private dragOffsetY = 0;
    private dragging = false;

    handleDragStart(event: MouseEvent) {
        this.initialX = event.clientX;
        this.initialY = event.clientY;
        const rect = this.getBoundingClientRect();
        this.dragOffsetX = this.initialX - rect.left;
        this.dragOffsetY = this.initialY - rect.top;
        this.dragging = true;

        console.log(event)
        console.log("x: " + event.x, "y: " + event.y)
        // console.log("left: " + rect.left, "top: " + )
        console.log("corner x: " + (event.target), "corner y: " + (event.target?.y))

        window.addEventListener('mousemove', this.handleDragging);
        window.addEventListener('mouseup', this.handleDragEnd);
        event.preventDefault(); // Prevents unwanted text selection
    }

    handleDragging = (event: MouseEvent) => {
        if (!this.dragging) return;
        const newX = event.clientX - this.dragOffsetX;
        const newY = event.clientY - this.dragOffsetY;

        this.style.left = `${newX}px`;
        this.style.top = `${newY}px`;
    };

    handleDragEnd = () => {
        this.dragging = false;
        window.removeEventListener('mousemove', this.handleDragging);
        window.removeEventListener('mouseup', this.handleDragEnd);
    };

    close() {
        this.remove();
    }
}