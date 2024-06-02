import React, { useState } from 'react';
import { useSelector } from "react-redux";
import FilterStay from '../Header/FilterStay';
import '../../assets/styles/main.scss';

export default function MinimizedFilterStay({ toggleHeaderSize }) {
  const currentOrder = useSelector(storeState => storeState.orderModule.currentOrder);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className="minimized-filter-container">
      {isExpanded ? (
        <div className="minimized-filter-content">
          <FilterStay
            isMinimized={true}
            onSearch={(filters) => {
              console.log('Search with filters:', filters);
            }}
          />
        </div>
      ) : (
        <div className="minimized-search">
          <span className="minimized-search__option">
            <button onClick={toggleHeaderSize}>
              Anywhere
            </button>
          </span>
          <span className="minimized-search__option option-box">
            <button onClick={toggleExpand}>
              Any week
            </button>
          </span>
          <span className="minimized-search__option option-box">
            <button onClick={toggleExpand}>
                <span>Add guests</span>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 32 32" 
                    aria-hidden="true"
                    role="presentation" 
                    focusable="false"
                    style={{
                        marginLeft: "14px",
                        fill: "none",
                        height: "12px",
                        width: "12px",
                        stroke: "currentcolor",
                        strokeWidth: 5.33333,
                        overflow: "visible",
                        verticalAlign: "middle",
                    }}
                >
                    <path 
                        fill="none" 
                        d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
                    ></path>
                </svg>
            </button>
            </span>
        </div>
      )}
    </div>
  );
}