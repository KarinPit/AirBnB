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
      <h2>Reservations</h2>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Guests</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Booked</th>
            <th>Listing</th>
            <th>Total Payout</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.map((order, index) => {
            // console.log(order.buyer._id, user._id);
            if (order.buyer._id !== user._id) return null; // Only show orders for the current user
            return (
              <tr key={order._id || index}>
                <td className={`status-${order.status.toLowerCase()}`}>{String(order.status)}</td>
                <td>{order.guests ? Object.entries(order.guests)
                  .filter(([key, count]) => count > 0)
                  .map(([key, count]) => count > 0 ? `${count} ${key}` : '')
                  .join(', ') : ''}</td>
                <td>{format(order.startDate, 'd.M.yyyy')}</td>
                <td>{format(order.endDate, 'd.M.yyyy')}</td>
                <td>{order.stay.name}</td>
                <td>{order.totalPrice}</td>
                <td>{order.totalPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <label htmlFor="rows-per-page">Rows per page:</label>
        <select id="rows-per-page">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <span>1-4 of 4</span>
        <button>Prev</button>
        <button>Next</button>
      </div>
    </div>
  )
};



