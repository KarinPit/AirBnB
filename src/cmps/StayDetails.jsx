import React from "react";
import { useEffect, useState } from "react";
import { OrderSideBar } from "./OrderSideBar";

import { stayService } from "../services/stay.service.local";

import StarIcon from "../../public/star.svg";
import profileImg from "../../public/Albert.jpg";
import doorIcon from "../../public/door.svg";
import medalIcon from "../../public/medal.svg";
import pawIcon from "../../public/paw.svg";
import rightArrow from "../../public/arrow-right-black.svg";

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

      <div className="main-desc">
        <div className="stay-desc">
          <h2>
            {stay.type} in {stay.loc.city}, {stay.loc.country}
          </h2>
          <div>
            <p>
              {stay.capacity} guests &middot; {stay.amenities[0]} &middot;{" "}
              {stay.amenities[1]}
            </p>
            <div className="review-summary">
              <div>
                <img src={StarIcon}></img>
                <p>{stay.reviews[0].rate}</p>
              </div>
              <p>&middot; </p>
              <p className="review-score">
                {stay.reviews.length}{" "}
                {stay.reviews.length === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>

          <div className="stay-summary">
            <div className="host-info">
              <img src={profileImg}></img>
              <div>
                <h3 className="hosted-by">Hosted by {stay.host.fullname}</h3>
                <p className="host-experience">
                  Superhost &middot; 7 years hosting
                </p>
              </div>
            </div>

            <div className="more-info">
              <div className="main-amenities">
                <div className="amenity">
                  <div className="amenity-img">
                    <img src={pawIcon}></img>
                  </div>

                  <div className="amenity-info">
                    <h3>Furry friends welcome</h3>
                    <p>Bring your pets along for the stay.</p>
                  </div>
                </div>

                <div className="amenity">
                  <div className="amenity-img">
                    <img src={doorIcon}></img>
                  </div>

                  <div className="amenity-info">
                    <h3>Self check-in</h3>
                    <p>Check yourself in with the keypad.</p>
                  </div>
                </div>

                <div className="amenity">
                  <div className="amenity-img">
                    <img src={medalIcon}></img>
                  </div>

                  <div className="amenity-info">
                    <h3>{stay.host.fullname} is a Superhost</h3>
                    <p>Superhosts are experienced, highly rated Hosts.</p>
                  </div>
                </div>
              </div>

              <div className="full-desc">
                <p>{stay.summary}</p>
                <button>
                  <p>Show more</p>
                  <img src={rightArrow}></img>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="order-stay">
          <OrderSideBar price={stay.price} />
        </div>
      </div>
    </>
  );
}
