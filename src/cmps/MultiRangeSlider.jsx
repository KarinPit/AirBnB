import React, { useState, useEffect, useRef } from "react";

export function MultiRangeSlider({ min, max, onChange }) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  // Calculate the percentage position for the labels
  const getPercent = (value) => Math.round(((value - min) / (max - min)) * 100);

  // Calculate the left position based on value
  const getLeft = (value) => `${getPercent(value)}%`;

  // Update the range whenever the values change
  useEffect(() => {
    if (range.current) {
      range.current.style.left = getLeft(minVal);
      range.current.style.width = getLeft(maxVal - minVal);
    }
  }, [minVal, maxVal]);

  // When the range values change, call the passed onChange function
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="multi-range-slider">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={(e) => {
          const value = Math.min(Number(e.target.value), maxVal - 1);
          setMinVal(value);
          onChange({ min: value, max: maxVal });
        }}
        className="thumb"
        style={{ zIndex: minVal > max - 100 ? 5 : 3 }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={(e) => {
          const value = Math.max(Number(e.target.value), minVal + 1);
          setMaxVal(value);
          onChange({ min: minVal, max: value });
        }}
        className="thumb"
      />
      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
      </div>
    </div>
  );
}
