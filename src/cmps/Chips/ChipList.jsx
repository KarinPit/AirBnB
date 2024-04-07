import React from "react";
import Chip from "./Chip";

export function ChipList({ name, options }) {
  return (
    <div className="chip-list-wrapper">
      <div className="chip-list-title">
        <h3>{name}</h3>
      </div>
      <div className="chip-list">
        {options.map((option, index) => (
          <Chip key={index} option={option} />
        ))}
      </div>
    </div>
  );
}
