import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { setFilterBy, loadStays } from "../../store/actions/stay.actions";
import { loadCurrentOrder } from "../../store/actions/order.actions";
import { FilterStaySkeleton } from "./Skeleton/FilterStaySkeleton";
import { useOutsideClick } from "../../customHooks/useOutsideClick";
import { CalendarPicker } from "../../cmps/General/CalendarPicker";
import GuestPicker from "./GuestPicker";
import { updateCurrentOrder } from "../../store/actions/order.actions";

import {
  filterStayInfo,
  getFilterValue,
  guestPickerData,
  regions,
} from "./helper";
import { InputContainer } from "../../cmps/FilterStay/InputContainer";
import RegionPicker from "../../cmps/FilterStay/RegionPicker";
import SeachFilterButton from "../../cmps/Buttons/SeachFilterButton";

export function FilterStay({ isMinimize, changeMinimizeFilter }) {
  const currentOrder = useSelector(
    (storeState) => storeState.orderModule.currentOrder
  );
  const [currentOrderDebug, setCurrentOrderDebug] = useState(
    currentOrder || null
  );
  const [showRegionPicker, setShowRegionPicker] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [showCheckInDatePicker, setShowCheckInDatePicker] = useState(false);

  const isLoading = useSelector(
    (storeState) => storeState.stayModule.isLoading
  );
  const wrapperRef = useRef(null);

  const [searchParams, setSearchParams] = useState({
    query: "",
    checkIn: "",
    checkOut: "",
    guestCounts: 0,
  });

  const [guestCounts, setGuestCounts] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  useEffect(() => {
    // loadCurrentOrder();
  }, []);

  useEffect(() => {
    updateCurrentOrder(currentOrderDebug);
  }, [currentOrderDebug]);

  useOutsideClick(wrapperRef, () => {
    setFocusedIndex(null);
    setFocusedField(null);
    setShowRegionPicker(false);
    setShowGuestPicker(false);
    setShowCheckInDatePicker(false);
  });

  const [recentSearches, setRecentSearches] = useState(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    return savedSearches
      ? JSON.parse(savedSearches)
      : [
        {
          label: "Europe",
          query: "Europe",
          date: "Month in Jun",
          icon: "/svg/watch-list.svg",
        },
      ];
  });

  function onChangeCurrentOrder(key, value) {
    setCurrentOrderDebug((prev) => ({ ...prev, [key]: value }));
  }

  function updateGuestCount(type, delta) {
    setGuestCounts((prevCounts) => {
      const updatedCounts = {
        ...prevCounts,
        [type]: Math.max(prevCounts[type] + delta, 0),
      };

      onChangeCurrentOrder("guests", updatedCounts);
      return updatedCounts;
    });
  }

  const handleFocusChange = (focusType, index) => {
    setFocusedField(focusType);
    setFocusedIndex(index);
    switch (focusType) {
      case "checkIn":
      case "checkOut":
        setShowCheckInDatePicker(true);
        setShowGuestPicker(false);
        setShowRegionPicker(false);
        break;
      case "guestCounts":
        setShowCheckInDatePicker(false);
        setShowGuestPicker(true);
        setShowRegionPicker(false);
        break;
      case "query":
        setShowCheckInDatePicker(false);
        setShowGuestPicker(false);
        setShowRegionPicker(true);
        break;
      default:
        setShowCheckInDatePicker(false);
        setShowGuestPicker(false);
        setShowRegionPicker(false);
        break;
    }
  };

  const handleSubmit = async (e) => {
    // handleFocusChange();
    e.preventDefault();
    const filters = {
      location: searchParams.query,
      startDate: format(currentOrderDebug.range.start, "yyyy-MM-dd"),
      endDate: format(currentOrderDebug.range.end, "yyyy-MM-dd"),
      guestCount:
        guestCounts.adults +
        guestCounts.children +
        guestCounts.infants +
        guestCounts.pets,
    };

    if (!recentSearches.find((search) => search.query === searchParams.query)) {
      const newSearch = {
        label: searchParams.query,
        query: searchParams.query,
        startDate: format(currentOrderDebug.range.start, "yyyy-MM-dd"),
        endDate: format(currentOrderDebug.range.end, "yyyy-MM-dd"),
        icon: "/svg/watch-list.svg",
        guestCounts: searchParams.guestCounts,
      };

      const updatedSearches = [newSearch, ...recentSearches];

      if (updatedSearches.length > 5) {
        updatedSearches.length = 5;
      }

      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    }
    setFilterBy(filters);
    await loadStays();
  };

  if (isLoading) return <FilterStaySkeleton />;
  if (isMinimize) {
    return (
      <div
        className="filter-stay-minimized"
        onClick={() => changeMinimizeFilter(false)}
      >
        <button>Anywhere</button>
        <span className="separator"></span>
        <button>Any Week</button>
        <span className="separator"></span>
        <button>Add guests</button>
        <SeachFilterButton />
      </div>
    );
  }

  return (
    <div className={`search-container`}>
      <form className="search-form" onSubmit={handleSubmit} ref={wrapperRef}>
        {filterStayInfo.map((filter, index) => {
          const value = getFilterValue(filter, currentOrderDebug);
          const isFocused = focusedField === filter.value;
          const isNextFocused = focusedIndex === index + 1;
          const isPrevFocused = focusedIndex === index - 1;

          return (
            <div
              onClick={() => handleFocusChange(filter.value, index)}
              className={`input-container ${isFocused ? "focused" : ""} ${isNextFocused ? "next-focused" : ""
                } ${isPrevFocused ? "prev-focused" : ""}`}
              key={index}
            >
              <InputContainer
                label={filter.label}
                value={value}
                description={filter.description}
                isSearch={filter.isSearch}
              />
            </div>
          );
        })}
        <SeachFilterButton />
        {showRegionPicker && (
          <RegionPicker
            showRegionPicker={showRegionPicker}
            recentSearches={recentSearches}
            regions={regions}
            handleRegionSelect={(query, search) => {
              onChangeCurrentOrder("query", query);
            }}
          />
        )}

        {showCheckInDatePicker && (
          <div className="calendar-container">
            <CalendarPicker
              onChange={(range) => onChangeCurrentOrder("range", range)}
              showCalendarPicker={showCheckInDatePicker}
            />
          </div>
        )}
        {showGuestPicker && (
          <div className="guest-picker-dropdown">
            {guestPickerData.map((picker, index) => (
              <GuestPicker
                key={index}
                label={picker.label}
                count={guestCounts[picker.type]}
                onDecrease={() => updateGuestCount(picker.type, -1)}
                onIncrease={() => updateGuestCount(picker.type, 1)}
                disableDecrease={guestCounts[picker.type] <= 0}
              />
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default FilterStay;
