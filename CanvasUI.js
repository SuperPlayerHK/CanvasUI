"use strict";
/**
 * Check if a point is inside a rectangle.
 * @param rect The box to check.
 * @param pos The position to check.
 * @returns
 */
var insideOf = function (rect, pos) {
    return pos.x >= rect.x && pos.x <= rect.x + rect.width && pos.y >= rect.y && pos.y <= rect.y + rect.height;
};
var Box = /** @class */ (function () {
    function Box(x, y, width, height, ctx) {
        this.shapeColor = "black";
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
    }
    Box.prototype.draw = function () {
        this.ctx.fillStyle = this.shapeColor;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    Box.prototype.update = function () {
        // Do nothing.
    };
    return Box;
}());
var Circle = /** @class */ (function () {
    function Circle(x, y, width, height, ctx) {
        this.shapeColor = "black";
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
    }
    Circle.prototype.draw = function () {
        this.ctx.fillStyle = this.shapeColor;
        this.ctx.beginPath();
        this.ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, 2 * Math.PI);
        this.ctx.fill();
    };
    Circle.prototype.update = function () {
    };
    return Circle;
}());
// A panel is a container for other components, useful for grouping them together.
var Panel = /** @class */ (function () {
    function Panel(x, y, width, height, ctx) {
        this.children = [];
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
    }
    Panel.prototype.draw = function () {
        this.children.forEach(function (child) {
            child.draw();
        });
    };
    Panel.prototype.update = function () {
    };
    return Panel;
}());
var Label = /** @class */ (function () {
    function Label(x, y, ctx) {
        this.text = "";
        this.textColor = "black";
        this.font = "20px Arial";
        this.x = x;
        this.y = y;
        this.ctx = ctx;
    }
    Label.prototype.draw = function () {
        this.ctx.fillStyle = this.textColor;
        this.ctx.font = this.font;
        this.ctx.fillText(this.text, this.x, this.y);
    };
    Label.prototype.update = function () {
        // Do nothing.
    };
    return Label;
}());
var Button = /** @class */ (function () {
    function Button(x, y, width, height, ctx) {
        var _this = this;
        this.text = "";
        this.backgroundColor = "darkgray";
        this.textColor = "black";
        this.font = "20px Arial";
        this.onClick = function () { };
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.ctx.canvas.addEventListener("click", function (e) {
            if (_this.x <= e.clientX && e.clientX <= _this.x + _this.width && _this.y <= e.clientY && e.clientY <= _this.y + _this.height) {
                _this.onClick();
            }
        });
    }
    Button.prototype.draw = function () {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.font = this.font;
        this.ctx.fillStyle = this.textColor;
        this.ctx.fillText(this.text, this.x + this.width / 2 - this.ctx.measureText(this.text).width / 2, this.y + this.height / 2 + 5);
    };
    Button.prototype.update = function () {
    };
    return Button;
}());
var Checkbox = /** @class */ (function () {
    function Checkbox(x, y, width, height, ctx) {
        var _this = this;
        this.activeColor = "green";
        this.inactiveColor = "red";
        this.checked = false;
        this.onClick = function () { };
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.ctx.canvas.addEventListener("click", function (e) {
            if (_this.x <= e.clientX && e.clientX <= _this.x + _this.width && _this.y <= e.clientY && e.clientY <= _this.y + _this.height) {
                _this.checked = !_this.checked;
                _this.onClick();
            }
        });
    }
    Checkbox.prototype.draw = function () {
        this.ctx.fillStyle = this.checked ? this.activeColor : this.inactiveColor;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    Checkbox.prototype.update = function () {
    };
    return Checkbox;
}());
var Slider = /** @class */ (function () {
    function Slider(x, y, width, height, ctx) {
        var _this = this;
        this.backgroundColor = "darkgray";
        this.sliderColor = "lightgray";
        this.value = 0;
        this.max = 100;
        this.dragging = false;
        this.onDrag = function () { };
        this.onChange = function () { };
        this.onRelease = function () { };
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.ctx.canvas.addEventListener('mousedown', function () {
            _this.onDrag();
            _this.dragging = true;
        });
        this.ctx.canvas.addEventListener('mouseup', function () {
            _this.onRelease();
            _this.dragging = false;
        });
        this.ctx.canvas.addEventListener('mousemove', function (e) {
            if (!_this.dragging)
                return;
            if (_this.x <= e.clientX && e.clientX <= _this.x + _this.width && _this.y <= e.clientY && e.clientY <= _this.y + _this.height) {
                _this.onChange(((e.clientX - _this.x) / _this.width) * _this.max);
                _this.value = (e.clientX - _this.x) / _this.width * _this.max;
            }
        });
    }
    Slider.prototype.draw = function () {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = this.sliderColor;
        this.ctx.fillRect(this.x, this.y, this.width * (this.value / this.max), this.height);
    };
    Slider.prototype.update = function () {
    };
    return Slider;
}());
function repeat(str, times) {
    var result = "";
    for (var i = 0; i < times; i++) {
        result += str;
    }
    return result;
}
var Textbox = /** @class */ (function () {
    function Textbox(x, y, width, height, ctx) {
        var _this = this;
        this.enteredText = "";
        this.placeholderText = "";
        this.selected = false;
        this.isPassword = false;
        this.activeColor = "darkgray";
        this.inactiveColor = "lightgray";
        this.textColor = "black";
        this.placeholderTextColor = "gray";
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.ctx.canvas.addEventListener("click", function (e) {
            _this.selected = (_this.x <= e.clientX && e.clientX <= _this.x + _this.width && _this.y <= e.clientY && e.clientY <= _this.y + _this.height);
        });
        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            if (Textbox.allFunctionKeys.indexOf(e.key) != -1) {
                switch (e.key.toLowerCase()) {
                    case "backspace":
                        _this.enteredText = _this.enteredText.slice(0, -1);
                        break;
                    case "tab":
                        _this.enteredText += "    ";
                        break;
                    case "enter":
                        _this.enteredText += "\n";
                        break;
                    case "escape":
                        _this.selected = false;
                        break;
                }
                return;
            }
            if (_this.selected)
                _this.enteredText += e.key;
        });
    }
    Textbox.prototype.draw = function () {
        this.ctx.fillStyle = this.selected ? this.activeColor : this.inactiveColor;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.font = "20px Arial";
        if (this.enteredText == "") {
            this.ctx.fillStyle = this.placeholderTextColor;
            this.ctx.fillText(this.placeholderText, this.x + this.width / 2 - this.ctx.measureText(this.placeholderText).width / 2, this.y + this.height / 2 + 5);
        }
        else {
            this.ctx.fillStyle = this.textColor;
            var text = (this.isPassword ? repeat("*", this.enteredText.length) : this.enteredText);
            this.ctx.fillText(text, this.x + this.width / 2 - this.ctx.measureText(text).width / 2, this.y + this.height / 2 + 5);
        }
    };
    Textbox.prototype.update = function () {
    };
    Textbox.allFunctionKeys = [
        "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",
        "Backspace", "Tab", "Enter", "Shift", "Control", "Alt", "Pause", "CapsLock", "Escape", "Space", "PageUp", "PageDown", "End", "Home", "ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "Insert", "Delete", "NumLock", "ScrollLock", "Meta"
    ];
    return Textbox;
}());
var ExpendLabel = /** @class */ (function () {
    function ExpendLabel(x, y, width, height, ctx) {
        var _this = this;
        this.font = "20px Arial";
        this.expended = false;
        this.text = "";
        this.textColor = "black";
        this.titleBarColor = "darkgray";
        this.contentBackgroundColor = "lightgray";
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.ctx.canvas.addEventListener("click", function (e) {
            var height = parseInt(_this.font.split(' ')[0].split('px')[0]);
            if (insideOf({
                x: _this.x,
                y: _this.y,
                width: _this.width,
                height: height
            }, {
                x: e.clientX,
                y: e.clientY
            })) {
                _this.expended = !_this.expended;
            }
        });
    }
    ExpendLabel.prototype.draw = function () {
        var height = parseInt(this.font.split(' ')[0].split('px')[0]);
        this.ctx.fillStyle = this.titleBarColor;
        this.ctx.fillRect(this.x, this.y, this.width, height);
        this.ctx.fillStyle = this.textColor;
        this.ctx.font = this.font;
        this.ctx.fillText(this.expended ? "-" : "+", this.x, this.y + height);
        if (this.expended) {
            this.ctx.fillStyle = this.contentBackgroundColor;
            this.ctx.fillRect(this.x, this.y + height, this.width, this.height);
            this.ctx.fillStyle = this.textColor;
            this.ctx.fillText(this.text, this.x, this.y + height * 2);
        }
    };
    ExpendLabel.prototype.update = function () {
    };
    return ExpendLabel;
}());
