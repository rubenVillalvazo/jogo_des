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

    const observers = []

    const start = () => {
        const frequency = 2000

        setInterval(addFruit, frequency)
    }

    const subscribe = (observerFunction) => {
        observers.push(observerFunction)
    }

    const notifyAll = (command) => {
        for (const observerFunction of observers) {
            observerFunction(command)
        }
    }

    const setState = (newState) => {
        Object.assign(state, newState)
    }

    const addPlayer = (command) => {
        const playerId = command.playerId
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width)
        const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * state.screen.height)

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }

        notifyAll({
            type: 'add-player',
            playerId: playerId,
            playerX: playerX,
            playerY: playerY
        })
    }

    const removePlayer = (command) => {
        const playerId = command.playerId

        delete state.players[playerId]

        notifyAll({
            type: 'remove-player',
            playerId: playerId,
        })
    }

    const addFruit = (command) => {
        const fruitId = command ? command.fruit : Math.floor(Math.random() * 10000000)
        const fruitX = command ? command.fruitX : Math.floor(Math.random() * state.screen.width)
        const fruitY = command ? command.fruitY : Math.floor(Math.random() * state.screen.height)

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }

        notifyAll({
            type: 'add-fruit',
            fruitId: fruitId,
            fruitX: fruitX,
            fruitY: fruitY
        })
    }

    const removeFruit = (command) => {
        const fruitId = command.fruitId

        delete state.fruits[fruitId]

        notifyAll({
            type: 'remove-fruit',
            fruitId: fruitId,
        })
    }

    const movePlayer = (command) => {
        const keyPressed = command.keyPressed
        const playerId = command.playerId
        const player = state.players[command.playerId]

        notifyAll(command)

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
        state,
        setState,
        subscribe,
        start
    }
}

const createGame = CreateGame()

export default createGame