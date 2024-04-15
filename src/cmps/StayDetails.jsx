import React from "react";
import { useEffect, useState } from "react";
import { OrderSideBar } from "./OrderSideBar";

import { stayService } from "../services/stay.service.local";

import saveIcon from "../../public/heart-b&w.svg";
import shareIcon from "../../public/share.svg";

export function StayDetails({ stayId }) {
  const [stay, setStay] = useState(null);

  useEffect(() => {
    if (stayId) loadStay();
  }, []);

  async function loadStay() {
    try {
      const stay = await stayService.getById(stayId);
      setStay(stay);
    } catch (err) {
      console.log("Had issues loading the stay", err);
    }
  }

  if (!stay) return <div>Loading..</div>;
  return (
    <>
      <div className="stay-header">
        <h1>{stay.name}</h1>
        <div className="stay-header-actions">
          <a>
            <img src={shareIcon}></img>
            <p>Share</p>
          </a>
          <a>
            <img src={saveIcon}></img>
            <p>Save</p>
          </a>
        </div>
      </div>

      <div className="stay-img-gallery">
        {stay.imgUrls.map((img, idx) => {
          if (idx <= 5) {
            return (
              <img
                key={idx}
                src={img}
                className={idx === 0 ? "main-img" : ""}
                alt={`Description ${idx + 1}`}
              />
            );
          }
          return null;
        })}
        <div className="overlay"></div>
      </div>

      <div className="stay-desc">
        <h2>
          {stay.type} in {stay.loc.city}, {stay.loc.country}
        </h2>
        <div>
          <p>
            {stay.capacity} guests &middot; {stay.amenities[0]} &middot;{" "}
            {stay.amenities[1]}
          </p>
          <p>{stay.reviews.length} review</p>
        </div>
        <p>Hosted by {stay.host.fullname}</p>
        <p>Free cancellation for 48 hours</p>
        <p>Self check-in</p>
        <p>Great communication</p>
        <p>{stay.summary}</p>
        <OrderSideBar />
      </div>
    </>
  );
}
