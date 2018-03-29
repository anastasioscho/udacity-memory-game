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

var rating = 3;
var playerMoves = 0;
var totalSeconds = 0;
var timer = setInterval(function () {
    totalSeconds += 1;
    console.log(pad(parseInt(totalSeconds / 60)) + ':' + pad(totalSeconds % 60));
}, 1000);

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

const cards = [card1, card2, card3, card4, card5, card6, card7, card8, card1, card2, card3, card4, card5, card6, card7, card8];
shuffle(cards);

var openCardElements = [];

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

const board = document.getElementsByClassName('board')[0];
board.appendChild(fragment);

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
        if (playerMoves >= 20 && rating > 1) {
            rating = 1;
        } else if (playerMoves >= 10 && rating > 2) {
            rating = 2;
        }
        const lastCardElement = openCardElements[openCardElements.length - 1];
        const preLastCardElement = openCardElements[openCardElements.length - 2];

        const lastCardElementIndex = lastCardElement.getAttribute('data-index');
        const preLastCardElementIndex = preLastCardElement.getAttribute('data-index');

        const lastCard = cards[lastCardElementIndex];
        const preLastCard = cards[preLastCardElementIndex];

        if (lastCard === preLastCard) {
            lastCardElement.classList.remove('flipped');
            preLastCardElement.classList.remove('flipped');
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