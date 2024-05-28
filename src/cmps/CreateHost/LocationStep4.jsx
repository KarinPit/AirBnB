import React from "react";

import Map from "../General/Map";

export default function LocationStep4() {
  return (
    <section className="location-step-4">
      <div className="location-step-4-head">
        <h1>Where's your place located?</h1>
        <span>
          Your address is only shared with guests after they’ve made a
          reservation.
        </span>
      </div>
      <Map />
    </section>
  );
}
