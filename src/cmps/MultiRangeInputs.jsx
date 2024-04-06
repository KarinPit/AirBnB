import React from "react";

export default function MultiRangeInputs({ min, max }) {
  return (
    <div className="multi-range-inputs">
      <div className="input-wrapper">
        <span className="currency-symbol">₪</span>
        <input className="input" value={min.toLocaleString()} />
      </div>
      <div className="dash"></div>
      <div className="input-wrapper">
        <span className="currency-symbol">₪</span>
        <input className="input" value={max.toLocaleString() + "+"} />
      </div>
    </div>
  );
}
