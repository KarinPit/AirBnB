import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom/dist';
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders, updateOrder } from '../store/actions/order.actions'
import { format } from 'date-fns';
import { socketService, SOCKET_EVENT_ORDER_ADDED, SOCKET_EVENT_ORDER_UPDATED, SOCKET_EVENT_ORDER_REMOVED } from '../services/other/socket.service';
export default function RenterIndex() {
  const user = useSelector(storeState => storeState.userModule.user);
  const orders = useSelector(storeState => storeState.orderModule.orders)
  const navigate = useNavigate()
  function handleOrderChange() {
    console.log('inside handleOrderChange - renterIndex');
    if (user) {
      console.log('inside renter index socket magic');
      loadOrders({ hostId: user._id })
    }
  };
  useEffect(() => {
    if (!sessionStorage.loggedinUser) {
      navigate("/")
    }
    else {
      loadOrders({ hostId: user._id })
    }
    socketService.on(SOCKET_EVENT_ORDER_ADDED, handleOrderChange)
    return () => {
      socketService.off(SOCKET_EVENT_ORDER_ADDED, handleOrderChange)
    };
  }, [user, navigate])
  async function onUpdateOrder(order, status) {
    const orderToSave = { ...order, status }
    try {
      const savedOrder = await updateOrder(orderToSave)
    } catch (err) {
      console.log('Cannot update orders')
    }
  }
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  return (
    <div className="reservations">
      <h1>Welcome, {user?.fullname.split(' ')[0]}!</h1>
      {/* <h2>Trips</h2> */}
      <h2>Upcoming reservations</h2>
      <div className="buyer-reservations">
        {orders && orders.map((order, idx) => (
          <div className="order-card" key={order._id}>
            <div className="order-summary">
              <h3>{order.stay.name}</h3>
              <p>Entire apartment hosted by {order.owner.fullname}</p>
            </div>
            <div className="order-dates">
              <p>{format(new Date(order.startDate), 'dd MMM')} - {format(new Date(order.endDate), 'dd MMM')}</p>
              <p>{format(new Date(order.startDate), 'yyyy')}</p>
            </div>
            <div className='order-status'>
              {order.status === 'pending' ? (
                <select
                  value={order.status}
                  onChange={(e) => onUpdateOrder(order, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="declined">Declined</option>
                </select>
              ) : <p className={`${order.status}`}>{capitalizeFirstLetter(order.status)}</p>}
            </div>
            <div className="order-location">
              <p>{order.stayDetails.loc.address}</p>
            </div>
            <div className="order-images">
              {order.stayDetails.imgUrls.length > 0 && (
                <div className="main-image">
                  <img src={order.stayDetails.imgUrls[0]} alt="Main Image" />
                </div>
              )}
              {order.stayDetails.imgUrls.slice(1, 3).map((imgUrl, imgIdx) => (
                <img key={imgIdx} src={imgUrl} alt={`Image ${imgIdx + 2}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}