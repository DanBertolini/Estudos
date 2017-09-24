$(document).ready(function () {
    colors();
    gradient();
    repeat();
    pattern();
    lineDrawing();
    circularDrawing();
    text();
    imageDraw();
});
function colors() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.fillStyle = "#FF0000";
    ctx.strokeStyle = "#FF0000";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "green";
    ctx.fillRect(10, 50, 100, 200);
    ctx.strokeRect(120, 50, 100, 200);

    ctx.lineWidth = 5;
    ctx.lineJoin = 'bevel';
    ctx.fillStyle = "#00FF00";
    ctx.strokeStyle = "#00FF00";
    ctx.shadowBlur = 30;
    ctx.shadowColor = "blue";
    ctx.fillRect(230, 50, 100, 200);
    ctx.strokeRect(340, 50, 100, 200);

    ctx.lineWidth = 5;
    ctx.lineJoin = 'miter';
    ctx.fillStyle = "#0000FF";
    ctx.strokeStyle = "#0000FF";
    ctx.shadowBlur = 40;
    ctx.shadowColor = "red";
    ctx.fillRect(455, 50, 100, 200);
    ctx.shadowBlur = 10;
    ctx.shadowColor = "black";
    ctx.shadowOffsetX = 20;
    ctx.shadowOffsetY = 20;
    ctx.strokeRect(565, 50, 100, 200);
}

function gradient() {
    var canvas = document.getElementById('myCanvas2');
    var ctx = canvas.getContext('2d');

    var gradiente = ctx.createLinearGradient(10, 50, 0, 200);
    gradiente.addColorStop(0, "black");
    gradiente.addColorStop(1, "white");
    ctx.fillStyle = gradiente;
    ctx.strokeStyle = gradiente;
    ctx.fillRect(10, 50, 100, 200);
    ctx.strokeRect(120, 50, 100, 200);
    ctx.save();

    var gradiente2 = ctx.createLinearGradient(230, 50, 0, 200);
    gradiente2.addColorStop(0, "red");
    gradiente2.addColorStop(0.5, "green");
    gradiente2.addColorStop(1, "blue");
    ctx.fillStyle = gradiente2;
    ctx.strokeStyle = gradiente2;
    ctx.fillRect(230, 50, 100, 200);
    ctx.strokeRect(340, 50, 100, 200);

    var gradiente3 = ctx.createRadialGradient(555, 150, 5, 550, 150, 150);
    gradiente3.addColorStop(0, "red");
    gradiente3.addColorStop(0.25, "magenta");
    gradiente3.addColorStop(0.5, "green");
    gradiente3.addColorStop(0.75, "yellow");
    gradiente3.addColorStop(1, "blue");
    ctx.fillStyle = gradiente3;
    ctx.strokeStyle = gradiente3;
    ctx.fillRect(450, 50, 100, 200);
    ctx.strokeRect(560, 50, 100, 200);

    ctx.restore();
    ctx.fillRect(670, 50, 100, 200);
    ctx.strokeRect(780, 50, 100, 200);


}

function repeat() {
    var canvas = document.getElementById('myCanvas3')
        , ctx = canvas.getContext('2d')
        , offset = 15
        , clearOffset = 30
        , pushDownOffset = 10
        , height = 50
        , width = 100
        , count = 4
        , i = 0;
    for (i = 0; i < count; i++) {
        ctx.fillRect(i * (offset + width) + offset, offset, width, height);
        ctx.clearRect(i * (offset + width) + (clearOffset / 2) + offset,
            offset + (clearOffset / 2) + pushDownOffset,
            width - clearOffset, height - clearOffset)
        ctx.strokeRect(i * (offset + width) + offset,
            (2 * offset) + height, width, height);
    }
}

function pattern() {
    var canvas = document.getElementById('myCanvas4');
    var ctx = canvas.getContext('2d');

    var img = new Image();
    img.src = 'imgs/nipes.png';
    img.onload = function () {
        // create pattern
        var ptrn = ctx.createPattern(img, 'repeat');
        ctx.fillStyle = ptrn;
        ctx.fillRect(0, 0, 1000, 300);
    }
}

function lineDrawing() {
    var canvas = document.getElementById('myCanvas5');
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(25, 150);
    ctx.lineTo(75, 150);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "red";
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(150, 50);
    ctx.lineTo(125, 150);
    ctx.lineTo(175, 150);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "red";
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(250, 50);
    ctx.lineTo(300, 150);
    ctx.moveTo(300, 50);
    ctx.lineTo(250, 150);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(350, 50, 50, 50);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(450, 50, 50, 50);
    ctx.stroke();
    ctx.fill();
}

function circularDrawing() {
    var canvas = document.getElementById('myCanvas6');
    var ctx = canvas.getContext('2d');

    ctx.moveTo(50, 50);
    ctx.lineTo(25, 150);
    ctx.arcTo(50, 100, 75, 150, 28);
    ctx.closePath();
    ctx.fill();

    ctx.moveTo(50, 150);
    ctx.lineTo(25, 250);
    ctx.arcTo(50, 300, 75, 250, 28);
    ctx.closePath();
    ctx.fill();

    ctx.moveTo(10, 30);
    ctx.lineTo(290, 30);
    // draw the top of the arrow head
    ctx.lineTo(285, 28);
    // draw the curve of the back
    ctx.arcTo(289, 30, 285, 32, 8);
    // draw the bottom of the arrow head
    ctx.lineTo(290, 30);
    // and make it draw
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = "red"
    ctx.beginPath();
    ctx.arc(100, 75, 25, 0 * Math.PI, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = "green"
    ctx.beginPath();
    ctx.arc(200, 75, 25, 0 * Math.PI, 1.5 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = "blue"
    ctx.beginPath();
    ctx.arc(300, 75, 25, 0 * Math.PI, 1.5 * Math.PI, true);
    ctx.stroke();
    ctx.fill();

}

function text() {
    var canvas = document.getElementById('myCanvas7');
    var ctx = canvas.getContext('2d');

    ctx.strokeStyle = 'magenta';
    ctx.fillStyle = 'yellow';
    ctx.lineWidth = 2;
    ctx.font = "bold 100pt TimesNewRoman";
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(700, 100);
    ctx.stroke();
    ctx.strokeStyle = 'blue';
    ctx.fillText("Hello World", 50, 100);
    ctx.strokeText("Hello", 50, 100);
}

function imageDraw() {
    var canvas = document.getElementById('myCanvas8');
    var ctx = canvas.getContext('2d');

    var img = new Image();
    img.src = "imgs/owl.jpg";
    img.onload = function () {
        ctx.drawImage(img, 0, 0, 300, 200);
        ctx.moveTo(200, 50);
        ctx.lineTo(350, 50);
        ctx.stroke();
        ctx.lineWidth = 10;
        ctx.font = "bold 100pt TimesNewRoman";
        ctx.fillText("Owl", 360, 100);
    }
}