import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom/dist';
import { useSelector } from 'react-redux';
import { format, intervalToDuration } from 'date-fns'

import { saveOrder } from '../../store/actions/order.actions';

export default function OrderPreview({ stayId }) {
  const currentOrder = useSelector(storeState => storeState.orderModule.currentOrder);
  const stay = useSelector(storeState => storeState.stayModule.stay);
  const navigate = useNavigate()
  const cleaningFee = 10
  const airbnbFee = 25


  function createOrder() {
    const loggedUser = JSON.parse(sessionStorage.loggedinUser)

    const order = {
      hostId: stay.host._id,
      buyer: {
        _id: loggedUser._id,
        fullname: loggedUser.fullname,
      },
      totalPrice: stay.price * intervalToDuration({
        start: currentOrder.range.start,
        end: currentOrder.range.end
      }).days - cleaningFee - airbnbFee
      ,
      startDate: currentOrder.range.start,
      endDate: currentOrder.range.end,
      guests: { ...currentOrder.guests },
      stay: {
        _id: stay._id,
        name: stay.name,
        price: stay.price,
      },
      msgs: [],
      status: "pending",
    }

    saveOrder(order)
    navigate(`/profile/buyer/${loggedUser._id}`)
  }



  if (!stay) return <div>LOADING</div>
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
                <p><strong>Dates</strong>: {format(currentOrder.range.start, 'd.MM.yyyy')} - {format(currentOrder.range.end, 'd.MM.yyyy')}</p>
                {/* <p><strong>Guests</strong>: {`${currentOrder.guests.adults} adults`} {}</p> */}
                <p><strong>Guests</strong>: {Object.entries(currentOrder.guests)
                  .filter(([key, count]) => count > 0)
                  .map(([key, count]) => count > 0 ? `${count} ${key}` : '')
                  .join(', ')}</p>
                {/* <button> Edit</button> */}
              </div>
              <div className="payment-summary">
                <h3>Pay with</h3>
                <p>Card ending in 9926</p>
                {/* Add card edit option if needed */}
              </div>
              <button className="confirm-btn" onClick={createOrder}>Confirm and pay</button>

            </div>
          </div>
          <div className="order-details">
            <div className="stay-details">
              <img src={stay.imgUrls[0]} alt={stay.name} />
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
                  <p className='stay-reviews'>{stay.reviews[0].moreRate.accuracy.toFixed(1)} ({stay.reviews.length} reviews)</p>

                </div>
              </div>
            </div>
            <div className="stay-info">
              <div className='stay-info-container'>
                <div className='stay-info-container-title'>
                  <p>Price details</p>
                </div>
                <div className='stay-info-price-container'>
                  <p>Accommodation: ${stay.price * intervalToDuration({
                    start: currentOrder.range.start,
                    end: currentOrder.range.end
                  }).days}</p>
                  <p>Taxes: ${cleaningFee + airbnbFee}</p>
                  <p>Total: ${stay.price * intervalToDuration({
                    start: currentOrder.range.start,
                    end: currentOrder.range.end
                  }).days - cleaningFee - airbnbFee}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

