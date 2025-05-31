const Tictactoe = () => {
    let canPlay = false, game = [], board;
    const texts = [
        "Press to play",
        "plays!",
        "won!",
        "Tie!"
    ];
    const self = {
        bot: true,
        turn: "",
        text: texts[0],
        buttonLabel: "Play"
    };

    const checkMatching = (val1, val2, val3) => {
        if (game[val1] === game[val2] && game[val2] === game[val3]) {
            return game[val1];
        }
    }

    const isBoardFull = () => {
        for (let i = 1; i <= 9; i++) {
            if (!game[i]) return false;
        }
        return true;
    }

    const clickedBox = (element) => {
        const id = element.getAttribute("data-id");
        if (!canPlay || game[id])
            return false;

        element.innerText = self.turn;
        game[id] = self.turn;

        if (self.turn === "x") {
            self.turn = "o";
        }
        else {
            self.turn = "x";
        }

        const winner = checkMatching(1, 2, 3) ||
                       checkMatching(4, 5, 6) ||
                       checkMatching(7, 8, 9) ||
                       checkMatching(1, 4, 7) ||
                       checkMatching(2, 5, 8) ||
                       checkMatching(3, 6, 9) ||
                       checkMatching(1, 5, 9) ||
                       checkMatching(3, 5, 7);

        if (winner) {
            self.turn = winner;
            self.text = texts[2];
            canPlay = false;
        } else if (isBoardFull()) {
            self.turn = "";
            self.text = texts[3];
            canPlay = false;
        }

        return true;
    }

    self.init = (elem) => {
        board = elem;
        elem.addEventListener("click", (e) => {
            switch(e.target.tagName) {
                case "SPAN":
                    if (clickedBox(e.target)) {
                        if (self.bot) {
                            elem.style.pointerEvents = "none";

                            setTimeout(() => {
                                const emptyTiles = elem.querySelectorAll("span:empty");
                                const cell = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
                                clickedBox(cell);
                                elem.style.pointerEvents = "";
                            }, 500);
                        }
                    };
                break;
                case "BUTTON":
                    play();
                break;
            }
        });
    }

    const play = () => {
        canPlay = true;
        self.turn = "x";
        self.text = texts[1];
        game = [];

        const cells = board.querySelectorAll("span");
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerText = "";
        }
        self.buttonLabel = "Restart";
    }

    const template = `
        <div>
            <h1>Tic Tac Toe</h1>
            <p>
                Play against the computer <input type="checkbox" checked @bind="self.bot">
            </p>
            <div>
                <div class="gui">
                    <span class="gui__turn">{{self.turn}}</span>
                    <span>{{self.text}}</span>
                </div>
                <div class="board" @ready="self.init(this)">
                    <section class="board__column">
                        <span class="board__cell" data-id="1"></span>
                        <span class="board__cell" data-id="2"></span>
                        <span class="board__cell" data-id="3"></span>
                    </section>
                    <section class="board__column">
                        <span class="board__cell" data-id="4"></span>
                        <span class="board__cell" data-id="5"></span>
                        <span class="board__cell" data-id="6"></span>
                    </section>
                    <section class="board__column">
                        <span class="board__cell" data-id="7"></span>
                        <span class="board__cell" data-id="8"></span>
                        <span class="board__cell" data-id="9"></span>
                    </section>
                    <button class="btn">{{self.buttonLabel}}</button>
                </div>
            </div>
        </div>
    `;

    return lemonade.element(template, self);
}