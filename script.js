let userScore = 0;
let compScore = 0;
const options = ['rock', 'paper', 'scissors'];

const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');
const resetBtn = document.getElementById('play-again');

const playerDisplay = document.getElementById('player-choice');
const computerDisplay = document.getElementById('computer-choice');
const message = document.getElementById('round-result');
const userScoreText = document.getElementById('player-score');
const compScoreText = document.getElementById('computer-score');

const emojiMap = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

// Button event handlers
rockButton.addEventListener('click', () => handleTurn('rock'));
paperButton.addEventListener('click', () => handleTurn('paper'));
scissorsButton.addEventListener('click', () => handleTurn('scissors'));
resetBtn.addEventListener('click', restartGame);

function handleTurn(playerChoice) {
    const computerChoice = getRandomOption();

    // Display choices
    playerDisplay.innerHTML = `You picked: <span class="choice-emoji">${emojiMap[playerChoice]} ${playerChoice.toUpperCase()}</span>`;
    computerDisplay.innerHTML = `Computer picked: <span class="choice-emoji">${emojiMap[computerChoice]} ${computerChoice.toUpperCase()}</span>`;

    // Check result
    const outcome = decideWinner(playerChoice, computerChoice);
    message.textContent = `Round result: ${outcome}`;

    if (outcome.includes('win')) {
        userScore++;
        message.style.color = '#1e90ff';
    } else if (outcome.includes('lose')) {
        compScore++;
        message.style.color = '#d63384';
    } else {
        message.style.color = '#444';
    }

    userScoreText.textContent = `Your Score: ${userScore}`;
    compScoreText.textContent = `Computer Score: ${compScore}`;

    if (userScore === 5 || compScore === 5) {
        finishGame();
    }
}

function getRandomOption() {
    const i = Math.floor(Math.random() * options.length);
    return options[i];
}

function decideWinner(user, comp) {
    if (user === comp) return "It's a draw.";

    if (
        (user === 'rock' && comp === 'scissors') ||
        (user === 'paper' && comp === 'rock') ||
        (user === 'scissors' && comp === 'paper')
    ) {
        return "You win this round!";
    }

    return "You lose this round.";
}

function finishGame() {
    const finalMsg = userScore > compScore
        ? `Victory! Final score: ${userScore}–${compScore} 🎉`
        : `Defeat... Final score: ${compScore}–${userScore} 😢`;

    message.textContent = finalMsg;
    document.body.classList.toggle('win', userScore > compScore);
    document.body.classList.toggle('lose', compScore > userScore);

    disableChoices(true);
    resetBtn.style.display = 'inline-block';

    if (userScore > compScore) showConfetti();
}

function restartGame() {
    userScore = 0;
    compScore = 0;

    userScoreText.textContent = 'Your Score: 0';
    compScoreText.textContent = 'Computer Score: 0';
    playerDisplay.textContent = 'You picked:';
    computerDisplay.textContent = 'Computer picked:';
    message.textContent = 'Round result:';
    message.style.color = '#444';

    disableChoices(false);
    resetBtn.style.display = 'none';

    document.body.classList.remove('win', 'lose');
}

function disableChoices(state) {
    rockButton.disabled = state;
    paperButton.disabled = state;
    scissorsButton.disabled = state;
}

function showConfetti() {
    const confettiHolder = document.createElement('div');
    confettiHolder.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(confettiHolder);

    for (let i = 0; i < 100; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${randomConfettiColor()};
            border-radius: 50%;
            left: ${Math.random() * 100}vw;
            animation: fall ${Math.random() * 3 + 2}s linear forwards;
        `;
        confettiHolder.appendChild(dot);
    }

    setTimeout(() => confettiHolder.remove(), 5000);
}

