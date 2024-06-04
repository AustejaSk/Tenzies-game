import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <div
            style={styles}
            className="die-container"
            onClick={props.handleClick}
        >
            <h1>{props.value}</h1>
        </div>
    )
}