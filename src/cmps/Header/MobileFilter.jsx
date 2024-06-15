import React, { useState } from 'react';
import { useSelector } from "react-redux";
import FilterStay from '../Header/FilterStay';
import '../../assets/styles/main.scss';
import MobileSearchLayout from './MobileSearchLayout';

export default function MobileFilter({ toggleHeaderSize }) {
  const currentOrder = useSelector(storeState => storeState.orderModule.currentOrder);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className="minimized-mobile-filter-container">
      {isExpanded ? (
        <div className="minimized-mobile-filter-content">
            <MobileSearchLayout toggleExpand={toggleExpand} /> 
        </div>
      ) : (
        <div className="minimized-mobile-search" onClick={toggleExpand}>
          <div className="mobile-search-icon">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M10.5 3A7.5 7.5 0 0010.5 18A7.5 7.5 0 0010.5 3m0-1a8.5 8.5 0 110 17 8.5 8.5 0 010-17zm8.89 16.475l3.925 3.925-1.415 1.415-3.925-3.925 1.415-1.415z"></path>
            </svg>
          </div>
          <div className="mobile-search-placeholder">
            <span>Where to?</span>
            <span className="mobile-search-details">Anywhere · Any week · Add guests</span>
          </div>
        </div>
      )}
    </div>
  );
}
