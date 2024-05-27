import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setFilterBy, loadStays } from '../store/actions/stay.actions';
import { useEffectUpdate } from '../customHooks/useEffectUpdate';

import DatePicker from 'react-datepicker';
import GuestPicker from './GuestPicker'; // Import the new component

import {stayService} from "../services/stay.service.local"

import 'react-datepicker/dist/react-datepicker.css';
import '../assets/styles/main.scss';

const FilterStay = ({ isMinimize }) => {
  const regions = [
    { name: 'Asia', imageName: '/img/locations/asia.png' },
    { name: 'Europe', imageName: '/img/locations/europe.png' },
    { name: 'Greece', imageName: '/img/locations/greece.png' },
    { name: 'Italy', imageName: '/img/locations/italy.png' },
    { name: 'Flexible', imageName: '/img/locations/search-flexible.png' },
    { name: 'United States', imageName: '/img/locations/united-state.png' },
  ];

   // Function to manage focus
   const handleFocusChange = (focusType) => {
    // Depending on the focusType, set the state of other components
    switch (focusType) {
        case 'query':
            setShowRegionPicker(true);
            setShowGuestPicker(false);
            // setFocusedField(null);
            break;
        case 'guest':
            setShowGuestPicker(true);
            setShowRegionPicker(false);
            setFocusedField(null);
            break;
        case 'checkIn':
            setShowGuestPicker(false);
            setShowRegionPicker(false);
            break;
        case 'checkOut':
            setShowGuestPicker(false);
            setShowRegionPicker(false);
            break;
        default:
            // Handle default or when clicking outside (blur all)
            setShowGuestPicker(false);
            setShowRegionPicker(false);
            setFocusedField(null);
    }
};
   const updateGuestCount = (type, delta) => {
    setGuestCounts(prevCounts => ({
      ...prevCounts,
      [type]: Math.max(prevCounts[type] + delta, 0),
    }));
  };
  const [recentSearches, setRecentSearches] = useState(() => {
    // Retrieve saved searches from local storage or initialize with default values
    const savedSearches = localStorage.getItem('recentSearches');
    return savedSearches ? JSON.parse(savedSearches) : [
      { label: 'Europe', query: 'Europe', date: 'Month in Jun', icon: "/svg/watch-list.svg" }
    ];
  });

  const [searchParams, setSearchParams] = useState({
    query: '',
    checkIn: '',
    checkOut: '',
    guestCounts: 0,
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
  const dispatch = useDispatch();
  console.log("focusedField = ", focusedField);
 // Refs
 const wrapperRef = useRef(null);
 const endDatePickerRef = useRef(null);
 const startDatePickerRef = useRef(null);


 // Handlers
 const handleRegionSelect = (region) => {
   setSearchParams(prev => ({ ...prev, query: region }));
   setShowRegionPicker(false);
    setTimeout(() => startDatePickerRef.current.setFocus(), 0);
 };   

 
 const handleSelectRecentSearch = (search) => {
  console.log("search handleSelectRecentSearch", search);
  const checkInDate = search.startDate ? new Date(search.startDate) : null;
  const checkOutDate = search.endDate ? new Date(search.endDate) : null;
  //
  if (!isNaN(checkInDate) && !isNaN(checkOutDate)) {
    setSearchParams({
      query: search.label,
      checkIn: search.startDate,
      checkOut: search.endDate,
    });

    setStartDate(checkInDate);
    setEndDate(checkOutDate);
  }
};

 const handleStartDateChange = (date) => {
  setStartDate(date);
  // If startDate is after endDate, reset endDate
  if (date && endDate && date >= endDate) {
    setEndDate(null);
  }
  if (endDatePickerRef.current) {
    endDatePickerRef.current.setFocus();  // Focus on the end date picker
  }
};

  const handleEndDateChange = (date) => {
    setEndDate(date);
    // If endDate is before startDate, move startDate to the day before endDate
    if (startDate && date && startDate >= date) {
      setStartDate(new Date(date.getTime() - 86400000));
    }
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

const handleSubmit = async (e) => {
  e.preventDefault();
  const filters = {
      location: searchParams.query,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      guestCount: guestCounts.adults + guestCounts.children,
  };

  if (!recentSearches.find(search => search.query === searchParams.query)) {
    const newSearch = {
      label: searchParams.query,
      query: searchParams.query,
      startDate: startDate,
      endDate: endDate,
      icon: "/svg/watch-list.svg"
    };

    const updatedSearches = [newSearch, ...recentSearches];

    if (updatedSearches.length > 5) {
      updatedSearches.length = 5;
    }

    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  }
  setFilterBy(filters);
  await loadStays(); 
  console.log("filter", filters);
};


 const handleClickOutside = (event) => {
   if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
     setShowGuestPicker(false);
     setShowRegionPicker(false);
   }
 };

 useEffect(() => {
   document.addEventListener("mousedown", handleClickOutside);
   return () => {
     document.removeEventListener("mousedown", handleClickOutside);
   };
 }, []);

 return (
  <div
    className={`search-container ${!!focusedField ? "searchFocoused" : ""}`}
    ref={wrapperRef}
  >
    {/* <div className='mooving-bg'></div> */}
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <div className="input-container">
          <div className='search-box'>
            <div
              className={`test ${
                focusedField === "query"
                  ? "focused"
                  : focusedField != null
                  ? "unfocused"
                  : ""
              }`}
            ></div>
            <label htmlFor="location-search" className="input-label">
              Where
            </label>
            <input
                id="location-search"
                className="location-search"
                type="text"
                name="query"
                placeholder="Search destinations"
                value={searchParams.query}
                onChange={(e) => setSearchParams({ ...searchParams, query: e.target.value })}
                onFocus={() =>{
                  setFocusedField("query"); 
                  handleFocusChange('query');
                }}
                onBlur={() => setFocusedField(null)}
            />
          </div>
        </div>
        
        <div className="input-container check-in-container">
          <div className='checkIn-box'>
              <div
                className={`test ${
                  focusedField === "checkIn"
                    ? "focused"
                    : focusedField != null
                    ? "unfocused"
                    : ""
                }`}
              ></div>

              <label htmlFor="start-date-picker" className="input-label">
                Check in
              </label>
              <DatePicker
              ref={startDatePickerRef}
                className="date-picker-container"
                id="start-date-picker"
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                isClearable={true}
                placeholderText="Add dates"
                onFocus={() => {
                  setFocusedField('checkIn')
                  setShowRegionPicker(false)
                }}  
                onBlur={() => setFocusedField(null)}
              />
            </div>
        </div>
          <div className="input-container check-out-container">
            <div className='checkOut-box'>
              <div
                className={`test ${
                  focusedField === "checkOut"
                    ? "focused"
                    : focusedField != null
                    ? "unfocused"
                    : ""
                }`}
              ></div>
              <label htmlFor="end-date-picker" className="input-label">
                Check out
              </label>
              <DatePicker
                className="date-picker-container"
                ref={endDatePickerRef}
                  id="end-date-picker"
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                isClearable={true}
                placeholderText="Add dates"
                onFocus={() => {
                  setFocusedField("checkOut");
                  setShowRegionPicker(false);
                }}
                onBlur={() => setFocusedField(null)}
              />
            </div>
          </div>
        <div className="input-container guest-box-container">
          <div className='guest-box'>
          <div
            className={`test ${
              focusedField === "guest"
                ? "focused"
                : focusedField != null
                ? "unfocused"
                : ""
            }`}
          ></div>
          <div
            className={`guest-input-container `}
            onClick={toggleGuestPicker}
            onFocus={() => {
              setFocusedField("guest");
              setShowRegionPicker(false);
            }}
            onBlur={() => setFocusedField(null)}
          >
              <label htmlFor="add-guests" className="input-label">
                Who
              </label>
              <input
                id="add-guests"
                className="add-guests"
                type="text"
                readOnly
                value={
                  guestCounts.adults +
                  guestCounts.children +
                  guestCounts.infants > 0
                    ? `${
                      guestCounts.adults +
                      guestCounts.children +
                      guestCounts.infants
                    } guests`
                    : "Add guests"
                  }
              />
            </div>
            {showGuestPicker && (
              <div
                className="guest-picker-dropdown"
                onFocus={() => {
                  setFocusedField("guest");
                  handleFocusChange('guest');
                }}
                onBlur={() => setFocusedField(null)}
                onClick={stopPropagation}
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1001,
                }}
              >
                <GuestPicker
                  label="Adults"
                  count={guestCounts.adults}
                  onDecrease={(e) => {
                    e.stopPropagation();
                    updateGuestCount("adults", -1);
                  }}
                  onIncrease={(e) => {
                    e.stopPropagation();
                    updateGuestCount("adults", 1);
                  }}
                  disableDecrease={guestCounts.adults <=0 }
                />
                <GuestPicker
                  label="Children"
                  count={guestCounts.children}
                  onDecrease={(e) => {
                    e.stopPropagation();
                    updateGuestCount("children", -1);
                  }}
                  onIncrease={(e) => {
                    e.stopPropagation();
                    updateGuestCount("children", 1);
                  }}
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
        </div>
      </div>
      </div>
    </form>

    {/* Conditional rendering of region picker */}
    {showRegionPicker && (
      <div className={`region-picker ${showRegionPicker ? "active" : ""}`}>
        <div className="recent-searches">
          <h2>Recent Searches</h2>
          <div className="recent-search-list">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => {
                  handleSelectRecentSearch(search);
                  handleRegionSelect(search.query);
                  setShowRegionPicker(false);
                }}
                className="recent-search-item"
              >
                <img
                  src={search.icon}
                  alt={`${search.label} icon`}
                  className="recent-search-icon"
                />
                {search.label} - {search.startDate && new Date(search.startDate).toLocaleDateString()} to {search.endDate && new Date(search.endDate).toLocaleDateString()}
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
                className={`region-item ${
                  selectedRegion === region.name ? "selected" : ""
                }`}
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

          <button type="submit" className="search-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
            >
              <path
                fill="none"
                d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    )}
  </div>
);
      </form>
    </div>
  )
}

export default FilterStay;
