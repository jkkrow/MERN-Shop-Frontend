import React, { useEffect, useState } from "react";

import "./NumberInput.css";

const NumberInput = (props) => {
  const [number, setNumber] = useState(props.initialValue || 1);

  const { value } = props;
  useEffect(() => {
    value && value(number);
  }, [value, number]);

  const inputChangeHandler = (event) => {
    if (event.target.value < 1) {
      setNumber(1);
    } else {
      setNumber(event.target.value);
    }
  };

  const decrement = () => {
    if (number === 1) {
      return;
    }
    setNumber((prevNumber) => prevNumber - 1);
  };

  const increment = () => {
    setNumber((prevNumber) => prevNumber + 1);
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
