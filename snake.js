

//board
var blockSize = 25;
var rows =20;
var columns = 20;
var board;
var context;

//Head of snake

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX =0;
var velocityY =0;

//Body of snake

var snakeBody = [];

//win condition

var gameLose = false;

//Score

var score = 0;



window.onload = function() {
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = columns * blockSize;
    context = board.getContext('2d'); // Used for drawing on board

    placeFood();
    document.addEventListener('keydown', changeDirection);
    //update();
    setInterval(update, 1000/10); // 100 milliseconds
}

function update() {

    if(gameLose) {
       return;
    }
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height); // Clear board


    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize); // Draw food

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX,foodY]);
        placeFood();
        score++;
    }

    for(let i =snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }
    
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillStyle = "lime";
    context.fillRect(snakeX, snakeY, blockSize, blockSize); // Draw snake
    for(let i=0; i < snakeBody.length; i++)
    {
        context.fillRect(snakeBody[i][0],snakeBody[i][1], blockSize, blockSize);
    }
    //Display Score
    context.fillStyle = "red"; 
    context.font = "20px sans-serif";
    context.fillText("Score: " + score, 5, board.height - 20);


    //Collision with walls
    if(snakeX < 0 || snakeX > columns * blockSize || snakeY < 0 || snakeY > rows * blockSize){
        gameLose = true;
        alert("Game Over!");
    }
    //Collision with Snake

    for(let i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){    
            gameLose = true;
            alert("Game Over!");    
        }
    }

}

function changeDirection(e) {
    if(e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft" && velocityX !=1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == "ArrowRight" && velocityX !=-1){
        velocityX = 1;
        velocityY = 0;
    }
}


//Random Food Placement

function placeFood(){
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;

}
