import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadOrders } from '../store/actions/order.actions';
import { orderService } from '../services/order/order.service';
import { format } from 'date-fns';

export default function TravelerIndex() {
  const user = useSelector(storeState => storeState.userModule.user);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.loggedinUser) {
      console.log('no user');
      navigate("/");
    } else {
      orderService.fetchBuyerOrders(user._id).then((orders) => {
        setOrders(orders);
      }).catch((err) => {
        console.log(err);
      });
    }
  }, [user, navigate]);

  if (!orders) return ''

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
              <p>{order.status}</p>
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