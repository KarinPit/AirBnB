import React from "react";
import { useFormikContext } from "formik";
import { CardSelect } from "./CardSelect";

function flattenOptions(options) {
  return options.reduce((acc, optionGroup) => {
    if (optionGroup.items && Array.isArray(optionGroup.items)) {
      const items = optionGroup.items.map((item) => ({
        ...item,
        category: optionGroup.title || optionGroup.category,
      }));
      return [...acc, ...items];
    }
    return [...acc, optionGroup];
  }, []);
}

export default function CardSelectList({
  options,
  name,
  multiSelect = false,
  className = "",
}) {
  const { values, setFieldValue } = useFormikContext();

  // Flatten options for either scenario
  const flatOptions = flattenOptions(options);
  const handleSelect = (option) => {
    const fieldPath = multiSelect ? `${name}` : name;
    const currentValues = values[fieldPath] || [];

    if (multiSelect) {
      if (currentValues.includes(option.title)) {
        setFieldValue(
          fieldPath,
          currentValues.filter((value) => value !== option.title)
        );
      } else {
        setFieldValue(fieldPath, [...currentValues, option.title]);
      }
    } else {
      setFieldValue(name, option.title === values[name] ? null : option.title);
    }
  };

  return flatOptions.map((option) => (
    <CardSelect
      className={className}
      key={option.title}
      option={option}
      isSelected={
        multiSelect
          ? (values[name] || []).includes(option.title)
          : values[name] === option.title
      }
      onSelect={() => handleSelect(option)}
    />
  ));
}
