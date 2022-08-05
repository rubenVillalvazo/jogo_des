"use strict"

import createGame from "./createGame.js"
import createKeyboardListener from './keyboardListener.js'
import renderScreen from "./renderScreen.js"

const game = createGame

const keyboardListener = createKeyboardListener(document)

const socket = io()

socket.on('connect', () => {
    const playerId = socket.id
    console.log(`Player connected on Client with id: ${playerId}`)

    const screen = document.getElementById('screen')
    renderScreen(screen, game, requestAnimationFrame, playerId)
})

socket.on('setup', (state) => {
    const playerId = socket.id
    game.setState(state)
    keyboardListener.registerPlayerId(playerId)
    keyboardListener.subscribe(game.movePlayer)
    keyboardListener.subscribe((command) => {
        socket.emit('move-player', command)
    })
})

socket.on('add-player', (command) => {
    console.log(`Receiving ${command.type} -> ${command.playerId}`)
    game.addPlayer(command)
})

socket.on('move-player', (command) => {
    console.log(`Receiving ${command.type} -> ${command.playerId}`)

    const playerId = socket.id

    if (playerId !== command.playerId) {
        game.movePlayer(command)
    }
})

socket.on('remove-player', (command) => {
    console.log(`Receiving ${command.type} -> ${command.playerId}`)
    game.removePlayer(command)
})

socket.on('add-fruit', (command) => {
    console.log(`Receiving ${command.type} -> ${command.fruitId}`)
    game.addFruit(command)
})

socket.on('remove-fruit', (command) => {
    console.log(`Receiving ${command.type} -> ${command.fruitId}`)
    game.removeFruit(command)
})