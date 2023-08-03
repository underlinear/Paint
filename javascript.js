const canvas = document.querySelector("#canvas");
const colorPalette = Array.from(document.querySelector("#color-palette").children);
const tools = document.querySelector("#tools").children;
const colorSelected = document.querySelector("#color-selected img");

function createCanvas(dimensions) {
    for(let y = 0; y < dimensions; y++)
    {
        const row = document.createElement('div');
        row.classList.add('canvasrow');
        for(let x = 0; x < dimensions; x++)
        {
            const column = document.createElement('div');
            column.classList.add('canvascolumn');
            row.appendChild(column);
        }
        canvas.appendChild(row);
    }
}

function colorCanvas(pixel) {
    pixel.target.style.backgroundColor = colorSelected.style.backgroundColor;
    console.log(colorSelected.style.backgroundColor);
}

function handleMouseOver(event) {
    colorCanvas(event);
}

function handleMouseDown(event) {
    canvasPixel.forEach((pixel) => {
    pixel.addEventListener('mouseover',handleMouseOver);
    })
}

createCanvas(50);
const canvasPixel = Array.from(document.querySelectorAll(".canvascolumn"));
canvasPixel.forEach((pixel) => {
    pixel.addEventListener('mousedown', handleMouseDown)
});

window.addEventListener('mouseup',() => {
    canvasPixel.forEach((pixel) => {
        pixel.removeEventListener('mouseover',handleMouseOver)
        })
    }
);

// Named function for the mouseover event listener
/*
function handleMouseOver(event) {
    colorCanvas(event);
}

// Named function for the mousedown event listener
function handleMouseDown() {
    canvasPixel.forEach((pixel) => {
        pixel.addEventListener('mouseover', handleMouseOver);
    });
}

// Attach the mousedown event listener to each .canvascolumn element
canvasPixel.forEach((pixel) => {
    pixel.addEventListener('mousedown', handleMouseDown);
});

// Remove the mouseover event listener from each .canvascolumn element on window mouseup
window.addEventListener('mouseup', () => {
    canvasPixel.forEach((pixel) => {
        pixel.removeEventListener('mouseover', handleMouseOver);
    });
});
*/
//TODO: The selected color will change the background color of the #color-selected img,
//TODO: The selected color will change the background color of .canvascolumn hover effect.

colorPalette.forEach((color) => {
    color.addEventListener('click',(colorTarget) => {
        const clickedColor = getComputedStyle(colorTarget.target);
        const newColor = clickedColor.backgroundColor;
        colorSelected.style.backgroundColor = newColor;
        console.log(newColor);
    })
})

