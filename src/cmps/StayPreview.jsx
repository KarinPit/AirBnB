import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { ImageCarousel } from "./ImageCarousel";

import starIcon from "../../public/star.svg";
import heartIcon from "../../public/heart.svg";

export function StayPreview({ stay }) {
  const [showArrows, setShowArrows] = useState(false);

  function handleMouseEnter() {
    setShowArrows(true);
  }

  function handleMouseLeave() {
    setShowArrows(false);
  }

  return (
    <>
      <ImageCarousel stay={stay} showArrows={showArrows} />

      <Link to={`/${stay._id}`}>
        <div
          className="actions"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`top-menu ${stay.isFavorite ? "favorite" : ""}`}>
            <p>Guest favorite</p>
            {/* <img className="whishlist-icon" src={heartIcon}></img> */}
          </div>
        </div>
      </Link>

      <div className="stay-info">
        <p className="location">
          {stay.loc.city}, {stay.loc.country}
        </p>
        <p className="distance">2,123 kilometers away</p>
        <p className="dates">May 3-8</p>
        <p className="price">
          <span>${stay.price}</span> night
        </p>

        <div className="rate">
          {/* <img src={starIcon}></img> */}
          <p>{stay?.reviews?.[0]?.rate}</p>
        </div>
      </div>
    </>
  );
}
