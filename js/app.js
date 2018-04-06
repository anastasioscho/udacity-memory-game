const card1 = {
    id: 1
};
const card2 = {
    id: 2
};
const card3 = {
    id: 3
};
const card4 = {
    id: 4
};
const card5 = {
    id: 5
};
const card6 = {
    id: 6
};
const card7 = {
    id: 7
};
const card8 = {
    id: 8
};

var openCardElements = [];
var playerMoves = 0;
var totalSeconds = 0;
var timer;

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

const cards = [card1, card2, card3, card4, card5, card6, card7, card8, card1, card2, card3, card4, card5, card6, card7, card8];

restartGame();

const board = document.getElementsByClassName('board')[0];
board.addEventListener('click', cardClicked);

function cardClicked(evt) {
    if (evt.target.classList.contains('card-front') || evt.target.classList.contains('card-back')) {
        const cardElement = evt.target.parentElement;
        if (!cardElement.classList.contains('flipped')) {
            cardElement.classList.toggle('flipped');
            openCardElements.push(cardElement);

            checkLastTwoOpenedCards();
        }
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function checkLastTwoOpenedCards() {
    if (openCardElements.length > 0 && openCardElements.length % 2 == 0) {
        playerMoves += 1;

        updatePlayerMoves();
        updateStars();

        if (totalSeconds == 0) {
            restartTimer();
        }

        const lastCardElement = openCardElements[openCardElements.length - 1];
        const preLastCardElement = openCardElements[openCardElements.length - 2];

        const lastCardElementIndex = lastCardElement.getAttribute('data-index');
        const preLastCardElementIndex = preLastCardElement.getAttribute('data-index');

        const lastCard = cards[lastCardElementIndex];
        const preLastCard = cards[preLastCardElementIndex];

        if (lastCard === preLastCard) {
            lastCardElement.classList.add('jello-horizontal');
            preLastCardElement.classList.add('jello-horizontal');
            checkIfWon();
        } else {
            openCardElements.pop();
            openCardElements.pop();
            lastCardElement.classList.add('shake-horizontal');
            preLastCardElement.classList.add('shake-horizontal');
            setTimeout(function () {
                lastCardElement.classList.remove('shake-horizontal');
                preLastCardElement.classList.remove('shake-horizontal');

                setTimeout(function () {
                    lastCardElement.classList.remove('flipped');
                    preLastCardElement.classList.remove('flipped');
                }, 100);
            }, 1000);
        }
    }
}

function checkIfWon() {
    if (openCardElements.length === cards.length) {
        console.log('The player won!');
        clearInterval(timer);
    }
}

const restartElement = document.getElementsByClassName('restart')[0];
restartElement.addEventListener('click', function () {
    restartGame();
});

function restartGame() {
    resetTimer();
    playerMoves = 0;
    openCardElements = [];
    shuffle(cards);
    updatePlayerMoves();
    rebuildTheBoard();
    rebuildTheStars();
}

function rebuildTheBoard() {
    const board = document.getElementsByClassName('board')[0];

    while (board.firstElementChild) {
        board.firstElementChild.remove();
    }

    const fragment = document.createDocumentFragment();

    for (i = 0; i < cards.length; i++) {
        const card = cards[i];

        const cardContainerElement = document.createElement('li');
        cardContainerElement.className = "card-container";
        fragment.appendChild(cardContainerElement);

        const cardElement = document.createElement('div');
        cardElement.className = "card";
        cardElement.setAttribute('data-index', i);
        cardContainerElement.appendChild(cardElement);

        const cardFrontElement = document.createElement('div');
        cardFrontElement.className = "card-front card-" + card.id;
        cardElement.appendChild(cardFrontElement);

        const cardBackElement = document.createElement('div');
        cardBackElement.className = "card-back";
        cardElement.appendChild(cardBackElement);
    }

    board.appendChild(fragment);
}

function rebuildTheStars() {
    const starElements = document.getElementsByClassName('stars')[0];

    while (starElements.firstElementChild) {
        starElements.firstElementChild.remove();
    }

    const fragment = document.createDocumentFragment();

    for (i = 0; i < 3; i++) {
        const starElement = document.createElement('li');
        fragment.appendChild(starElement);

        const starImageElement = document.createElement('i');
        starImageElement.className = "fa fa-star";
        starElement.appendChild(starImageElement);
    }

    starElements.appendChild(fragment);
}

function updateStars() {
    const starsElement = document.getElementsByClassName('stars')[0];
    if (playerMoves == 10 || playerMoves == 20) {
        starsElement.lastElementChild.remove();
    }
}

function updatePlayerMoves() {
    var movesMessage = playerMoves + " move";
    if (playerMoves > 1) {
        movesMessage += 's';
    }
    const movesElement = document.getElementsByClassName('moves')[0];
    movesElement.textContent = movesMessage;
}

function resetTimer() {
    clearInterval(timer);
    totalSeconds = 0;

    const timerElement = document.getElementsByClassName('timer')[0];
    timerElement.textContent = '00:00 seconds';
}

function restartTimer() {
    resetTimer();

    timer = setInterval(function () {
        totalSeconds += 1;
        const timerElement = document.getElementsByClassName('timer')[0];
        timerElement.textContent = pad(parseInt(totalSeconds / 60)) + ':' + pad(totalSeconds % 60) + ' seconds';
    }, 1000);
}