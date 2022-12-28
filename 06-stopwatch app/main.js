// Global Variables
const timeEle = document.querySelector(".watch .time"),
	startBtn = document.getElementById("start"),
	stopBtn = document.getElementById("stop"),
	resetBtn = document.getElementById("reset");

let seconds = 0,
	interval = null;

let log = console.log;
// FUNCTIONS
// Update the timer
const timer = () => {
	seconds++;

	// formant our time
	let hrs = Math.floor(seconds / 3600);
	let mins = Math.floor((seconds - hrs * 3600) / 60);
	let secs = seconds % 60;

	if (secs < 10) secs = "0" + secs;
	if (mins < 10) mins = "0" + mins;
	if (hrs < 10) hrs = "0" + hrs;

	timeEle.innerText = `${hrs}:${mins}:${secs}`;
};

const start = () => {
	if (interval) {
		return;
	}
	interval = setInterval(timer, 1000);
};

const stop = () => {
	clearInterval(interval);

	interval = null;
};
const reset = () => {
	stop();
	seconds = 0;
	timeEle.innerText = "00:00:00";
};

// Events + run
startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);
