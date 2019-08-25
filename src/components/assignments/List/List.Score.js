import React from 'react'

const Score = (props) => {
    return (
        <p className="score">
            <span className="card-text">{props.assignmentScore} </span>
            out of
    <span className="card-text"> {props.assignmentBase}</span>
        </p>
    )
}
export default Score
