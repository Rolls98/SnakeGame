//Creation du canvas
const cvs = document.getElementById("cvs");
const ctx = cvs.getContext("2d");
const p = document.querySelector("div p");

//initialisation de la box qui va permet le format du serpent
const box = 32;

//initialisation des audios
let eat = new Audio("audio/eat.mp3");
let dead = new Audio("audio/dead.mp3");
let left = new Audio("audio/left.mp3");
let right = new Audio("audio/right.mp3");
let up = new Audio("audio/up.mp3");
let down = new Audio("audio/down.mp3")

//Controle de la rapidité
let ts = 100;


//creation du serpent et son initialisation
let snake = [];
	snake[0]={
		x:9*box,
		y:10*box
	};

//creation de la nourriture du serpent
let food = {
	x:Math.floor(Math.random()*17+1)*box,
	y:Math.floor(Math.random()*15+3)*box
};

//creation des images
const ground = new Image();
	ground.src = "img/ground.png";
const foodImg = new Image();
	foodImg.src = "img/food.png";


//la direction
let d="";
let replay = false;

//Score of game
let score = 0;

document.addEventListener("keydown",direction); //ce code est l'ecoute de la direction

function direction(e){
	if(e.keyCode == 37 && d!="RIGHT")
	{
		d="LEFT";
		left.play();
	}else if(e.keyCode == 38 && d!="DOWN")
	{
		d="UP";
		up.play();
	}else if(e.keyCode == 39 && d!="LEFT")
	{
		d="RIGHT";
		right.play();
	}else if(e.keyCode == 40 && d!="UP")
	{
		d="DOWN";
		down.play();
	}else if(e.key == "r")
	{
		if(replay)
			window.location.reload();
	}
}

function collision(head,array){
	for(let i =0;i<array.length;i++)
	{
		if(head.x == array[i].x && head.y == array[i].y)
		{
			return true;
		}
	}
	return false;
}

function draw(){
	ctx.drawImage(ground,0,0);//Ajout du fond d'image;

	for(var i=0;i<snake.length;i++)
	{
		ctx.fillStyle = (i==0)? "red":"white"; //la tete du serpent est red lorsque i=0, blanche sinon
		ctx.fillRect(snake[i].x,snake[i].y,box,box);
		ctx.strokeStyle = "black";
		ctx.strokeRect(snake[i].x,snake[i].y,box,box);
	}

	ctx.drawImage(foodImg,food.x,food.y);//Ajout de la nourriture;

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	


	if(d == "LEFT") 
		snakeX -=box;
	if(d == "RIGHT") 
		snakeX +=box;
	if(d == "UP") 
		snakeY -=box;
	if(d == "DOWN") 
		snakeY +=box;

	let newHead = {
		x:snakeX,
		y:snakeY
	}
	


	if(newHead.x == food.x && newHead.y == food.y)
	{
		score++;
		eat.play();
		food = {
			x:Math.floor(Math.random()*17+1)*box,
			y:Math.floor(Math.random()*15+3)*box
		};

	}
	else
		snake.pop();

	if(snakeY < 3*box || snakeY > 17*box || snakeX >  17*box || snakeX < 1 || collision(newHead,snake))
	{
		clearInterval(game);
		ctx.fillStyle = "red";
		ctx.font ="45px Changa one";
		ctx.fillText('Game Over',6.5*box,10*box);

		ctx.fillStyle = "white";
		ctx.font ="35px Changa one";
		ctx.fillText('Appuyez sur "r" pour reprendre',3.5*box,11*box);


		
		dead.play();
		replay = true;

	}

	snake.unshift(newHead);

	ctx.fillStyle = "white";
	ctx.font ="45px Changa one";
	ctx.fillText(score,2*box,1.6*box);


}



let game = setInterval(draw,100);