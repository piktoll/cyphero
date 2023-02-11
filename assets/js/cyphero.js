window.onload = function () {
    const app = {
        title: 'Cyphero',
        desc: 'Crack the Code!',
        year: 2023,
        publisher: 'Senrima Team',
        mystery: 0,
        returnTitle: function () {
            return `${this.title} | ${this.desc}`;
        },
        startGame: function () {
            app.mystery = app.generateNumber();

            echoEl.innerHTML += `<p>${app.title} &ndash; ${app.desc}</p><hr />`;
            echoEl.innerHTML += `<p>Welcome to Cyphero! The game is all about cracking a 4-digit code. The code consists of four different digits and the first digit cannot be zero. Happy guessing!</p>`;
        },
        generateNumber: function () {
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

            return parseInt(arr.join(''));
        },
        checkInput: function (num) {
            // only execute if all digits are different

            const basis = Array.from(app.mystery.toString(), n => parseInt(n));
            const check = Array.from(num.toString(), n => parseInt(n));

            let wrongPlace = 0, rightPlace = 0;

            for (let i = 0; i < check.length; i++) {
                if (basis.includes(check[i])) {
                    (basis.indexOf(check[i]) == i)
                        ? rightPlace++
                        : wrongPlace++;
                }
            }

            (rightPlace === 4)
                ? app.playerWon()
                : echoEl.innerHTML += `<p>Trying ${num}... Numbers that are included but at the wrong place: ${wrongPlace}, numbers that are included and at the right place ${rightPlace}</p>`;
        },
        playerWon: function () {
            echoEl.innerHTML += `<p>Trying ${num}... Correct answer. Code cracked successfully!</p>`;
        },
        ifDifferent: function (num) {
            return (num.length === 4 && num != null && num != Infinity);
        },
    };

    document.title = app.returnTitle();

    const footerEl = document.getElementsByTagName("footer")[0].getElementsByTagName("p")[0];
    footerEl.innerHTML = `${app.returnTitle()} CC-BY-SA&nbsp;3.0 ${app.year} ${app.publisher}.`;

    const echoEl = document.getElementsByClassName('echo-el')[0];
    const inputEl = document.getElementsByClassName("input-el")[0];
    inputEl.addEventListener('input', () => {
        if (inputEl.value.length > inputEl.maxLength)
            inputEl.value = inputEl.value.slice(0, inputEl.maxLength);
    });

    const buttonEl = document.getElementsByClassName("button-el")[0];
    buttonEl.addEventListener("click", function () {
        if (app.ifDifferent(inputEl.value))
            app.checkInput(inputEl.value);
    });

    app.startGame();
}