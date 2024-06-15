import React from "react";
const SeachFilterButton = () => {
  return (
    <button type="submit" className="search-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          fill: "none",
          height: "16px",
          width: "16px",
          stroke: "currentColor",
          strokeWidth: 4,
        }}
      >
        <path
          fill="none"
          d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
        ></path>
        <span className="search-label">Search</span>
      </svg>
    </button>
  );
};
export default SeachFilterButton;
