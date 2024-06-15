import React from "react";

const RegionPicker = ({
  showRegionPicker,
  recentSearches,
  regions,
  handleRegionSelect,
}) => {
  return (
    <div className={`region-picker ${showRegionPicker ? "active" : ""}`}>
      <div className="recent-searches">
        <h2>Recent Searches</h2>
        <div className="recent-search-list">
          {recentSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => {
                handleRegionSelect(search.query, search);
              }}
              className="recent-search-item"
            >
              <img
                src={search.icon}
                alt={`${search.label} icon`}
                className="recent-search-icon"
              />
              {search.label} -{" "}
              {search.startDate &&
                new Date(search.startDate).toLocaleDateString()}{" "}
              to{" "}
              {search.endDate && new Date(search.endDate).toLocaleDateString()}
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
              className="region-item"
              onClick={() => {
                handleRegionSelect(region.name);
              }}
            >
              <img src={region.imageName} alt={region.name} />
              <div className="region-label">{region.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionPicker;
