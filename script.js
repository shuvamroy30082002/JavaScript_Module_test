const computerScore = document.querySelector(".shuvam_scoreComp");
const playerScore = document.querySelector(".shuvam_scorePlayer");
const keys = document.querySelectorAll(".shuvam_item");
const playingZone = document.querySelector(".shuvam_playing-zone");
const resultZone = document.querySelector(".shuvam_result-zone");
const winText = document.querySelector("#shuvam_win-text");
const lostText = document.querySelector("#shuvam_lost-text");
const tieText = document.querySelector("#shuvam_tie-text");
const subText = document.querySelector(".shuvam_sub-text");
const playAgainBtn = document.querySelector(".shuvam_playBtn");
const replayBtn = document.querySelector(".shuvam_replayBtn");
const userRock = document.querySelector("#shuvam_user-rock");
const pcRock = document.querySelector("#shuvam_pc-rock");
const userPaper = document.querySelector("#shuvam_user-paper");
const pcPaper = document.querySelector("#shuvam_pc-paper");
const userScissor = document.querySelector("#shuvam_user-scissor");
const pcScissor = document.querySelector("#shuvam_pc-scissor");
const userIcon = document.querySelector(".shuvam_user-side-icon");
const pcIcon = document.querySelector(".shuvam_pc-side-icon");
const nextBtn = document.querySelector(".shuvam_nextBtn");
const rulesBtn = document.querySelector(".shuvam_rulesBtn");
const mainScreen = document.querySelector(".shuvam_main-screen");
const winnerScreen = document.querySelector(".shuvam_winner-screen");
const winnerPlayAgainBtn = document.querySelector(".shuvam_winnerPlayBtn");
const rulesDisplay = document.querySelector(".shuvam_rules");
const crossBtn = document.querySelector(".shuvam_cross");
const keysArray = Array.from(keys);

// Function to get scores from local storage
function updateScoreDisplay() {
  const scoresJSON = localStorage.getItem("scores");
  const updatedScores = scoresJSON
    ? JSON.parse(scoresJSON)
    : { user: 0, computer: 0 };
  computerScore.innerText = updatedScores.computer;
  playerScore.innerText = updatedScores.user;
}
updateScoreDisplay();

console.log(keysArray);

const valueOfKey = (name) => {
  console.log(name);
  let keyVal = 0;
  if (name === "shuvam_rock") {
    keyVal = 1;
  } else if (name === "shuvam_paper") {
    keyVal = 2;
  } else if (name === "shuvam_scissor") {
    keyVal = 3;
  }
  return keyVal;
};

const getRandomNumber = () => {
  // Generate a random decimal number between 0 (inclusive) and 1 (exclusive)
  const randomDecimal = Math.random();

  // random number between 1,2 and 3
  const randomNumber = Math.floor(randomDecimal * 3) + 1;

  return randomNumber;
};

const playRockPaperScissors = (userChoice, compChoice) => {
  if (userChoice === compChoice) {
    return "tie";
  } else if (
    (userChoice === 1 && compChoice === 3) ||
    (userChoice === 2 && compChoice === 1) ||
    (userChoice === 3 && compChoice === 2)
  ) {
    return "user";
  } else {
    return "comp";
  }
};

const updateScores = (result) => {
  // Retrieve the current scores from local storage
  const scoresJSON = localStorage.getItem("scores");
  const scores = scoresJSON ? JSON.parse(scoresJSON) : { user: 0, computer: 0 };

  // Update the scores based on the result
  if (result === "user") {
    scores.user += 1;
  } else if (result === "comp") {
    scores.computer += 1;
  }

  // Save the updated scores back to local storage
  localStorage.setItem("scores", JSON.stringify(scores));

  updateScoreDisplay();
};

const updateResultSides = (userChoice, compChoice) => {
  // setting user icon
  if (userChoice === 1) {
    userRock.style.display = "flex";
    userPaper.style.display = "none";
    userScissor.style.display = "none";
  } else if (userChoice === 2) {
    userRock.style.display = "none";
    userPaper.style.display = "flex";
    userScissor.style.display = "none";
  } else if (userChoice === 3) {
    userRock.style.display = "none";
    userPaper.style.display = "none";
    userScissor.style.display = "flex";
  }

  // setting pc icon
  if (compChoice === 1) {
    pcRock.style.display = "flex";
    pcPaper.style.display = "none";
    pcScissor.style.display = "none";
  } else if (compChoice === 2) {
    pcRock.style.display = "none";
    pcPaper.style.display = "flex";
    pcScissor.style.display = "none";
  } else if (compChoice === 3) {
    pcRock.style.display = "none";
    pcPaper.style.display = "none";
    pcScissor.style.display = "flex";
  }
};

const updateResultZone = (result, userChoice, compChoice) => {
  // make playing screen invisible and result screen visible
  playingZone.style.display = "none";
  resultZone.style.display = "flex";

  if (result === "tie") {
    winText.style.display = "none";
    lostText.style.display = "none";
    subText.style.display = "none";
    playAgainBtn.style.display = "none";
    nextBtn.style.display = "none";

    tieText.style.display = "block";
    replayBtn.style.display = "block";

    updateResultSides(userChoice, compChoice);
    userIcon.classList.remove("shuvam_green-background");
    pcIcon.classList.remove("shuvam_green-background");
  } else if (result === "user") {
    lostText.style.display = "none";
    tieText.style.display = "none";
    replayBtn.style.display = "none";

    winText.style.display = "block";
    subText.style.display = "block";
    playAgainBtn.style.display = "block";
    nextBtn.style.display = "inline";

    updateResultSides(userChoice, compChoice);

    userIcon.classList.add("shuvam_green-background");
    pcIcon.classList.remove("shuvam_green-background");
  } else if (result === "comp") {
    winText.style.display = "none";
    tieText.style.display = "none";
    replayBtn.style.display = "none";
    nextBtn.style.display = "none";

    lostText.style.display = "block";
    subText.style.display = "block";
    playAgainBtn.style.display = "block";

    updateResultSides(userChoice, compChoice);

    userIcon.classList.remove("shuvam_green-background");
    pcIcon.classList.add("shuvam_green-background");
  }
};

const keyClickHander = (event) => {
  const target = event.target;
  const parentDiv = target.closest(".shuvam_item"); // Get the closest parent div with the class "item"

  if (parentDiv) {
    const keyClicked = parentDiv.id; // Fetching the key clicked
    console.log("keyClicked:", keyClicked);
    const userChoice = valueOfKey(keyClicked);
    console.log("userChoice:", userChoice);

    // call the random response from computer
    const compChoice = getRandomNumber();
    console.log("compChoice:", compChoice);

    // compare the results and genarate result
    const result = playRockPaperScissors(userChoice, compChoice);
    console.log("Result: ", result);

    // update the local storage based on the result
    updateScores(result);

    // update the result zone based on the result
    updateResultZone(result, userChoice, compChoice);
  }
};

const playAgainHandler = (event) => {
  // make playing screen visible and result screen invisible
  playingZone.style.display = "flex";
  resultZone.style.display = "none";
  mainScreen.style.display = "block";
  winnerScreen.style.display = "none";
};

const nextPageHandler = () => {
  // make winner screen visible
  mainScreen.style.display = "none";
  winnerScreen.style.display = "flex";
  nextBtn.style.display = "none";
};

const showRulesHandler = () => {
  console.log("inisde showRulesHandler ");
  // add rules and cross
  crossBtn.style.display = "flex";
  rulesDisplay.style.display = "flex";
};

const removeRulesHandler = () => {
  // remove rules and cross
  crossBtn.style.display = "none";
  rulesDisplay.style.display = "none";
};

keysArray.forEach((key) => key.addEventListener("click", keyClickHander));
replayBtn.addEventListener("click", playAgainHandler);
playAgainBtn.addEventListener("click", playAgainHandler);
nextBtn.addEventListener("click", nextPageHandler);
winnerPlayAgainBtn.addEventListener("click", playAgainHandler);
rulesBtn.addEventListener("click", showRulesHandler);
crossBtn.addEventListener("click", removeRulesHandler);
