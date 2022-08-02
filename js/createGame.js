"use-strict"

const CreateGame = () => {
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    const addPlayer = (command) => {
        const playerId = command.playerId
        const playerX = command.playerX
        const playerY = command.playerY

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }
    }

    const removePlayer = (command) => {
        const playerId = command.playerId

        delete state.players[playerId]
    }

    const addFruit = (command) => {
        const fruitId = command.fruitId
        const fruitX = command.fruitX
        const fruitY = command.fruitY

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
    }

    const removeFruit = (command) => {
        const fruitId = command.fruitId

        delete state.fruits[fruitId]
    }

    const movePlayer = (command) => {
        const keyPressed = command.keyPressed
        const playerId = command.playerId
        const player = state.players[command.playerId]

        const acceptedMovements = {
            ArrowUp: function (player) {
                if (player.y - 1 >= 0) {
                    player.y--
                }
            },
            ArrowRight: function (player) {
                if (player.x + 1 < state.screen.width) {
                    player.x++
                }
            },
            ArrowDown: function (player) {
                if (player.y + 1 < state.screen.height) {
                    player.y++
                }
            },
            ArrowLeft: function (player) {
                if (player.x - 1 >= 0) {
                    player.x--
                }
            }
        }

        const moveFunction = acceptedMovements[keyPressed]

        if (player && moveFunction) {
            moveFunction(player)
            checkForFruitCollision(playerId)
        }

        return
    }

    const checkForFruitCollision = (playerId) => {
        const player = state.players[playerId]

        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId]

            if (player.x === fruit.x && player.y === fruit.y) {
                removeFruit({ fruitId: fruitId })
            }
        }

    }

    return {
        movePlayer,
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        state
    }
}

const createGame = CreateGame()

export default createGame