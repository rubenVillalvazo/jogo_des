"use strict"

/*
**************************************************************************************************************
CONFIGURAÇÃO
**************************************************************************************************************
*/

import createGame from "./createGame.js"
import createKeyboardListener from './keyboardListener.js'
import renderScreen from "./renderScreen.js"

/*
**************************************************************************************************************
GAME
**************************************************************************************************************
*/

const screen = document.getElementById('screen')
const game = createGame

/*
**************************************************************************************************************
USER INPUTS
**************************************************************************************************************
*/

const keyboardListener = createKeyboardListener(document)
keyboardListener.subscribe(game.movePlayer)

/*
**************************************************************************************************************
VISUAL LAYOUT       
**************************************************************************************************************
*/

renderScreen(screen, game, requestAnimationFrame)

game.addPlayer({ playerId: 'player1', playerX: 1, playerY: 1 })
game.addPlayer({ playerId: 'player2', playerX: 4, playerY: 6 })
game.addFruit({ fruitId: 'fruit1', fruitX: 5, fruitY: 8 })
game.addFruit({ fruitId: 'fruit2', fruitX: 2, fruitY: 9 })