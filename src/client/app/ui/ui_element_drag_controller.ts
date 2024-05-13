import { UIElement } from "./ui_element";

/**
 * Controls the ability to drag UI elements using their
 * header.
 */
export class UIElementDragController {

    private style = this.uiElement.style;

    private dragging = false;
    private startX = 0;
    private startY = 0;
    private currentX = 0;
    private currentY = 0;

    constructor(private uiElement: UIElement) {
        // Bind the drag start event to the header
        const header = this.uiElement.shadowRoot?.querySelector(".header") as HTMLElement;
        if (header) {
            header.addEventListener('mousedown', this.onDragStart.bind(this));
        }
    }

    private onDragStart(e: MouseEvent) {
        this.dragging = true;
        this.startX = e.clientX - this.currentX;
        this.startY = e.clientY - this.currentY;
        window.addEventListener('mousemove', this.onDragging.bind(this));
        window.addEventListener('mouseup', this.onDragEnd.bind(this));
    }

    private onDragging(e: MouseEvent) {
        if (!this.dragging) return;
        this.currentX = e.clientX - this.startX;
        this.currentY = e.clientY - this.startY;
        this.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
    }

    private onDragEnd() {
        this.dragging = false;
        window.removeEventListener('mousemove', this.onDragging.bind(this));
        window.removeEventListener('mouseup', this.onDragEnd.bind(this));
    }


}