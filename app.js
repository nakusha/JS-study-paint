const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const fillBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const DEFAULT_COLOR = "#2c2c2c";
const INIT_CANVAS_SIZE = 500;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, INIT_CANVAS_SIZE, INIT_CANVAS_SIZE);
canvas.width = INIT_CANVAS_SIZE;
canvas.height = INIT_CANVAS_SIZE;

ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX
    const y = event.offsetY

    if (!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function changeBrushSize(event){
    const range = event.target.value;
    ctx.lineWidth = range;
}

function handleFillBtn(event){
    if (filling === false){
        filling = true
        fillBtn.innerText = "FILL";
    }else{
        filling = false
        fillBtn.innerText = "PAINT";
    }
}

function handleCanvasClick(event){
    if (filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleSaveImage(event){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJSExport.png";
    link.click();
}

function handleContextMenu(event){
    event.preventDefault();
}

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    // right click menu
    canvas.addEventListener("contextmenu", handleContextMenu);
}

if (colors){
    Array.from(colors).forEach(color => color.addEventListener("click", changeColor));
}

if (range){
    range.addEventListener("input", changeBrushSize);
}

if (fillBtn){
    fillBtn.addEventListener("click", handleFillBtn);
}

if (saveBtn){
    saveBtn.addEventListener("click", handleSaveImage);
}