import { UIElement } from './ui_element';

export class UIElementResizeController {

    private resizing: boolean = false;
    private resizeStartX: number = 0;
    private resizeStartY: number = 0;
    private resizeStartWidth: number = 0;
    private resizeStartHeight: number = 0;

    constructor(private uiElement: UIElement) { }

    onConnected(): void {
        this.uiElement.addEventListener('mousedown', this.onResizeStart.bind(this));
        window.addEventListener('mousemove', this.onResizing.bind(this));
        window.addEventListener('mouseup', this.onResizeEnd.bind(this));
    }

    onDisconnected(): void {
        window.removeEventListener('mousemove', this.onResizing.bind(this));
        window.removeEventListener('mouseup', this.onResizeEnd.bind(this));
    }

    private onResizeStart(e: MouseEvent): void {
        const rect = this.uiElement.getBoundingClientRect();
        const isNearRightEdge = e.clientX >= rect.right - 20;
        const isNearBottomEdge = e.clientY >= rect.bottom - 20;

        if (isNearRightEdge || isNearBottomEdge) {
            this.resizing = true;
            this.resizeStartX = e.clientX;
            this.resizeStartY = e.clientY;
            this.resizeStartWidth = rect.width;
            this.resizeStartHeight = rect.height;
            e.preventDefault();
        }
    }

    private onResizing(e: MouseEvent): void {
        if (!this.resizing) return;

        const dx = e.clientX - this.resizeStartX;
        const dy = e.clientY - this.resizeStartY;

        if (this.resizeStartX < e.clientX) {
            this.uiElement.style.width = `${this.resizeStartWidth + dx}px`;
        }
        if (this.resizeStartY < e.clientY) {
            this.uiElement.style.height = `${this.resizeStartHeight + dy}px`;
        }
    }

    private onResizeEnd(): void {
        this.resizing = false;
    }
}