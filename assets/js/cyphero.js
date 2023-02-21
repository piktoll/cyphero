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
        returnNotice: function () {
            return `${app.returnTitle()} CC-BY-SA&nbsp;3.0 ${app.year} ${app.publisher}. Developed by: ${app.developer}`;
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
            if (app.ifValid(num) && app.ifDifferent(num) && app.ifLongEnough(num) && app.ifFirstNotZero(num)) {
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

                if (rightPlace === 4) {
                    // the player guessed right
                    echoEl.innerHTML += `<p>Trying ${num}... Correct answer. Congratulations, code cracked successfully!</p>`;
                    inputEl.style.display = 'none';
                    buttonEl.style.display = 'none';
                } else {
                    echoEl.innerHTML += `<p>Trying ${num}... Numbers that are included but in the wrong place: ${wrongPlace}, numbers that are included and in the right place ${rightPlace}.</p>`;
                }

            } else if (!app.ifDifferent(num)) {
                /* Not all digits are different but the input is valid nonetheless. */
                echoEl.innerHTML += `<p>Trying ${num}... Invalid attempt. All digits must be different.</p>`;
            } else if (!app.ifLongEnough(num)) {
                /* The input is less than 4 digits. */
                echoEl.innerHTML += `<p>Trying ${num}... Invalid attempt. The input must be exactly four digits.</p>`;
            } else if (!app.ifFirstNotZero(num)) {
                /* The input is different but invalid. */
                echoEl.innerHTML += `<p>Trying ${num}... Invalid attempt. The first digit cannot be zero.</p>`;
            } else {
                /* The input is invalid for other reasons. */
                echoEl.innerHTML += `<p>Trying ${num}... Invalid attempt.</p>`;
            }

            inputEl.value = '';
        },
        ifValid: function (num) {
            return (num != null && num != Infinity);
        },
        ifLongEnough: function (num) {
            return (num.length === 4);
        },
        ifDifferent: function (num) {
            return (new Set(app.numToArray(num))).size === app.numToArray(num).length;
        },
        ifFirstNotZero: function (num) {
            return (num[0] != 0);
        },
    };

    document.title = app.returnTitle();

    const footerEl = document.querySelector('footer').querySelector('p');
    footerEl.innerHTML = app.returnNotice();

    const echoEl = document.querySelector('.echo-el');
    const inputEl = document.querySelector('.input-el');
    inputEl.addEventListener('input', function () {
        if (inputEl.value.length > inputEl.maxLength)
            inputEl.value = inputEl.value.slice(0, inputEl.maxLength);
        /* Negative values and fractions are forbidden. */
        inputEl.value = Math.abs(Math.floor(inputEl.value));
    });

    const buttonEl = document.querySelector('.button-el');

    buttonEl.addEventListener("click", function () {
        app.checkInput(inputEl.value);
    });

    inputEl.addEventListener("keydown", function (event) {
        const key = event.key;

        if (key == "Enter") { 
            app.checkInput(inputEl.value);
        }
    });

    app.startGame();
}
