import React from "react";

export function Chip({ option, isSelected, onSelect }) {
  return (
    <div className="chip-wrapper">
      <button
        key={option}
        type="button"
        className={`chip ${isSelected ? "selected" : ""}`}
        onClick={() => onSelect(option)}
      >
        {option}
      </button>
    </div>
  );
}
