const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function stopPainting(event){
    painting = false;
}

function startPainting(){
    painting = true;
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const value = event.target.value;
    ctx.lineWidth = value;
}

function handleModeClick(event){
    if(filling){
        filling = false;
        mode.innerText = "Fill";
    }
    else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(event){
    
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleContextMenu(event){
    event.preventDefault();
}

function handleSaveClick(event){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "image";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu",handleContextMenu);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(save){
    save.addEventListener("click", handleSaveClick);
}