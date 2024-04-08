import React, { useCallback, useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { MultiRangeSlider } from "./MultiRangeSlider";
import MultiRangeInputs from "./MultiRangeInputs";

export function PriceRange() {
  const { setFieldValue, values } = useFormikContext();
  const stays = useSelector((state) => state.stayModule.stays);
  const minPriceFromStore = useSelector((state) => state.stayModule.min);
  const maxPriceFromStore = useSelector((state) => state.stayModule.max);

  const [priceHistogram, setPriceHistogram] = useState([]);
  const [priceBounds, setPriceBounds] = useState({
    min: values.price_min || minPriceFromStore,
    max: values.price_max || maxPriceFromStore,
  });

  useEffect(() => {
    setFieldValue("price_min", minPriceFromStore);
    setFieldValue("price_max", maxPriceFromStore);
    setPriceBounds({ min: minPriceFromStore, max: maxPriceFromStore });
  }, [minPriceFromStore, maxPriceFromStore, setFieldValue]);

  useEffect(() => {
    const histogram = calculatePriceHistogram(priceBounds.min, priceBounds.max);
    setPriceHistogram(histogram);
  }, [priceBounds, stays]);

  const calculatePriceHistogram = useCallback(
    (minPrice, maxPrice) => {
      const numSteps = 50;
      const stepSize = (maxPrice - minPrice) / numSteps;
      let priceSteps = [];
      for (let i = 0; i < numSteps; i++) {
        const start = minPrice + i * stepSize;
        const end = minPrice + (i + 1) * stepSize;
        const count = stays.filter(
          (stay) =>
            stay.price >= start &&
            (stay.price < end || (i === numSteps - 1 && stay.price === end))
        ).length;
        priceSteps.push({ range: `${start}-${end}`, count });
      }
      return priceSteps;
    },
    [stays]
  );

  const handleRangeChange = useCallback(
    (newRange) => {
      setFieldValue("price_min", newRange.min);
      setFieldValue("price_max", newRange.max);
      setPriceBounds(newRange);
    },
    [setFieldValue]
  );

  const maxHeight = 50;
  return (
    <div className="price-range">
      <div className="histogram">
        {priceHistogram.map((item, index) => {
          const [rangeStart] = item.range.split("-").map(Number);
          const isInSelectedRange =
            rangeStart >= values.price_min && rangeStart <= values.price_max;

          let translateY;
          if (item.count > 0) {
            translateY = `translateY(${maxHeight / item.count}px)`;
          } else {
            translateY = `translateY(100px)`;
          }

          return (
            <div
              key={index}
              className="bar"
              style={{
                transform: translateY,
                backgroundColor: isInSelectedRange
                  ? "rgb(34, 34, 34)"
                  : "rgb(221, 221, 221)",
              }}
            ></div>
          );
        })}
      </div>
      <MultiRangeSlider
        min={priceBounds.min}
        max={priceBounds.max}
        selectedRange={{ min: values.price_min, max: values.price_max }}
        onChange={handleRangeChange}
      />
      <MultiRangeInputs
        min={values.price_min}
        max={values.price_max}
        onRangeChange={handleRangeChange}
      />
    </div>
  );
}
