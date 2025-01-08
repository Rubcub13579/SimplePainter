const canvas = document.getElementById("myCanvas");
const myCanvas = canvas.getContext("2d");

// Set the initial white background
myCanvas.fillStyle = 'white';
myCanvas.fillRect(0, 0, canvas.width, canvas.height);

// Add touch support for mobile devices
canvas.addEventListener("touchstart", startTouch, false);
canvas.addEventListener("touchmove", paintTouch, false);
canvas.addEventListener("touchend", mark, false);

// Update the canvasRect dynamically to handle resizing or scrolling
function getCanvasRect() {
    return canvas.getBoundingClientRect();
}

// Paint with mouse
function paint(event) {
    if (event.buttons !== 1) return; // Only paint when the left mouse button is pressed

    const { mouseX, mouseY } = getMousePos(event);
    myCanvas.lineTo(mouseX, mouseY);
    myCanvas.stroke();
}

// Paint with touch
function paintTouch(event) {
    event.preventDefault(); // Prevent scrolling
    const touch = event.touches[0];
    const { mouseX, mouseY } = getMousePos(touch);
    myCanvas.lineTo(mouseX, mouseY);
    myCanvas.stroke();
}

// Get mouse or touch position relative to the canvas
function getMousePos(input) {
    const canvasRect = getCanvasRect();
    const style = getComputedStyle(canvas);

    const borderLeft = parseInt(style.borderLeftWidth, 10) || 0;
    const borderTop = parseInt(style.borderTopWidth, 10) || 0;

    return {
        mouseX: input.clientX - canvasRect.left - borderLeft,
        mouseY: input.clientY - canvasRect.top - borderTop
    };
}

// Clear and prepare for a new stroke
function mark() {
    myCanvas.beginPath();
}

// Clear and prepare for touch stroke
function startTouch(event) {
    const touch = event.touches[0];
    const { mouseX, mouseY } = getMousePos(touch);
    myCanvas.beginPath();
    myCanvas.moveTo(mouseX, mouseY);
}

// Set pen size
function penSize(size, button) {
    myCanvas.lineWidth = size;
    setActiveButton(button, 'thicknessContainer');
}

// Set pen color
function color(colorValue, button) {
    myCanvas.strokeStyle = colorValue;
    setActiveButton(button, 'colorContainer');
}

function setActiveButton(button, containerId) {
    const container = document.getElementById(containerId);
    Array.from(container.children).forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

// Erase the canvas
function erase() {
    let result = confirm("Are you sure you want to erase all?");
    if (result) {
        myCanvas.clearRect(0, 0, canvas.width, canvas.height);
        // Fill the canvas with white background again
        myCanvas.fillStyle = 'white';
        myCanvas.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// Resize canvas dynamically while preserving the drawing
function resizeCanvas() {
    const tempImage = myCanvas.getImageData(0, 0, canvas.width, canvas.height);
    const width = Math.min(window.innerWidth - 30, 500); // Compact width for small devices
    const height = Math.min(window.innerHeight - 150, 500); // Adjust height for compact view
    canvas.width = width;
    canvas.height = height;
    myCanvas.putImageData(tempImage, 0, 0);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Save the canvas as an image
function saveCanvas() {
    const link = document.createElement('a');
    link.download = 'simpler-painter-drawing.png';
    link.href = canvas.toDataURL();
    let sure = confirm("Do you want to save this painting as png?");
    if (sure)
        link.click();
}
