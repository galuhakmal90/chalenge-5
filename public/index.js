class Game {
  constructor() {
    this.controlRock = document.querySelector("#rock");
    this.controlScissor = document.querySelector("#scissor");
    this.controlPaper = document.querySelector("#paper");

    this.playerChoose = document.querySelector("#player-choose");
    this.botChoose = document.querySelector("#bot-choose");
    this.controlResult = document.querySelector("#result");

    this.controlRock.addEventListener("click", () => this.gameLogic("rock"))
    this.controlScissor.addEventListener("click", () => this.gameLogic("scissor"))
    this.controlPaper.addEventListener("click", () => this.gameLogic("paper"))
  }

  winner(player, result) {
    if (player === 'rock' && result === 'scissor') return 'win'
    if (player === 'paper' && result === 'rock') return 'win'
    if (player === 'scissor' && result === 'paper') return 'win'
    if (player === 'rock' && result === 'paper') return 'lose'
    if (player === 'paper' && result === 'scissor') return 'lose'
    if (player === 'scissor' && result === 'rock') return 'lose'
    return 'draw'
  }

  gameLogic (weapon) {
    const bot = ["rock", "scissor", "paper"];
    const random = Math.floor(Math.random() * 3);
    const botChoice = bot[random];
    const player = weapon;

    const result = this.winner(player, botChoice);

    this.playerChoose.innerHTML = player;
    this.botChoose.innerHTML = botChoice;
    this.controlResult.classList.remove("win", "lose", "draw");

    if (result === 'win') {
      this.controlResult.innerHTML = `You win!`
      this.controlResult.classList.add('win')
    }

    if (result === 'lose') {
      this.controlResult.innerHTML = `You lose!`
      console.log(this.controlResult)
      this.controlResult.classList.add('lose')
    }

    if (result === 'draw') {
      this.controlResult.innerHTML = `Draw!`
      console.log(this.controlResult)
      this.controlResult.classList.add('draw')
    }
  }
}

new Game()