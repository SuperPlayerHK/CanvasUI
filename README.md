# CanvasUI
A lightweight UI library for HTML canvas.

# Also
And it's lightweight so don't execpt much from it.

# Can I made my own UI elements?
You can, just make a new class that implement UIComponent and either UIPosition or UIRect.

e.g. A Circle Shape element
```
class Circle implements UIRect {
  // Called when this component needs to be drawn.
  draw(): void {
    // Draw a circle...
  }

  // Called when this component needs to be updated.
  update(): void {
    // Update...
  }
  
  x: number;
  y: number;
  width: number;
  height: number;

  ctx: CanvasRenderingContext2D;
  
  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    // Make your circle
  }
}
```
