// Update loop

import Ball from "./Ball.js"
import Paddle from "./paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player_paddle"))
const aiPaddle = new Paddle(document.getElementById("AI_paddle"))
const playerScoreElem = document.getElementById("playerscore")
const AIScoreElem = document.getElementById("AIscore")

const ScoreBoard = document.getElementById("scoreboard")
const GameBoard = document.getElementById("gameboard")






let lastTime
function update(time)
{
    if(lastTime != null) {
        const delta = time - lastTime
        //Update code 
        ball.update(delta, [playerPaddle.rect(), aiPaddle.rect()])
        aiPaddle.update(delta, ball.y)
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue
        ("--hue"))

        document.documentElement.style.setProperty("--hue", hue+delta*0.01)

        if (isLose()){
             handleLose() 
        }
    } 
    lastTime = time;
    window.requestAnimationFrame(update)
}

function isLose() {
  const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0

}

function handleLose() {
    const rect = ball.rect()
    if (rect.right >= window.innerWidth){
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    }
    else {
            AIScoreElem.textContent = parseInt(AIScoreElem.textContent) + 1
        }
    
    ball.reset()
    aiPaddle.reset()
}


document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) *100 
})

window.requestAnimationFrame(update) 