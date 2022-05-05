# CanvasUI
A lightweight UI library for HTML canvas. It renders UI component purely in canvas.

# Can I made my own UI elements?
You can, just make a new class that implement UIComponent and either UIPosition or UIRect.

e.g. A Circle Shape element
```
class Circle implements UIComponent, UIRect {
  // Called when this component needs to be drawn.
  draw(): void {
    // Draw a circle...
  }

  // Called when this component needs to be updated.
  update(): void {
    // Update... (Most of the time, you don't need this)
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

# How to draw it?
Just call the draw method inside a loop.

```
let c = new Circle(...)

c.color = 'red';

... code

... loop
c.draw();
... other code