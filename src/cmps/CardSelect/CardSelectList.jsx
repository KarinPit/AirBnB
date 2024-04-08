import { useFormikContext } from "formik";

import { CardSelect } from "./CardSelect";

export default function CardSelectList({ options, name }) {
  const { values, setFieldValue } = useFormikContext();

  const handleSelect = (selectedOption) => {
    if (name === "guest_favorite") {
      setFieldValue(name, !values[name]);
    } else if (name === "l2_property_type_ids") {
      const currentValues = values[name] || [];
      if (currentValues.includes(selectedOption.title)) {
        setFieldValue(
          name,
          currentValues.filter((item) => item !== selectedOption.title)
        );
      } else {
        setFieldValue(name, [...currentValues, selectedOption.title]);
      }
    } else {
      const newValue =
        selectedOption.title === values[name] ? null : selectedOption.title;
      setFieldValue(name, newValue);
    }
  };

  return options.map((option) => (
    <CardSelect
      key={option.title}
      option={option}
      isSelected={
        name === "guest_favorite"
          ? values[name]
          : (values[name] || []).includes(option.title)
      }
      onSelect={() => handleSelect(option)}
    />
  ));
}
