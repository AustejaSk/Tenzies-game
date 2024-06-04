import React from "react"
import { useState, useEffect } from "react"
import Die from "/src/components/Die.jsx"
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)

    useEffect(() => {
        const allHold = dice.every(die => die.isHeld)
        const firstDie = dice[0].value
        const allSameVal = dice.every(die => die.value === firstDie)
        if (allHold && allSameVal) {
            setTenzies(true)
        }
    }, [dice])

    function allNewDice() {
        const diceArr = []
        for (let i = 0; i < 10; i++) {
            diceArr.push(getNewDie())
        }
        return diceArr
    }

    function getNewDie() {
        return {
            value: (Math.ceil(Math.random() * 6)),
            isHeld: false,
            id: nanoid()
        }
    }

    const [rollCount, setRollCount] = useState(0)

    function rollDice() {
        if (tenzies) {
            setTenzies(false)
            setDice(allNewDice)
            setRollCount(0)
        } else {
            setRollCount(oldCount => oldCount + 1)
            setDice(oldDice => oldDice.map(die => {
                if (!die.isHeld) {
                    return getNewDie()
                } else {
                    return die
                }
            }))
        }
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            if (die.id === id) {
                return {...die, isHeld: !die.isHeld}
            } else {
                return die
            }
        }))
    }

    const diceElement = dice.map(die => {
        return <Die 
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            handleClick={() => {holdDice(die.id)}}
        />
    })

    return (
        <main>
            {tenzies && <Confetti />}
            <h1>Tenzies</h1>
            <h2>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h2>
            <div className="dice-container">
                {diceElement}
            </div>
            <button
            className="dice-roll-btn"
            onClick={rollDice}
            >{tenzies ? "New Game" : "Roll"}</button>
            {rollCount > 0 && <h3>Number of rolls: {rollCount}</h3>}
        </main>
    )
}