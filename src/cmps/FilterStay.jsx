import React, { useState, useRef, useEffect } from 'react';

import DatePicker from 'react-datepicker';
import GuestPicker from './GuestPicker'; // Import the new component


import 'react-datepicker/dist/react-datepicker.css';
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
    {
      label: 'Europe'
      , query: 'Europe'
      , date: 'Month in Jun'
      , icon: "/svg/watch-list.svg"
    },
  ]);

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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dates, setDates] = useState([null, null]);
  const [focusedField, setFocusedField] = useState(null);

  // Refs
  const wrapperRef = useRef(null);

  // Handlers
  const handleRegionSelect = (region) => {
    setSearchParams(prev => ({ ...prev, query: region }))
    setShowRegionPicker(false)
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    // If startDate is after endDate, reset endDate
    if (date && endDate && date >= endDate) {
      setEndDate(null)
    }
  }

  const handleEndDateChange = (date) => {
    setEndDate(date);
    // If endDate is before startDate, move startDate to the day before endDate
    if (startDate && date && startDate >= date) {
      setStartDate(new Date(date.getTime() - 86400000));
    }
  }

  const handleInputChange = (e) => {
    setSearchParams(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFocus = (inputName) => {
    if (inputName === 'query') {
      setShowRegionPicker(true);
      setFocusedField(inputName)
    }
  }

  const toggleGuestPicker = (e) => {
    e.stopPropagation()
    setShowGuestPicker(prev => !prev)
  }

  const stopPropagation = (e) => {
    e.stopPropagation()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(searchParams)
  }

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowGuestPicker(false);
      setShowRegionPicker(false);
    }
  }

  // Effect Hooks
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`search-container ${focusedField ? 'focused' : ''}`} ref={wrapperRef}>
      {/* <div className='mooving-bg'></div> */}
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <div className={`input-container location-search-container 
          ${showRegionPicker ? 'active' : ''} ${focusedField === 'query' ? 'focused' : focusedField != null ? 'unfocused' : ''}`}>
            <div className='inner-input-container'>
              <label htmlFor="location-search" className='input-label'>Where</label>
              <input
                id='location-search'
                className='location-search'
                type="text"
                name="query"
                placeholder="Search destinations"
                value={searchParams.query}
                onChange={handleInputChange}
                onFocus={() => handleFocus('query')
                }
                onBlur={() => setFocusedField(null)}
              />
            </div>
          </div>

          <div className={`input-container start-date ${focusedField === 'checkIn' ? 'focused' : focusedField != null ? 'unfocused' : ''}`}>
            <div className='inner-input-container'>
              <label htmlFor="start-date-picker" className='input-label'>Check in</label>
              <DatePicker
                className="date-picker-container"
                id='start-date-picker'
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                isClearable={true}
                placeholderText="Add dates"
                onFocus={() => {
                  setFocusedField('checkIn');
                  setShowRegionPicker(false);
                }}
                onBlur={() => setFocusedField(null)}
              />
            </div>
          </div>

          <div className={`input-container end-date ${focusedField === 'checkOut' ? 'focused' : focusedField != null ? 'unfocused' : ''}`}>
            <div className='inner-input-container'>
              <label htmlFor="end-date-picker" className='input-label'>Check out</label>
              <DatePicker
                className="date-picker-container"
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                isClearable={true}
                placeholderText="Add dates"
                onFocus={() => {
                  setFocusedField('checkOut');
                  setShowRegionPicker(false);
                }}
                onBlur={() => setFocusedField(null)}
              />
            </div>
          </div>

          <div
            className={`guest-input-container ${focusedField === 'guest-input' ? 'focused' : focusedField != null ? 'unfocused' : ''}`}
            onClick={toggleGuestPicker}
            onFocus={() => {
              setFocusedField('guest-input');
              setShowRegionPicker(false);
            }}
            onBlur={() => setFocusedField(null)}
          >
            <div className='add-guests-container'>
              <label htmlFor="add-guests" className='input-label'>Who</label>
              <input
                id='add-guests'
                className="add-guests"
                type="text"
                readOnly
                value={`${guestCounts.adults + guestCounts.children + guestCounts.infants} guests`}
              />
            </div>
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
                  className="recent-search-item"
                >
                  <img src={search.icon} alt={`${search.label} icon`} className="recent-search-icon" />
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
