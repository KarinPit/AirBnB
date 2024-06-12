import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom/dist';
import { format, intervalToDuration } from 'date-fns'

import { showErrorMsg, showSuccessMsg } from '../../services/other/event-bus.service.js';
import { login, logout, signup } from '../../store/actions/user.actions.js';
import { saveOrder } from '../../store/actions/order.actions.js';
import { orderService } from '../../services/order/order.service.local'
// import { orderService } from '../../services/order/order.service'
import { stayService } from '../../services/stay/stay.service.local'
// import { stayService } from '../../services/stay/stay.service'
import { LoginSignup } from '../Header/LoginSignup.jsx';


export default function OrderPreview() {
  const [currentOrder, setCurrentOrder] = useState(null)
  const [currentStay, setCurrentStay] = useState(null)
  const [loggedUser, setLoggedUser] = useState(null)
  const { stayId } = useParams();
  const navigate = useNavigate()
  const cleaningFee = 10
  const airbnbFee = 25


  function createOrder() {
    const order = {
      hostId: currentStay.host._id,
      buyer: {
        _id: loggedUser._id,
        fullname: loggedUser.fullname,
      },
      totalPrice: currentStay.price * intervalToDuration({
        start: currentOrder.range.start,
        end: currentOrder.range.end
      }).days - cleaningFee - airbnbFee
      ,
      startDate: currentOrder.range.start,
      endDate: currentOrder.range.end,
      guests: { ...currentOrder.guests },
      stay: {
        _id: currentStay._id,
        name: currentStay.name,
        price: currentStay.price,
      },
      msgs: [],
      status: "pending",
    }

    saveOrder(order)
    navigate(`/profile/buyer/${loggedUser._id}`)
  }

  async function onLogin(credentials) {
    try {
      const user = await login(credentials);
      showSuccessMsg(`Welcome: ${user.fullname}`);
    } catch (err) {
      showErrorMsg('Cannot login');
    }
  }

  async function onSignup(credentials) {
    try {
      const user = await signup(credentials);
      showSuccessMsg(`Welcome new user: ${user.fullname}`);
    } catch (err) {
      showErrorMsg('Cannot signup');
    }
  }

  async function onLogout() {
    try {
      await logout();
      showSuccessMsg(`Bye now`);
    } catch (err) {
      showErrorMsg('Cannot logout');
    }
  }


  useEffect(() => {
    if ('loggedinUser' in sessionStorage) {
      const loggedUser = JSON.parse(sessionStorage.loggedinUser)
      setLoggedUser(loggedUser)
    }

    orderService.queryCurrentOrder()
      .then((order) => {
        setCurrentOrder(order)
      })
      .catch((err) => {
        console.log('err in loading current order in the stay details', err)
      })

    stayService.getById(stayId)
      .then((stay) => {
        setCurrentStay(stay)
      })
      .catch((err) => {
        console.log('err in loading current stay in the order preview', err)
      })

  }, []);


  if (!currentStay) return ''

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
                <p><strong>Guests</strong>: {Object.entries(currentOrder.guests)
                  .filter(([key, count]) => count > 0)
                  .map(([key, count]) => count > 0 ? `${count} ${key}` : '')
                  .join(', ')}</p>
              </div>

              <div className="payment-summary">
                <h3>Pay with</h3>
                <p>Card ending in 9926</p>
              </div>

              {loggedUser ?
                <button className="confirm-btn" onClick={createOrder}>Confirm and pay</button>
                : <><LoginSignup onLogin={onLogin} onSignup={onSignup} /></>
              }
            </div>
          </div>

          <div className="order-details">
            <div className="stay-details">
              <img src={currentStay.imgUrls[0]} alt={currentStay.name} />
              <div className='stay-detail-container'>
                <p className='stay-name'>{currentStay.name}</p>
                <p className='stay-type'> {currentStay.type}</p>
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
                  <p className='stay-reviews'>{currentStay.reviews[0].moreRate.accuracy.toFixed(1)} ({currentStay.reviews.length} reviews)</p>
                </div>
              </div>
            </div>

            <div className="stay-info">
              <div className='stay-info-container'>
                <div className='stay-info-container-title'>
                  <p>Price details</p>
                </div>
                <div className='stay-info-price-container'>
                  <p>Accommodation: ${currentStay.price * intervalToDuration({
                    start: currentOrder.range.start,
                    end: currentOrder.range.end
                  }).days}</p>
                  <p>Taxes: ${cleaningFee + airbnbFee}</p>
                  <p>Total: ${currentStay.price * intervalToDuration({
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

