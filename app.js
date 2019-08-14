var scores, roundScore, activePlayer, gamePlaying, lastDice;

var dice = document.querySelector('#dice');
var rollDice = document.querySelector('.btn-roll');
var hold = document.querySelector('.btn-hold');

function init() {
    
    score = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    dice.style.display = 'none';
    rollDice.style.display = 'inline-block';
    hold.style.display = 'inline-block';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

init();

function clearScore() {

    document.querySelector(`#current-${activePlayer}`).textContent = 0;
    roundScore = 0;
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove("active");
    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
    document.querySelector(`.player-${activePlayer}-panel`).classList.add("active");
}

rollDice.addEventListener("click", () => {

    dice.style.display = "block";
    var randomNum = Math.floor(Math.random() * 6) + 1;
    dice.src = `dice-${randomNum}.png`;

    if (lastDice === 6 && randomNum === 6) {
        score[activePlayer] = 0;
        document.querySelector(`#score-${activePlayer}`).textContent = 0;
        clearScore();
    } else if (randomNum === 1) {
        clearScore();
    } else {
        roundScore += randomNum;
        document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    }
    lastDice = randomNum;
});

hold.addEventListener("click", () => {

    score[activePlayer] += roundScore;
    document.querySelector(`#score-${activePlayer}`).textContent = score[activePlayer];

    var input = document.querySelector('.final-score').value;
    var winningScore;
    
    if(input) {
        winningScore = input;
    } else {
        winningScore = 100;
    }

    if (score[activePlayer] >= winningScore) {
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove("active");
        document.querySelector(`.player-${activePlayer}-panel`).classList.add("winner");
        dice.style.display = "none";
        rollDice.style.display = "none";
        hold.style.display = "none";
    } else {
        clearScore();
    }
});

document.querySelector('.btn-new').addEventListener('click', init);