import React, { useState } from "react";

import "./NumberInput.css";

const NumberInput = (props) => {
  const [number, setNumber] = useState(props.initialValue || 1);

  const inputChangeHandler = (event) => {
    let updatedNumber;
    if (event.target.value < 1) {
      updatedNumber = 1;
    } else if (event.target.value > props.maxValue) {
      updatedNumber = props.maxValue;
    } else {
      updatedNumber = parseFloat(event.target.value);
    }
    setNumber(updatedNumber);
    props.onValue(updatedNumber);
  };

  const decrement = () => {
    if (number === 1) {
      return;
    }
    const updatedNumber = number - 1;
    setNumber(updatedNumber);
    props.onValue(updatedNumber);
  };

  const increment = () => {
    if (number >= props.maxValue) {
      return;
    }
    const updatedNumber = number + 1;
    setNumber(updatedNumber);
    props.onValue(updatedNumber);
  };

  return (
    <div className="number-input">
      <button onClick={decrement}>-</button>
      <input
        type="number"
        onChange={inputChangeHandler}
        value={number}
        min="1"
      />
      <button onClick={increment}>+</button>
    </div>
  );
};

export default NumberInput;
