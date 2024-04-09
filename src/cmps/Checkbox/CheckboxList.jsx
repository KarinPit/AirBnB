import React, { useState } from "react";

import { useFormikContext } from "formik";

import Checkbox from "./Checkbox";

export default function CheckboxList({ options, fieldName }) {
  const [isShowMore, setIsShowMore] = useState(false);
  const { values, setFieldValue } = useFormikContext();

  const handleCheckboxChange = (item) => {
    const currentIndex = values[fieldName].indexOf(item);
    const newValues = [...values[fieldName]];

    if (currentIndex === -1) {
      newValues.push(item);
    } else {
      newValues.splice(currentIndex, 1);
    }

    setFieldValue(fieldName, newValues);
  };

  return (
    <div className="checkbox-list">
      {options
        .slice(0, isShowMore ? options.length : 1)
        .map(({ category, items }) => (
          <div key={category}>
            <h3 className="checkbox-list-title">{category}</h3>
            <div className="checkbox-list-items">
              {items.slice(0, isShowMore ? items.length : 4).map((item) => {
                const isChecked = values[fieldName].includes(item);
                return (
                  <Checkbox
                    key={item}
                    id={item.replace(/\s+/g, "-").toLowerCase()}
                    label={item}
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(item)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      <button
        className="checkbox-show-more"
        onClick={() => setIsShowMore((prev) => !prev)}
        type="button"
      >
        <span>{isShowMore ? "Show less" : "Show more"}</span>
      </button>
    </div>
  );
}
