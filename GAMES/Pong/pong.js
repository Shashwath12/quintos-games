// screen width is 256, height is 192

// create the sprite variables outside the setup function so you
// can use them in other functions
let ball;
let score_R = 0;
let score_L = 0;

function setup() {
	// code in this function gets run once at the start
	// of the game

	let imgBall = spriteArt(`
..wwww..
.ww..ww.
ww....ww
w......w
w......w
ww....ww
.ww..ww.
..wwww..`);

	let imgPaddle = spriteArt('.wwwwww.\nwwwwwwww\n' + 'ww....ww\n'.repeat(42) + 'wwwwwwww\n.wwwwww.');

	let imgWall = spriteArt('w'.repeat(300));

	// creates a ball in center of the screen
	ball = new Sprite(imgBall);
	ball.x = width / 2;
	ball.y = height / 2;
	ball.diameter = 8;

	paddle_L = new Sprite(imgPaddle);
	paddle_L.collider = 'kinematic';
	paddle_L.x = 30;
	paddle_L.y = 60;

	paddle_R = new Sprite(imgPaddle);
	paddle_R.collider = 'kinematic';
	paddle_R.x = 230;
	paddle_R.y = 60;

	wallTop = new Sprite();
	wallTop.y = 10;
	wallTop.image = imgWall;
	wallTop.collider = 'static';

	wallBottom = new Sprite();
	wallBottom.y = 185;
	wallBottom.image = imgWall;
	wallBottom.collider = 'static';

	ball.direction = -20;
	ball.speed = 2;
	ball.speedLimit = 2;
	ball.bounciness = 1;
	ball.friction = 0;

	text(score_L + '|' + score_R, 2, 15);
}

function draw() {
	background('b');
	// code in this function gets run 60 times per second
	/* Part A1: make the ball move */

	if (kb.pressing('w')) {
		paddle_L.vel.y = -3;
	} else if (kb.pressing('s')) {
		paddle_L.vel.y = 3;
	} else {
		paddle_L.vel.y = 0;
	}

	if (kb.pressing('a')) {
		paddle_L.rotationSpeed = -5;
	} else if (kb.pressing('d')) {
		paddle_L.rotationSpeed = 5;
	} else {
		paddle_L.rotationSpeed = 0;
	}

	if (kb.pressing('ArrowUp')) {
		paddle_R.vel.y = -3;
	} else if (kb.pressing('ArrowDown')) {
		paddle_R.vel.y = 3;
	} else {
		paddle_R.vel.y = 0;
	}

	if (kb.pressing('ArrowLeft')) {
		paddle_R.rotationSpeed = -5;
	} else if (kb.pressing('ArrowRight')) {
		paddle_R.rotationSpeed = 5;
	} else {
		paddle_R.rotationSpeed = 0;
	}

	if (ball.collides(paddle_L) || ball.collides(paddle_R)) {
		ball.speedLimit += 0.2;
		ball.speed = ball.speedLimit;
		log('before' + ball.direction);
		if (ball.direction > 70 && ball.direction < 110) {
			if (ball.direction < 90) ball.direction = 70;
			if (ball.direction >= 90) ball.direction = 110;
		}
		if (ball.direction < -70 && ball.direction > -110) {
			if (ball.direction > -90) ball.direction = -70;
			if (ball.direction <= -90) ball.direction = -110;
		}
		log('after' + ball.direction);
	}

	if (ball.x < -50) {
		score_R += 1;
		text(score_L + '|' + score_R, 2, 15);

		if (random() > 0.5) {
			ball.direction = 'downright';
		} else {
			ball.direction = 'upright';
		}
	}
	if (ball.x > 300) {
		score_L += 1;
		text(score_L + '|' + score_R, 2, 15);
		if (random() > 0.5) {
			ball.direction = 'downleft';
		} else {
			ball.direction = 'upleft';
		}
	}

	if (ball.x < -50 || ball.x > 300) {
		ball.x = width / 2;
		ball.y = height / 2;
		ball.speedLimit = 2;
		ball.speed = ball.speedLimit;
	}
}
