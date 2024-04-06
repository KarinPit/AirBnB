import React, { useEffect, useState } from "react";
import { dummyStays } from "../demoData";
import { MultiRangeSlider } from "./MultiRangeSlider";
import MultiRangeInputs from "./MultiRangeInputs";

export function PriceRange() {
  const [priceHistogram, setPriceHistogram] = useState([]);
  const [selectedRange, setSelectedRange] = useState({ min: 0, max: 1000 });

  const maxBarHeight = 100;
  const maxCount = Math.max(...priceHistogram.map((item) => item.count));
  const scaleFactor = maxBarHeight / maxCount;

  useEffect(() => {
    const prices = dummyStays.map((stay) => stay.price);
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);

    const numSteps = 10;
    const stepSize = Math.ceil((maxPrice - minPrice) / numSteps);
    let priceSteps = Array.from(
      { length: numSteps },
      (_, i) => minPrice + i * stepSize
    );

    priceSteps.push(maxPrice);

    const histogram = priceSteps
      .map((start, index) => {
        if (index === priceSteps.length - 1) return null;
        const end = priceSteps[index + 1];
        const count = dummyStays.filter(
          (stay) =>
            stay.price >= start && (stay.price < end || stay.price === maxPrice)
        ).length;
        return { range: `${start}-${end}`, count };
      })
      .filter(Boolean);

    setPriceHistogram(histogram);
  }, []);

  return (
    <div className="price-range">
      <div className="histogram">
        {priceHistogram.map((item, index) => {
          const [rangeStart] = item.range.split("-").map(Number);
          const isInSelectedRange =
            rangeStart >= selectedRange.min && rangeStart <= selectedRange.max;
          return (
            <div
              key={index}
              className="bar"
              style={{
                height: `${Math.min(item.count * scaleFactor, maxBarHeight)}px`,
                backgroundColor: isInSelectedRange
                  ? "rgb(34, 34, 34)"
                  : "rgb(221, 221, 221)",
              }}
            ></div>
          );
        })}
      </div>
      <div className="price-range-slider">
        <MultiRangeSlider
          min={Math.min(...dummyStays.map((stay) => stay.price))}
          max={Math.max(...dummyStays.map((stay) => stay.price))}
          onChange={setSelectedRange}
        />
        <MultiRangeInputs min={selectedRange.min} max={selectedRange.max} />
      </div>
    </div>
  );
}
