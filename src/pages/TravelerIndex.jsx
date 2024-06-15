import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom/dist';

import { loadOrders } from '../store/actions/order.actions'
import { format } from 'date-fns';



export default function TravelerIndex() {
  const user = useSelector(storeState => storeState.userModule.user);
  const orders = useSelector(storeState => storeState.orderModule.orders)
  const navigate = useNavigate()

  useEffect(() => {
    if (!sessionStorage.loggedinUser) {
      console.log('no user');
      navigate("/")
    }
    else {
      loadOrders()
    }
  }, [user, navigate])

  return (
    <div className="reservations">
      <h1>Welcome, {user.fullname.split(' ')[0]}!</h1>
      <h2>Trips</h2>
      <h3>Upcoming reservations</h3>

      <div className='buyer-reservations'>
        <div className='upcoming'>
          <div className='order-summary'>
            <h3>Budapest</h3>
            <p>Entire apartement hosted by booboo</p>
          </div>

          <div className='order-dates'>
            <p>17 Jun- 20 Jun</p>
            <p>2024</p>
          </div>

          <div className='order-location'>
            <p>Budapest, delibalo utca 14</p>
            <p>Budapest</p>
            <p>Hungary</p>
          </div>

          <div className='order-images'>
            <img></img>
            <img></img>
            <img></img>
          </div>
        </div>

        <div className='buyer-history'>
          <h3>WHere you've been</h3>

          <div>
            <img></img>
            <div>
              <h3>Funchal</h3>
              <p>Hosted by lolo</p>
              <p>21 Aug 2023- 4 Setp 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};



