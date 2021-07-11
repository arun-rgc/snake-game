const reload = document.getElementById('reload')
const canvas = document.getElementById('game');


const left = document.getElementById('leftbtn');
const right = document.getElementById('rightbtn');
const up = document.getElementById('upbtn');
const down = document.getElementById('downbtn');
const reset = document.getElementById('reset');

const ctx = canvas.getContext('2d');

class SnakeParts{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let speed = 5;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;

const snakeParts = [];
let tailLength = 2;  

let appleX = 5;
let appleY = 5;
let xVelocity = 0;
let yVelocity = 0;

let score = 0;

const eat = new Audio("gulp.mp3")
const crash = new Audio("crash.mp3")


function reLoad(){
    location.reload();
}
// game loop
function drawGame (){
    changeSnakePosition();

    let result = isGameOver();
    if(result){
        return;
    }

    clearScreen();
    
    checkAppleCollision();
    drawApple();
    drawSnake();

    drawScore();

    if(score > 2 ){
        speed = 7;
    }
    if(score > 5 ){
        speed = 9;
    }
    if(score > 7 ){
        speed = 11;
    }
    if(score > 10 ){
        speed = 14;
    }

    setTimeout(drawGame, 1000/ speed);
}

function isGameOver(){
    let gameOver = false;
    if(xVelocity === 0 && yVelocity === 0){
        return false;
    }
    if(headX < 0){
        gameOver = true;
    }
    else if(headX === tileCount){
        gameOver = true;
    }
    else if(headY < 0){
        gameOver = true;
    }
    else if(headY === tileCount){
        gameOver = true;
    }

    for(let i = 0; i<snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }

    if(gameOver){
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over", canvas.width / 6.5, canvas.height / 2);
        reload.style.display = "block";
        crash.play();
    }
    return gameOver;
}

function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font ="13px Verdana";
    ctx.fillText("Score " + score, canvas.width-60, 25);
}

function clearScreen (){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake (){

    ctx.fillStyle ='rgba(58, 7, 68, 0.9)';
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakeParts(headX, headY));
    if(snakeParts.length > tailLength ){
        snakeParts.shift();
    }

    ctx.fillStyle = 'purple';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}


function drawApple (){
    ctx.fillStyle = 'rgba(255, 146, 0, 1)';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random()* tileCount);
        appleY = Math.floor(Math.random()* tileCount);
        tailLength++;
        score++;
        eat.play();
    }
}

document.body.addEventListener('keydown', keyDown);

document.body.addEventListener('click', clickKey);

function clickKey(e){
    if(e.target.id == 'reset'){
        reLoad()
    }
    // up
    if(e.target.id == 'upbtn'){
        if(yVelocity == 1)
        return;
        yVelocity = -1;
        xVelocity = 0;
    }
    // down
    if(e.target.id == 'downbtn'){
        if(yVelocity == -1)
        return;
        yVelocity = 1;
        xVelocity = 0;
    }
    // left
    if(e.target.id == 'leftbtn'){
        if(xVelocity == 1)
        return;
        yVelocity =  0;
        xVelocity = -1;
    }
    // right
    if(e.target.id == 'rightbtn'){
        if(xVelocity == -1)
        return;
        yVelocity = 0;
        xVelocity = 1;
    }
}

function keyDown(e){
    // up
    if(e.keyCode == 38){
        if(yVelocity == 1)
        return;
        yVelocity = -1;
        xVelocity = 0;
    }
    // down
    if(e.keyCode == 40){
        if(yVelocity == -1)
        return;
        yVelocity = 1;
        xVelocity = 0;
    }
    // left
    if(e.keyCode == 37){
        if(xVelocity == 1)
        return;
        yVelocity =  0;
        xVelocity = -1;
    }
    // right
    if(e.keyCode == 39){
        if(xVelocity == -1)
        return;
        yVelocity = 0;
        xVelocity = 1;
    }
}




drawGame ();
