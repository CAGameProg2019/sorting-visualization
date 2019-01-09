var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');

const W = 640, H = 480;
const scale = 5;

var values = [];
var i = 0, j = 0;

var running = true;

function setup() {
    canvas.width = W;
    canvas.height = H;

    for(var i = 0; i*scale < W; i++) {
        values[i] = Math.round(Math.random()*H);
    }

    // for(var i = 0; i < values.length; i++) {
    //     for(var j = 0; j < values.length-i-1; j++) {
    //         if(values[j] > values[j+1]) swap(values, j, j+1);
    //     }
    // }

    c.strokeStyle = "white";
    c.lineWidth = scale;

    update();
}

function update() {
    c.fillRect(0, 0, W, H);

    step();
    step();
    step();
    step();
    step();

    c.beginPath();
    for(var k = 0; k < values.length; k++) {
        c.moveTo((k+.5)*scale, H);
        c.lineTo((k+.5)*scale, H-values[k]);
    }
    c.stroke();

    c.fillStyle = "#ff0000";
    c.fillRect((j)*scale, H-values[j], scale, values[j]);
    c.fillStyle = "black";
    
    if(running) requestAnimationFrame(update);
    else console.log('done');
}

function swap(arr, a, b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function step() {
    if(values[j] > values[j+1]) swap(values, j, j+1);
    if(i < values.length) {
        j++;
        if(j >= values.length-i-1) {
            j = 0;
            i++;
        }
    } else {
        running = false;
    }
}