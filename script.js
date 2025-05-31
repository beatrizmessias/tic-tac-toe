const Tictactoe = () => {
    const texts = [
        "Press to play",
        "plays!",
        "won"
    ];
    const self = {
        bot: true,
        turn: "",
        text: texts[0]
    };

    self.init = (elem) => {
        elem.addEventListener("click", (e) => {
            switch(e.target.tagName) {
                case "SPAN":
                    console.log("cell");
                break;
                case "BUTTON":
                    play();
                break;
            }
        });
    }

    const play = () => {
        self.turn = "";
        self.text = texts[1];
    }

    const template = `
        <div>
            <h1>Tic Tac Toe</h1>
            <p>
                Play against the computer <input type="checkbox" checked onchange="self.bot = this.checked">
            </p>
            <div>
                <div class="gui">
                    <span class="gui__turn">{{self.turn}}</span>
                    <span>{{self.text}}</span>
                </div>
                <div class="board" oncreate="self.init(this)">
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
                    <button class="btn">Play</button>
                </div>
            </div>
        </div>
    `;

    return lemonade.element(template, self);
}