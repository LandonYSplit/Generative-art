var canvas = document.getElementById("canvas"); 
var c = canvas.getContext('2d');
var step = 30;

function line(i, j, ctx) {
    var random_number = Math.floor(Math.random() * 2);
    console.log(random_number);
    var x1 = i*step
    var y1 = j*step
    var x2 = (i*step) + step
    var y2 = (j*step) + step
    var right_diagonal = [[x1,y1],[x2,y2]]
    var left_diagonal =  [[x1+step,y1],[x2-step,y2]]
    var final_line_type = random_number == 0 ? left_diagonal : right_diagonal;
    console.log(final_line_type)
    ctx.beginPath();
    ctx.moveTo(final_line_type[0][0], final_line_type[0][1]);
    ctx.lineTo(final_line_type[1][0], final_line_type[1][1]);
    ctx.stroke();
}

for(let y=0; y < 20; y++){
    for(let x=0; x < 20; x++){
        line(x, y, c);
    }
}