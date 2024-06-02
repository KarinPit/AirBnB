import React from 'react';
import { useSelector } from 'react-redux';

const OrderPreview = ({ stayId }) => {
  const currentOrder = useSelector(storeState => storeState.orderModule.currentOrder);
  const stay = useSelector(storeState => storeState.stayModule.stay);
  console.log('stay', stay);
  console.log('currentOrder', currentOrder);
  const stayDetails = {
    name: "Aiora Luxury Villa 2",
    type: "Entire villa",
    location: "Afantou, Greece",
    guests: 5,
    bedrooms: 3,
    beds: 2,
    baths: 2,
    reviews: {
      rating: 5.0,
      count: 14
    },
    price: 50270,
    dates: {
      checkIn: "Jun 24, 2024",
      checkOut: "Jul 22, 2024"
    },
    total: 49480,
    imgUrl: "path_to_image" // replace with actual image path
  };

  return (
    <div className="order-preview">
      <div className='order-header'>
        <div className='order-header-container'>
        <h2>Confirm and pay</h2>
        </div>
      </div>
      <div className="order-preview-container">
      <div className="order-summary">
        <div className="trip-summary">
          <div className='trip-summary-container'>
            <div className="trip-details">
              <h3>Your trip</h3>
              <button> Edit</button>
              <p><strong>Dates</strong>: {stayDetails.dates.checkIn} - {stayDetails.dates.checkOut}</p>
              <p><strong>Guests</strong>: {stayDetails.guests} guests</p>
              <button> Edit</button>
            </div>
            <div className="payment-summary">
              <h3>Pay with</h3>
              <p>Card ending in 9926</p>
              {/* Add card edit option if needed */}
            </div>
            <button className="confirm-btn">Confirm and pay</button>

          </div>
      </div>
      <div className="order-details">
        <div className="stay-details">
          <img src={stay.imgUrls} alt={stay.name} />
          <div className='stay-detail-container'>
            <p className='stay-name'>{stay.name}</p>
            <p className='stay-type'> {stay.type}</p>
            <div className='stay-review-container'>
              <svg xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 32 32" 
                    aria-hidden="true" 
                    role="presentation" 
                    focusable="false" 
                    display="block" 
                    height="12px" 
                    width="12px" 
                    fill="currentColor">
                    <path 
                        fillRule="evenodd" 
                        d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z">
                    </path>
                </svg>
                <p className='stay-reviews'>{stayDetails.reviews.rating} ({stayDetails.reviews.count} reviews)</p>
              
            </div>
          </div>
        </div>
          <div className="stay-info">
            <div className='stay-info-container'>
              <div className='stay-info-container-title'>
                <p>Price details</p>
              </div>
              <div className='stay-info-price-container'>
                <p>Accommodation: ₪{stayDetails.price}</p>
                <p>Taxes: ₪{stayDetails.total - stayDetails.price}</p>
                <p>Total: ₪{stayDetails.total}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default OrderPreview;
