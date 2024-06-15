import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import '../../assets/styles/main.scss';
import { CalendarPicker } from '../General/CalendarPicker';
import GuestPickerMobile from './GuestPickerMobile'; // Assuming you have a GuestPicker component

const regions = [
  { name: 'United States', imageName: '/img/locations/united-state.png' },
  { name: 'Europe', imageName: '/img/locations/europe.png' },
  { name: 'Italy', imageName: '/img/locations/italy.png' },
  // Add other regions as needed
];

export default function MobileSearchLayout({ toggleExpand }) {
  const stay = useSelector(storeState => storeState.stayModule.stay);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [searchParams, setSearchParams] = useState({
    query: '',
    checkIn: '',
    checkOut: '',
    guestCounts: 0,
  });
  const [selectedRegion, setSelectedRegion] = useState('');

  const datePickerRef = useRef(null);
  const guestPickerRef = useRef(null);


  const handleDateChange = (start, end) => {
    setSearchParams(prev => ({ ...prev, checkIn: start, checkOut: end }));
    setShowDatePicker(false);
  };

  const handleGuestChange = (guests) => {
    setSearchParams(prev => ({ ...prev, guestCounts: guests }));
    setShowGuestPicker(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setSearchParams(prev => ({ ...prev, query: region }));
    setShowDatePicker(true);  // Toggle the date picker immediately
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [datePickerRef,guestPickerRef]);

  return (
    <div className="mobile-search-layout">
      <button className="close-button" onClick={toggleExpand}>X</button>
      <div className={`search-content ${selectedRegion ? 'region-selected' : ''}`}>
        <h2>Where to?</h2>
        {!selectedRegion ? (
          <>
            <div className="search-input">
              <input 
                type="text" 
                placeholder="Search destinations" 
                value={searchParams.query}
                onChange={(e) => setSearchParams({ ...searchParams, query: e.target.value })}
              />
            </div>
            <div className="search-options">
              {regions.map((region, index) => (
                <div key={index} className="search-option" onClick={() => handleRegionSelect(region.name)}>
                  <img src={region.imageName} alt={region.name} />
                  <span>{region.name}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
        <div className="selected-region">
            <span>Where</span>
            <button onClick={() => setSelectedRegion('')}>{selectedRegion}</button>
        </div>
        )}
      </div>
      <div className="date-input-wrapper">
        <div className="date-input" onClick={(e) => { e.stopPropagation(); setShowDatePicker(!showDatePicker); }}>
          <span>When</span>
          <button>{searchParams.checkIn && searchParams.checkOut ? `${searchParams.checkIn} - ${searchParams.checkOut}` : 'Add dates'}</button>
        </div>
        {showDatePicker && (
          <div className="picker-container" ref={datePickerRef} onClick={stopPropagation}>
            <CalendarPicker onChange={handleDateChange} additionalClass="mobile-search" />
          </div>
        )}
      </div>
      <div className="guest-input-wrapper">
        <div className="guest-input" onClick={() => setShowGuestPicker(!showGuestPicker)}>
            <span>Who</span>
            <button>{searchParams.guestCounts > 0 ? `${searchParams.guestCounts} guests` : 'Add guests'}</button>
        </div>
        {showGuestPicker && (
            <div className="picker-container" ref={guestPickerRef} onClick={stopPropagation}>
            <GuestPickerMobile onGuestChange={handleGuestChange} />
            </div>
        )}
      </div>
      <div className="search-actions">
        <button className="clear-button" onClick={() => setSearchParams({ query: '', checkIn: '', checkOut: '', guestCounts: 0 })}>Clear all</button>
        <button className="search-button">
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
          </svg>
          Search
        </button>
      </div>
    </div>
  );
}
