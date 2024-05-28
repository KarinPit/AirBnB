import React, { useState } from 'react';
import '../../assets/styles/main.scss';


export default function MinimizedFilterStay() {

    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className="minimized-filter-container">
            {isExpanded ? (
                <div className="minimized-filter-content">
                    <FilterStay
                        isMinimized={true}
                        onSearch={(filters) => {
                            // Handle search with filters
                            console.log('Search with filters:', filters);
                            // You can add additional logic here
                        }}
                    />
                </div>
            ) : (
                <div className="minimized-search">
                    <div
                        className="minimized-search__option"
                        onClick={toggleExpand}
                    >
                        Anywhere
                    </div>
                    <div className="minimized-search__option option-box">Any week</div>
                    <div className="minimized-search__option option-box">Add guests</div>
                    <button onClick={toggleExpand} className="minimized-search__button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{
                                display: "block",
                                fill: "none",
                                height: "12px",
                                width: "12px",
                                stroke: "currentColor",
                                strokeWidth: 4,
                            }}
                        >
                            <path
                                fill="none"
                                d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
                            ></path>
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};
