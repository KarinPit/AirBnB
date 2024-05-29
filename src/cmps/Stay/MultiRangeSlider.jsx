import React, { useEffect } from "react";
import { useFormikContext } from "formik";

const minDistance = 30;

export function MultiRangeSlider({ min, max }) {
  const { values, setFieldValue } = useFormikContext();
  const minVal = values.price_min;
  const maxVal = values.price_max;

  // Ensure the min and max values are updated in Formik when the component mounts or the external min/max props change.

  const handleMinChange = (e) => {
    const newValue = Math.min(Number(e.target.value), maxVal - minDistance);
    setFieldValue("price_min", newValue);

    if (newValue > maxVal - minDistance) {
      setFieldValue("price_max", newValue + minDistance);
    }
  };

  const handleMaxChange = (e) => {
    const newValue = Math.max(Number(e.target.value), minVal + minDistance);
    setFieldValue("price_max", newValue);

    if (newValue < minVal + minDistance) {
      setFieldValue("price_min", newValue - minDistance);
    }
  };

  const trackWidth = max - min;
  const adjustedLeft = Math.max(0, ((minVal - min) / trackWidth) * 100);
  const adjustedWidth = Math.min(
    100 - adjustedLeft,
    ((maxVal - minVal) / trackWidth) * 100
  );

  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={handleMinChange}
        className="thumb"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={handleMaxChange}
        className="thumb"
      />
      <div className="slider">
        <div className="slider__track" />
        <div
          className="slider__highlight"
          style={{
            left: `${adjustedLeft}%`,
            width: `${adjustedWidth}%`,
          }}
        />
      </div>
    </div>
  );
}