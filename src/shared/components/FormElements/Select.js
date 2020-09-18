import React, { useState, useEffect } from "react";

import "./Select.css";

const Select = (props) => {
  const [value, setValue] = useState(props.initialValue || "");
  const [isValid, setIsValid] = useState(props.initialValid || "");
  const [isTouched, setIsTouched] = useState(false);

  const { onSelect, id } = props;
  useEffect(() => onSelect(id, value, isValid), [onSelect, id, value, isValid]);

  const changeHandler = (event) => {
    setValue(event.target.value);
    if (event.target.value) {
      setIsValid(true);
    }
  };
  const touchHandler = () => setIsTouched(true);

  return (
    <div
      className={`form-control ${
        !value && isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <select
        id={props.id}
        defaultValue={props.initialValue || "default"}
        onChange={changeHandler}
        onBlur={touchHandler}
      >
        <option value="default" disabled hidden>
          select a {props.id}
        </option>
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
