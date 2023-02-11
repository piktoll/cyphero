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
            numberEl.innerHTML = app.mystery;
        },
        checkInput: function (num) {
            const check = num.toString().split('');
            let wrongPlace, rightPlace = 0;

            if (num === app.mystery) {
                playerWon();
            } else {
                for (let i = 0; i < check.length; i++) {
                    (check[i])
                }
            }

            echoEl.innerHTML = `Trying ${num}... Numbers that are included but at the wrong place: ${wrongPlace}, numbers that are included and at the right place ${rightPlace}<br />`;
        },
        playerWon: function () {
            echoEl.innerHTML = `Correct answer. Code cracked successfully!`;
        },
    };

    const appTitle = app.returnTitle();
    document.title = appTitle;

    const headerEl = document.getElementsByTagName("header")[0];
    headerEl.innerHTML = `<h1>${app.title}</h1><h3>${app.desc}</h3>`;

    const footerEl = document.getElementsByTagName("footer")[0].getElementsByTagName("p")[0];
    footerEl.innerHTML = `${appTitle} CC-BY-SA&nbsp;3.0 ${app.year} ${app.publisher}.`;

    const echoEl = document.getElementsByClassName('echo-el')[0];
    const numberEl = document.getElementsByClassName('number-el')[0];
    const inputEl = document.getElementsByClassName("input-el")[0];
    const buttonEl = document.getElementsByClassName("button-el")[0];
    buttonEl.addEventListener("click", function () {
        checkInput(inputEl.value);
    });

    app.generateNumber();
}