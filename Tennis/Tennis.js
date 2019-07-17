/*x/framesPerSecond lower number = higher speed*/

console.log ("Hello from Javascript!!")


var canvas;
var canvasContext;
var ballX = 10;
var ballSpeedX = 5;
var ballY = 10;
var ballSpeedY = 5;
var paddle1Y = 250;
var paddle2Y = 250;
const PaddleHeight = 100;
const PaddleWidth = 10;
var player1Score = 0;
var player2Score =0;
const winningScore = 5;
var showWinScreen = false;

function calculateMousePos(evt)
{
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return{
		x:mouseX,
		y:mouseY
	};
}

function handleMouseClicked(evt)
{
	if (showWinScreen)
	{
		player1Score = 0;
		player2Score = 0;
		showWinScreen = false;
	}
}

window.onload = function()
{
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 60;
	setInterval(callEverything, 2000/framesPerSecond);

	canvas.addEventListener('mousedown', handleMouseClicked);

	canvas.addEventListener('mousemove',
	function(evt)
	{
		var mousePos = calculateMousePos(evt);
		paddle1Y = mousePos.y-(PaddleHeight/2);
	});
	
}

function callEverything()
{
	moveEverything();
	drawEverything();
}

function ballReset()
{
	if (player1Score >= winningScore || player2Score >=winningScore)
	{
		
		showWinScreen = true;
	}
	ballSpeedX = -ballSpeedX;
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}

function computerMovement()
{
	var paddle2YCenter = paddle2Y + (PaddleHeight/2);
	if (paddle2YCenter < ballY)
	{
		paddle2Y += 10;
	}
	else if(paddle2YCenter > ballY+35)
	{
		paddle2Y -= 10;
	}
}

function moveEverything()
{
	if (showWinScreen)
	{
		return;
	}

computerMovement();

	ballX += ballSpeedX;
	ballY += ballSpeedY;
	if (ballX < 0)
	{
		if(ballY > paddle1Y &&
			ballY < paddle1Y+PaddleHeight){
			ballSpeedX = -ballSpeedX;

			var deltaY = ballY-(paddle1Y+PaddleHeight);
			ballSpeedY = deltaY * 0.85;

		}else{
			player2Score++;
			ballReset();
		}	
	}


	if (ballX > canvas.width)
	{
		if(ballY > paddle2Y &&
			ballY < paddle2Y+PaddleHeight){
			ballSpeedX = -ballSpeedX;

		var deltaY = ballY-(paddle2Y+PaddleHeight);
			ballSpeedY = deltaY * 0.35;

		}else{
			player1Score++;
			ballReset();
		}	
	}

	if (ballY < 0)
	{
		ballSpeedY = -ballSpeedY;
	}
	
	if (ballY > canvas.height)
	{
		ballSpeedY = -ballSpeedY;
	}
}
function drawEverything()
{

	/*Draws the background*/
	colorRect(0,0,canvas.width, canvas.height,'black');

	if (showWinScreen)
	{
		canvasContext.fillStyle = 'white';

		if (player1Score >= winningScore)
		{
			canvasContext.fillText('CONGRATS!!!YOU WIN!!!!!',350,200);
		}
		else if (player2Score >=winningScore)
		{
			canvasContext.fillText('Better luck next time! Keep Practicing.',350,200);
		}
		
		canvasContext.fillText('Click to continue!', 100, 100);
		return;
	}

	/*Draws the left paddle*/
	colorRect(0,paddle1Y,PaddleWidth,PaddleHeight,'white');

	/*Draws the right paddle*/
	colorRect(canvas.width-PaddleWidth,paddle2Y,PaddleWidth,PaddleHeight,'white');

	colorCircle(ballX, ballY, 10, 'white');

	canvasContext.fillText(player1Score, 100, 100);
	canvasContext.fillText(player2Score,canvas.width-100, 100);



	function colorCircle(centerX, centerY, radius, drawColor)
	{
		/*Draws the ball*/
		canvasContext.fillStyle = 'white';
		canvasContext.beginPath();
		canvasContext.arc(centerX,centerY,radius,0,Math.PI*2, true);
		canvasContext.fill();
	}

}

function colorRect(leftX,topY,width,height,drawColor)
{
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX,topY,width,height);
}