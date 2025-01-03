const canvas = document.getElementById("myCanvas");
const myCanvas = canvas.getContext("2d");

// Update the canvasRect dynamically to handle resizing or scrolling
function getCanvasRect() {
    return canvas.getBoundingClientRect();
}

// Update the paint function to dynamically fetch the canvas position
function paint(event) {
    if (event.buttons !== 1) return; // Only paint when the left mouse button is pressed

    const canvasRect = getCanvasRect();
    const style = getComputedStyle(canvas);

    const borderLeft = parseInt(style.borderLeftWidth, 10) || 0;
    const borderTop = parseInt(style.borderTopWidth, 10) || 0;

    const mouseX = event.clientX - canvasRect.left - borderLeft;
    const mouseY = event.clientY - canvasRect.top - borderTop;

    myCanvas.lineTo(mouseX, mouseY);
    myCanvas.stroke();
}


// Clear and prepare for a new stroke
function mark() {
    myCanvas.beginPath();
}

// Set pen size
function penSize(width) {
    myCanvas.lineWidth = width;
}

// Set pen color
function color(color) {
    myCanvas.strokeStyle = color;
}

// Erase the canvas
function erase() {
    myCanvas.clearRect(0, 0, canvas.width, canvas.height);
}
