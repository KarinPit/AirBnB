import React, { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { ImageCarousel } from "./ImageCarousel";

import starIcon from "../../../public/svg/star.svg";
import heartIcon from "../../../public/svg/heart.svg";

export function StayPreview({ stay }) {
  const [showArrows, setShowArrows] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function handleMouseEnter() {
    setShowArrows(true);
  }

  function handleMouseLeave() {
    setShowArrows(false);
  }

  function onStayClick() {
    // Handle click event
  }

  // Simulate loading
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  return (
    <>
      {isLoading ? (
        <Skeleton height={200} />
      ) : (
        <ImageCarousel stay={stay} showArrows={showArrows} />
      )}

      <Link to={`/stay/${stay._id}`}>
        <div
          className="actions"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`top-menu ${stay.host.isSuperHost ? "favorite" : ""}`}>
            {isLoading ? (
              <Skeleton width={100} />
            ) : (
              <p>Guest favorite</p>
            )}
            {isLoading ? (
              <Skeleton height={200} />
            ) : (
              <img className="whishlist-icon" src={heartIcon}></img>
            )}

          </div>
        </div>
      </Link>

      <div className="stay-info">
        <p className="location">
          {isLoading ? (
            <Skeleton width={150} />
          ) : (
            stay.loc?.city ? `${stay.loc.city}, ${stay.loc.country}` : stay.name
          )}
        </p>
        <p className="distance">{isLoading ? <Skeleton width={100} /> : "2,123 kilometers away"}</p>
        <p className="dates">{isLoading ? <Skeleton width={100} /> : "May 3-8"}</p>
        {isLoading ? (
          <Skeleton width={50} />
        ) : (<p className="price">
          <span>${stay.price} </span>
          night
        </p>
        )}


        <div className="rate">
          {isLoading ? (
            <Skeleton width={20} height={20} circle={true} />
          ) : (
            <img src={starIcon} alt="Star Icon" />
          )}
          {isLoading ? (
            <Skeleton width={30} />
          ) : (
            <p>{stay.reviews?.[0].moreRate.accuracy.toFixed(1)}</p>
          )}
        </div>
      </div>
    </>
  );
}
