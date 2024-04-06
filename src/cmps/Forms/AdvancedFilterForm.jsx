import React, { useState } from "react";
import { PriceRange } from "../PriceRange";
import ButtonGroup from "../ButtonsGroup";
const typePlaces = [
  { key: "any", label: "Any type" },
  { key: "room", label: "Room" },
  { key: "entire", label: "Entire home" },
];

export default function AdvancedFilterForm() {
  const [selectedType, setSelectedType] = useState("any");

  const handleSelect = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="advanced-filter">
      <section>
        <div className="advanced-filter-content">
          <h2 className="advanced-filter-title">Type of place</h2>
          <p className="advanced-filter-subtitle">
            Search rooms, entire homes, or any type of place
          </p>
          <ButtonGroup
            options={typePlaces}
            className="advanced-filter__type-places"
            value={selectedType}
            handleClick={handleSelect}
          />
        </div>
      </section>
      <section>
        <div className="advanced-filter-content">
          <h2 className="advanced-filter-title">Price range</h2>
          <p className="advanced-filter-subtitle">
            Nightly prices including fees and taxes
          </p>
          <PriceRange />
        </div>
      </section>
    </div>
  );
}
