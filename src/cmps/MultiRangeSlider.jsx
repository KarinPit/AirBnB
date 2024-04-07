import React, { useState, useEffect } from "react";

const minDistance = 30;

export function MultiRangeSlider({ min, max, selectedRange, onChange }) {
  const [minVal, setMinVal] = useState(selectedRange.min);
  const [maxVal, setMaxVal] = useState(selectedRange.max);

  useEffect(() => {
    setMinVal(selectedRange.min);
    setMaxVal(selectedRange.max);
  }, [selectedRange]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal]);

  const handleMinChange = (e) => {
    const newValue = Math.min(Number(e.target.value), maxVal - minDistance);
    setMinVal(newValue);

    if (newValue > maxVal - minDistance) {
      setMaxVal(newValue + minDistance);
    }
  };

  const handleMaxChange = (e) => {
    const newValue = Math.max(Number(e.target.value), minVal + minDistance);
    setMaxVal(newValue);

    if (newValue < minVal + minDistance) {
      setMinVal(newValue - minDistance);
    }
  };

  const trackWidth = max - min;
  const adjustedLeft = Math.max(0, ((minVal - min) / trackWidth) * 100);
  const adjustedWidth = Math.min(
    100 - adjustedLeft,
    ((maxVal - minVal) / trackWidth) * 100
  );

  return (
    <div className="multi-range-slider">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={handleMinChange}
        className="thumb"
        style={{ zIndex: minVal > max - 100 ? 5 : 3 }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={handleMaxChange}
        className="thumb"
        style={{ zIndex: maxVal < min + 100 ? 5 : 3 }}
      />
      <div className="slider">
        <div className="slider__track" />
        <div
          className="slider__highlight"
          style={{
            left: `${adjustedLeft + 3}%`,
            width: `${adjustedWidth - 3}%`,
          }}
        />
      </div>
    </div>
  );
}
