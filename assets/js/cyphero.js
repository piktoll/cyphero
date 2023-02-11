window.onload = function () {
    const app = {
        title: 'Cyphero',
        desc: 'Crack the Code!',
        year: 2023,
        publisher: 'Senrima Team',
        developer: 'Viktor Szrenka',
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
        numToArray: function (num) {
            /*
                A one-line way to create an array from a number.
            */
            return Array.from(num.toString(), n => parseInt(n));
        },
        checkInput: function (num) {
            /*
                We will only process input if it is valid and all digits are different
            */
            if (app.ifValid(num) && app.ifDifferent(num)) {
                const basis = app.numToArray(app.mystery);
                const check = app.numToArray(num);
                let wrongPlace = 0, rightPlace = 0;

                for (let i = 0; i < check.length; i++) {
                    if (basis.includes(check[i])) {
                        /*
                            if the number is included in the basis and is at the same index, we increment the right place,
                            else if the number is included in the basis but is not at the same index, we increment the wrong place
                        */
                        (basis.indexOf(check[i]) == i)
                            ? rightPlace++
                            : wrongPlace++;
                    }
                }

                (rightPlace === 4)
                    ? app.playerWon()
                    : echoEl.innerHTML += `<p>Trying ${num}... Numbers that are included but in the wrong place: ${wrongPlace}, numbers that are included and in the right place ${rightPlace}.</p>`;
            } else if (app.ifValid(num)) {
                /* Not all digits are different but the input is valid nonetheless. */
                echoEl.innerHTML += `<p>Trying ${num}... Invalid attempt. All digits must be different.</p>`;
            } else {
                /* The input is different but invalid. */
                echoEl.innerHTML += `<p>Trying ${num}... Invalid attempt. The first digit cannot be zero.</p>`;
            }

            inputEl.value = '';
        },
        playerWon: function () {
            echoEl.innerHTML += `<p>Trying ${num}... Correct answer. Congratulations, code cracked successfully!</p>`;
        },
        ifValid: function (num) {
            return (num[0] != 0 && num.length === 4 && num != null && num != Infinity);
        },
        ifDifferent: function (num) {
            return (new Set(app.numToArray(num))).size === app.numToArray(num).length;
        },
    };

    document.title = app.returnTitle();

    const footerEl = document.getElementsByTagName("footer")[0].getElementsByTagName("p")[0];
    footerEl.innerHTML = `${app.returnTitle()} CC-BY-SA&nbsp;3.0 ${app.year} ${app.publisher}. Developed by: ${app.developer}`;

    const echoEl = document.getElementsByClassName('echo-el')[0];
    const inputEl = document.getElementsByClassName("input-el")[0];
    inputEl.addEventListener('input', () => {
        if (inputEl.value.length > inputEl.maxLength)
            inputEl.value = inputEl.value.slice(0, inputEl.maxLength);
    });

    const buttonEl = document.getElementsByClassName("button-el")[0];

    buttonEl.addEventListener("click", function () {
        app.checkInput(inputEl.value);
    });

    app.startGame();
}