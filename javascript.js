const canvas = document.querySelector("#canvas");
const colorPalette = document.querySelector("#color-palette").children;
const tools = document.querySelector("#tools").children;

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
    }
}