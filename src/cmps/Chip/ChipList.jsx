import React from "react";

import { useFormikContext } from "formik";

import { Chip } from "./Chip";

export function ChipList({ label, name, options }) {
  const { values, setFieldValue } = useFormikContext();

  const handleSelect = (option) => {
    const newValue = option === values[name] ? "" : option;
    setFieldValue(name, newValue);
  };

  return (
    <>
      <h3 className="chip-list-title">{label}</h3>
      <div className="chip-list">
        {options.map((option) => (
          <Chip
            key={option.key}
            option={option.label}
            name={name}
            isSelected={option.label === values[name]}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </>
  );
}
