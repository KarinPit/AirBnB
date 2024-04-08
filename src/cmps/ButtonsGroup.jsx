import React from "react";
import { useFormikContext } from "formik";

const ButtonGroup = ({ options, className, name }) => {
  const { values, setFieldValue } = useFormikContext();

  const handleClick = (key) => {
    setFieldValue(name, key);
  };

  return (
    <div className={className}>
      {options.map((option) => (
        <button
          aria-label={option.name}
          key={option.key}
          type="button"
          onClick={() => handleClick(option.name)}
          className={`option ${values[name] === option.name ? "active" : ""}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
