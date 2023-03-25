const gameboard = document.querySelector("#gameBord");
const ctx = gameboard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameboard.width;
const gameHeight = gameboard.height;
const boardBackground = "blueviolet";
const paddle1Color = "rgb(252, 150, 251)";
const paddle2Color = "red";
const paddleBorder = "black";
const ballColor = "yellow";
const ballBorderColor = "black";
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalID;
let ballSpeed = 1;
let ballX = gameWidth/2;
let ballY = gameHeight/2;
let ballXDirection = 0;
let ballYDirection = 0;
let Player1Score = 0;
let Player2Score = 0;
let paddle1 = {
    width:25,
    height:100,
    x:0,
    y:0
};
let paddle2 = {
    width:25,
    height:100,
    x:gameWidth-25,
    y:0
};
window.addEventListener('keydown', changeDirection);
resetBtn.addEventListener('click', resetGame);
gameStart();

function gameStart(){
    createBall();
    nextTick();
};
function nextTick(){
    intervalID = setTimeout(()=>{    // repeat tis rutine every 10milisecond
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX,ballY);
        checkCollision();
        nextTick();
    },10);
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0,0,gameWidth,gameHeight);
};
function drawPaddles(){
    ctx.strokeStyle = paddleBorder;

    ctx.fillStyle = paddle1Color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
     
    ctx.fillStyle = paddle2Color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
};

function createBall(){
    ballSpeed = 1;
    if(Math.round(Math.random())==1){   // this contdition will give us random number, 0 and 1
         ballXDirection = 1;
    }
    else{
        ballXDirection = -1;
    }
    if(Math.round(Math.random())==1){   // this contdition will give us random number, 0 and 1
        ballYDirection = 1;
   }
   else{
       ballYDirection = -1;
   }
   ballX = gameWidth / 2;
   ballY = gameHeight / 2;
   drawBall(ballX,ballY);
};
function moveBall(){
    ballX += (ballSpeed * ballXDirection);
    ballY += (ballSpeed * ballYDirection);
};
function drawBall(ballX,ballY){
    ctx.fillStyle = ballColor;
    ctx.strokeStyle = ballBorderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX,ballY,ballRadius,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();
};
function checkCollision(){
    if(ballY <= 0+ballRadius){  // ball radius is where we pace x and y coordinates so thats why we adding the ball radius
     ballYDirection *= -1;
    }   
    if(ballY >= gameHeight-ballRadius){    // if ball hiting thr wall then it will change direction
        ballYDirection *= -1;    
    } 
    if(ballX <= 0){
        Player2Score += 1;      // increase player2 score 
        updateScore();
        createBall();
        return;
    }
    if(ballX >= gameWidth){
        Player1Score += 1;        // increase player1 score
        updateScore();
        createBall();
        return;
    }
    if(ballX <= (paddle1.x + paddle1.width + ballRadius)){
        if(ballY > paddle1.y && ballY < paddle1.y + paddle1.height){    // this mean this is acollision on paddele1 and bounce the ball
            ballX = (paddle1.x+paddle1.width) + ballRadius;  // if ball get stuck on corner
            ballXDirection *= -1;       // change direction
            ballSpeed += 0.4;       // increase ball speed
        }
    }
    if(ballX >= (paddle2.x - ballRadius)){
        if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height){    // this mean this is acollision on paddele2 and bounce the ball
            ballX = paddle2.x - ballRadius;  // if ball get stuck on corner
            ballXDirection *= -1;       // change direction
            ballSpeed += 0.4;       // increase ball speed
        }
    }
};
function changeDirection(event){
    const keyPress = event.keyCode;
    const paddle1Up = 87;
    const paddle1Down = 83;
    const paddle2Up = 87;//38;
    const paddle2Down = 83;// 40;
 switch(keyPress){
case(paddle1Up && paddle2Up):
if(paddle1.y>0 &&paddle2.y>0){
    paddle1.y -= paddleSpeed;
    paddle2.y -= paddleSpeed;
}
    break;
case(paddle1Down && paddle2Down):
if(paddle1.y< gameHeight-paddle1.height){
    paddle1.y += paddleSpeed;
    paddle2.y += paddleSpeed;
}
    break;
//  case(paddle2Up):
// if(paddle2.y>0){
//     paddle2.y -= paddleSpeed;
// }
//     break;
// case(paddle2Down):
// if(paddle2.y< gameHeight-paddle2.height){
//     paddle2.y += paddleSpeed;
// }
//     break;
 }
};
function updateScore(){
    scoreText.textContent = `${Player1Score} : ${Player2Score}`;
};
function resetGame(){           // reset score for both players 
    Player1Score = 0;
    Player2Score = 0;
     paddle1 = {            // reset the paddel1 
        width:25,
        height:100,    
        x:0,            // set them there original position
        y:0
    };
     paddle2 = {              // reset the paddel2
        width:25,
        height:100,
        x:gameWidth-25,             // set them there original position
        y:0
    };
    ballSpeed = 1;
    ballX = 0;
    ballY = 0;
    ballXDirection = 0;
    ballYDirection = 0;
    updateScore();
    clearInterval(intervalID);
    gameStart();

};

