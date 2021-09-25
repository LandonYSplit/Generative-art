
var canvas = document.getElementById("canvas"); 
var c = canvas.getContext('2d');
var raf;
let start, previousTimeStamp;
let count = 1;
// width 1000, height 1000

const start_x = canvas.width/2;
const start_y = canvas.width/2;
const start_size = (canvas.width/2)-300;
const spacing = 30;
const rotation = 20;
const color = 255 / spacing;

function square(context) {
    context.beginPath();
    context.moveTo(start_x,start_y);
    context.lineTo(start_x+start_size,start_y);
    context.lineTo(start_x+start_size,start_y+start_size);
    context.lineTo(start_x,start_y+start_size);
}

function bezier(context, i, color_hue) {
    context.beginPath();
    let new_size = start_size;
    let pos1_x = start_x+i;
    let pos1_y = start_y;
    let pos2_x = start_x+new_size;
    let pos2_y = start_y;
    let pos3_x = start_x+new_size;
    let pos3_y = start_y+new_size;
    let pos4_x = start_x
    let pos4_y = start_y+new_size
    let control1 = Math.floor(Math.random() * new_size);
    context.moveTo(pos1_x,pos1_y);
    context.bezierCurveTo(pos1_x,pos1_y-control1,pos2_x,pos2_y-control1,pos2_x,pos2_y);
    context.bezierCurveTo(pos2_x+control1,pos2_y,pos3_x+control1,pos3_y,pos3_x,pos3_y);
    context.bezierCurveTo(pos3_x,pos3_y+control1,pos4_x,pos4_y+control1,pos4_x,pos4_y);
    context.bezierCurveTo(pos4_x-control1,pos4_y,pos1_x-control1,pos1_y,pos1_x,pos1_y);
    context.strokeStyle = `rgba(${color_hue}, ${255-color_hue}, 255, ${Math.random()})`;
    context.lineWidth = Math.floor(Math.random() * 5);
    context.stroke();
}

function rotate_around_center(rotate_angle,context){
    translate_x = start_x + (0.5 * start_size);
    translate_y = start_y + (0.5 * start_size);
    context.translate(translate_x, translate_y); // translate to rectangle center
    context.rotate((Math.PI / 180) * rotate_angle); // rotate
    context.translate(-translate_x, -translate_y); // translate back
}

function createRect(color_i, color_j, rotate_angle, tranlation_x, tranlation_y){
    c.save();
    c.fillStyle = `rgba(${color_i}, ${color_j}, 255, 0)`;
    c.translate(tranlation_x, tranlation_y);
    rotate_around_center(rotate_angle, c);
    square(c);
    c.closePath();
    c.fill();
    new_size
    c.strokeStyle = `rgba(${color_i}, ${color_j}, 255)`;
    c.stroke();
    c.restore();
}

function move(timestamp) {
    if (start === undefined)
    start = timestamp;
    const elapsed = timestamp - start;
    let color_hue = Math.min(0.1 * elapsed, 255);
    rotate_around_center(count, c);
    console.log(count);
    if(count % 2 == 0){
        bezier(c, count, color_hue);
    }

    if (elapsed < 2000) { // Stop the animation after 2 seconds
        count++
        previousTimeStamp = timestamp
        window.requestAnimationFrame(move);
    }
}

window.requestAnimationFrame(move);