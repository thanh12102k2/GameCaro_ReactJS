import React from 'react';
import "./Square.css";

function Square(props) {
    let squareClasses = "square";
    if (props.win) {
      squareClasses += " square-highlight";
    }
    if (props.value === "X") {
      squareClasses += " square-X";
    } else if (props.value === "O") {
      squareClasses += " square-O";
    }
    return (
      <button className={squareClasses} onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

export default Square;