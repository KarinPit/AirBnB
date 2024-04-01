import React from 'react';

export function StayDetails({ id }) {
    return (
        <div>
            {/* Render the property details using the id prop */}
            <h1>Stay Details</h1>
            <p>Stay ID: {id}</p>
            {/* Add more property details rendering here */}
        </div>
    )
}
