import React, { useState } from 'react';

const GuestPickerMobile = ({ onGuestChange }) => {
  const [guestCounts, setGuestCounts] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const updateGuestCount = (type, delta) => {
    setGuestCounts(prevCounts => {
      const updatedCounts = {
        ...prevCounts,
        [type]: Math.max(prevCounts[type] + delta, 0),
      };
      onGuestChange(updatedCounts);
      return updatedCounts;
    });
  };

  return (
    <div className="guest-picker">
      <h2>Who's coming?</h2>
      <div className="guest-category">
        <span>Adults</span>
        <button onClick={() => updateGuestCount('adults', -1)}>-</button>
        <span>{guestCounts.adults}</span>
        <button onClick={() => updateGuestCount('adults', 1)}>+</button>
      </div>
      <div className="guest-category">
        <span>Children</span>
        <button onClick={() => updateGuestCount('children', -1)}>-</button>
        <span>{guestCounts.children}</span>
        <button onClick={() => updateGuestCount('children', 1)}>+</button>
      </div>
      <div className="guest-category">
        <span>Infants</span>
        <button onClick={() => updateGuestCount('infants', -1)}>-</button>
        <span>{guestCounts.infants}</span>
        <button onClick={() => updateGuestCount('infants', 1)}>+</button>
      </div>
      <div className="guest-category">
        <span>Pets</span>
        <button onClick={() => updateGuestCount('pets', -1)}>-</button>
        <span>{guestCounts.pets}</span>
        <button onClick={() => updateGuestCount('pets', 1)}>+</button>
      </div>
    </div>
  );
};

export default GuestPickerMobile;
