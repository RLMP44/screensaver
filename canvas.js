var canvas = document.querySelector("canvas");
// get browser's width and height and set canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// get context to access all functions
var ctx = canvas.getContext("2d");

// create a JavaScript Object
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = `rgba(167,231,248,.05)`;
    ctx.fill();
  }

  this.update = function() {
    // get circle to bounce horizontally
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) { // add/sub radius so circle bounces off its edge
      this.dx *= -1;
    }
    // get circle to bounce vertically
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) { // add/sub radius so circle bounces off its edge
      this.dy *= -1;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

var circleArray = [];

// create for loop to make multiple circles
for (var i = 0; i < 100; i++) {
  var radius = Math.random() * 50;
  var x = Math.random() * (innerWidth - radius * 2) + radius; // Math.random generates a random value between 0 and 1
  var y = Math.random() * (innerHeight - radius * 2) + radius;
  var dx = ((Math.random() - 0.5) * 0.60);  // dx is standard for "velocity"
  var dy = ((Math.random() - 0.5) * 0.60);  // -0.5 to make sure we get either a pos or neg num
  circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate () {
  requestAnimationFrame(animate); // takes another function as an argument
  // clear canvas before each render
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
