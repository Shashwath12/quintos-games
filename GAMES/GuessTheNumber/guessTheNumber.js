async function start() {
	// your code goes here!
	let num = round(random(1, 100));

	let guess = 0;

	while (guess != num) {
		guess = await prompt('Guess num from 1-100:');
		if (guess == num) {
			await alert(guess + ' is correct');
		} else if (guess < num) {
			await alert(guess + ' is too low');
		} else if (guess > num) {
			await alert(guess + ' is too high');
		}
	}
	exit();
}
