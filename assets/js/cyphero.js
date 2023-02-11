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

            app.mystery = parseInt(arr.join(''));
            console.log(app.mystery);
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
                : echoEl.innerHTML += `Trying ${num}... Numbers that are included but at the wrong place: ${wrongPlace}, numbers that are included and at the right place ${rightPlace}<br />`;
        },
        playerWon: function () {
            echoEl.innerHTML += `Trying ${num}... Correct answer. Code cracked successfully!`;
        },
        ifDifferent: function (num) {
            return (num != null && num != Infinity);
        },
    };

    document.title = app.returnTitle();

    const headerEl = document.getElementsByTagName("header")[0];
    headerEl.innerHTML = `<h1>${app.title}</h1><h3>${app.desc}</h3>`;

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
        console.log(app.ifDifferent(inputEl.value));
        app.checkInput(inputEl.value);
    });

    app.generateNumber();
}