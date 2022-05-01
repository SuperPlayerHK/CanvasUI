const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

let title = new Label(0, 20, ctx);
title.text = "This is CanvasUI, a lightweight UI library for HTML5 canvas.";

let expandable = new ExpendLabel(0, 25, 500, 25, ctx);
expandable.text = "Fun fact: Nearly 99% of people will click on the plus sign.";

let textbox = new Textbox(0, 100, 500, 25, ctx);
textbox.placeholderText = "Click to enter text";

let passwordBox = new Textbox(0, 130, 500, 25, ctx);
passwordBox.placeholderText = "Click to enter password";
passwordBox.isPassword = true;

let helloWorldBtn = new Button(0, 180, 250, 25, ctx);
helloWorldBtn.text = "Click here to Hello World";
helloWorldBtn.onClick = function() {
    alert("Hello World!");
}

let slider = new Slider(0, 220, 500, 25, ctx);
slider.onChange = function() {
    console.log(slider.value);
}

let checkbox = new Checkbox(0, 260, 500, 25, ctx);


setInterval(() => {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    title.draw();
    expandable.draw();
    textbox.draw();
    passwordBox.draw();
    helloWorldBtn.draw();
    slider.draw();
    checkbox.draw();
}, 1000 / 60)