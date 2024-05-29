import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders, updateOrder } from '../store/actions/order.actions'



export default function RenterIndex() {
  const user = useSelector(storeState => storeState.userModule.user);
  const orders = useSelector(storeState => storeState.orderModule.orders)
  const dispatch = useDispatch()


  useEffect(() => {
    loadOrders()
  }, [])

  async function onUpdateOrder(order, status) {
    console.log(order);
    const orderToSave = { ...order, status }
    try {
      const savedOrder = await updateOrder(orderToSave)
    } catch (err) {
      console.log('Cannot update car')
    }
  }
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.map((order, index) => {
            if (order.hostId !== user._id) return null; 
            return (
              <tr key={order._id || index}>
                <td className={`status-${order.status.toLowerCase()}`}>{String(order.status)}</td>
                <td>{`Adults ${order.guests.adults} Kids: ${order.guests.kids}`}</td>
                <td>{order.startDate}</td>
                <td>{order.endDate}</td>
                <td>{order.stay.name}</td>
                <td>{order.totalPrice}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.status === 'pending' ? (
                    <select
                      value={order.status}
                      onChange={(e) => onUpdateOrder(order, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Declined">Declined</option>
                    </select>
                  ) : (
                    order.status
                  )}
                </td>
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
}

{/* <td className={`${order.action === 'Declined' || order.action === 'Approved' ? 'disabled' : ''}`}>{order.action}</td> */ }