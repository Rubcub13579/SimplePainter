
const myCanvas = document.getElementById("myCanvas").getContext("2d");



const marginY = 53;
function paint(event) {
    if (event.buttons === 1) { // 1 = left button
        myCanvas.lineTo(event.clientX , event.clientY - marginY); // mouse x, mouse y
        myCanvas.stroke(); // Do it
    }
}

function mark() {
    myCanvas.beginPath();
}

function penSize(size) {
    myCanvas.lineWidth = size;
}

function color(color) {
    myCanvas.strokeStyle = color;
}

function erase() {
    myCanvas.beginPath();
    myCanvas.fillStyle = "white"
    myCanvas.fillRect(0, 0, 1000, 1000);
}



