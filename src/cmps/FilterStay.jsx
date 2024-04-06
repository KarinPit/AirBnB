import React, { useState } from 'react';
import '../assets/styles/main.scss';

const FilterStay = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    query: '',
    checkIn: '',
    checkOut: '',
    guests: 0,
  });

  const handleInputChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="input-group">
          
          <input className='location-search'
            type="text"
            name="query"
            placeholder="Where"
            value={searchParams.query}
            onChange={handleInputChange}
          />
          <input className='check-in'
            type="date"
            name="checkIn"
            placeholder="Check-in"
            value={searchParams.checkIn}
            onChange={handleInputChange}
          />
          <input className='check-out'
            type="date"
            name="checkOut"
            placeholder="Check-out"
            value={searchParams.checkOut}
            onChange={handleInputChange}
          />
          <input className='add-guests'
            type="number"
            name="guests"
            placeholder="Who"
            value={searchParams.guests}
            onChange={handleInputChange}
          />
          <button type="submit" className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" 
                focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', 
                  stroke: 'currentColor', strokeWidth: 4 }}>
              <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterStay;
