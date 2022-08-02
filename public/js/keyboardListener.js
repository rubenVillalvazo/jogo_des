"use strict"

export default function createKeyboardListener(document) {
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