const card1 = {id: 1};
const card2 = {id: 2};
const card3 = {id: 3};
const card4 = {id: 4};
const card5 = {id: 5};
const card6 = {id: 6};
const card7 = {id: 7};
const card8 = {id: 8};
const card9 = {id: 9};
const card10 = {id: 10};
const card11 = {id: 11};
const card12 = {id: 12};
const card13 = {id: 13};
const card14 = {id: 14};
const card15 = {id: 15};
const card16 = {id: 16};

const cards = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13, card14, card15, card16];

const fragment = document.createDocumentFragment();

for (const card of cards) {
    const cardContainer = document.createElement('li');
    cardContainer.className = "card-container";
    fragment.appendChild(cardContainer);

    const card = document.createElement('div');
    card.className = "card";
    cardContainer.appendChild(card);

    const cardFront = document.createElement('div');
    cardFront.className = "card-front";
    card.appendChild(cardFront);

    const cardBack = document.createElement('div');
    cardBack.className = "card-back";
    card.appendChild(cardBack);
}

const board = document.getElementsByClassName('board')[0];
board.appendChild(fragment);

board.addEventListener('click', cardClicked);

function cardClicked(evt) {
    if (evt.target.className === 'card-front' || evt.target.className === 'card-back') {
        const card = evt.target.parentElement;
        card.classList.toggle('flipped');
    }
}