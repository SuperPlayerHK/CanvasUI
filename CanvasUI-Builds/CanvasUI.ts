/** Build it with the given tasks.json. */

interface UIRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface UIPosition {
    x: number;
    y: number;
}

interface UIComponent {
    // Called when this component needs to be drawn.
    draw(): void;

    // Called when this component needs to be updated.
    update(): void;

    ctx: CanvasRenderingContext2D;
}

interface UIListItem {
    content: string;
    selected: boolean;
}

/**
 * Check if a point is inside a rectangle.
 * @param rect The box to check.
 * @param pos The position to check.
 * @returns 
 */
const insideOf = (rect: UIRect, pos: UIPosition): boolean => {
    return pos.x >= rect.x && pos.x <= rect.x + rect.width && pos.y >= rect.y && pos.y <= rect.y + rect.height;
}

class Box implements UIComponent, UIRect {
    x: number;
    y: number;
    width: number;
    height: number;
    shapeColor: string = "black";

    constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
    }
    ctx: CanvasRenderingContext2D;

    draw(): void {
        this.ctx.fillStyle = this.shapeColor;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(): void {
        // Do nothing.
    }
}

class Circle implements UIComponent, UIRect {
    draw(): void {
        this.ctx.fillStyle = this.shapeColor;
        this.ctx.beginPath();
        this.ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    update(): void {
        
    }

    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    width: number;
    height: number;
    shapeColor: string = "black";

    constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
    }
}

// A panel is a container for other components, useful for grouping them together.
class Panel implements UIComponent, UIRect {
    draw(): void {
        this.children.forEach((child) => {
            child.draw();
        })
    }
    update(): void {
        
    }

    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    width: number;
    height: number;

    children: UIComponent[] = [];
    
    constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
    }
}

class Label implements UIComponent, UIPosition {
    draw(): void {
        this.ctx.fillStyle = this.textColor;
        this.ctx.font = this.font;
        this.ctx.fillText(this.text, this.x, this.y);
    }

    update(): void {
        // Do nothing.
    }

    x: number;
    y: number;
    text: string = "";
    ctx: CanvasRenderingContext2D;
    
    textColor: string = "black";
    font: string = "20px Arial";

    constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;

        this.ctx = ctx;
    }
}

class Button implements UIComponent, UIRect {
    ctx: CanvasRenderingContext2D;
    draw(): void {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.font = this.font;
        this.ctx.fillStyle = this.textColor;
        this.ctx.fillText(this.text, this.x + this.width / 2 - this.ctx.measureText(this.text).width / 2, this.y + this.height / 2 + 5);
    }

    update(): void {
        
    }

    x: number;
    y: number;
    width: number;
    height: number;
    text: string = "";

    backgroundColor: string = "darkgray";
    textColor: string = "black";
    font: string = "20px Arial";

    onClick: () => void = () => {}

    constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;

        this.ctx.canvas.addEventListener("click", (e: MouseEvent) => {
            if (this.x <= e.clientX && e.clientX <= this.x + this.width && this.y <= e.clientY && e.clientY <= this.y + this.height) {
                this.onClick();
            }
        })
    }
}

class Checkbox implements UIComponent, UIRect {
    ctx: CanvasRenderingContext2D;
    draw(): void {
        this.ctx.fillStyle = this.checked ? this.activeColor : this.inactiveColor;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(): void {
        
    }

    x: number;
    y: number;
    width: number;
    height: number;

    activeColor: string = "green";
    inactiveColor: string = "red";

    checked: boolean = false;

    onClick: () => void = () => {}

    constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;

        this.ctx.canvas.addEventListener("click", (e: MouseEvent) => {
            if (this.x <= e.clientX && e.clientX <= this.x + this.width && this.y <= e.clientY && e.clientY <= this.y + this.height) {
                this.checked = !this.checked;
                this.onClick();
            }
        })
    }
}

class Slider implements UIComponent, UIPosition {
    ctx: CanvasRenderingContext2D;

    draw(): void {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);

        this.ctx.fillStyle = this.sliderColor;
        this.ctx.fillRect(this.x, this.y, this.width * (this.value / this.max), this.height);
    }

    update(): void {
        
    }

    x: number;
    y: number;
    width: number;
    height: number;

    backgroundColor: string = "darkgray";
    sliderColor: string = "lightgray";

    value: number = 0;
    max: number = 100;
    dragging: boolean = false;

    onDrag: () => void = () => {}
    onChange: (value: number) => void = () => {}
    onRelease: () => void = () => {}

    constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;

        this.ctx.canvas.addEventListener('mousedown', () => { 
            this.onDrag();
            this.dragging = true;
        });
        this.ctx.canvas.addEventListener('mouseup', () => { 
            this.onRelease();
            this.dragging = false;
        });

        this.ctx.canvas.addEventListener('mousemove', (e: MouseEvent) => {
            if (!this.dragging)
                return;

            if (this.x <= e.clientX && e.clientX <= this.x + this.width && this.y <= e.clientY && e.clientY <= this.y + this.height) {
                this.onChange(((e.clientX - this.x) / this.width) * this.max);
                this.value = (e.clientX - this.x) / this.width * this.max;
            }
        })
    }
}

function repeat(str: string, times: number): string {
    let result = "";
    for (let i = 0; i < times; i++) {
        result += str;
    }
    return result;
}

class Textbox implements UIComponent, UIRect {
    static allFunctionKeys = [
        "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",
        "Backspace", "Tab", "Enter", "Shift", "Control", "Alt", "Pause", "CapsLock", "Escape", "Space", "PageUp", "PageDown", "End", "Home", "ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "Insert", "Delete", "NumLock", "ScrollLock", "Meta"
    ]

    draw(): void {
        this.ctx.fillStyle = this.selected ? this.activeColor : this.inactiveColor;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);

        this.ctx.font = "20px Arial";

        if (this.enteredText == "") {
            this.ctx.fillStyle = this.placeholderTextColor;
            this.ctx.fillText(this.placeholderText, this.x + this.width / 2 - this.ctx.measureText(this.placeholderText).width / 2, this.y + this.height / 2 + 5);
        } else {
            this.ctx.fillStyle = this.textColor;
            let text: string = (this.isPassword ? repeat("*", this.enteredText.length) : this.enteredText);
            this.ctx.fillText(text, this.x + this.width / 2 - this.ctx.measureText(text).width / 2, this.y + this.height / 2 + 5);
        }
    }
    update(): void {

    }

    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    width: number;
    height: number;

    enteredText: string = "";
    placeholderText: string = "";
    selected: boolean = false;

    isPassword: boolean = false;

    activeColor: string = "darkgray";
    inactiveColor: string = "lightgray";

    textColor: string = "black";
    placeholderTextColor: string = "gray";

    constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;

        this.ctx.canvas.addEventListener("click", (e: MouseEvent) => {
            this.selected = (this.x <= e.clientX && e.clientX <= this.x + this.width && this.y <= e.clientY && e.clientY <= this.y + this.height);
        })

        window.addEventListener('keydown', (e: KeyboardEvent) => {
            e.preventDefault();

            if (Textbox.allFunctionKeys.indexOf(e.key) != -1 && this.selected) {
                switch(e.key.toLowerCase()) {
                    case "backspace":
                        this.enteredText = this.enteredText.slice(0, -1);
                        break;

                    case "tab": 
                        this.enteredText += "    ";
                        break;

                    case "enter":
                        this.enteredText += "\n";
                        break;

                    case "escape":
                        this.selected = false;
                        break;
                }
                return;
            }

            if (this.selected)
                this.enteredText += e.key;
        })
    }
}

class ExpendLabel implements UIComponent, UIRect {
    ctx: CanvasRenderingContext2D;

    draw(): void {
        let height = parseInt(this.font.split(' ')[0].split('px')[0])

        this.ctx.fillStyle = this.titleBarColor;
        this.ctx.fillRect(this.x, this.y, this.width, height);
        
        this.ctx.fillStyle = this.textColor;
        this.ctx.font = this.font;
        this.ctx.fillText(this.expended ? "-" : "+", this.x, this.y + height);

        this.ctx.fillStyle = this.titleTextColor;
        this.ctx.fillText(this.title, this.x + 20, this.y + height);

        if (this.expended) {
            this.ctx.fillStyle = this.contentBackgroundColor;
            this.ctx.fillRect(this.x, this.y + height, this.width, this.height);

            this.ctx.fillStyle = this.textColor;
            this.ctx.fillText(this.text, this.x, this.y + height * 2);
        }
    }

    update(): void {

    }

    x: number;
    y: number;
    width: number;
    height: number;

    font: string = "20px Arial";
    expended: boolean = false;
    text: string = "";
    title: string = "";

    textColor: string = "black";
    titleBarColor: string = "darkgray";
    contentBackgroundColor: string = "lightgray";
    titleTextColor: string = "black";

    constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;

        this.ctx.canvas.addEventListener("click", (e: MouseEvent) => {
            let height = parseInt(this.font.split(' ')[0].split('px')[0])

            if (insideOf({
                x: this.x,
                y: this.y,
                width: this.width,
                height: height
            }, {
                x: e.clientX,
                y: e.clientY
            })) {
                this.expended = !this.expended;
            }
        })
    }
}

class Cursor implements UIComponent {
    draw(): void {
        this.ctx.fillStyle = this.cursorColor;
        this.ctx.fillRect(this.mousePosition.x, this.mousePosition.y, this.cursorWidth, this.cursorWidth);
    }
    update(): void {
        
    }

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.ctx.canvas.style.cursor = "none";

        this.ctx.canvas.addEventListener('mousemove', (e: MouseEvent) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        })
    }

    ctx: CanvasRenderingContext2D;
    mousePosition: UIPosition = { x: 0, y: 0 };

    cursorColor: string = "black";
    cursorWidth: number = 1;

    isVisible: boolean = true;
}