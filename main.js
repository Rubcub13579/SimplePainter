
const myCanvas = document.getElementById("myCanvas").getContext("2d");
const canvasRect = document.getElementById("myCanvas").getBoundingClientRect();


const marginY = 53;
function paint(event) {
    if (event.buttons !== 1) return 
        { // 1 = left button
        myCanvas.lineTo(event.clientX - canvasRect.left, event.clientY - canvasRect.top);  // mouse x, mouse y
        myCanvas.stroke(); // Do it
    }
}

function mark() {
    myCanvas.beginPath();
}

function penSize(width) {
    myCanvas.lineWidth = width;
}

function color(color) {
    myCanvas.strokeStyle = color;
}

function erase() {
    myCanvas.beginPath();
    myCanvas.fillStyle = "white"
    myCanvas.fillRect(0, 0, 1000, 1000);
}



