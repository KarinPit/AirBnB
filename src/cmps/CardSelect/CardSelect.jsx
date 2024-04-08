import React from "react";

export function CardSelect({ option, isSelected, onSelect }) {
  const isIconComponent = typeof option?.icon === "function";
  const selectedClass = isSelected ? "card-select--selected" : "";

  return (
    <div className={`card-select ${selectedClass}`} onClick={onSelect}>
      <span className="card-select__icon-wrapper">
        {isIconComponent ? (
          <option.icon />
        ) : (
          <img src={option.icon} alt={option.title} />
        )}
      </span>
      <span className="card-select__title">{option.title}</span>
      {option.info && <span className="card-select__info">{option.info}</span>}
    </div>
  );
}
