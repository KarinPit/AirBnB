import CardSelectList from "../../cmps/CardSelect/CardSelectList";
import { Amenities } from "../../constants";
import React from "react";

export default function AmenitiesStep5() {
  return (
    <section className="amenities-step-5">
      <div className="amenities-step-5-head">
        <h1>Tell guests what your place has to offer</h1>
        <span>You can add more amenities after you publish your listing.</span>
      </div>
      <div className="amenities-step-5-list">
        <CardSelectList
          name="amenities"
          options={Amenities.createHost}
          multiSelect={true}
        />
      </div>
    </section>
  );
}
