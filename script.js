var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

var line = document.querySelector('.line');

canvas.width = innerWidth;
canvas.height = innerHeight;





var mouse = {
    x: innerWidth / 0.5,
    y: innerHeight / 0.5
};

var gravity = 0;
var friction = 0.2;


addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener("resize", function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});
addEventListener("click", function (event) {
    var xx = event.clientX - canvas.getBoundingClientRect().left;
    var yy = event.clientY - canvas.getBoundingClientRect().top;

    if (xx >=1300 && xx <= this.innerWidth && yy >= 300 && yy <= 600) {

        window.location.href = "bi.html";
    }
});
addEventListener("click", function (event) {
    var x = event.clientX;
    var y = event.clientY;
    init();
});



line.onload = function() {
    c.drawImage(line, 0, 0, canvas.width, canvas.height);
  };

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var svgImage = new Image();
svgImage.src = 'asset/Tkf.svg';

function Tkf(x, y, dx, dy, radius,image,scale, rotation) {
    this.x = x ;
    this.y = y ;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.image = image;
    this.scale = scale;
    this.rotation = rotation;

    this.isCollided = false;
    

    this.update = function () {  
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy;
            this.dy = this.dy * friction;
            this.dx = this.dx * friction;
        
        } else {
            this.dy += gravity;
        }

        if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx * friction;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };

    this.draw = function () {
        var width = this.image.width * 2 * this.scale;
        var height = this.image.height * 2 * this.scale;

        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rotation);
        c.drawImage(this.image, -width / 2 , -height / 2 , width, height);
        c.restore();
};
    }


var TkfArray = [];

const init = function () {
    TkfArray = [];
    for (let i = 0; i < 200; i++) {
        var radius = randomIntFromRange(8, 8);
        var x = randomIntFromRange(radius, canvas.width - radius);
        var y = randomIntFromRange(0, canvas.height - radius);
        var dx = randomIntFromRange(-3 , 3)
        var dy = randomIntFromRange(-2, 2)
        var scale = 0.09;
        var rotation = Math.random() * Math.PI * 2;
        TkfArray.push(new Tkf(x, y, dx, dy, radius,svgImage,scale, rotation));
    }
};

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width , canvas.height );

    for (let i = 0; i < TkfArray.length; i++) {
        TkfArray[i].update();

    }
}



init();

animate();



