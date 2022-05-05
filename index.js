const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

// Try edit these values to see the effect

let lbl_Title = new Label(0, 60, ctx);
lbl_Title.text = "CanvasUI";
lbl_Title.font = "bold 60px Arial";

let lbl_Description = new Label(0, 90, ctx);
lbl_Description.text = "A simple canvas UI library";
lbl_Description.font = "30px Arial";

let ebl_WhatIsThis = new ExpendLabel(0, 100, canvas.width, 200, ctx);
ebl_WhatIsThis.text = "This is a UI library created for canvas. I have made it highly extendable.";
ebl_WhatIsThis.title = "What is this?";

let btn_Download = new Button(0, canvas.height - 60, canvas.width, 60, ctx);
btn_Download.text = "Download on GitHub";
btn_Download.onClick = () => {
    window.open("https://github.com/SuperPlayerHK/CanvasUI");
}

let cur_Cursor = new Cursor(ctx);
cur_Cursor.cursorWidth = 10;

let tb_Input1 = new Textbox(0, 400, canvas.width, 20, ctx);
let tb_Input2 = new Textbox(0, 430, canvas.width, 20, ctx);

setInterval(() => {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    lbl_Title.draw();
    lbl_Description.draw();

    ebl_WhatIsThis.draw();
    btn_Download.draw();

    tb_Input1.draw();
    tb_Input2.draw();

    cur_Cursor.draw();
}, 1000 / 60)