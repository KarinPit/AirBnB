import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadOrders } from '../store/actions/order.actions';
import { format } from 'date-fns';
import { socketService, SOCKET_EVENT_ORDER_ADDED, SOCKET_EVENT_ORDER_UPDATED, SOCKET_EVENT_ORDER_REMOVED } from '../services/other/socket.service';


export default function TravelerIndex() {
  const user = useSelector(storeState => storeState.userModule.user);
  const orders = useSelector(storeState => storeState.orderModule.orders)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!sessionStorage.loggedinUser) {
      console.log('no user');
      navigate("/")
    }
    else {
      loadOrders({ buyerId: user._id })
    }

    function handleOrderChange() {
      if (user) {
        loadOrders({ buyerId: user._id })
      }
    };

    socketService.on(SOCKET_EVENT_ORDER_ADDED, handleOrderChange);
    socketService.on(SOCKET_EVENT_ORDER_UPDATED, handleOrderChange);
    socketService.on(SOCKET_EVENT_ORDER_REMOVED, handleOrderChange);

    return () => {
      socketService.off(SOCKET_EVENT_ORDER_ADDED, handleOrderChange);
      socketService.off(SOCKET_EVENT_ORDER_UPDATED, handleOrderChange);
      socketService.off(SOCKET_EVENT_ORDER_REMOVED, handleOrderChange);
    };
  }, [user, navigate, dispatch])


  if (!orders) return ''

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
              <p className={`${order.status}`}>{capitalizeFirstLetter(order.status)}</p>
            </div>

            <div className="order-location">
              {/* {console.log(order.stayDetails.loc.address)} */}
              <p>{order && order.stayDetails && order.stayDetails.loc && order.stayDetails.loc.address}</p>
            </div>

            <div className="order-images">
              {order && order.stayDetails && order.stayDetails.imgUrls && order.stayDetails.imgUrls.length > 0 && (
                <div className="main-image">
                  <img src={order.stayDetails.imgUrls[0]} alt="Main Image" />
                </div>
              )}
              {order && order.stayDetails && order.stayDetails.imgUrls && order.stayDetails.imgUrls.slice(1, 3).map((imgUrl, imgIdx) => (
                <img key={imgIdx} src={imgUrl} alt={`Image ${imgIdx + 2}`} />
              ))}
            </div>
          </div>
        ))}


      </div>
    </div>
  );
}


{/* <div className="buyer-history"> */ }
{/* <h3>Where you've been</h3> */ }
// {orders.map((order, idx) => (
// <div className="history-card" key={order._id}>
// {/* <img src={order.stay.imgUrls[0]} alt="Stay" /> */}
// <div>
// <h3>{order.stay.city}</h3>
// <p>Hosted by {order.owner.fullname}</p>
// <p>{format(new Date(order.startDate), 'dd MMM yyyy')} - {format(new Date(order.endDate), 'dd MMM yyyy')}</p>
// </div>
// </div>
// ))}
// </div>