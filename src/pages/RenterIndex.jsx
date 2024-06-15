import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom/dist';
import { useDispatch, useSelector } from 'react-redux'

import { loadOrders, updateOrder } from '../store/actions/order.actions'
import { format } from 'date-fns';



export default function RenterIndex() {
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

  async function onUpdateOrder(order, status) {
    const orderToSave = { ...order, status }
    try {
      const savedOrder = await updateOrder(orderToSave)
    } catch (err) {
      console.log('Cannot update orders')
    }
  }


  return (
    <div className="reservations">
      <h1>Welcome, {user.fullname.split(' ')[0]}!</h1>
      <h2>Your reservations</h2>

      <div className='order-categories'>
        <button>checking out(0)</button>
        <button>Currently hosting (0)</button>
        <button>Arriving soon (0)</button>
        <button>Upcoming (0)</button>
        <button>Pending review (0)</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Client name</th>
            <th>Stay name</th>
            <th>Status</th>
            <th>Guests</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Total </th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders && orders.map((order, index) => {
            if (order.hostId !== user._id) return null;
            return (
              <tr key={order._id || index}>
                <td>client name</td>
                <td>{order.stay.name}</td>
                <td className={`status-${order.status.toLowerCase()}`}>{String(order.status)}</td>
                <td>{order.guests ? Object.entries(order.guests)
                  .filter(([key, count]) => count > 0)
                  .map(([key, count]) => count > 0 ? `${count} ${key}` : '')
                  .join(', ') : ''}</td>
                <td>{format(order.startDate, 'd.M.yyyy')}</td>
                <td>{format(order.endDate, 'd.M.yyyy')}</td>
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

      {/* <div className="pagination">
        <label htmlFor="rows-per-page">Rows per page:</label>
        <select id="rows-per-page">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <span>1-4 of 4</span>
        <button>Prev</button>
        <button>Next</button>
      </div> */}
    </div>
  )
}

{/* <td className={`${order.action === 'Declined' || order.action === 'Approved' ? 'disabled' : ''}`}>{order.action}</td> */ }