let randNum = parseInt((Math.random()*100)+1);
console.log(randNum);
const form = document.querySelector('.form');
const userInput = document.querySelector('.guessField');
const submitButt = document.querySelector('#subt');
let guessSlot = document.querySelector('#prevGuess');
let remainingGuess = document.querySelector('.lastResult');
const startAgain = document.querySelector('.resultParas');
const lowOrHigh = document.querySelector('.lowOrHi');

const p = document.createElement('p');

let prevGuess = [];
let noOfGuess = 1;

let playGame = true;

submitButt.addEventListener('click', function(e) {
    e.preventDefault();
    let guess = parseInt(userInput.value);
    console.log(guess);
    validateGuess(guess);
})

function validateGuess(guess) {
    //validate if user input a number or not
    if(isNaN(guess)) {
        alert("Please enter a valid number");
    } else if(guess < 1) {
        alert("Please enter a number more than 0")
    } else if(guess > 100) {
        alert("Please enter a number less than 101")
    } else {
        prevGuess.push(guess);
        if(noOfGuess === 11) {
            displayGuess(guess)
            displayMessage(`😭Game Over. Random Number was ${randNum}`)
            endGame()
        } else {
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess) {
    //chek if guess is correct
    if(guess === randNum) {
        displayMessage(`🎉You Guessed it Right!`)
        endGame()
    } else if(guess < randNum) {
        displayMessage(`😏Guessed number is TOO Low!`)
    } else if(guess > randNum) {
        displayMessage(`😏Guessed number is TOO High!`)
    }
}

function displayGuess(guess) {
    //Clean up of user input everytime
    userInput.value =  ''
    guessSlot.innerHTML += `${guess}   `
    noOfGuess++
    remainingGuess.innerHTML = `${11 - noOfGuess}`
}

function displayMessage(message) {
    //directly interacts with html
    lowOrHigh.innerHTML = `<h2>${message}</h2>`
}

function endGame() {
    //Invoked when game ends
    userInput.value = ''
    userInput.setAttribute('disabled', '')
    p.classList.add('button')
    p.innerHTML = `<h2 id="newGame">Start new game</h2>`
    startAgain.appendChild(p)
    playGame = false
    startOver()
}

function startOver() {
    //Stsrting new Game
    const newGameButt = document.querySelector('#newGame')
    newGameButt.addEventListener('click', function(e) {
        randNum = parseInt((Math.random()*100)+1);
        prevGuess = []
        noOfGuess = 1
        guessSlot.innerHTML = ''
        remainingGuess.innerHTML = `${11 - noOfGuess}`
        userInput.removeAttribute('disabled')
        startAgain.removeChild(p)
        playGame = true

    })
}
