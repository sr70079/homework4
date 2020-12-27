// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
var currentQuestionAnswers = [];

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var questionTitleEl = document.getElementById("question-title");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var startScreenEl = document.getElementById("start-screen");
var endScreenEl = document.getElementById("end-screen");
var finalScoreEl = document.getElementById("final-score");
// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");
// local storage
var localStorage = window.localStorage;

function startQuiz() {
  // hide start screen
  startScreenEl.classList.add("hide");
  // un-hide questions section
  questionsEl.classList.remove("hide");
  // start timer
  timerid = setInterval(clockTick, 1000)
  // show startintextContent = time;

  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  questionTitleEl.innerHTML = questions[currentQuestionIndex].title;
  // clear out any old question choices
  choicesEl.innerHTML = "";
  // loop over choices
  currentQuestion.choices.forEach(function(choice, i) {
    // create new button for each choice
    choicesEl.innerHTML = choicesEl.innerHTML + 
    '<button onclick="questionClick(\'' + choice + '\')" class="button" value="'+ choice +'">'+ choice +'</button>'
    // attach click event listener to each choice

    // display on the page
  });
}

function questionClick(answer) {
  // check if user guessed wrong
  if (answer !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    // display new time on page
    timerEl.textContent = time;
    // play "wrong" sound effect
    sfxWrong.play();
    feedbackEl.textContent = "Wrong!";
  } else {
    // play "right" sound effect
    sfxRight.play();
    feedbackEl.textContent = "Correct!";
  }

  // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // move to next question
  currentQuestionIndex++;
  // check if we've run out of questions
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerid);
  // show end screen
  endScreenEl.classList.remove("hide");
  // show final score
  finalScoreEl.innerHTML = time;
  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value;
  // make sure value wasn't empty
  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highScores = JSON.parse(localStorage.getItem('highscores')) ?? [];
    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    highScores.push(newScore);
    localStorage.setItem('highscores', JSON.stringify(highScores));
    // redirect to next page
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.addEventListener("click", saveHighscore);

// user clicks button to start quiz
startBtn.addEventListener("click", startQuiz);

initialsEl.addEventListener("onkeyup", checkForEnter);
