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

createCanvas(32);
const canvasPixel = Array.from(document.querySelectorAll(".canvascolumn"));
canvasPixel.forEach((pixel) => {
    pixel.addEventListener('mouseover',(pixelHovered) => {
        pixelHovered.target.style.backgroundColor = colorSelected.style.backgroundColor;
        console.log(colorSelected.style.backgroundColor);
    })
})


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

