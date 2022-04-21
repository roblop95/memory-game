const gameContainer = document.getElementById("game");
const score = document.querySelector('#current-score-number');
const lowestScore = document.querySelector('#lowest-score-number');
if(localStorage.getItem('lowestScore')){
  lowestScore.innerText = localStorage.getItem('lowestScore');
}

let currentScore = 0;
let cardsFlipped = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let firstPick = '';
let secondPick = '';
let disableClick = false;

// TODO: Implement this function!
function handleCardClick(event) {
  
  if(disableClick) return;
  if(event.target.classList.contains('flipped')) return;

  let clicked = event.target;
  clicked.style.backgroundColor = clicked.classList[0];
  currentScore++;
  score.innerText = currentScore;
  
  
  if(!firstPick || !secondPick){
    clicked.classList.add('flipped');
    firstPick = firstPick || clicked;
    secondPick = clicked === firstPick ? null : clicked;
  }


  if(firstPick && secondPick){   
    disableClick= true; 
    if(firstPick.style.backgroundColor === secondPick.style.backgroundColor){
      cardsFlipped += 2;
      firstPick.removeEventListener('click', handleCardClick);
      secondPick.removeEventListener('click', handleCardClick);
      firstPick = '';
      secondPick = '';
      disableClick = false;
    } else {
      setTimeout(function(){
        firstPick.style.backgroundColor = '';
        secondPick.style.backgroundColor = '';
        firstPick.classList.remove('flipped');
        secondPick.classList.remove('flipped');
        firstPick = '';
        secondPick = '';
        disableClick = false;
      }, 1000)
    }
  }
  // you can use event.target to see which element was clicked

  if (cardsFlipped === COLORS.length){
    console.log('game over');
    if(!lowestScore.innerText){
      lowestScore.innerText = currentScore;
      localStorage.setItem('lowestScore', lowestScore.innerText)
    } else if(currentScore < lowestScore.innerText){
      lowestScore.innerText = currentScore;
      localStorage.setItem('lowestScore', lowestScore.innerText)
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

