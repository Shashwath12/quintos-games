let frog, lilypads, ants;
timer = 10;
let small_jump, big_jump, water_jump;
ant_locations = [];

function preload() {
	frog = new Sprite();
	frog_ani = frog.addAni('frog_jump.png', { frameSize: [32, 16], frames: 7 });
	lilypads = new Group();
	lilypads.addAni('lilypads.png', { frameSize: [16, 16], frames: 12 });

	// 1 8 12
	small_jump = loadSound('sounds/retro_jump_bounce_01.wav');
	small_jump.setVolume(0.3);
	big_jump = loadSound('sounds/retro_jump_bounce_08.wav');
	big_jump.setVolume(0.3);
	water_jump = loadSound('sounds/retro_jump_bounce_12.wav');
	water_jump.setVolume(0.3);

	ants = new Group();
	ants.img = spriteArt(['000000000', '0.0.0.0.0', '0.0.0.0.0']);
}

function setup() {
	world.gravity.y = 10;
	noStroke();

	frog.x = 0;
	frog.y = 83;
	frog.w = 10;
	frog.h = 8;
	frog.rotationLock = true;
	frog.layer = 1;

	ants.layer = 1;
	ants.y = 83;
	ants.h = 1;

	lilypads.y = 90;
	lilypads.w = 10;
	lilypads.h = 2;
	lilypads.collider = 'static';
	lilypads.layer = 0;

	makeLilyPads();
}

function makeLilyPads() {
	/* Part A: Use a loop to make more lily pads. */
	lily_pads_made = 0;
	for (let i = 0; i < 100; i++) {
		let lily = new lilypads.Sprite();
		lily.x = 16 * i;
		rand = round(random(80, 100));
		log(rand);
		lily.ani.frameDelay = rand;
		lily_pads_made += 1;
		rand_f = round(random(0, 11));
		lily.ani.frame = rand_f;

		if (
			(lily_pads_made >= 0 && lily_pads_made % 7 == 0) ||
			(lily_pads_made > 20 && lily_pads_made % 8 == 0) ||
			(lily_pads_made > 50 && lily_pads_made % 10 == 0) ||
			(lily_pads_made > 85 && lily_pads_made % 12 == 0)
		) {
			let ant = new ants.Sprite();
			ant.x = 16 * i;
			ant_locations.push(ant.x);
		}

		rand = random();
		if (rand > 0.6) {
			i++;
		}
	}
}

async function gameOver() {
	text('Game Over', 3, 10);
	await delay(3000);
	erase();
	frog.x = 0;
	frog.y = 83;
	frog.speed = 0;
	timer = 10;
	ants.removeAll();
	for (let i = 0; i < ant_locations.length; i++) {
		let ant = new ants.Sprite();
		ant.x = ant_locations[i];
	}
	loop();
}

function draw() {
	if (frameCount % 60 == 0) {
		timer--;
		text(timer + ' ', 3, 15);
	}
	if (timer == 0) {
		gameOver();
		noLoop();
		return;
	}

	background('0');
	fill('3');
	rect(0, 0, width, 90);

	frog_ani.play();
	if (frog.y >= 83) {
		frog.ani.stop();
		frog.ani.frame = 0;
		frog.x = round(frog.x / 16) * 16;
		if (kb.presses('up')) {
			// little jump
			frog.velocity.y = -1.4;
			frog.velocity.x = 0.96;
			frog.ani.frameDelay = 3;
			small_jump.play();
		} else if (kb.presses('right')) {
			// BIG jump!
			frog.velocity.y = -2;
			frog.velocity.x = 1.35;
			big_jump.play();
		}
	}

	for (let ant of ants) {
		if (frog.overlaps(ant)) {
			timer += 2;
			text(timer + ' ', 3, 15);
			ant.remove();
		}
	}

	if (frog.y > 200) {
		water_jump.play();
		gameOver();
		noLoop();
		return;
	}

	camera.x = frog.x + 64;

	allSprites.debug = mouse.pressing();
}
