import React from "react";

import { useFormikContext } from "formik";

import { PriceRange } from "../PriceRange";
import ButtonGroup from "../ButtonsGroup";
import CardSelectList from "../CardSelect/CardSelectList";
import {
  Amenities,
  PropertyType,
  RoomTypes,
  RoomsAndBeds,
  TopTierStays,
} from "../../constants";
import { ChipList } from "../Chip/ChipList";
import CheckboxList from "../Checkbox/CheckboxList";

export default function AdvancedFilterForm() {
  const { handleSubmit } = useFormikContext();

  return (
    <form
      id="advancedFilterForm"
      className="advanced-filter"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <section>
        <div className="advanced-filter-content">
          <div className="advanced-filter-head">
            <h2 className="advanced-filter-title">Type of place</h2>
            <p className="advanced-filter-subtitle">
              Search rooms, entire homes, or any type of place
            </p>
          </div>
          <ButtonGroup
            options={RoomTypes}
            className="advanced-filter__type-places"
            name="room_types"
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
      <section>
        <div className="advanced-filter-content">
          <h2 className="advanced-filter-title advanced-filter__no-subtittle">
            Rooms and beds
          </h2>
          <div className="advanced-filter__chip-list">
            <ChipList
              label="Bedrooms"
              name="min_bedrooms"
              options={RoomsAndBeds}
            />
            <ChipList label="Beds" name="min_beds" options={RoomsAndBeds} />

            <ChipList
              label="Bathrooms"
              name="min_bathrooms"
              options={RoomsAndBeds}
            />
          </div>
        </div>
      </section>
      <section>
        <div className="advanced-filter-content">
          <h2 className="advanced-filter-title advanced-filter__no-subtittle">
            Top-tier stays
          </h2>
          <div className="advanced-filter__top-tier">
            <CardSelectList name="guest_favorite" options={TopTierStays} />
          </div>
        </div>
      </section>
      <section>
        <div className="advanced-filter-content">
          <h2 className="advanced-filter-title advanced-filter__no-subtittle">
            Property type
          </h2>
          <div className="advanced-filter__property-type">
            <CardSelectList
              name="l2_property_type_ids"
              options={PropertyType}
            />
          </div>
        </div>
      </section>
      <section>
        <div className="advanced-filter-content">
          <h2 className="advanced-filter-title advanced-filter__no-subtittle">
            Amenities
          </h2>
          <div className="">
            <CheckboxList fieldName="amenities" options={Amenities.filter} />
          </div>
        </div>
      </section>
    </form>
  );
}
