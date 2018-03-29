const board = document.getElementsByClassName('board')[0];
board.addEventListener('click', cardClicked);

function cardClicked(evt) {
    if (evt.target.className === 'card-front' || evt.target.className === 'card-back') {
        const card = evt.target.parentElement;
        card.classList.toggle('flipped');
    }
}