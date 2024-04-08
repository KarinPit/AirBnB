import React, { useState, useRef, useEffect } from 'react';
import GuestPicker from './GuestPicker'; // Import the new component

import '../assets/styles/main.scss';

const FilterStay = ({ onSearch }) => {
  const regions = [
    { name: 'Asia', imageName: '/img/locations/asia.png' },
    { name: 'Europe', imageName: '/img/locations/europe.png' },
    { name: 'Greece', imageName: '/img/locations/greece.png' },
    { name: 'Italy', imageName: '/img/locations/italy.png' },
    { name: 'Flexible', imageName: '/img/locations/search-flexible.png' },
    { name: 'United States', imageName: '/img/locations/united-state.png' },
  ];
   // Update guest count function
   const updateGuestCount = (type, delta) => {
    setGuestCounts(prevCounts => ({
      ...prevCounts,
      [type]: Math.max(prevCounts[type] + delta, 0),
    }));
  };
  const [recentSearches] = useState([
    { label: 'Europe', query: 'Europe', date: 'Month in Jun' },
    // Add more recent searches as needed
  ]);
  // Combined state for search parameters, removed redundant states
  const [searchParams, setSearchParams] = useState({
    query: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });
  const [guestCounts, setGuestCounts] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [showRegionPicker, setShowRegionPicker] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');

 // Refs
 const wrapperRef = useRef(null);

 // Handlers
 const handleRegionSelect = (region) => {
   setSearchParams(prev => ({ ...prev, query: region }));
   setShowRegionPicker(false);
 };

 const handleInputChange = (e) => {
   setSearchParams(prev => ({ ...prev, [e.target.name]: e.target.value }));
 };

 const handleFocus = (inputName) => {
   if (inputName === 'query') {
     setShowRegionPicker(true);
   }
 };
 const toggleGuestPicker = (e) => {
  e.stopPropagation();
  setShowGuestPicker(prev => !prev);
};
 const stopPropagation = (e) => {
  e.stopPropagation();
};

 const handleSubmit = (e) => {
   e.preventDefault();
   onSearch?.(searchParams);
 };

 const handleClickOutside = (event) => {
   if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
     setShowGuestPicker(false);
     setShowRegionPicker(false);
   }
 };

 // Effect Hooks
 useEffect(() => {
   document.addEventListener("mousedown", handleClickOutside);
   return () => {
     document.removeEventListener("mousedown", handleClickOutside);
   };
 }, []);

  return (
    <div className="search-container" ref={wrapperRef}>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <div className={`input-container ${showRegionPicker ? 'active' : ''}`}>
          <input
            className='location-search'
            type="text"
            name="query"
            placeholder="Where"
            value={searchParams.query}
            onChange={handleInputChange}
            onFocus={() => handleFocus('query')}
          />
          </div>
          <input
            className='check-in'
            type="date"
            name="checkIn"
            value={searchParams.checkIn}
            onChange={handleInputChange}
          />
          <input
            className='check-out'
            type="date"
            name="checkOut"
            value={searchParams.checkOut}
            onChange={handleInputChange}
          />
          <div
            className={`guest-input-container ${showGuestPicker ? 'active' : ''}`}
            onClick={toggleGuestPicker}
          >
            <input
              className='add-guests'
              type="text"
              readOnly
              value={`${guestCounts.adults + guestCounts.children + guestCounts.infants} guests`}
            />
            {/* Guest Picker Dropdown */}
            {showGuestPicker && (
              <div className="guest-picker-dropdown" onClick={stopPropagation} style={{ position: 'absolute', top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)', zIndex: 1001 }}>
                {/* Adults */}
                <GuestPicker
                label="Adults"
                count={guestCounts.adults}
                onDecrease={(e) => { e.stopPropagation(); updateGuestCount('adults', -1); }}
                onIncrease={(e) => { e.stopPropagation(); updateGuestCount('adults', 1); }}
                disableDecrease={guestCounts.adults <= 1}
              />
              <GuestPicker
                label="Children"
                count={guestCounts.children}
                onDecrease={(e) => { e.stopPropagation(); updateGuestCount('children', -1); }}
                onIncrease={(e) => { e.stopPropagation(); updateGuestCount('children', 1); }}
                disableDecrease={guestCounts.children <= 0}
              />
              </div>
            )}
          </div>
          <button type="submit" className="search-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: 'block',
                fill: 'none',
                height: '16px',
                width: '16px',
                stroke: 'currentColor',
                strokeWidth: 4,
              }}
            >
              <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
            </svg>
          </button>
        </div>
      </form>

      {/* Conditional rendering of region picker */}
      {showRegionPicker && (
        <div className={`region-picker ${showRegionPicker ? 'active' : ''}`}>
          <div className="recent-searches">
            <h2>Recent Searches</h2>
            <div className="recent-search-list">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleRegionSelect(search.query);
                    setShowRegionPicker(false);
                  }}
                >
                  {search.label} - {search.date}
                </button>
              ))}
            </div>
          </div>
          <div className="search-by-region">
            <h2>Search by Region</h2>
            <div className="region-grid">
              {regions.map((region) => (
                <div
                  key={region.name}
                  className={`region-item ${selectedRegion === region.name ? 'selected' : ''}`}
                  onClick={() => {
                    handleRegionSelect(region.name);
                    setShowRegionPicker(false);
                  }}
                >
                  <img src={region.imageName} alt={region.name} />
                  <div className="region-label">{region.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default FilterStay;
