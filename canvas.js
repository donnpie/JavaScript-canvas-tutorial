let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

//Lines
// ctx.beginPath();
// ctx.moveTo(50, 300);
// ctx.lineTo(300, 100);
// ctx.strokeStyle = '#abcabc'; //Must be before the stroke method
// ctx.stroke();

//Arcs
// ctx.beginPath();
// ctx.arc(300, 300, 30, 0, Math.PI*2, false);
// ctx.strokeStyle = '#abcabc';
// ctx.stroke();

let radius = 30;

// for (let i = 0; i < 200; i++){
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     ctx.beginPath();
//     ctx.arc(x, y, radius, 0, Math.PI*2, false);
//     ctx.strokeStyle = '#abcabc';
//     ctx.stroke();
// }

//Random doodle
// let x = Math.random() * window.innerWidth;
// let y = Math.random() * window.innerHeight;
// function animate(){
//     requestAnimationFrame(animate);
//     //ctx.clearRect(0, 0, innerWidth, innerHeight);
//     x += Math.random() * 10 - 5;
//     y += Math.random() * 10 - 5;
//     ctx.beginPath();
//     ctx.arc(x, y, radius, 0, Math.PI*2, false);
//     ctx.strokeStyle = '#abcabc';
//     ctx.stroke();
// }

let mouse = {
    x: undefined,
    y: undefined
}

const colours = [
    '#123456',
    '#acbdef',
    '#fedcba',
    '#654321',
    '#987654'
];


window.addEventListener('mousemove',
    function(event) {
        //console.log(event);
        mouse.x = event.x;
        mouse.y = event.y;
    }
)


function Circle(x, y, dx, dy, radius, colour) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.colour = colour;
    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.strokeStyle = '#abcabc';
        ctx.stroke();
        ctx.fillStyle = this.colour;
        ctx.fill();
    }
    this.update = function(){
        //this.x += this.dx;
        this.y += this.dy;
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        else {
            this.dy += 1; //This adds the illusion of gravity as it causes the ball to acccelerate on the way down.
        }

        //Interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50){
                if(this.radius < 50){
                    this.radius += 1;
                }
        } else if (this.radius >5){
            this.radius -= 1;
        }
    }
}

let circles = [];
let count = 200;
for (let i = 0; i < count; i++){
    let circle = new Circle(Math.random() * (window.innerWidth - radius *2) + radius,
    Math.random() * (window.innerHeight - radius*2) + radius, 
    3, 3, 
    Math.random()*30,
    colours[Math.floor(Math.random() * colours.length)]
    );
    circles.push(circle);
}

let dx = 3;
let dy = 3;
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circles.length; i++){
        circles[i].update();
        circles[i].draw();
    }


}


animate();






