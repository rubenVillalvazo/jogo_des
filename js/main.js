/*
**************************************************************************************************************
CONFIGURAÇÃO
**************************************************************************************************************
*/
const screen = document.getElementById('screen')
const context = screen.getContext('2d')

/*
**************************************************************************************************************
GAME
**************************************************************************************************************
*/

const createGame = () => {
    const state = {
        players: {},
        fruits: {}
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
                if (player.x + 1 < screen.width) {
                    player.x++
                }
            },
            ArrowDown: function (player) {
                if (player.y + 1 < screen.height) {
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
            console.log(`Checking ${playerId} and ${fruitId}`)

            if (player.x === fruit.x && player.y === fruit.y) {
                console.log(`Collision between ${playerId} and ${fruitId}`)
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

const game = createGame()

/*
**************************************************************************************************************
USER INPUTS
**************************************************************************************************************
*/

const createKeyboardListener = () => {
    const state = {
        observers: []
    }

    const subscribe = (observerFunction) => {
        state.observers.push(observerFunction)
    }

    const notifyAll = (command) => {
        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    const handleKeyDown = (event) => {
        const keyPressed = event.key

        const command = {
            playerId: 'player1',
            keyPressed
        }

        notifyAll(command)
    }

    document.addEventListener('keydown', handleKeyDown)

    return {
        subscribe
    }
}

const keyboardListener = createKeyboardListener()
keyboardListener.subscribe(game.movePlayer)

/*
**************************************************************************************************************
APRESENTAÇÂO
**************************************************************************************************************
*/

const renderScreen = () => {
    context.fillStyle = '#fff'
    context.clearRect(0, 0, 10, 10)

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]
        context.fillStyle = "#262626"
        context.fillRect(player.x, player.y, 1, 1)
    }
    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]
        context.fillStyle = 'green'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }
    requestAnimationFrame(renderScreen)
}

renderScreen()