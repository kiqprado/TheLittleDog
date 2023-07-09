export class UI {
  constructor(game) {
    this.game = game
    this.fontSize = 30
    this.fontFamily = 'Courier New'
  }

  draw(context) {
    context.save()
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowBlur = 0
    context.shadowColor = 'White'
    // Score
    context.font = this.fontSize + 'px ' + this.fontFamily
    context.textAlign = 'left'
    context.fillStyle = this.game.fontColor
    context.fillText('Score: ' + this.game.score, 20, 50)

    // Timer
    context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily
    context.fillStyle = this.game.fontColor
    context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80)

    // Game Over
    if (this.game.gameOver) {
      context.textAlign = 'center'
      context.font = this.fontSize * 2 + 'px ' + this.fontFamily
      if (this.game.score > 15) {
        context.fillText(
          'Boooooa!!!',
          this.game.width * 0.5,
          this.game.height * 0.5
        )
        context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily
        context.fillText(
          'Você derrotou os perigos da Noite.',
          this.game.width * 0.5,
          this.game.height * 0.5 + 30
        )
      } else {
        context.fillText(
          'Game Over!',
          this.game.width * 0.5,
          this.game.height * 0.5
        )
        context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily
        context.fillText(
          'A noite tende a ser muito perigosa.',
          this.game.width * 0.5,
          this.game.height * 0.5 + 30
        )
      }
    }
    context.restore()
  }
}
