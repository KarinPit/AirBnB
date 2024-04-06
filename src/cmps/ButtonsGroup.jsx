import React from "react";

const ButtonGroup = ({ options, value, handleClick, className }) => {
  return (
    <div className={className}>
      {options.map((option) => (
        <button
          key={option.key}
          className={`option ${value === option.key ? "active" : ""}`}
          onClick={() => handleClick(option.key)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
