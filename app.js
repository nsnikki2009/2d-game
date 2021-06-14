const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffSettop = 30;
var brickOffSetLeft = 30;
var score = 0;
  var brick = [];
for(var c=0; c<brickColumnCount; c++){
    brick[c] = [];
  for(var r=0; r<brickRowCount; r++){
    brick[c][r] = {x:0, y:0 , status: 1};
  }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}
function mouseMoveHandler(e){
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX>0 && relativeX<canvas.width){
    paddleX = relativeX - paddleWidth/2;
  }
}
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
  ctx.fillStyle = "orangered";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "orangered";
  ctx.fill();
  ctx.closePath();
}
function drawBrick() {
  for(var c=0; c<brickColumnCount; c++){
    for(var r=0; r<brickRowCount; r++){
      if(brick [c][r].status == 1){
      var brickX = (c*(brickWidth+brickPadding))+brickOffSetLeft;
      var brickY = (r*(brickHeight+brickPadding))+brickOffSettop;
      brick[c][r].x = brickX;
      brick[c][r].y = brickY;
      ctx.beginPath();
      ctx.rect(0, 0, brickWidth, brickHeight);
      ctx.fillStyle = "orangered";
      ctx.fill();
      ctx.closePath();
      }
    }
  }
}
function drawScore(){
  ctx.font = "16px Arial"
  ctx.fillStyle
}
function collisionDetection(){
  for(var c=0; c<brickColumnCount; c++){
    for(var r=0; r<brickRowCount; r++){
      var b = brick[c][r];
      if(b.status == 1){
      if(x>b.x && x<b.x + brickWidth && y>b.y && y<b.y + brickHeight){
          dy = -dy;
          b.status = 0;
        }
      }
    }
  } 
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBrick();
  drawBall();
  drawPaddle();
  collisionDetection();
  x += dx;
  y += dy;
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      alert("Game Over");
      document.location.reload();
      clearInterval(interval);
    }
  }
  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX + paddleWidth < 0) {
      paddleX = 0;
    }
  }
}
var interval = setInterval(draw, 10);