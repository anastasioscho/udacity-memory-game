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

const cards = [card1, card2, card3, card4, card5, card6, card7, card8, card1, card2, card3, card4, card5, card6, card7, card8];
shuffle(cards);

const fragment = document.createDocumentFragment();

for (const card of cards) {
    const cardContainerElement = document.createElement('li');
    cardContainerElement.className = "card-container";
    fragment.appendChild(cardContainerElement);

    const cardElement = document.createElement('div');
    cardElement.className = "card";
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
    console.log(evt.target.className);
    if (evt.target.classList.contains('card-front') || evt.target.classList.contains('card-back')) {
        const card = evt.target.parentElement;
        if (!card.classList.contains('flipped')) {
            card.classList.toggle('flipped');
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