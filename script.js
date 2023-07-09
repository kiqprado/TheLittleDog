import { Player } from './player.js'
import { inputHandler } from './input.js'
import { Background } from './background.js'
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from './enemies.js'
import { UI } from './ui.js'

window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = 1020
  canvas.height = 500

  class Game {
    constructor(width, height) {
      this.width = width
      this.height = height
      this.groundMargin = 77
      this.speed = 0
      this.maxSpeed = 6
      this.background = new Background(this)
      this.player = new Player(this)
      this.input = new inputHandler(this)
      this.ui = new UI(this)
      this.enemies = []
      this.particles = []
      this.collision = []
      this.maxParticles = 50
      this.enemyTimer = 0
      this.enemyInterval = 1000
      this.debug = false
      this.score = 0
      this.fontColor = 'black'
      this.time = 0
      this.maxTime = 30000
      this.gameOver = false
      this.player.currentState = this.player.states[0]
      this.player.currentState.enter()
    }

    update(deltaTime) {
      this.time += deltaTime
      if (this.time > this.maxTime) this.gameOver = true
      this.background.update()
      this.player.update(this.input.keys, deltaTime)

      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy()
        this.enemyTimer = 0
      } else {
        this.enemyTimer += deltaTime
      }
      this.enemies.forEach(enemy => {
        enemy.update(deltaTime)
        if (enemy.markForDeletion)
          this.enemies.splice(this.enemies.indexOf(enemy), 1)
      })

      // Particles
      this.particles.forEach((particle, index) => {
        particle.update()
        if (particle.markForDeletion) this.particles.splice(index, 1)
      })
      if (this.particles.length > this.maxParticles) {
        this.particles.length = this.maxParticles
      }

      // Collision
      this.collision.forEach((collision, index) => {
        collision.update(deltaTime)
        if (collision.markForDeletion) this.collision.splice(index, 1)
      })
    }

    draw(context) {
      this.background.draw(context)
      this.player.draw(context)
      this.enemies.forEach(enemy => {
        enemy.draw(context)
      })
      this.particles.forEach(particles => {
        particles.draw(context)
      })
      this.collision.forEach(collision => {
        collision.draw(context)
      })
      this.ui.draw(context)
    }

    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.5)
        this.enemies.push(new GroundEnemy(this))
      else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this))
      this.enemies.push(new FlyingEnemy(this))
    }
  }

  const game = new Game(canvas.width, canvas.height)

  let lastTime = 0

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update(deltaTime)
    game.draw(ctx)
    if (!game.gameOver) requestAnimationFrame(animate)
  }

  animate(0)
})
