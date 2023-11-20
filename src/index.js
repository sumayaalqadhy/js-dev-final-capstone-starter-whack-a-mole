const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score');
const timerDisplay = document.querySelector('#timer');


let time = 10;
let timer;
let points = 0;
let lastHole;
let showAndHideTimeout;
let gameIsStopped = false;

const audioHit = new Audio('cat-meow.mp3');


// Generates a random integer between min and max (inclusive)
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// The delay is changed depending on difficulty 
function setDelay(difficulty) {
    if (difficulty === "easy") {
        return 1500;
    } else if (difficulty === "normal") {
        return 1000;
    } else if (difficulty === "hard") {
        return randomInteger(600, 1200);
    }
}

// Logic handling for choosing different holes (cat houses) so the previous one isn't repeated
function chooseHole(holes) {
    const index = randomInteger(0, holes.length - 1);
    const hole = holes[index];
    if (hole === lastHole) {
        return chooseHole(holes);
    }
    lastHole = hole;
    return hole;
}

// Hides the mole (cat) that was previously shown
function showAndHide(hole, delay) {
  hole.classList.add('show');
  showAndHideTimeout = setTimeout(() => {
      hole.classList.remove('show');
      if (time > 0) {
          // Check if the game is still running before scheduling the next call
          if (!gameIsStopped) {
              showAndHide(chooseHole(holes), setDelay("normal"));
          }
      } else {
          stopGame();
      }
  }, delay);
}

// Updates and displays the score each time player gets an additional point
function updateScore() {
    points++;
    score.textContent = points;
}

// Clears the score
function clearScore() {
    points = 0;
    score.textContent = points;
}

// Updates the game timer and stops the game when time reaches 0 seconds left
function updateTimer() {
  //Adding for testing purposes
  console.log("Updating timer. Current time:", time);
  if (time <= 0) {
      stopGame();
  } else {
      time--;
      timerDisplay.textContent = time;
  }
}

// Logic handling for when a cat is caught (whacked) by mouse click
function whack() { 
  updateScore();
  audioHit.currentTime = 0;
  audioHit.play(); 
  return points;
}



// Sets event listeners for mole (cat) clicks
function setEventListeners(){
  moles.forEach(
    mole => mole.addEventListener('click',whack)
  );
  return moles;
}

// Sets the timer to 10 seconds at the start of the game
function startTimer() {
    timer = setInterval(updateTimer, 1000);
}

// Clears the existing timer, initializes the timer to 10 seconds, clears the score, starts the score, and shows the moles (cats)
function startGame() {

    if (timer) {
        clearInterval(timer); 
    }
    
    time = 10; 
    timerDisplay.textContent = time; 
    
    clearScore();
    

    startTimer();
    showAndHide(chooseHole(holes), setDelay("normal")); 
    moles.forEach(mole => mole.removeEventListener('click', whack));
    setEventListeners(); 
}


// Stops the game, displays an alert with the final score, and clears the score when alert is dismissed
function stopGame() {
  gameIsStopped = true;
  clearInterval(timer);
  alert('Game Over! You caught ' + points + ' cats!');
  clearScore();

  // Ensure that no additional calls to updateTimer or showAndHide occur
  clearTimeout(showAndHideTimeout);
}


startButton.addEventListener('click', startGame);
setEventListeners();

// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.time = time;
window.setEventListeners = setEventListeners;














