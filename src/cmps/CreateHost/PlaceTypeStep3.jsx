import React from "react";

import CardSelectList from "../../cmps/CardSelect/CardSelectList";
import { DoorIcon, HomeIcon, SharedRooms } from "../../services/svg.service";
const options = [
  {
    key: "1",
    title: "An entire place",
    info: "Guests have the whole place to themselves.",
    icon: HomeIcon,
  },
  {
    key: "2",
    title: "A room",
    info: "Guests have their own room in a home, plus access to shared spaces.",
    icon: DoorIcon,
  },
  {
    key: "3",
    title: "A shared room",
    info: "Guests sleep in a room or common area that may be shared with you or others.",
    icon: SharedRooms,
  },
];
export default function PlaceTypeStep3() {
  return (
    <section className="place-type-step-3">
      <h1>What type of place will guests have?</h1>
      <div className="place-type-step-3-list">
        <CardSelectList options={options} className="card" name="type" />
      </div>
    </section>
  );
}
