import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from "react-redux";
import { setFilterBy, loadStays } from '../../store/actions/stay.actions';
import GuestPicker from '../Header/GuestPicker';
import { CalendarPicker } from '../General/CalendarPicker';
import { updateCurrentOrder } from '../../store/actions/order.actions';
import { format,isValid } from 'date-fns';
import { loadCurrentOrder } from '../../store/actions/order.actions';



export function FilterStay({ isMinimize }) {
  const [currentOrderDebug, setCurrentOrderDebug] = useState(null)
  const [showRegionPicker, setShowRegionPicker] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [startDatePick, setStartDatePick] = useState(null);
  const [endDatePick, setEndDatePick] = useState(null);
  const [showCheckInDatePicker, setShowCheckInDatePicker] = useState(false);
  const [showCheckOutDatePicker, setShowCheckOutDatePicker] = useState(false);


  function onChangeCurrentOrder(key, value) {
    setCurrentOrderDebug(prev => ({ ...prev, [key]: value }))
  }

  function updateGuestCount(type, delta) {
    setGuestCounts(prevCounts => {
      const updatedCounts = {
        ...prevCounts,
        [type]: Math.max(prevCounts[type] + delta, 0),
      };

      onChangeCurrentOrder('guests', updatedCounts)
      return updatedCounts
    });
  };

  // Refs
  const startDate = useRef(null);
  const endDate = useRef(null);
  const wrapperRef = useRef(null);

  // Countries and Filters
  const regions = [
    { name: 'Asia', imageName: '/img/locations/asia.png' },
    { name: 'Europe', imageName: '/img/locations/europe.png' },
    { name: 'Greece', imageName: '/img/locations/greece.png' },
    { name: 'Italy', imageName: '/img/locations/italy.png' },
    { name: 'Flexible', imageName: '/img/locations/search-flexible.png' },
    { name: 'United States', imageName: '/img/locations/united-state.png' },
  ];

  const [recentSearches, setRecentSearches] = useState(() => {
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
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  // Handlers
  const handleFocusChange = (focusType) => {
    switch (focusType) {
      case 'query':
        setShowRegionPicker(true);
        setShowGuestPicker(false);
        setShowCheckInDatePicker(false);
        setShowCheckOutDatePicker(false);
        break;
      case 'guest':
        setShowRegionPicker(false);
        setShowCheckInDatePicker(false);
        setShowCheckOutDatePicker(false);
        break;
      case 'checkIn':
        setShowGuestPicker(false);
        setShowRegionPicker(false);
        setShowCheckOutDatePicker(false);
        break;
      case 'checkOut':
        setShowCheckInDatePicker(true);
        setShowRegionPicker(false);
        setShowGuestPicker(false);
        break;
      default:
        setShowCheckInDatePicker(false);
        setShowCheckOutDatePicker(false);
        setShowGuestPicker(false);
        setShowRegionPicker(false);
        setFocusedField(null);
    }
  };


  const handleRegionSelect = (region) => {
    setSearchParams(prev => ({ ...prev, query: region }));
    setShowRegionPicker(false);
  };

  const handleStartDateChange = ({ start, end }) => {
    const startDate = start;
    const endDate = end;
    console.log("date handleStartDateChange", isValid(startDate));
    if (isValid(startDate)) {
      console.log("date handleStartDateChange", startDate);
      setStartDatePick(startDate);
      setEndDatePick(endDate);
      setSearchParams(prev => ({
        ...prev,
        checkIn: startDate,
        checkOut: endDate
      }));
      if (startDate && endDate && startDate >= endDate) {
        setEndDatePick(null);
        setSearchParams(prev => ({
          ...prev,
          checkOut: null
        }));
      }
      if (endDatePickerRef.current) {
        endDatePickerRef.current.setFocus();
      }
    } else {
      console.log(" date else !! null handleStartDateChange");
      setStartDatePick(null);
      setSearchParams(prev => ({
        ...prev,
        checkIn: null
      }));
    }
  };

  const handleSelectRecentSearch = (search) => {
    const checkInDate = search.startDate ? new Date(search.startDate) : null;
    const checkOutDate = search.endDate ? new Date(search.endDate) : null;
    if (!isNaN(checkInDate) && !isNaN(checkOutDate)) {
      setSearchParams({
        query: search.label,
        checkIn: search.startDate,
        checkOut: search.endDate,
        guestCounts: search.guests || 0,
      });

      setStartDatePick(checkInDate);
      setEndDatePick(checkOutDate);
    }
    const updatedOrder = {
      query: search.label,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guestCounts: search.guests || '0'
    };
    // updateCurrentOrder(updatedOrder)
    localStorage.setItem('currentOrder', JSON.stringify(updatedOrder))
    updateCurrentOrder({ updatedOrder});

  };

  const toggleGuestPicker = (e) => {
    e.stopPropagation();
    setShowGuestPicker(prev => !prev);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = async (e) => {
    handleFocusChange();
    e.preventDefault();
    const filters = {
      location: searchParams.query,
      startDate: startDatePick.toISOString().split('T')[0],
      endDate: endDatePick.toISOString().split('T')[0],
      guestCount: guestCounts.adults + guestCounts.children + guestCounts.infants + guestCounts.pets,
    };

    if (!recentSearches.find(search => search.query === searchParams.query)) {
      const newSearch = {
        label: searchParams.query,
        query: searchParams.query,
        startDate: startDatePick,
        endDate: endDatePick,
        icon: "/svg/watch-list.svg",
        guestCounts: searchParams.guestCounts,
      };

      const updatedSearches = [newSearch, ...recentSearches];

      if (updatedSearches.length > 5) {
        updatedSearches.length = 5;
      }

      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    }
    setFilterBy(filters)
    await loadStays()
    updateCurrentOrder(filters)
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowGuestPicker(false);
      setShowCheckInDatePicker(false);
      setShowCheckOutDatePicker(false);
      setShowRegionPicker(false);
      handleFocusChange();
    }
  };

  useEffect(() => {
    if (currentOrderDebug) {
      updateCurrentOrder(currentOrderDebug)
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currentOrderDebug]);


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
                className={`test ${focusedField === "query"
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
                onFocus={() => {
                  setFocusedField("query");
                  handleFocusChange('query');
                }}
                onBlur={() => setFocusedField(null)}
              />
            </div>
          </div>

          <div className="input-container check-in-container" ref={startDate}

          >
            <div className='checkIn-box'>
              <div
                className={`test ${focusedField === "checkIn"
                  ? "focused"
                  : focusedField != null
                    ? "unfocused"
                    : ""
                  }`}
              ></div>
              <div onClick={() => {
                // stopPropagation();

                setShowCheckInDatePicker(true)
                setFocusedField('checkIn')
                setShowRegionPicker(false)
                setShowCheckOutDatePicker(false)
                setShowGuestPicker(false)
              }}>
                <label htmlFor="start-date-picker" className="input-label">
                  Check in
                </label>
                <div className='label-dates-selected'>
                {startDatePick ? (
                      <p>{format(startDatePick, 'dd/MM/yyyy')}</p>
                    ) : (
                      <p className='label-dates'>Add dates</p>
                  )}
                </div>

                {showCheckInDatePicker && (
                  <CalendarPicker
                  onChange={handleStartDateChange}
                    // onChange={(range) => onChangeCurrentOrder('range', range)}
                    showCalendarPicker={showCheckInDatePicker}

                  />
                )}
              </div>
            </div>
          </div>

          <div className="input-container check-out-container" ref={endDate}>
            <div className='checkOut-box'>
              <div
                className={`test ${focusedField === "checkOut"
                  ? "focused"
                  : focusedField != null
                    ? "unfocused"
                    : ""
                  }`}
              ></div>
              <div onClick={() => {
                {
                  // stopPropagation();
                  setShowCheckInDatePicker(true)
                  setFocusedField('checkOut')
                }
              }
              }>
                <label htmlFor="end-date-picker" className="input-label">
                  Check out
                </label>
                <div className='label-dates-selected'>
                {endDatePick ? (
                  <p>{format(endDatePick, 'dd/MM/yyyy')}</p>
                ) : (
                  <p className='label-dates'>Add dates</p>
                )}
                </div>
                {showCheckOutDatePicker && (
                  <CalendarPicker
                  onChange={handleStartDateChange}
                  showCalendarPicker={showCheckOutDatePicker}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="input-container guest-box-container">
            <div className='guest-box'>
              <div
                className={`test ${focusedField === "guest"
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
                  handleFocusChange('guest');
                  setShowRegionPicker(false);
                  setShowCheckInDatePicker(false);
                  setShowCheckOutDatePicker(false);
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
                      ? `${guestCounts.adults +
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
                    onDecrease={() => updateGuestCount('adults', -1)}
                    onIncrease={() => updateGuestCount('adults', 1)}
                    disableDecrease={guestCounts.adults <= 0}
                  />

                  <GuestPicker
                    label="Children"
                    count={guestCounts.children}
                    onDecrease={() => {
                      updateGuestCount("children", -1);
                    }}
                    onIncrease={() => {
                      updateGuestCount("children", 1);
                    }}
                    disableDecrease={guestCounts.children <= 0}
                  />

                  <GuestPicker
                    label="Infants"
                    count={guestCounts.infants}
                    onDecrease={() => {

                      updateGuestCount("infants", -1);
                    }}
                    onIncrease={() => {
                      updateGuestCount("infants", 1);
                    }}
                    disableDecrease={guestCounts.infants <= 0}
                  />

                  <GuestPicker
                    label="Pets"
                    count={guestCounts.pets}
                    onDecrease={() => {
                      updateGuestCount("pets", -1);
                    }}
                    onIncrease={() => {
                      updateGuestCount("pets", 1);
                    }}
                    disableDecrease={guestCounts.pets <= 0}
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
                  className={`region-item ${selectedRegion === region.name ? "selected" : ""
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
          </div>
        </div>
      )}
    </div>
  );

}

export default FilterStay;