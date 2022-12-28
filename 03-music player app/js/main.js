// VARIABLES
const music = document.querySelector("#audio");
const seekBar = document.querySelector(".seek-bar");
const songName = document.querySelector(".music-name");
const artistName = document.querySelector(".artist-name");
const disk = document.querySelector(".disk");
const currentTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".song-duration");
const playBtn = document.querySelector(".play-btn");
const forwardBtn = document.querySelector(".forward-btn");
const backwardBtn = document.querySelector(".backward-btn");
const shuffleBtn = document.querySelector(".shuffle-btn");
const repeatBtn = document.querySelector(".repeat-btn");
const audioLevel = document.querySelector(".audio-level");
const audioMark = document.querySelector(".audio-mark");
const audioBar = document.querySelector(".audio-bar");
let currentMusic = 0;
let log = console.log;
let temp;
let volume = 0.7;
let audioBarV = 0.7;
// FUNCTIONS
const playBtnFun = () => {
	if (playBtn.className.includes("pause")) {
		music.play();
	} else {
		music.pause();
	}
	playBtn.classList.toggle("pause");
	disk.classList.toggle("play");
};

const setMusic = (i) => {
	audioBar.value = audioBarV;
	music.volume = volume;
	seekBar.value = 0; // set range slide value to 0;
	let song = songs[i];
	currentMusic = i;
	music.src = song.path;

	songName.innerHTML = song.name;
	artistName.innerHTML = song.artist;
	disk.style.backgroundImage = `url("${song.cover}")`;

	currentTime.innerHTML = "00:00";
	setTimeout(() => {
		seekBar.max = music.duration;
		musicDuration.innerHTML = formatTime(music.duration);
	}, 300);
};

// Formatting time in min and secondes
const formatTime = (time) => {
	let min = Math.floor(time / 60);
	if (min < 10) {
		min = `0${min}`;
	}
	let sec = Math.floor(time % 60);
	if (sec < 10) {
		sec = `0${sec}`;
	}
	return `${min} : ${sec}`;
};

const playMusic = () => {
	music.play();
	playBtn.classList.remove("pause");
	disk.classList.add("play");
};

setInterval(() => {
	// seek bar
	seekBar.value = music.currentTime;
	currentTime.innerHTML = formatTime(music.currentTime);
	if (music.currentTime === music.duration) {
		if (repeatBtn.classList.contains("active")) {
			seekBar.value = 0;
			currentTime.innerHTML = "00: 00";
			playMusic();
		} else {
			forwardBtnFun();
		}
	}
}, 500);

const seekBarFun = () => {
	music.currentTime = seekBar.value;
};

const forwardBtnFun = () => {
	if (currentMusic >= songs.length - 1) {
		currentMusic = 0;
	} else {
		if (shuffleBtn.classList.contains("active")) {
			temp = Math.floor(Math.random() * songs.length);

			if (temp === currentMusic) {
				currentMusic = temp + 1;
				log("i work");
			} else {
				currentMusic = temp;
				log("i didn't work");
			}
		} else {
			currentMusic++;
		}
	}
	setMusic(currentMusic);
	playMusic();
};
const backwardBtnFun = () => {
	if (currentMusic <= 0) {
		currentMusic = songs.length - 1;
	} else {
		if (shuffleBtn.classList.contains("active")) {
			currentMusic = Math.floor(Math.random() * songs.length);
			log(currentMusic);
		} else {
			currentMusic--;
		}
	}
	setMusic(currentMusic);
	playMusic();
};
const changeAudio = () => {
	audioBarV = audioBar.value;
	volume = +audioBar.value;
	music.volume = volume;
	log(volume);
	volume == 0
		? (audioMark.className = "audio-mark fa-solid fa-volume-xmark")
		: volume < 0.4
		? (audioMark.className = "audio-mark fa-solid fa-volume-low")
		: (audioMark.className = "audio-mark fa-solid fa-volume-high");
};

// EVENTS
playBtn.addEventListener("click", playBtnFun);
seekBar.addEventListener("click", seekBarFun);
forwardBtn.addEventListener("click", forwardBtnFun);
backwardBtn.addEventListener("click", backwardBtnFun);
shuffleBtn.onclick = () => {
	shuffleBtn.classList.toggle("active");
};
repeatBtn.onclick = () => {
	repeatBtn.classList.toggle("active");
};
audioBar.addEventListener("change", changeAudio);
window.addEventListener("beforeload", setMusic(0));
setMusic(0);
