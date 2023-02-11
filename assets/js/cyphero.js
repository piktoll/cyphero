const echoEl = document.getElementsByClassName('echo-el')[0];
const numberEl = document.getElementsByClassName('number-el')[0];
const inputEl = document.getElementsByClassName("input-el")[0];
const footerEl = document.getElementsByClassName("footer-el")[0].getElementsByTagName("p")[0];
const buttonEl = document.getElementsByClassName("button-el")[0];
footerEl.innerHTML = `Cyphero CC-BY-SA&nbsp;3.0 2023 Senrima Team.`;
buttonEl.addEventListener("click", checkInput);

const game = {
    title: 'Cyphero',
    slogan: 'Crack the Code!',
    code: 0,
}

function generateNumber() {
    let arr = [];

    for (let i = 0; i < 4; i++) {
        let n = 0;

        if (i === 0) {
            n = Math.floor(Math.random() * 9 + 1);
        } else {
            do {
                n = Math.floor(Math.random() * 10);
            } while (arr.includes(n));
        }

        arr.push(n);
    }

    game.code = arr.join('').parseInt();
    numberEl.innerHTML = game.code;
}

function checkInput() {
    const num = 4269;
    const check = num.toString().split('');
    let wrongPlace, rightPlace = 0;

    for (let i = 0; i < check.length; i++) {
        (check[i])
    }

    echoEl.innerHTML = `Trying ${num}... Numbers that are included but at the wrong place: ${wrongPlace}, numbers that are included and at the right place ${rightPlace}<br />`;
}

generateNumber();

class main {
    constructor() {

    }
}

window.onload = new main();