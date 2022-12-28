// Select Elements
const countSpan = document.querySelector(".count span"),
	bullets = document.querySelector(".bullets"),
	bulletsSpanContainer = document.querySelector(".bullets .spans"),
	quizArea = document.querySelector(".quiz-area"),
	answersArea = document.querySelector(".answers-area"),
	submitButton = document.querySelector(".submit-button"),
	startButton = document.querySelector(".start-button"),
	resultsContainer = document.querySelector(".results"),
	countdownElement = document.querySelector(".countdown");

// Set Options
let currentIndex = 0,
	rightAnswers = 0,
	countdownInterval;
let log = console.log;
log(startButton);
//FUNCTIONS
const getQuestions = () => {
	submitButton.classList.toggle("hide");
	let myRequest = new XMLHttpRequest();

	myRequest.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			let questionsObject = JSON.parse(this.responseText);
			let qCount = questionsObject.length;

			// create bullets + set Questions count
			createBullets(qCount);

			// add Questions Data
			addQuestionData(questionsObject[currentIndex], qCount);

			// Start Countdown
			countdown(5, qCount);
			// Click on Submit
			submitButton.onclick = () => {
				let rightAnswer = questionsObject[currentIndex]["right_answer"];
				currentIndex++;

				//Check The Answer
				checkAnswer(rightAnswer, qCount);

				// Remove Previous Question
				quizArea.innerHTML = "";
				answersArea.innerHTML = "";

				// add Qestion Data
				addQuestionData(questionsObject[currentIndex], qCount);

				// Handle Bullets Class
				handleBullets();

				// Start Count
				clearInterval(countdownInterval);
				countdown(5, qCount);

				// Show Result
				showResults(qCount);
			};
		}
	};

	myRequest.open("GET", "html_questions.json", true);
	myRequest.send();
};
const createBullets = (num) => {
	countSpan.innerHTML = num;
	// Create spans
	for (let i = 0; i < num; i++) {
		let theBullet = document.createElement("span");
		if (i === 0) {
			theBullet.className = "on";
		}
		bulletsSpanContainer.appendChild(theBullet);
	}
};
const addQuestionData = (obj, count) => {
	if (currentIndex < count) {
		// Create H2
		let questionTitle = document.createElement("h2");
		questionTitle.appendChild(document.createTextNode(obj["title"]));
		quizArea.appendChild(questionTitle);

		// Create Answers
		for (let i = 1; i <= 4; i++) {
			let answer = document.createElement("div");
			answer.className = "answer";

			// Start Random number
			let temp = [];
			function random() {
				for (let i = 0; i < 4; i++) {
					num = Math.floor(Math.random() * 4);
					if (num != temp[0] && num != temp[1] && num != temp[2]) {
						temp.push(num);
					} 
				}
				log(temp);
			}
			random();
			let input = document.createElement("input");
			input.name = "questions";
			input.type = "radio";
			input.id = `answer_${i}`;
			input.dataset.answer = obj[`answer_${i}`];

			if (i === 1) {
				input.checked = true;
			}

			let label = document.createElement("label");
			label.htmlFor = `answer_${i}`;
			label.appendChild(document.createTextNode(obj[`answer_${i}`]));

			answer.appendChild(input);
			answer.appendChild(label);
			answersArea.appendChild(answer);
		}
	}
};
const checkAnswer = (rAnswer, count) => {
	let array = Array.from(document.getElementsByName("questions"));
	let theChoosenAnswer;

	for (let i = 0; i < array.length; i++) {
		if (array[i].checked) {
			theChoosenAnswer = array[i].dataset.answer;
		}
	}

	if (rAnswer === theChoosenAnswer) {
		rightAnswers++;
	}
};
const handleBullets = () => {
	let bulletsSpans = document.querySelectorAll(".bullets .spans span");
	// let arrayOfSpans = Array.from(bulletsSpans);

	bulletsSpans.forEach((span, index) => {
		if (currentIndex === index) {
			span.className = "on";
		}
	});
};
const showResults = (count) => {
	let theResults;
	if (currentIndex === count) {
		quizArea.remove();
		answersArea.remove();
		submitButton.remove();
		bullets.remove();

		if (rightAnswers > count / 2 && rightAnswers < count) {
			theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count} .`;
		} else if (rightAnswers === count) {
			theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
		} else {
			theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${count} .`;
		}

		resultsContainer.innerHTML = theResults;
		resultsContainer.style.padding = "10px";
		resultsContainer.style.backgroundColor = "White";
		resultsContainer.style.marginTop = "10px";
	}
};
const countdown = (duration, count) => {
	if (currentIndex < count) {
		let minutes, seconds;
		countdownInterval = setInterval(function () {
			minutes = parseInt(duration / 60);
			seconds = parseInt(duration % 60);

			minutes = minutes < 10 ? `0${minutes}` : minutes;
			seconds = seconds < 10 ? `0${seconds}` : seconds;

			countdownElement.innerHTML = `${minutes}:${seconds}`;

			if (--duration < 0) {
				clearInterval(countdownInterval);
				submitButton.click();
			}
		}, 1000);
	}
};
const startQuiz = () => {
	startButton.classList.toggle("hide");
	getQuestions();
};

// EVENTS
// getQuestions();
startButton.addEventListener("click", startQuiz);
