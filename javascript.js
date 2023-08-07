const canvas = document.querySelector("#canvas");
const colorPalette = Array.from(document.querySelector("#color-palette").children);
const tools = document.querySelector("#tools").children;
const colorSelected = document.querySelector("#color-selected img");
const clearButton = document.querySelector("#clear");
const gridButton = document.querySelector("#grid");
const rainbowPenButton = document.querySelector("#rainbow");
const opacityPenButton = document.querySelector("#opacity");
const penButton = document.querySelector("#pencil");
const eraseButton = document.querySelector("#eraser");
const colorPickerButton = document.querySelector("#color-extractor");
const fillButton = document.querySelector("#fill");
const slider = document.querySelector('input[type="range"]');
const scrollBarIncrease = document.querySelector('#scroll-up-button');
const scrollBarDecrease = document.querySelector('#scroll-down-button');
const footerText = document.querySelector('#canvas-size');
let previousSlider = 32;
let canvasPixel;
let gridActive = false;
let rainbowPen = false;
let normalPen = true;
let opacityPen = false;
let eraser = false;
let colorPicker = false;
let fillColor = 'white';


penButton.classList.add('active-button');

function createCanvas(dimensions,skipConfirm) {
    if(skipConfirm!==true)
    {
       if(!confirm("Are you sure you'd like to change the canvas size? \n\tThis would erase all your current work!"))
       {
            slider.value = previousSlider;
            return;
       }
    }
    previousSlider = slider.value;
    while(canvas.firstChild)
    {
        canvas.firstChild.remove();
    }
    for (let y = 0; y < dimensions; y++) {
        const row = document.createElement('div');
        row.classList.add('canvasrow');
        for (let x = 0; x < dimensions; x++) {
            const column = document.createElement('div');
            column.classList.add('canvascolumn');
            row.appendChild(column);
        }
        canvas.appendChild(row);
    }

    footerText.textContent=`${dimensions} x ${dimensions}`;

    canvasPixel = Array.from(document.querySelectorAll(".canvascolumn"));

    canvasPixel.forEach((pixel) => {
        pixel.addEventListener('pointerdown', handlePointerDown);
        pixel.addEventListener('pointerdown', colorCanvas);
    });
    
    window.addEventListener('pointerup', () => {
        canvasPixel.forEach((pixel) => {
            pixel.removeEventListener('pointerover', handlePointerOver)
        })
    });
}

function colorCanvas(pixel) {
    let currentColor = window.getComputedStyle(colorSelected);
    let targetPixel = window.getComputedStyle(pixel.target);
    let redValue, greenValue, blueValue;
    if (rainbowPen === true) {
        redValue = Math.floor(Math.random() * 256);
        greenValue = Math.floor(Math.random() * 256);
        blueValue = Math.floor(Math.random() * 256);
        colorSelected.style.backgroundColor = `rgb(${redValue},${greenValue},${blueValue})`;
        pixel.target.style.backgroundColor = colorSelected.style.backgroundColor;
    }
    else if (opacityPen === true) {
        let targetRgbValue = targetPixel.backgroundColor.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
        let currentRgbValue = currentColor.backgroundColor.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
        redValue = Math.floor((+targetRgbValue[1] + +currentRgbValue[1]) / 2);
        greenValue = Math.floor((+targetRgbValue[2] + +currentRgbValue[2]) / 2);
        blueValue = Math.floor((+targetRgbValue[3] + +currentRgbValue[3]) / 2);
        /* FOR HEX VALUE ONLY (failed code but might be useful in the future)
        redValue = parseInt(pixel.target.style.backgroundColor.slice(1,3),16);
        greenValue = parseInt(pixel.target.style.backgroundColor.slice(3,5),16);
        blueValue = parseInt(pixel.target.style.backgroundColor.slice(5,7),16);
        */
        pixel.target.style.backgroundColor = `rgb(${redValue},${greenValue},${blueValue})`;
    }
    else if (eraser === true) {
        pixel.target.style.backgroundColor = fillColor;
    }
    else if (normalPen === true) {
        pixel.target.style.backgroundColor = currentColor.backgroundColor;
    }
    else if(colorPicker === true) {
        colorSelected.style.backgroundColor = targetPixel.backgroundColor;
        toggleTool("normalPen");
    }
    else {
        alert("ERROR! How could this be?");
    }
}

function fillCanvas() {
    const currentColor = getComputedStyle(colorSelected);
    let response = confirm("Warning: This will fill all of the canvas. Continue?");
    if(response){
        canvasPixel.forEach((pixel) => {
            pixel.style.backgroundColor = currentColor.backgroundColor;
            fillColor = currentColor.backgroundColor;
        });
    }
}

function eraseCanvas() {
    let response = confirm("Are you sure you want to delete the current drawing?");
    if(response){
        canvasPixel.forEach((pixel) => {
            pixel.style.backgroundColor = "white"
        });
    }
}
function handlePointerOver(event) {
    colorCanvas(event);
}

function handlePointerDown(event) {
    canvasPixel.forEach((pixel) => {
        pixel.addEventListener('pointerover', handlePointerOver);
    })
    event.target.removeEventListener('pointerup',(e) => {handlePointerUp(e)});
}

function handlePointerUp(event) {
    event.target.classList.remove('scroll-button-active');
}

function toggleGrid() {
    gridActive = !gridActive;
    if (gridActive === true) {
        gridButton.classList.add('active-button');
        canvasPixel.forEach((pixel) => {
            pixel.style.boxShadow = "0px 0px 0px 1px #bdbdbd";
        })
    }
    else {
        gridButton.classList.remove('active-button');
        canvasPixel.forEach((pixel) => {
            pixel.style.boxShadow = "none";
        })
    }
}

function toggleTool(tool) {
    normalPen = false;
    rainbowPen = false;
    opacityPen = false;
    eraser = false;
    colorPicker = false;
    if (tool === "normalPen") {
        normalPen = true;
        penButton.classList.add('active-button');
    }
    else if (tool === "rainbowPen") {
        rainbowPen = true;
        rainbowPenButton.classList.add('active-button');
    }
    else if (tool === "opacityPen") { 
        opacityPen = true 
        opacityPenButton.classList.add('active-button');
    }
    else if (tool === "colorPicker") {
        colorPicker = true;
        colorPickerButton.classList.add('active-button');
    }
    else { 
        eraser = true;
        eraseButton.classList.add('active-button');
    }
    if(normalPen===false)
    {
        penButton.classList.remove('active-button');
    }
    if(rainbowPen===false)
    {
        rainbowPenButton.classList.remove('active-button');
    }
    if(opacityPen===false)
    {
        opacityPenButton.classList.remove('active-button');
    }
    if(colorPicker===false)
    {
        colorPickerButton.classList.remove('active-button');
    }
    if(eraser===false)
    {
        eraseButton.classList.remove('active-button');
    }
}

function modifySizeByOne(event,action) {
    event.target.classList.add('scroll-button-active');

    if(action==="add")
    {
        slider.value++;
    }
    else
    {
        slider.value--;
    }
    createCanvas(slider.value,true);
    
    event.target.addEventListener('pointerup',(e) => {handlePointerUp(e)},{once:true});
}

createCanvas(32,true);

penButton.addEventListener('click', () => {toggleTool("normalPen")});
colorPickerButton.addEventListener('click', () => {toggleTool("colorPicker")});
opacityPenButton.addEventListener('click', () => {toggleTool("opacityPen")});
rainbowPenButton.addEventListener('click', () => {toggleTool("rainbowPen")});
fillButton.addEventListener('click', () => {fillCanvas()});
gridButton.addEventListener('click', () => {toggleGrid()});
eraseButton.addEventListener('click', () => {toggleTool("eraser")});
clearButton.addEventListener('click', () => {eraseCanvas()});
scrollBarIncrease.addEventListener('pointerdown', (e) => {modifySizeByOne(e,"add")});
scrollBarDecrease.addEventListener('pointerdown', (e) => {modifySizeByOne(e,"subtract")});
slider.addEventListener('change', () => {createCanvas(slider.value)});
colorPalette.forEach((color) => {
    color.addEventListener('click', (colorTarget) => {
        const clickedColor = getComputedStyle(colorTarget.target);
        const newColor = clickedColor.backgroundColor;
        colorSelected.style.backgroundColor = newColor;
    })
});

//NOTHING GOING ON HERE KEEP MOVING :) seriously... >:(

document.querySelector('img[alt="exit-button"]').onclick = function () {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
};

//ok im sorry lol