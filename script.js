//variaveis
let canvas = document.getElementById("cobrita");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let direcao = "";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
//spawn da cobra
snake [0] = {
    x: 8 * box,
    y: 8 * box
}
//gerar fundo
function backGround() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 16 * box, 16 * box);
}
//gerar cobra
function cobra() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "gray";
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}
//definir comida
function comida() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box)
}
//deteccao de teclas
document.addEventListener('keydown', update);
function update(event) {
    if (event.keyCode == 37 && direcao != "right") {    
        direcao = "left";
    }
    if (event.keyCode == 39 && direcao != "left") {    
        direcao = "right";
    }
    if (event.keyCode == 40 && direcao != "up") {    
        direcao = "down";
    }
    if (event.keyCode == 38 && direcao != "down") {    
        direcao = "up";
    }
}
//base do jogo
function start() {
    //"infinite wrapper"
    if (snake[0].x > 15 * box && direcao == "right") {
        snake[0].x = 0;        
    }
    if (snake[0].x < 0 && direcao == "left") {
        snake[0].x = 15 * box;        
    }
    if (snake[0].y > 15 * box && direcao == "down") {
        snake[0].y = 0;        
    }
    if (snake[0].y < 0 && direcao == "up") {
        snake[0].y = 15 * box;        
    }
    //movimentacao
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (direcao == "right") {
        snakeX += box;        
    }
    if (direcao == "left") {
        snakeX -= box;        
    }
    if (direcao == "up") {
        snakeY -= box;       
    }
    if (direcao == "down") {
        snakeY += box;        
    }
    //geracao de comida
    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    }
    else {
        food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }
    //geracao da cabeca
    let cabeca = {
        x: snakeX,
        y: snakeY
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            if(confirm('Game Over. Clique em "OK" para tentar novamente')){
                window.location.reload();  
            }
        }
        
    }
    snake.unshift(cabeca);
    //render de objetos
    backGround();
    cobra();
    comida()
}
let jogo = setInterval(start, 250);