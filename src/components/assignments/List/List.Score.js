import React from "react";

const Score = props => {
    if (props) {
        return (
            <p className="score">
                <span className="card-text">{props.assignmentScore} </span>
                out of
              <span className="card-text"> {props.assignmentBase}</span>
            </p>
        );
    } else { 
        return (
            <span>Grade TBD</span>
        );
    }

};
export default Score;
